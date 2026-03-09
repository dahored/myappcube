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

interface Pos { left: string; top: string }

// Generate a random position avoiding the center text column (28–72% x)
function randomPos(): Pos {
  const isLeft = Math.random() > 0.5;
  const x = isLeft ? rand(1, 25) : rand(75, 97);
  const y = rand(4, 88);
  return { left: `${x}%`, top: `${y}%` };
}

// Minimum distance between icons to avoid heavy overlap
const MIN_DIST = 14;

function generatePositions(count: number): Pos[] {
  const positions: Pos[] = [];
  for (let i = 0; i < count; i++) {
    let candidate: Pos;
    let attempts = 0;
    do {
      candidate = randomPos();
      attempts++;
    } while (
      attempts < 30 &&
      positions.some((p) => {
        const dx = parseFloat(p.left) - parseFloat(candidate.left);
        const dy = parseFloat(p.top) - parseFloat(candidate.top);
        return Math.sqrt(dx * dx + dy * dy) < MIN_DIST;
      })
    );
    positions.push(candidate);
  }
  return positions;
}

export default function FloatingGameIcons({ icons }: FloatingGameIconsProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<Pos[] | null>(null);

  // Generate random positions after mount (avoids hydration mismatch)
  useEffect(() => {
    setPositions(generatePositions(icons.length));
  }, [icons.length]);

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
