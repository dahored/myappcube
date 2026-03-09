import { getTranslations } from 'next-intl/server';
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
  }));

  return (
    <section id="all-games" className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      <div className="py-20 md:py-28">

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
