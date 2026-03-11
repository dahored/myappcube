'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { Tv, Loader2, Ghost, Trophy, Timer } from 'lucide-react';
import { db } from '@/lib/firebase';
import { ref, query, orderByChild, equalTo, get, onValue, off, type DatabaseReference } from 'firebase/database';

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
}

interface TvRoomResults {
  revealed: boolean;
  eliminatedPlayerName: string;
  eliminatedAvatarId: string;
  caught: boolean;
  word: string;
  votes: { voter: string; voted: string }[];
}

interface TvRoom {
  code: string;
  hostUid: string;
  theme: TvTheme;
  phase: TvRoomPhase;
  players: TvRoomPlayer[];
  countdownDuration: number;
  discussionDuration: number;
  discussionStartedAt: number | null;
  results: TvRoomResults | null;
  updatedAt: number;
}

type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'notFound';

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
};

const LIGHT: Palette = {
  bg:          '#F4F5F7',
  bg2:         '#ECEEF2',
  card:        '#FFFFFF',
  cardBorder:  '#DDE1F0',
  white:       '#1A1B2E',
  muted:       '#7B7F9A',
  amber:       '#FF9F00',
  green:       '#22C55E',
  infiltrator: '#E85D5D',
  word:        '#34D399',
  red:         '#ff3535',
};

