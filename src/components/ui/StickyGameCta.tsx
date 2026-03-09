'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface StickyGameCtaProps {
  href: string;
  label: string;
  sectionId: string;
}

export default function StickyGameCta({ href, label, sectionId }: StickyGameCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const check = () => {
      const rect = section.getBoundingClientRect();
      // Show only after scrolling INTO the section (top above viewport) until section ends
      setVisible(rect.top < -60 && rect.bottom > window.innerHeight * 0.4);
    };

    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [sectionId]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Link
        href={href}
        className="flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-zinc-900/90 dark:bg-zinc-100/90 backdrop-blur-md border border-white/10 dark:border-zinc-900/10 shadow-xl shadow-black/20"
      >
        <span className="text-sm font-semibold text-white dark:text-zinc-900 whitespace-nowrap">
          {label}
        </span>
        <span className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
          <ArrowRight className="w-4 h-4 text-white" />
        </span>
      </Link>
    </div>
  );
}
