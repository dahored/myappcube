'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { studio, adSlots, type AdSlot } from '@/config/studio';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  slot: AdSlot;
  className?: string;
}

/**
 * Responsive AdSense display unit.
 * Placed only between content sections — never next to download buttons,
 * navigation or forms, to avoid accidental clicks (AdSense policy).
 */
export default function AdUnit({ slot, className = '' }: AdUnitProps) {
  const t = useTranslations('common');
  const pushed = useRef(false);
  const slotId = adSlots[slot];

  useEffect(() => {
    if (!slotId || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle throws if the <ins> was already filled — safe to ignore
    }
  }, [slotId]);

  // No slot configured yet: render nothing in production, a placeholder in dev
  if (!slotId) {
    if (process.env.NODE_ENV !== 'development') return null;
    return (
      <div className={`container mx-auto px-6 py-8 ${className}`}>
        <div className="max-w-4xl mx-auto h-[120px] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-sm text-zinc-400">
          AdSense · {slot} (set adSlots.{slot} in config/studio.ts)
        </div>
      </div>
    );
  }

  return (
    <aside aria-label={t('advertisement')} className={`container mx-auto px-6 py-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 text-center mb-2">
          {t('advertisement')}
        </p>
        <ins
          className="adsbygoogle block min-h-[100px]"
          data-ad-client={studio.adsensePublisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
