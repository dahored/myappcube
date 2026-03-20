'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Tv, Loader2, Ghost, Trophy, Timer, Check, Lock, Scale, User, Maximize2, Minimize2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { ref, query, orderByChild, equalTo, get, set, onValue, off, onDisconnect, goOffline, goOnline, type DatabaseReference } from 'firebase/database';

// ─── Font (scoped to this component only) ─────────────────────────────────────

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

// ─── Types (mirror of TvRoom entity in mobile app) ────────────────────────────

type TvRoomPhase = 'setup' | 'reveal' | 'countdown' | 'discussion' | 'voting' | 'results';
type TvTheme = 'dark' | 'light';

interface TvRoomPlayer {
  name: string;
  avatarId: string;
  revealed: boolean;
  active?: boolean;
}

interface TvRoomResults {
  revealed: boolean;
  eliminatedPlayerName: string;
  eliminatedAvatarId: string;
  caught: boolean;
  gameOver: boolean;
  remainingInfiltrators: number;
  totalInfiltrators: number;
  word: string;
  votes: { voter: string; voted: string }[];
}

interface TvRoom {
  code: string;
  hostUid: string;
  theme: TvTheme;
  viewerConnected: boolean;
  phase: TvRoomPhase;
  players: TvRoomPlayer[];
  countdownDuration: number;
  discussionDuration: number;
  discussionStartedAt: number | null;
  currentRound: number;
  totalRounds: number;
  results: TvRoomResults | null;
  updatedAt: number;
}

type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'notFound' | 'occupied';

// ─── Color palettes (mirrors ui.constants.ts in mobile app) ───────────────────

interface Palette {
  bg: string;
  bg2: string;
  card: string;
  cardBorder: string;
  white: string;
  muted: string;
  amber: string;
  green: string;
  infiltrator: string;
  word: string;
  red: string;
  purple: string;
  purpleBg: string;
}

const DARK: Palette = {
  bg:          '#0B0C1E',
  bg2:         '#090a18',
  card:        '#181929',
  cardBorder:  '#272840',
  white:       '#FFFFFF',
  muted:       '#8B8FA8',
  amber:       '#FF9F00',
  green:       '#22C55E',
  infiltrator: '#E85D5D',
  word:        '#34D399',
  red:         '#ff3535',
  purple:      '#7C3AED',
  purpleBg:    'rgba(124,58,237,0.15)',
};

const LIGHT: Palette = {
  bg:          '#FFFFFF',
  bg2:         '#F4F5F7',
  card:        '#FFFFFF',
  cardBorder:  '#DDE1F0',
  white:       '#1A1B2E',
  muted:       '#7B7F9A',
  amber:       '#FF9F00',
  green:       '#22C55E',
  infiltrator: '#E85D5D',
  word:        '#34D399',
  red:         '#ff3535',
  purple:      '#7C3AED',
  purpleBg:    'rgba(124,58,237,0.10)',
};

