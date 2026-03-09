import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AboutCardsGrid from '@/components/sections/AboutCardsGrid';

export default async function AboutSection() {
  const t = await getTranslations('about');

  const cards = [
    {
      icon: 'Smile' as const,
      iconColor: 'text-emerald-500',
      accentColor: 'text-emerald-500',
      before: t('v1before'),
      accent: t('v1accent'),
      after: t('v1after'),
      modalTitle: t('v1modalTitle'),
      modalBody: t('v1modalBody'),
    },
    {
      icon: 'Zap' as const,
      iconColor: 'text-violet-400',
      accentColor: 'text-violet-400',
      before: t('v2before'),
      accent: t('v2accent'),
      after: t('v2after'),
      modalTitle: t('v2modalTitle'),
      modalBody: t('v2modalBody'),
    },
    {
      icon: 'Users' as const,
      iconColor: 'text-orange-400',
      accentColor: 'text-orange-400',
      before: t('v3before'),
      accent: t('v3accent'),
      after: t('v3after'),
      modalTitle: t('v3modalTitle'),
      modalBody: t('v3modalBody'),
    },
  ];

  return (
    <section id="about" className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6 py-20 md:py-28">

        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
              {t('label')}
            </span>
          </div>

          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 max-w-2xl mx-auto leading-tight">
            {t('title')}
          </h2>

          <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-16 leading-relaxed">
            {t('body')}
          </p>
        </ScrollReveal>

        <AboutCardsGrid cards={cards} />

      </div>
    </section>
  );
}
