'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  en: 'EN',
  es: 'ES',
  pt: 'PT',
  fr: 'FR',
  it: 'IT',
  de: 'DE',
  tr: 'TR',
  ja: 'JA',
  ar: 'AR',
  ko: 'KO',
  pl: 'PL',
  nl: 'NL',
  ru: 'RU',
  id: 'ID',
  vi: 'VI',
  th: 'TH',
};

const localeFlags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
  fr: '🇫🇷',
  it: '🇮🇹',
  de: '🇩🇪',
  tr: '🇹🇷',
  ja: '🇯🇵',
  ar: '🇸🇦',
  ko: '🇰🇷',
  pl: '🇵🇱',
  nl: '🇳🇱',
  ru: '🇷🇺',
  id: '🇮🇩',
  vi: '🇻🇳',
  th: '🇹🇭',
};

export default function LocaleSwitcher({ align = 'right' }: { align?: 'left' | 'right' }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Select language"
      >
        <span>{localeFlags[locale]}</span>
        <span className="font-medium">{localeLabels[locale]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} mt-1 w-[min(14rem,calc(100vw-2rem))] max-h-80 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-50 p-1 grid grid-cols-2 gap-0.5`}
        >
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                l === locale ? 'text-violet-600 dark:text-violet-400 font-medium' : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeLabels[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
