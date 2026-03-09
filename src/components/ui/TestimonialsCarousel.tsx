'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Star } from 'lucide-react';
import CarouselControls from '@/components/ui/CarouselControls';

interface Review {
  name: string;
  text: string;
}

const GAP = 16;
const DRAG_THRESHOLD = 50; // px to trigger slide change

export default function TestimonialsCarousel({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hovered || userPaused;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [trackOffset, setTrackOffset] = useState(0);

  // Drag state
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const calcOffset = useCallback((idx: number) => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;
    const center = container.offsetWidth / 2;
    const cardWidth = card.offsetWidth;
    setTrackOffset(center - idx * (cardWidth + GAP) - cardWidth / 2);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => calcOffset(current));
    return () => cancelAnimationFrame(id);
  }, [current, calcOffset]);

  useEffect(() => {
    const onResize = () => calcOffset(current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [current, calcOffset]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), [reviews.length]);
  const goTo = (i: number) => setCurrent(i);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  // Touch/pen-only swipe handlers (excludes mouse)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    isDragging.current = false;
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' || dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragDelta.current = delta;
    if (Math.abs(delta) > 5) isDragging.current = true;
    setDragOffset(delta);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' || dragStartX.current === null) return;
    const delta = dragDelta.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      if (delta < 0) {
        setCurrent((c) => (c + 1) % reviews.length);
      } else {
        setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
      }
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    setDragOffset(0);
    setTimeout(() => { isDragging.current = false; }, 0);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Track — overflow hidden + gradient fade on edges */}
      <div ref={containerRef} className="relative overflow-hidden">
        {/* Left fade — hidden on mobile where card fills the viewport */}
        <div className="hidden sm:block absolute left-0 inset-y-0 w-[18%] bg-linear-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="hidden sm:block absolute right-0 inset-y-0 w-[18%] bg-linear-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div
          className="flex py-6 select-none"
          style={{
            transform: `translateX(${trackOffset + dragOffset}px)`,
            gap: `${GAP}px`,
            transition: dragOffset !== 0 ? 'none' : 'transform 500ms ease-in-out',
            touchAction: 'pan-y',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={i === 0 ? cardRef : undefined}
              className="shrink-0 w-[85vw] max-w-125 transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0.35 }}
              onClick={() => goTo(i)}
            >
              <div className="flex flex-col gap-3 p-7 rounded-2xl bg-zinc-800/50 border border-zinc-700/60 h-52 overflow-hidden pointer-events-none">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-base text-zinc-300 leading-relaxed line-clamp-3 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-sm font-semibold text-zinc-500 mt-auto">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselControls
        count={reviews.length}
        current={current}
        paused={userPaused}
        onGoTo={goTo}
        onTogglePause={() => setUserPaused((p) => !p)}
        theme="dark"
        className="mt-4"
      />
    </div>
  );
}
