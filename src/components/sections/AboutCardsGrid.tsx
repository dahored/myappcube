'use client';

import { useState } from 'react';
import { Plus, X, Smile, Gamepad2, Users } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const iconMap = { Smile, Gamepad2, Users } as const;
type IconName = keyof typeof iconMap;

export interface AboutCardData {
  icon: IconName;
  iconColor: string;
  accentColor: string;
  before: string;
  accent: string;
  after: string;
  modalTitle: string;
  modalBody: string;
}

export default function AboutCardsGrid({ cards }: { cards: AboutCardData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? cards[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {cards.map(({ icon, iconColor, accentColor, before, accent, after, modalTitle, modalBody }, i) => {
          const Icon = iconMap[icon];
          return (
          <ScrollReveal key={i} delay={i * 100} className="h-full">
            <div className="h-full flex flex-col p-7 pt-9 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 gap-6">
              <Icon className={`w-10 h-10 ${iconColor}`} />

              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 leading-snug flex-1">
                {before}
                <span className={accentColor}>{accent}</span>
                {after}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setOpenIndex(i)}
                  className="w-11 h-11 rounded-full bg-zinc-900 dark:bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
                  aria-label={modalTitle}
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </ScrollReveal>
          );
        })}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="modal-card relative bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-zinc-200/60 dark:border-zinc-700/60"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 pr-8">
              {active.modalTitle}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {active.modalBody}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