function getPalette(theme: TvTheme = 'dark'): Palette {
  return theme === 'light' ? LIGHT : DARK;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avatarUrl(avatarId: string): string {
  return `/avatars/avatar_${Number(avatarId) + 1}.jpg`;
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
      <Tv size={72} strokeWidth={1} style={{ color: p.muted }} />
      <p className="text-4xl font-bold tracking-widest" style={{ color: p.muted }}>{t('setup')}</p>
      <div className="flex gap-3">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-4 h-4 rounded-full animate-bounce"
            style={{ backgroundColor: p.muted, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function RevealPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const players = room.players ?? [];
  const allReady = players.length > 0 && players.every(pl => pl.revealed);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
      <div className="text-center">
        <p className="text-2xl font-semibold tracking-widest uppercase" style={{ color: p.muted }}>{t('revealTitle')}</p>
        <p className="text-lg mt-2" style={{ color: allReady ? p.green : p.muted }}>
          {allReady ? t('revealReady') : t('revealWaiting')}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full sm:grid-cols-4 lg:grid-cols-5">
        {players.map((player, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-2"
              style={{ borderColor: player.revealed ? p.green : p.cardBorder }}
            >
              <Image
                src={avatarUrl(player.avatarId)}
                alt={player.name}
                fill
                className={`object-cover transition-all duration-500 ${player.revealed ? 'opacity-100' : 'opacity-30 blur-sm'}`}
              />
              {!player.revealed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black text-white">?</span>
                </div>
              )}
              {player.revealed && (
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: p.green }}
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </div>
            <span className="font-semibold text-sm text-center leading-tight" style={{ color: p.white }}>{player.name}</span>
          </div>
        ))}
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
    <div className="flex flex-col items-center gap-8">
      <p
        className="text-3xl font-semibold tracking-widest uppercase"
        style={{ color: p.muted }}
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
            fontSize: 'clamp(120px, 25vw, 220px)',
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

  // Tick-tac loop when ≤10 s remain
  useEffect(() => {
    if (isLow && !ticLoopRef.current) {
      const audio = createLoopSound('/sounds/game/tic_tac.mp3');
      ticLoopRef.current = audio;
      void audio?.play();
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

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-3">
        <Timer size={32} strokeWidth={1.5} style={{ color: p.muted }} />
        <p className="text-2xl font-semibold tracking-widest uppercase" style={{ color: p.muted }}>
          {t('discussionTitle')}
        </p>
      </div>
      <span
        className="font-black tabular-nums transition-colors duration-300"
        style={{
          fontSize: 'clamp(96px, 18vw, 220px)',
          lineHeight: 1,
          color: isDone ? p.red : isLow ? p.infiltrator : p.white,
        }}
      >
        {formatTime(remaining)}
      </span>
      {isDone && (
        <p
          className="text-3xl font-bold tracking-widest uppercase animate-pulse"
          style={{ color: p.red }}
        >
          {t('timeUp')}
        </p>
      )}
    </div>
  );
}

function VotingPhase({ t, p }: { t: ReturnType<typeof useTranslations>; p: Palette }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: p.amber, borderTopColor: 'transparent' }}
        />
        <Ghost
          size={48}
          className="absolute inset-0 m-auto"
          strokeWidth={1.5}
          style={{ color: p.amber }}
        />
      </div>
      <p className="text-5xl font-black tracking-tight" style={{ color: p.white }}>{t('votingTitle')}</p>
      <p className="text-xl text-center max-w-md" style={{ color: p.muted }}>{t('votingDesc')}</p>
    </div>
  );
}

function ResultsPhase({ room, t, p }: { room: TvRoom; t: ReturnType<typeof useTranslations>; p: Palette }) {
  const results = room.results;
  const prevRevealedRef = useRef(false);

  // Play result sound when revealed transitions false → true
  useEffect(() => {
    if (!results) return;
    if (results.revealed && !prevRevealedRef.current) {
      if (results.caught) {
        // Innocents win (infiltrator caught)
        playSound('/sounds/game/win_sound.mp3');
      } else if (results.eliminatedPlayerName) {
        // Infiltrator wins
        playSound('/sounds/game/loss_sound_1.mp3');
      }
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
              style={{ backgroundColor: p.muted, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full reveal
  const isCaught = results.caught;
  const isTie = !results.eliminatedPlayerName;
  const outcomeColor = isTie ? p.muted : isCaught ? p.green : p.infiltrator;
  const outcomeText = isTie
    ? t('tie')
    : isCaught
      ? t('innocentsWin')
      : t('infiltratorWins');

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      {/* Outcome headline */}
      <div className="flex flex-col items-center gap-4">
        {isCaught && <Trophy size={72} strokeWidth={1.5} style={{ color: p.green }} />}
        {!isCaught && !isTie && <Ghost size={72} strokeWidth={1.5} style={{ color: p.infiltrator }} />}
        <p className="text-6xl font-black text-center leading-tight" style={{ color: outcomeColor }}>
          {outcomeText}
        </p>
      </div>

      {/* Divider */}
      <div className="w-32 h-px" style={{ backgroundColor: p.cardBorder }} />

      {/* Eliminated player */}
      {results.eliminatedPlayerName && (
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-4"
            style={{ borderColor: isCaught ? p.infiltrator : p.muted }}
          >
            <Image
              src={avatarUrl(results.eliminatedAvatarId)}
              alt={results.eliminatedPlayerName}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-3xl font-bold" style={{ color: p.white }}>{results.eliminatedPlayerName}</p>
          <p className="text-2xl font-semibold" style={{ color: isCaught ? p.infiltrator : p.muted }}>
            {isCaught ? t('wasInfiltrator') : t('wasInnocent')}
          </p>
        </div>
      )}

      {/* Secret word */}
      {results.word && (
        <div
          className="flex flex-col items-center gap-2 mt-4 p-6 rounded-2xl w-full border"
          style={{ borderColor: p.cardBorder, backgroundColor: p.card }}
        >
          <p className="text-lg uppercase tracking-widest" style={{ color: p.muted }}>{t('resultsWord')}</p>
          <p className="text-5xl font-black tracking-wide" style={{ color: p.word }}>{results.word}</p>
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
  const roomRefRef = useRef<DatabaseReference | null>(null);

  const p = getPalette(room?.theme);

  const disconnect = useCallback(() => {
    if (roomRefRef.current) {
      off(roomRefRef.current);
      roomRefRef.current = null;
    }
    setRoom(null);
    setConnectionState('idle');
  }, []);

  // Clean up on unmount
  useEffect(() => () => { disconnect(); }, [disconnect]);

  const handleConnect = useCallback(async () => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) return;

    setConnectionState('connecting');
    disconnect();

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

      // Step 2: subscribe to real-time updates
      const directRef = ref(db, `tvRooms/${hostUid}`);
      roomRefRef.current = directRef;

      onValue(directRef, (snap) => {
        if (!snap.exists()) {
          setRoom(null);
          setConnectionState('notFound');
          return;
        }
        setRoom(snap.val() as TvRoom);
        setConnectionState('connected');
      }, () => {
        setConnectionState('error');
      });

    } catch {
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
        <div className="flex flex-col items-center gap-4">
          <Tv size={64} strokeWidth={1.5} style={{ color: ep.amber }} />
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
        </div>
      </div>
    );
  }

  // ── Connected: phase view ──────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 ${poppins.className}`}
      style={{ backgroundColor: p.bg }}
    >
      {room.phase === 'setup'      && <SetupPhase t={t} p={p} />}
      {room.phase === 'reveal'     && <RevealPhase room={room} t={t} p={p} />}
      {room.phase === 'countdown'  && <CountdownPhase room={room} t={t} p={p} />}
      {room.phase === 'discussion' && <DiscussionPhase room={room} t={t} p={p} />}
      {room.phase === 'voting'     && <VotingPhase t={t} p={p} />}
      {room.phase === 'results'    && <ResultsPhase room={room} t={t} p={p} />}
    </div>
  );
}
