'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { faqKeys } from '@/config/faq';

interface FaqItem {
  q: string;
  a: string;
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-base font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
          {item.q}
        </span>
        <Plus
          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
            open ? 'rotate-45 text-violet-600 dark:text-violet-400' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
          }`}
        />
      </button>

      {/* Grid trick: animates height from 0 → auto */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const t = useTranslations('faq');

  const items: FaqItem[] = faqKeys.map(({ q, a }) => ({ q: t(q), a: t(a) }));

  return (
    <section className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2 text-center">
              {t('title')}
            </h2>
            <p className="text-zinc-500 text-center mb-12">{t('subtitle')}</p>
          </ScrollReveal>

          <div className="divide-y divide-zinc-300 dark:divide-zinc-700">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <FaqRow item={item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
