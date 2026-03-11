'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Tv, Loader2, Ghost, Trophy, Timer } from 'lucide-react';
import { db } from '@/lib/firebase';
import { ref, query, orderByChild, equalTo, get, onValue, off, type DatabaseReference } from 'firebase/database';

// ─── Types (mirror of TvRoom entity in mobile app) ────────────────────────────

type TvRoomPhase = 'setup' | 'reveal' | 'countdown' | 'discussion' | 'voting' | 'results';

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
  phase: TvRoomPhase;
  players: TvRoomPlayer[];
  countdownDuration: number;
  discussionDuration: number;
  discussionStartedAt: number | null;
  results: TvRoomResults | null;
  updatedAt: number;
}

type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'notFound';

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

// ─── Phase components ─────────────────────────────────────────────────────────

function SetupPhase({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <Tv size={72} className="text-gray-600" strokeWidth={1} />
      <p className="text-4xl font-bold text-gray-400 tracking-widest">{t('setup')}</p>
      <div className="flex gap-3">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function RevealPhase({ room, t }: { room: TvRoom; t: ReturnType<typeof useTranslations> }) {
  const players = room.players ?? [];
  const allReady = players.length > 0 && players.every(p => p.revealed);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-400 tracking-widest uppercase">{t('revealTitle')}</p>
        <p className="text-lg text-gray-600 mt-2">
          {allReady ? t('revealReady') : t('revealWaiting')}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full sm:grid-cols-4 lg:grid-cols-5">
        {players.map((player, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
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
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </div>
            <span className="text-white font-semibold text-sm text-center leading-tight">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountdownPhase({ room, t }: { room: TvRoom; t: ReturnType<typeof useTranslations> }) {
  const totalSec = Math.round(room.countdownDuration / 1000);
  const [count, setCount] = useState<number | 'now'>(totalSec);
  const [key, setKey] = useState(0); // for re-triggering animation

  useEffect(() => {
    setCount(totalSec);
    setKey(k => k + 1);
    let current = totalSec;

    const interval = setInterval(() => {
      current -= 1;
      if (current <= 0) {
        setCount('now');
        setKey(k => k + 1);
        clearInterval(interval);
      } else {
        setCount(current);
        setKey(k => k + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.updatedAt]);

  const isNow = count === 'now';

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-3xl font-semibold text-gray-400 tracking-widest uppercase">{t('countdown')}</p>
      <div
        key={key}
        className="animate-[countPop_0.3s_ease-out]"
        style={{ '--tw-scale-x': '1', '--tw-scale-y': '1' } as React.CSSProperties}
      >
        <span
          className={`font-black text-[200px] leading-none tabular-nums ${isNow ? 'text-green-400' : 'text-amber-400'}`}
          style={{ lineHeight: 1 }}
        >
          {isNow ? t('now') : count}
        </span>
      </div>
    </div>
  );
}

function DiscussionPhase({ room, t }: { room: TvRoom; t: ReturnType<typeof useTranslations> }) {
  const calcRemaining = useCallback(() => {
    if (!room.discussionStartedAt) return room.discussionDuration;
    return room.discussionDuration - (Date.now() - room.discussionStartedAt);
  }, [room.discussionDuration, room.discussionStartedAt]);

  const [remaining, setRemaining] = useState(calcRemaining);
  const isDone = remaining <= 0;
  const isLow = remaining > 0 && remaining <= 30_000;

  useEffect(() => {
    setRemaining(calcRemaining());
    const interval = setInterval(() => {
      setRemaining(calcRemaining());
    }, 500);
    return () => clearInterval(interval);
  }, [calcRemaining]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-3">
        <Timer size={32} className="text-gray-500" strokeWidth={1.5} />
        <p className="text-2xl font-semibold text-gray-400 tracking-widest uppercase">{t('discussionTitle')}</p>
      </div>
      <span
        className={`font-black tabular-nums transition-colors duration-300 ${
          isDone ? 'text-red-500' : isLow ? 'text-red-400' : 'text-white'
        }`}
        style={{ fontSize: 'clamp(96px, 18vw, 220px)', lineHeight: 1 }}
      >
        {formatTime(remaining)}
      </span>
      {isDone && (
        <p className="text-3xl font-bold text-red-500 tracking-widest uppercase animate-pulse">
          {t('timeUp')}
        </p>
      )}
    </div>
  );
}

function VotingPhase({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
        <Ghost
          size={48}
          className="absolute inset-0 m-auto text-amber-400"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-5xl font-black text-white tracking-tight">{t('votingTitle')}</p>
      <p className="text-xl text-gray-400 text-center max-w-md">{t('votingDesc')}</p>
    </div>
  );
}

function ResultsPhase({ room, t }: { room: TvRoom; t: ReturnType<typeof useTranslations> }) {
  const results = room.results;
  if (!results) return null;

  if (!results.revealed) {
    return (
      <div className="flex flex-col items-center gap-10">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700 animate-pulse">
          {results.eliminatedAvatarId ? (
            <Image
              src={avatarUrl(results.eliminatedAvatarId)}
              alt="?"
              fill
              className="object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-9xl font-black text-white">?</span>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-400 tracking-widest">{t('resultsRevealing')}</p>
        <div className="flex gap-3">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full reveal
  const isCaught = results.caught;
  const isTie = !results.eliminatedPlayerName;
  const outcomeColor = isTie ? 'text-gray-400' : isCaught ? 'text-green-400' : 'text-red-500';
  const outcomeText = isTie
    ? t('tie')
    : isCaught
      ? t('innocentsWin')
      : t('infiltratorWins');

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      {/* Outcome headline */}
      <div className="flex flex-col items-center gap-4">
        {isCaught && <Trophy size={72} className="text-green-400" strokeWidth={1.5} />}
        {!isCaught && !isTie && <Ghost size={72} className="text-red-500" strokeWidth={1.5} />}
        <p className={`text-6xl font-black text-center leading-tight ${outcomeColor}`}>
          {outcomeText}
        </p>
      </div>

      {/* Divider */}
      <div className="w-32 h-px bg-gray-700" />

      {/* Eliminated player */}
      {results.eliminatedPlayerName && (
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-4"
            style={{ borderColor: isCaught ? '#22c55e' : '#6b7280' }}
          >
            <Image
              src={avatarUrl(results.eliminatedAvatarId)}
              alt={results.eliminatedPlayerName}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-3xl font-bold text-white">{results.eliminatedPlayerName}</p>
          <p className={`text-2xl font-semibold ${isCaught ? 'text-red-400' : 'text-gray-400'}`}>
            {isCaught ? t('wasInfiltrator') : t('wasInnocent')}
          </p>
        </div>
      )}

      {/* Secret word */}
      {results.word && (
        <div className="flex flex-col items-center gap-2 mt-4 p-6 rounded-2xl border border-gray-700 bg-gray-900/50 w-full">
          <p className="text-lg text-gray-500 uppercase tracking-widest">{t('resultsWord')}</p>
          <p className="text-5xl font-black text-amber-400 tracking-wide">{results.word}</p>
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
    return (
      <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center gap-10 p-8">
        <div className="flex flex-col items-center gap-4">
          <Tv size={64} className="text-amber-400" strokeWidth={1.5} />
          <h1 className="text-4xl font-black text-white tracking-tight text-center">
            {t('title')}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <p className="text-gray-400 text-lg text-center">{t('enterCode')}</p>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase().slice(0, 6))}
            onKeyDown={e => e.key === 'Enter' && handleConnect()}
            placeholder={t('codePlaceholder')}
            className="w-full text-center text-4xl font-black tracking-[0.3em] bg-gray-900 border-2 border-gray-700 rounded-2xl px-6 py-5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-400 transition-colors uppercase"
            maxLength={6}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />

          <button
            onClick={handleConnect}
            disabled={connectionState === 'connecting' || code.trim().length < 4}
            className="w-full h-16 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl font-black text-xl text-black transition-colors flex items-center justify-center gap-3"
          >
            {connectionState === 'connecting' ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                {t('connecting')}
              </>
            ) : t('connect')}
          </button>

          {connectionState === 'notFound' && (
            <p className="text-red-400 text-center font-semibold">{t('notFound')}</p>
          )}
          {connectionState === 'error' && (
            <p className="text-red-400 text-center font-semibold">{t('connectionError')}</p>
          )}
        </div>
      </div>
    );
  }

  // ── Connected: phase view ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center p-8">
      {room.phase === 'setup' && <SetupPhase t={t} />}
      {room.phase === 'reveal' && <RevealPhase room={room} t={t} />}
      {room.phase === 'countdown' && <CountdownPhase room={room} t={t} />}
      {room.phase === 'discussion' && <DiscussionPhase room={room} t={t} />}
      {room.phase === 'voting' && <VotingPhase t={t} />}
      {room.phase === 'results' && <ResultsPhase room={room} t={t} />}
    </div>
  );
}
