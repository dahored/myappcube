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
  /** Re-animate every time the element enters the viewport */
  repeat?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  from = 'bottom',
  repeat = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!ENABLE_SCROLL_ANIMATIONS);

  useEffect(() => {
    if (!ENABLE_SCROLL_ANIMATIONS) return;

    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), delay);
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          clearTimeout(timer);
          setVisible(false);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [delay, repeat]);

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