function getPalette(theme: TvTheme = 'dark'): Palette {
  return theme === 'light' ? LIGHT : DARK;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avatarUrl(avatarId: string): string {
  return `/images/avatars/avatar_${Number(avatarId) + 1}.jpg`;
}

function formatTime(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Sound helpers ─────────────────────────────────────────────────────────────

function playSound(path: string, volume = 1): void {
  if (typeof window === 'undefined') return;
  try {
    const audio = new Audio(path);
    audio.volume = volume;
    void audio.play();
  } catch {
    // ignore — browser may block autoplay
  }
}

function createLoopSound(path: string, volume = 0.7): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  try {
    const audio = new Audio(path);
    audio.loop = true;
    audio.volume = volume;
    return audio;
  } catch {
    return null;
  }
}

const TIMER_WARN_THRESHOLD = 10_000; // 10 seconds

// ─── Phase components ─────────────────────────────────────────────────────────

function SetupPhase({ t, p }: { t: ReturnType<typeof useTranslations>; p: Palette }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div
        className="w-28 h-28 rounded-3xl flex items-center justify-center"
        style={{ backgroundColor: p.purpleBg }}
      >
        <Tv size={52} strokeWidth={1.6} style={{ color: p.purple }} />
      </div>
      <p className="text-4xl font-bold tracking-widest" style={{ color: p.muted }}>{t('setup')}</p>
      <div className="flex gap-3">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-4 h-4 rounded-full animate-bounce"
            style={{ backgroundColor: p.purple, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function RevealPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const players = room.players ?? [];
  const allReady = players.length > 0 && players.every(pl => pl.revealed);
  const revealedCount = players.filter(pl => pl.revealed).length;
  const activeIndex = players.findIndex(pl => !pl.revealed);
  const count = players.length;
  const cols = count <= 3 ? count : count <= 6 ? 3 : count <= 10 ? 5 : count <= 20 ? 5 : 10;
  const rows = Math.ceil(count / cols);
  // Avatar size: constrained by available height and width
  const gapH = (rows - 1) * 16;
  const gapW = (cols - 1) * 20;
  const avatarSize = `min(calc((100dvh - 360px - ${gapH}px) / ${rows}), calc((100vw - 160px - ${gapW}px) / ${cols}), 200px)`;

  // Phrases from i18n (array support via raw message)
  const phrases = t.raw('waitPhrases') as string[];

  // Track just-revealed players for pop animation
  const [poppingIndices, setPoppingIndices] = useState<Set<number>>(new Set());
  const prevRevealedRef = useRef<boolean[]>([]);
  useEffect(() => {
    const prev = prevRevealedRef.current;
    const newPops = new Set<number>();
    players.forEach((pl, i) => {
      if (pl.revealed && !prev[i]) newPops.add(i);
    });
    if (newPops.size > 0) {
      playSound('/sounds/game/reveal_sound.mp3');
      setPoppingIndices(s => new Set([...s, ...newPops]));
      setTimeout(() => {
        setPoppingIndices(s => {
          const next = new Set(s);
          newPops.forEach(i => next.delete(i));
          return next;
        });
      }, 700);
    }
    prevRevealedRef.current = players.map(pl => pl.revealed);
  }, [players]);

  // Rotating phrase — random, never same as previous
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);
  useEffect(() => {
    if (allReady) return;
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIndex(prev => {
          let next = Math.floor(Math.random() * phrases.length);
          if (phrases.length > 1 && next === prev) next = (next + 1) % phrases.length;
          return next;
        });
        setPhraseVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [allReady, phrases.length]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 48px',
        gap: 12,
        overflow: 'hidden',
        minHeight: 0,
      }}
    >
      {/* Title + progress */}
      <div style={{ flexShrink: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.purple, lineHeight: 1.1 }}>
          {t('revealTitle')}
        </p>
        <p style={{ fontSize: '0.95rem', fontWeight: 600, color: p.muted }}>
          {revealedCount} / {count} listos
        </p>
        <div style={{ width: 256, height: 6, borderRadius: 9999, backgroundColor: p.cardBorder, margin: '0 auto', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              borderRadius: 9999,
              transition: 'width 0.7s ease, background-color 0.5s ease',
              width: count ? `${(revealedCount / count) * 100}%` : '0%',
              backgroundColor: allReady ? p.green : p.purple,
            }}
          />
        </div>
      </div>

      {/* Player grid — flexbox so last row centers automatically */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px 20px',
          justifyContent: 'center',
          alignContent: 'center',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {players.map((player, i) => {
          const isActive = i === activeIndex;
          const isRevealed = player.revealed;
          const isPopping = poppingIndices.has(i);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                animation: isPopping ? 'avatarPop 0.7s cubic-bezier(0.36,0.07,0.19,0.97)' : undefined,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: `0 0 0 3px ${isRevealed ? p.green : isActive ? p.purple : 'transparent'}`,
                  transition: 'box-shadow 0.5s ease',
                  animation: isActive && !isRevealed ? 'pulse 1.4s ease-in-out infinite' : undefined,
                }}
              >
                <Image
                  src={avatarUrl(player.avatarId)}
                  alt={player.name}
                  fill
                  className="object-cover transition-opacity duration-500"
                  style={{ opacity: isRevealed ? 1 : isActive ? 0.9 : 0.4 }}
                />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 2.2vw, 2rem)',
                  color: isRevealed ? p.white : isActive ? p.white : p.muted,
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: avatarSize,
                  transition: 'color 0.5s ease',
                }}
              >
                {player.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom: ready banner OR rotating phrase */}
      <div style={{ flexShrink: 0, minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {allReady ? (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 16, animation: 'readyPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            <Check size={44} strokeWidth={3} style={{ color: p.green }} />
            <p style={{ fontSize: '3.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: p.green }}>
              {t('revealReady')}
            </p>
          </div>
        ) : (
          <p
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
              fontWeight: 700,
              textAlign: 'center',
              fontStyle: 'italic',
              color: p.muted,
              opacity: phraseVisible ? 1 : 0,
              transition: 'opacity 0.35s ease',
              animation: phraseVisible ? 'fadeSlideUp 0.4s ease-out' : undefined,
              maxWidth: '70ch',
            }}
          >
            &ldquo;{phrases[phraseIndex]}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

function CountdownPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const totalSec = Math.round(room.countdownDuration / 1000);
  const [count, setCount] = useState<number | 'now'>(totalSec);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setCount(totalSec);
    setAnimKey(k => k + 1);
    // Play first tick immediately
    playSound('/sounds/game/count_1s_1.mp3');
    let current = totalSec;

    const interval = setInterval(() => {
      current -= 1;
      if (current <= 0) {
        setCount('now');
        setAnimKey(k => k + 1);
        playSound('/sounds/game/ready_1s_1.mp3');
        clearInterval(interval);
      } else {
        setCount(current);
        setAnimKey(k => k + 1);
        playSound('/sounds/game/count_1s_1.mp3');
      }
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.updatedAt]);

  const isNow = count === 'now';

  return (
    <div className="flex flex-col items-center" style={{ gap: 'clamp(16px, 3.3cqi, 32px)' }}>
      <p
        className="font-semibold tracking-widest uppercase"
        style={{ fontSize: 'clamp(14px, 3.1cqi, 30px)', color: p.muted }}
      >
        {t('countdown')}
      </p>
      <div
        key={animKey}
        className="animate-[countPop_0.3s_ease-out]"
      >
        <span
          className="font-black tabular-nums"
          style={{
            fontSize: 'clamp(80px, 23cqi, 220px)',
            lineHeight: 1,
            color: isNow ? p.green : p.amber,
          }}
        >
          {isNow ? t('now') : count}
        </span>
      </div>
    </div>
  );
}

function DiscussionPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const calcRemaining = useCallback(() => {
    if (!room.discussionStartedAt) return room.discussionDuration;
    return room.discussionDuration - (Date.now() - room.discussionStartedAt);
  }, [room.discussionDuration, room.discussionStartedAt]);

  const [remaining, setRemaining] = useState(calcRemaining);
  const ticLoopRef = useRef<HTMLAudioElement | null>(null);
  const didPlayTimeUpRef = useRef(false);

  const isDone = remaining <= 0;
  const isLow = remaining > 0 && remaining <= TIMER_WARN_THRESHOLD;
  const multiRound = room.totalRounds > 1;

  // Per-second jump animation key when isLow
  const [jumpKey, setJumpKey] = useState(0);
  const prevSecRef = useRef(-1);
  useEffect(() => {
    if (!isLow) { prevSecRef.current = -1; return; }
    const sec = Math.ceil(remaining / 1000);
    if (sec !== prevSecRef.current) {
      prevSecRef.current = sec;
      setJumpKey(k => k + 1);
    }
  }, [remaining, isLow]);

  // Rotating discussion phrases
  const phrases = t.raw('discussionPhrases') as string[];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);
  useEffect(() => {
    if (isDone) return;
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIndex(i => (i + 1) % phrases.length);
        setPhraseVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [isDone, phrases.length]);

  // Tick-tac loop when ≤10 s remain
  useEffect(() => {
    if (isLow && !ticLoopRef.current) {
      const audio = createLoopSound('/sounds/game/tic_tac.mp3');
      ticLoopRef.current = audio;
      // AbortError is expected when pause() is called before play() resolves — safe to ignore
      audio?.play().catch(() => {});
    }
    if (!isLow && ticLoopRef.current) {
      ticLoopRef.current.pause();
      ticLoopRef.current = null;
    }
  }, [isLow]);

  // Time-up sound
  useEffect(() => {
    if (isDone && !didPlayTimeUpRef.current) {
      didPlayTimeUpRef.current = true;
      ticLoopRef.current?.pause();
      ticLoopRef.current = null;
      playSound('/sounds/game/timer_terminer_1s_1.mp3');
    }
  }, [isDone]);

  // Clean up loop on unmount
  useEffect(() => {
    return () => {
      ticLoopRef.current?.pause();
      ticLoopRef.current = null;
    };
  }, []);

  useEffect(() => {
    didPlayTimeUpRef.current = false;
    setRemaining(calcRemaining());
    const interval = setInterval(() => {
      setRemaining(calcRemaining());
    }, 500);
    return () => clearInterval(interval);
  }, [calcRemaining]);

  const timerColor = isDone ? p.amber : isLow ? p.infiltrator : p.purple;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl" style={{ gap: 'clamp(8px, 2cqi, 16px)' }}>
      {/* Header row: title + round badge */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Timer style={{ width: 'clamp(14px, 2.7cqi, 26px)', height: 'clamp(14px, 2.7cqi, 26px)', color: p.purple }} strokeWidth={1.5} />
          <p className="font-bold tracking-widest uppercase" style={{ fontSize: 'clamp(13px, 2.3cqi, 22px)', color: p.purple }}>
            {t('discussionTitle')}
          </p>
        </div>
        <div
          className="px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase"
          style={{ backgroundColor: p.purpleBg, color: p.purple }}
        >
          {multiRound
            ? t('round', { current: room.currentRound, total: room.totalRounds })
            : t('roundSingle')}
        </div>
      </div>

      {/* Timer — jump animation on each second when isLow */}
      <div
        key={isLow ? jumpKey : 0}
        style={{ animation: isLow ? 'timerJump 0.35s ease-out' : undefined }}
      >
        <span
          className="font-black tabular-nums transition-colors duration-300"
          style={{
            fontSize: 'clamp(72px, 21cqi, 200px)',
            lineHeight: 1,
            color: timerColor,
          }}
        >
          {formatTime(remaining)}
        </span>
      </div>

      {/* Instruction — always visible */}
      <p
        className="font-medium text-center"
        style={{ fontSize: 'clamp(12px, 2cqi, 20px)', color: `${p.muted}99`, maxWidth: '60ch' }}
      >
        {t('discussionInstruction')}
      </p>

      {/* Bottom area — fixed height to avoid layout shift */}
      <div className="flex flex-col items-center justify-center gap-3" style={{ height: 'clamp(80px, 21cqi, 200px)', overflow: 'hidden' }}>
        {isDone ? (
          <p
            className="font-black tracking-wide text-center"
            style={{
              fontSize: 'clamp(20px, 4.2cqi, 40px)',
              color: p.amber,
              animation: 'pulse 1s ease-in-out infinite',
            }}
          >
            {t('timeUp')}
          </p>
        ) : (
          <>
            <p
              style={{
                fontSize: 'clamp(16px, 3.6cqi, 35px)',
                fontWeight: 700,
                fontStyle: 'italic',
                textAlign: 'center',
                maxWidth: '70ch',
                color: p.muted,
                opacity: phraseVisible ? 1 : 0,
                transition: 'opacity 0.35s ease',
                animation: phraseVisible ? 'fadeSlideUp 0.4s ease-out' : undefined,
              }}
            >
              &ldquo;{phrases[phraseIndex]}&rdquo;
            </p>
            <p className="text-base font-medium tracking-wide" style={{ color: `${p.muted}88` }}>
              {t('voteAnytime')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function VotingPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const players = (room.players ?? []).filter(pl => pl.active !== false);
  const phrases = t.raw('suspicionPhrases') as string[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);
  const [phraseKey, setPhraseKey] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);

  const revealSequence = useCallback((newPlayerIndex: number, newPhraseIndex: number) => {
    // 1. Remount avatar element at opacity 0
    setCurrentIndex(newPlayerIndex);
    setShowAvatar(false);
    setShowPhrase(false);
    setAvatarKey(k => k + 1);
    // 2. After two frames, browser has painted opacity:0 — now transition in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHasRevealed(true);
        setShowAvatar(true);
      });
    });
    // 3. After 1.8s, slide in phrase
    setTimeout(() => {
      setPhraseIndex(newPhraseIndex);
      setPhraseKey(k => k + 1);
      setShowPhrase(true);
    }, 1800);
  }, []);

  // Initial reveal — random player and phrase
  useEffect(() => {
    if (players.length === 0) return;
    const timer = setTimeout(() => {
      const initPlayer = Math.floor(Math.random() * players.length);
      const initPhrase = Math.floor(Math.random() * phrases.length);
      revealSequence(initPlayer, initPhrase);
    }, 600);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cycle every 6s
  useEffect(() => {
    if (players.length === 0) return;
    let pIdx = 0;
    let cIdx = 0;
    const interval = setInterval(() => {
      setShowAvatar(false);
      setShowPhrase(false);
      setTimeout(() => {
        // Random player — never same as previous
        let nextPlayer = Math.floor(Math.random() * players.length);
        if (players.length > 1 && nextPlayer === cIdx) nextPlayer = (nextPlayer + 1) % players.length;
        cIdx = nextPlayer;
        // Random phrase — never same as previous
        let nextPhrase = Math.floor(Math.random() * phrases.length);
        if (phrases.length > 1 && nextPhrase === pIdx) nextPhrase = (nextPhrase + 1) % phrases.length;
        pIdx = nextPhrase;
        revealSequence(cIdx, pIdx);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.length, phrases.length]);

  const player = players[currentIndex];

  return (
    <div className="flex flex-col items-center w-full max-w-xl" style={{ gap: 'clamp(16px, 4cqi, 40px)' }}>

      {/* Title */}
      <div className="flex items-center gap-3">
        <Scale style={{ width: 'clamp(14px, 2.7cqi, 26px)', height: 'clamp(14px, 2.7cqi, 26px)', color: p.amber }} strokeWidth={1.5} />
        <p className="font-bold tracking-widest uppercase whitespace-nowrap" style={{ fontSize: 'clamp(13px, 2.3cqi, 22px)', color: p.amber }}>
          {t('votingTitle')}
        </p>
      </div>

      {/* Avatar + name — loading dots before first reveal, then fade in */}
      {!hasRevealed ? (
        <div style={{ display: 'flex', gap: 12, height: 'clamp(120px, 30cqi, 290px)', alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-bounce"
              style={{ backgroundColor: p.purple, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      ) : (
        <div
          key={avatarKey}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            opacity: showAvatar ? 1 : 0,
            transform: showAvatar ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {player && (
            <>
              <div style={{
                position: 'relative',
                width: 'clamp(90px, 23cqi, 220px)',
                height: 'clamp(90px, 23cqi, 220px)',
                borderRadius: '50%', overflow: 'hidden',
                border: `3px solid ${p.amber}`,
              }}>
                <Image src={avatarUrl(player.avatarId)} alt={player.name} fill className="object-cover" />
              </div>
              <p style={{ fontSize: 'clamp(16px, 3.6cqi, 35px)', fontWeight: 900, color: p.white }}>
                {player.name}
              </p>
            </>
          )}
        </div>
      )}

      {/* Fixed suspect label — always visible */}
      <p style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        color: p.amber,
        opacity: 0.7,
        marginTop: -16,
      }}>
        ▲ {t('votingSuspectLabel')}
      </p>

      {/* Phrase — slides up after avatar, like the discussion timer */}
      <div style={{ height: 'clamp(50px, 12.5cqi, 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <p
          key={phraseKey}
          style={{
            fontSize: 'clamp(16px, 3.6cqi, 35px)',
            fontWeight: 700,
            fontStyle: 'italic',
            textAlign: 'center',
            color: p.purple,
            maxWidth: '28ch',
            opacity: showPhrase ? 1 : 0,
            animation: showPhrase ? 'fadeSlideUp 0.55s ease-out both' : undefined,
          }}
        >
          &ldquo;{phrases[phraseIndex]}&rdquo;
        </p>
      </div>
    </div>
  );
}

function ResultsPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const results = room.results;
  const prevRevealedRef = useRef(false);
  const [step, setStep] = useState(0); // 0=none, 1=icon, 2=text, 3=avatar, 4=name/role, 5=word
  const [revealKey, setRevealKey] = useState(0);

  useEffect(() => {
    if (!results) return;
    if (results.revealed && !prevRevealedRef.current) {
      if (results.gameOver) {
        if (results.caught) {
          playSound('/sounds/game/win_sound.mp3');
        } else {
          playSound('/sounds/game/loss_sound_1.mp3');
        }
      } else {
        if (results.caught) {
          playSound('/sounds/game/success_sound_1.mp3');
        } else {
          playSound('/sounds/game/fail_sound_1.mp3');
        }
      }
      // Cinematic staggered entrance
      setStep(0);
      setRevealKey(k => k + 1);
      setTimeout(() => setStep(1), 200);   // icon pops in
      setTimeout(() => setStep(2), 700);   // outcome text slides up
      setTimeout(() => setStep(3), 1300);  // avatar fades in
      setTimeout(() => setStep(4), 1900);  // name + role badge
      setTimeout(() => setStep(5), 2600);  // secret word card
    }
    prevRevealedRef.current = results?.revealed ?? false;
  }, [results?.revealed, results?.caught, results?.eliminatedPlayerName]);

  if (!results) return null;

  if (!results.revealed) {
    return (
      <div className="flex flex-col items-center gap-10">
        <div
          className="relative w-48 h-48 rounded-full overflow-hidden border-4 animate-pulse"
          style={{ borderColor: p.cardBorder }}
        >
          {results.eliminatedAvatarId ? (
            <Image
              src={avatarUrl(results.eliminatedAvatarId)}
              alt="?"
              fill
              className="object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: p.card }} />
          )}
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <span className="text-9xl font-black text-white">?</span>
          </div>
        </div>
        <p className="text-4xl font-bold tracking-widest" style={{ color: p.muted }}>{t('resultsRevealing')}</p>
        <div className="flex gap-3">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-bounce"
              style={{ backgroundColor: p.purple, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full reveal — cinematic sequence
  const isCaught = results.caught;
  const isTie = !results.eliminatedPlayerName;
  const isGameOver = results.gameOver;
  const badgeColor = isCaught ? p.infiltrator : p.green;
  const outcomeColor = isTie
    ? p.muted
    : !isGameOver
      ? p.amber
      : isCaught
        ? p.green
        : p.infiltrator;
  const outcomeText = isTie
    ? t('tie')
    : !isGameOver
      ? t('gameContinues')
      : isCaught
        ? t('innocentsWin')
        : t('infiltratorWins');

  const isSingleInfiltrator = results.totalInfiltrators === 1;

  // Subtext under badge
  const infiltratorSubtext = isCaught && isGameOver
    ? isSingleInfiltrator
      ? t('infiltratorEliminated')
      : t('allInfiltratorsEliminated')
    : isCaught && !isGameOver && results.remainingInfiltrators > 0
      ? t('remainingInfiltrators', { count: results.remainingInfiltrators })
      : null;

  const show1 = step >= 1; // icon
  const show2 = step >= 2; // text
  const show3 = step >= 3; // avatar
  const show4 = step >= 4; // name + badge
  const show5 = step >= 5; // word card

  return (
    <div className="flex flex-col items-center w-full max-w-2xl" style={{ gap: 'clamp(16px, 4cqi, 32px)' }}>
      {/* Outcome icon + text inline */}
      <div
        key={`title-${revealKey}`}
        className="flex items-center justify-center text-center leading-tight"
        style={{ gap: 'clamp(8px, 1.5cqi, 16px)' }}
      >
        <div
          style={{
            opacity: show1 ? 1 : 0,
            transform: show1 ? 'scale(1)' : 'scale(0.3)',
            transition: 'opacity 0.45s ease-out, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            flexShrink: 0,
          }}
        >
          {isCaught && isGameOver && <Trophy strokeWidth={1.5} style={{ width: 'clamp(28px, 6.3cqi, 60px)', height: 'clamp(28px, 6.3cqi, 60px)', color: p.green }} />}
          {!isCaught && !isTie && isGameOver && <Ghost strokeWidth={1.5} style={{ width: 'clamp(28px, 6.3cqi, 60px)', height: 'clamp(28px, 6.3cqi, 60px)', color: p.infiltrator }} />}
        </div>
        <p
          className="font-black"
          style={{
            fontSize: 'clamp(28px, 6.3cqi, 60px)',
            whiteSpace: 'nowrap',
            color: outcomeColor,
            opacity: show2 ? 1 : 0,
            animation: show2 ? 'fadeSlideUp 0.5s ease-out both' : undefined,
          }}
        >
          {outcomeText}
        </p>
      </div>

      {/* Expanding divider */}
      <div
        style={{
          width: show3 ? '8rem' : '0',
          height: 1,
          backgroundColor: p.cardBorder,
          transition: 'width 0.5s ease-out',
        }}
      />

      {/* Eliminated player */}
      {results.eliminatedPlayerName && (
        <div className="flex flex-col items-center gap-4">
          {/* Avatar — fades + rises in */}
          <div
            key={`avatar-${revealKey}`}
            style={{
              opacity: show3 ? 1 : 0,
              transform: show3 ? 'scale(1) translateY(0)' : 'scale(0.75) translateY(24px)',
              transition: 'opacity 0.55s ease-out, transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1)',
              borderRadius: '9999px',
              overflow: 'hidden',
              width: 'clamp(70px, 16.7cqi, 160px)',
              height: 'clamp(70px, 16.7cqi, 160px)',
              border: `4px solid ${badgeColor}`,
              flexShrink: 0,
            }}
          >
            <Image
              src={avatarUrl(results.eliminatedAvatarId)}
              alt={results.eliminatedPlayerName}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name */}
          <p
            key={`name-${revealKey}`}
            className="font-bold"
            style={{
              fontSize: 'clamp(20px, 3.75cqi, 36px)',
              color: p.white,
              opacity: show4 ? 1 : 0,
              animation: show4 ? 'fadeSlideUp 0.5s ease-out both' : undefined,
            }}
          >
            {results.eliminatedPlayerName}
          </p>

          {/* Role text */}
          <div
            key={`badge-${revealKey}`}
            style={{
              opacity: show4 ? 1 : 0,
              animation: show4 ? 'fadeSlideUp 0.5s 0.1s ease-out both' : undefined,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {isCaught
              ? <Ghost style={{ width: 'clamp(14px, 2.9cqi, 28px)', height: 'clamp(14px, 2.9cqi, 28px)', color: badgeColor }} />
              : <User style={{ width: 'clamp(14px, 2.9cqi, 28px)', height: 'clamp(14px, 2.9cqi, 28px)', color: badgeColor }} />
            }
            <span style={{ fontSize: 'clamp(14px, 2.9cqi, 28px)', fontWeight: 700, color: badgeColor }}>
              {isCaught
                ? isSingleInfiltrator ? t('wasTheInfiltrator') : t('wasInfiltrator')
                : t('wasInnocent')}
            </span>
          </div>

          {/* Infiltrator subtext */}
          {infiltratorSubtext && (
            <p
              key={`subtext-${revealKey}`}
              style={{
                fontSize: 'clamp(12px, 2.3cqi, 22px)',
                color: p.muted,
                opacity: show4 ? 1 : 0,
                animation: show4 ? 'fadeSlideUp 0.5s 0.2s ease-out both' : undefined,
                textAlign: 'center',
              }}
            >
              {infiltratorSubtext}
            </p>
          )}
        </div>
      )}

      {/* Secret word card — only revealed when game ends */}
      {results.word && isGameOver && (
        <div
          key={`word-${revealKey}`}
          style={{
            opacity: show5 ? 1 : 0,
            transform: show5 ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.55s ease-out, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(2px, 0.5cqi, 6px)',
            padding: 'clamp(12px, 2.5cqi, 24px) clamp(28px, 6cqi, 56px)',
            borderRadius: 20,
            border: `1px solid ${p.cardBorder}`,
          }}
        >
          <p style={{ fontSize: 'clamp(9px, 1cqi, 11px)', textTransform: 'uppercase', letterSpacing: '0.18em', color: p.muted }}>
            {t('resultsWord')}
          </p>
          <p style={{ fontSize: 'clamp(20px, 4cqi, 38px)', fontWeight: 900, letterSpacing: '0.05em', color: p.word }}>
            {results.word}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TvModeClient() {
  const t = useTranslations('games.el-infiltrado.tvMode');

  const [code, setCode] = useState('');
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [room, setRoom] = useState<TvRoom | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const roomRefRef = useRef<DatabaseReference | null>(null);
  const viewerRefRef = useRef<DatabaseReference | null>(null);

  // Keep screen awake while TV mode is open
  useEffect(() => {
    if (!('wakeLock' in navigator)) return;
    let lock: WakeLockSentinel | null = null;
    const acquire = async () => {
      try { lock = await (navigator as any).wakeLock.request('screen'); } catch {}
    };
    acquire();
    const onVisChange = () => { if (document.visibilityState === 'visible') acquire(); };
    document.addEventListener('visibilitychange', onVisChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisChange);
      lock?.release().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
    if (!isFs) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  }, []);

  // ── Background music ───────────────────────────────────────────────────────
  const bgMusicRef     = useRef<HTMLAudioElement | null>(null);
  const bgStartTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgFadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const fadeOutBgMusic = useCallback(() => {
    if (bgStartTimer.current) { clearTimeout(bgStartTimer.current); bgStartTimer.current = null; }
    if (bgFadeInterval.current) { clearInterval(bgFadeInterval.current); bgFadeInterval.current = null; }
    const audio = bgMusicRef.current;
    if (!audio || audio.paused) return;
    bgFadeInterval.current = setInterval(() => {
      if (!bgMusicRef.current) return;
      const next = Math.max(0, bgMusicRef.current.volume - 0.02);
      bgMusicRef.current.volume = next;
      if (next === 0) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
        clearInterval(bgFadeInterval.current!);
        bgFadeInterval.current = null;
      }
    }, 50); // ~750ms fade out (0.3 / 0.02 * 50ms)
  }, []);

  useEffect(() => {
    const MUSIC_PHASES: string[] = ['setup', 'voting'];
    const phase = room?.phase;

    if (phase && MUSIC_PHASES.includes(phase)) {
      // Cancel any in-progress fade out
      if (bgFadeInterval.current) { clearInterval(bgFadeInterval.current); bgFadeInterval.current = null; }
      // Restore volume if music was fading but still playing
      if (bgMusicRef.current && !bgMusicRef.current.paused) {
        bgMusicRef.current.volume = 0.3;
        return;
      }
      // Start music after 7s delay
      bgStartTimer.current = setTimeout(() => {
        if (!bgMusicRef.current) {
          bgMusicRef.current = new Audio('/sounds/music/music_4/penguinmusic-penguinmusic-calming-minimal-corporate-12637.mp3');
          bgMusicRef.current.loop = true;
        }
        const audio = bgMusicRef.current;
        audio.volume = 0;
        audio.play().catch(() => {});
        // Fade in to 30%
        bgFadeInterval.current = setInterval(() => {
          if (!bgMusicRef.current) return;
          const next = Math.min(0.3, bgMusicRef.current.volume + 0.01);
          bgMusicRef.current.volume = next;
          if (next >= 0.3) { clearInterval(bgFadeInterval.current!); bgFadeInterval.current = null; }
        }, 50); // ~1.5s fade in
      }, 5000);
    } else {
      fadeOutBgMusic();
    }

    return () => {
      if (bgStartTimer.current) { clearTimeout(bgStartTimer.current); bgStartTimer.current = null; }
    };
  }, [room?.phase, fadeOutBgMusic]);

  // Stop music on unmount
  useEffect(() => () => {
    if (bgStartTimer.current) clearTimeout(bgStartTimer.current);
    if (bgFadeInterval.current) clearInterval(bgFadeInterval.current);
    if (bgMusicRef.current) { bgMusicRef.current.pause(); bgMusicRef.current = null; }
  }, []);

  const p = getPalette(room?.theme);

  const disconnect = useCallback(async () => {
    // Release the viewer slot so the host can reconnect another TV
    if (viewerRefRef.current) {
      try { await set(viewerRefRef.current, false); } catch { /* ignore */ }
      viewerRefRef.current = null;
    }
    if (roomRefRef.current) {
      off(roomRefRef.current);
      roomRefRef.current = null;
    }
    setRoom(null);
    setConnectionState('idle');
  }, []);

  // Clean up on unmount — disconnect listener and close WebSocket
  useEffect(() => {
    goOnline(db);
    return () => { disconnect(); goOffline(db); };
  }, [disconnect]);

  const handleConnect = useCallback(async () => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) return;

    setConnectionState('connecting');
    await disconnect();

    try {
      // Step 1: find hostUid by code
      const roomsRef = ref(db, 'tvRooms');
      const codeQuery = query(roomsRef, orderByChild('code'), equalTo(trimmed));
      const snapshot = await get(codeQuery);

      if (!snapshot.exists()) {
        setConnectionState('notFound');
        return;
      }

      const data = snapshot.val() as Record<string, TvRoom>;
      const hostUid = Object.keys(data)[0];
      const roomData = data[hostUid];

      // Step 2: check if another TV is already connected
      if (roomData.viewerConnected) {
        setConnectionState('occupied');
        return;
      }

      // Step 3: claim the viewer slot
      const viewerRef = ref(db, `tvRooms/${hostUid}/viewerConnected`);
      viewerRefRef.current = viewerRef;
      await set(viewerRef, true);
      // Auto-release when browser closes / connection drops
      onDisconnect(viewerRef).set(false);

      // Step 4: subscribe to real-time updates
      const directRef = ref(db, `tvRooms/${hostUid}`);
      roomRefRef.current = directRef;

      onValue(directRef, (snap) => {
        if (!snap.exists()) {
          // Room was deleted — unsubscribe immediately so we don't
          // auto-reconnect when the host creates a new room at the same path
          off(directRef);
          roomRefRef.current = null;
          viewerRefRef.current = null;
          setRoom(null);
          setConnectionState('notFound');
          return;
        }
        setRoom(snap.val() as TvRoom);
        setConnectionState('connected');
      }, () => {
        setConnectionState('error');
      });

    } catch (e) {
      console.error('[TvMode] connection error:', e);
      setConnectionState('error');
    }
  }, [code, disconnect]);

  // ── Entry screen ──────────────────────────────────────────────────────────
  if (connectionState !== 'connected' || !room) {
    // Use dark palette for entry screen (no room yet)
    const ep = DARK;
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-10 p-8 ${poppins.className}`}
        style={{ backgroundColor: ep.bg }}
      >
        {/* Language selector + fullscreen */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: ep.muted,
              lineHeight: 1,
              transition: 'opacity 0.2s',
              opacity: 0.5,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          >
            {isFullscreen
              ? <Minimize2 size={18} strokeWidth={1.8} />
              : <Maximize2 size={18} strokeWidth={1.8} />
            }
          </button>
          <LocaleSwitcher />
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Logo + TV badge */}
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl overflow-hidden">
              <Image
                src="/images/games/el-infiltrado/logo/logo.jpg"
                alt="El Infiltrado"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            {/* TV badge — bottom-right corner */}
            <div
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center border-2"
              style={{ backgroundColor: ep.purple, borderColor: ep.bg }}
            >
              <Tv size={17} strokeWidth={1.8} color="#fff" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-center" style={{ color: ep.white }}>
            {t('title')}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <p className="text-lg text-center" style={{ color: ep.muted }}>{t('enterCode')}</p>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase().slice(0, 6))}
            onKeyDown={e => e.key === 'Enter' && handleConnect()}
            placeholder={t('codePlaceholder')}
            className="w-full text-center text-4xl font-black tracking-[0.3em] rounded-2xl px-6 py-5 focus:outline-none transition-colors uppercase border-2"
            style={{
              backgroundColor: ep.card,
              borderColor: code.length > 0 ? ep.amber : ep.cardBorder,
              color: ep.white,
            }}
            maxLength={6}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />

          <button
            onClick={handleConnect}
            disabled={connectionState === 'connecting' || code.trim().length < 4}
            className="w-full h-16 rounded-2xl font-black text-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: ep.amber, color: '#000' }}
          >
            {connectionState === 'connecting' ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                {t('connecting')}
              </>
            ) : t('connect')}
          </button>

          {connectionState === 'notFound' && (
            <p className="text-center font-semibold" style={{ color: ep.infiltrator }}>{t('notFound')}</p>
          )}
          {connectionState === 'error' && (
            <p className="text-center font-semibold" style={{ color: ep.infiltrator }}>{t('connectionError')}</p>
          )}
          {connectionState === 'occupied' && (
            <div className="flex flex-col items-center gap-3 mt-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: ep.purpleBg }}
              >
                <Lock size={28} strokeWidth={1.8} style={{ color: ep.purple }} />
              </div>
              <p className="text-center font-bold text-lg" style={{ color: ep.purple }}>{t('occupied')}</p>
              <p className="text-center text-sm" style={{ color: ep.muted }}>{t('occupiedHint')}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Connected: phase view ──────────────────────────────────────────────────
  const phaseBg = room.phase === 'setup' && room.theme === 'light' ? '#FFFFFF' : p.bg;
  const isReveal = room.phase === 'reveal';
  return (
    <div
      className={`${poppins.className} flex flex-col`}
      style={{
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: phaseBg,
        transition: 'background-color 0.7s ease',
        position: 'relative',
        ...(isReveal ? {} : { alignItems: 'center', justifyContent: 'center' }),
      }}
    >
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 100,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8,
          padding: '6px 10px',
          cursor: 'pointer',
          color: p.muted,
          lineHeight: 1,
          transition: 'opacity 0.2s',
          opacity: 0.5,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
      >
        {isFullscreen
          ? <Minimize2 size={18} strokeWidth={1.8} />
          : <Maximize2 size={18} strokeWidth={1.8} />
        }
      </button>

      <div
        key={room.phase}
        style={{
          animation: 'phaseFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) both',
          ...(isReveal
            ? { flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0, height: '100%' }
            : {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                containerType: 'inline-size',
                width: '100%',
                flexShrink: 0,
              }),
        }}
      >
        {room.phase === 'setup'      && <SetupPhase t={t} p={p} />}
        {room.phase === 'reveal'     && <RevealPhase room={room} t={t} p={p} />}
        {room.phase === 'countdown'  && <CountdownPhase room={room} t={t} p={p} />}
        {room.phase === 'discussion' && <DiscussionPhase room={room} t={t} p={p} />}
        {room.phase === 'voting'     && <VotingPhase room={room} t={t} p={p} />}
        {room.phase === 'results'    && <ResultsPhase room={room} t={t} p={p} />}
      </div>
    </div>
  );
}
