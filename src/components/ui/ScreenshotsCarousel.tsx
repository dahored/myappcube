'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PhoneMockup from '@/components/ui/PhoneMockup';
import CarouselControls from '@/components/ui/CarouselControls';

interface ScreenshotsCarouselProps {
  screenshots: { src: string; alt: string }[];
}

const DRAG_THRESHOLD = 40;

export default function ScreenshotsCarousel({ screenshots }: ScreenshotsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paused = userPaused || hovered;

  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length),
    [screenshots.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % screenshots.length),
    [screenshots.length]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [paused, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragDelta.current = delta;
    if (Math.abs(delta) > 5) isDragging.current = true;
  };

  const onPointerUp = () => {
    if (dragStartX.current === null) return;
    const delta = dragDelta.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    setTimeout(() => { isDragging.current = false; }, 0);
  };

  return (
    <div
      className="flex flex-col items-center gap-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Phone + side arrows */}
      <div className="flex items-center gap-6">
        <button
          onClick={prev}
          aria-label="Previous screenshot"
          className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-300" />
        </button>

        <div
          className="w-72 sm:w-80 select-none cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <PhoneMockup
            src={screenshots[current].src}
            alt={screenshots[current].alt}
            sizes="(max-width: 640px) 288px, 320px"
            priority={current === 0}
          />
        </div>

        <button
          onClick={next}
          aria-label="Next screenshot"
          className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-zinc-300" />
        </button>
      </div>

      <CarouselControls
        count={screenshots.length}
        current={current}
        paused={userPaused}
        onGoTo={setCurrent}
        onTogglePause={() => setUserPaused((p) => !p)}
        theme="dark"
      />
    </div>
  );
}
