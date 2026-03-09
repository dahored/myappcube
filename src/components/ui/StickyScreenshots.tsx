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
      <div className="sticky top-0 h-screen w-full bg-zinc-950 flex flex-col items-center justify-center gap-8 px-6">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-3">{label}</p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-50">{title}</h2>
        </div>

        {/*
          Phone mockup:
          - outer div sets size + clips to phone shape
          - images are stacked and crossfade
          - SVG frame sits on top as overlay
        */}
        <div
          className="relative w-80 sm:w-96"
          style={{ aspectRatio: '390/844', borderRadius: '12.31% / 5.69%', overflow: 'hidden' }}
        >
          {/* Stacked screenshots — only current is visible */}
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
                sizes="(max-width: 640px) 288px, 320px"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Phone frame SVG — always on top */}
          <svg
            viewBox="0 0 390 844"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48 0 H342 Q390 0 390 48 V796 Q390 844 342 844 H48 Q0 844 0 796 V48 Q0 0 48 0 Z M53 13 H337 Q377 13 377 53 V791 Q377 831 337 831 H53 Q13 831 13 791 V53 Q13 13 53 13 Z"
              fill="#18181b"
            />
            <rect x="0.5" y="0.5" width="389" height="843" rx="47.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="13.5" y="13.5" width="363" height="817" rx="39.5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <rect x="145" y="20" width="100" height="24" rx="12" fill="#09090b" />
            <rect x="387" y="192" width="3" height="56" rx="1.5" fill="#27272a" />
            <rect x="0" y="172" width="3" height="36" rx="1.5" fill="#27272a" />
            <rect x="0" y="220" width="3" height="56" rx="1.5" fill="#27272a" />
          </svg>
        </div>

        {/* Dot indicators */}
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
  );
}
