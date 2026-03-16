import { getTranslations } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { games } from '@/config/games';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GamesCarousel from '@/components/ui/GamesCarousel';

export default async function GamesSection() {
  const t = await getTranslations('gamesSection');
  const tCommon = await getTranslations('common');

  const slides = games.map((game) => ({
    slug: game.slug,
    name: game.name,
    genre: game.genre,
    banner: game.banner,
    logo: game.logo,
    comingSoon: game.comingSoon ?? false,
    exploreLabel: t('explore'),
    comingSoonLabel: tCommon('comingSoon'),
    comingSoonTitle: tCommon('comingSoonTitle'),
  }));

  return (
    <section id="all-games" className="relative border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      {/* Sticky CTA */}
      <div className="absolute flex items-end justify-center top-0 left-0 right-0 h-full">
        <div className="sticky bottom-6 z-40 flex items-end justify-center pointer-events-none mb-28 mt-8">
          <ScrollReveal delay={0} repeat>
            <Link
              href="/#all-games"
              className="pointer-events-auto flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-zinc-200/80 dark:bg-white/10 dark:border dark:border-white/15 backdrop-blur-md"
            >
              <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                {t('exploreAll')}
              </span>
              <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <div className="py-20 pb-48 md:py-28 md:pb-48">

        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400">
              {t('label')}
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            {t('title')}
          </h2>
          <p className="text-center text-zinc-500 mb-12">{t('subtitle')}</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GamesCarousel games={slides} />
        </ScrollReveal>

      </div>
    </section>
  );
}
