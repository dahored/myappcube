'use client';

import { useEffect } from 'react';
import { studio } from '@/config/studio';

const SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${studio.adsensePublisherId}`;

/**
 * Loads AdSense after hydration. Loading it from the SSR <head> lets auto ads
 * inject <script> tags before React hydrates, causing hydration mismatches.
 * Injected manually (not next/script) to avoid AdSense's "data-nscript" warning.
 * Site ownership is verified via the google-adsense-account meta tag + ads.txt.
 */
export default function AdSenseScript() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = SRC;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }, []);

  return null;
}
