'use client';

import { useEffect, useRef, useState } from 'react';
import { ENABLE_SCROLL_ANIMATIONS } from '@/config/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (ms) — useful for staggered children */
  delay?: number;
  /** Animation direction */
  from?: 'bottom' | 'left' | 'right' | 'none';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  from = 'bottom',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!ENABLE_SCROLL_ANIMATIONS);

  useEffect(() => {
    if (!ENABLE_SCROLL_ANIMATIONS) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  if (!ENABLE_SCROLL_ANIMATIONS) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    from === 'bottom' ? 'opacity-0 translate-y-10' :
    from === 'left'   ? 'opacity-0 -translate-x-10' :
    from === 'right'  ? 'opacity-0 translate-x-10' :
    'opacity-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-x-0 translate-y-0' : initial
      } ${className}`}
    >
      {children}
    </div>
  );
}
