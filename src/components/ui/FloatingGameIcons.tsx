'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface FloatingIcon {
  rotate: string;
  scale: string;
  size: number;
  speed: number;
  logo: string;
  name: string;
}

interface FloatingGameIconsProps {
  icons: FloatingIcon[];
}

// Random float between min and max
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Zones spread across the full section — avoid the center text column (~30-70% x)
const zones = [
  { side: 'left',  xMin: 1,  xMax: 28, yMin: 5,  yMax: 28 },
  { side: 'left',  xMin: 1,  xMax: 24, yMin: 35, yMax: 62 },
  { side: 'left',  xMin: 1,  xMax: 28, yMin: 68, yMax: 88 },
  { side: 'right', xMin: 1,  xMax: 28, yMin: 5,  yMax: 28 },
  { side: 'right', xMin: 1,  xMax: 24, yMin: 35, yMax: 62 },
  { side: 'right', xMin: 1,  xMax: 28, yMin: 68, yMax: 88 },
];

interface Pos { left?: string; right?: string; top: string }

export default function FloatingGameIcons({ icons }: FloatingGameIconsProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<Pos[] | null>(null);

  // Generate random positions after mount (avoids hydration mismatch)
  useEffect(() => {
    setPositions(
      icons.map((_, i) => {
        const zone = zones[i % zones.length];
        const x = rand(zone.xMin, zone.xMax);
        const y = rand(zone.yMin, zone.yMax);
        return zone.side === 'left'
          ? { left: `${x}%`, top: `${y}%` }
          : { right: `${x}%`, top: `${y}%` };
      })
    );
  }, [icons]);

  // Parallax on scroll
  useEffect(() => {
    let raf: number;

    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        refs.current.forEach((el, i) => {
          if (!el) return;
          el.style.transform = `translateY(${y * icons[i].speed}px)`;
        });
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [icons]);

  if (!positions) return null;

  return (
    <>
      {icons.map((icon, i) => (
        <div
          key={i}
          className={`absolute ${icon.rotate} ${icon.scale} hidden lg:block opacity-60 pointer-events-none will-change-transform`}
          style={positions[i]}
          ref={el => { refs.current[i] = el; }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={icon.logo}
              alt={icon.name}
              width={icon.size}
              height={icon.size}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </>
  );
}
