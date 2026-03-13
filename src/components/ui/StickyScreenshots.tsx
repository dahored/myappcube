'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CarouselControls from '@/components/ui/CarouselControls';

interface StickyScreenshotsProps {
  screenshots: { src: string; alt: string }[];
  label: string;
  title: string;
}

export default function StickyScreenshots({ screenshots, label, title }: StickyScreenshotsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setCurrent(Math.min(screenshots.length - 1, Math.floor(progress * screenshots.length)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [screenshots.length]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      /* 60 vh per slide + 100 vh entry buffer */
      style={{ height: `${screenshots.length * 60 + 100}vh` }}
    >
      {/* Sticky panel — needs its own bg to cover content above */}
      <div className="sticky top-0 h-screen w-full bg-zinc-950 flex flex-col items-center justify-between px-6 py-8">

        {/* Header — anchored at top, always visible */}
        <div className="text-center shrink-0 pt-20 mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-3">{label}</p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-50">{title}</h2>
        </div>

        {/*
          Phone mockup — fills remaining height, width derives from aspect ratio.
          maxHeight caps it on very tall screens; maxWidth prevents overflow on narrow ones.
        */}
        <div className="flex-1 min-h-0 flex items-center justify-center w-full py-4">
          <div
            className="relative h-full"
            style={{ aspectRatio: '1 / 2.09', maxHeight: '68vh', maxWidth: '90vw' }}
          >
            {/* Phone body */}
            <div
              className="h-full"
              style={{
                background: '#18181b',
                borderRadius: '12.31% / 5.69%',
                padding: '3.33%',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* Screen area */}
              <div
                className="h-full"
                style={{ borderRadius: '10.99% / 4.89%', overflow: 'hidden', position: 'relative' }}
              >
                {screenshots.map((s, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      i === current ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 40vw, 30vh"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SVG overlay: dynamic island + side buttons */}
            <svg
              viewBox="0 0 390 844"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <rect x="13.5" y="13.5" width="363" height="817" rx="39.5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <rect x="145" y="20" width="100" height="24" rx="12" fill="#09090b" />
              <rect x="387" y="192" width="3" height="56" rx="1.5" fill="#27272a" />
              <rect x="0" y="172" width="3" height="36" rx="1.5" fill="#27272a" />
              <rect x="0" y="220" width="3" height="56" rx="1.5" fill="#27272a" />
            </svg>
          </div>
        </div>

        {/* Dot indicators — anchored at bottom, always visible */}
        <div className="shrink-0 pb-2">
          <CarouselControls
            count={screenshots.length}
            current={current}
            paused={false}
            onGoTo={() => {}}
            onTogglePause={() => {}}
            theme="dark"
            showPause={false}
          />
        </div>

      </div>
    </div>
  );
}
