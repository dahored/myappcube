import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { games } from '@/config/games';
import { studio } from '@/config/studio';
import FeaturedGameSection from '@/components/sections/FeaturedGameSection';
import GameRow from '@/components/sections/GameRow';
import ScrollReveal from '@/components/ui/ScrollReveal';

const base = studio.siteUrl;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  const title = isEs ? 'Apps y Juegos — myappcube' : 'Apps & Games — myappcube';
  const description = isEs
    ? 'Descubre todas las apps y juegos móviles de myappcube. Experiencias únicas para Android e iOS.'
    : 'Discover all apps and mobile games by myappcube. Unique experiences for Android and iOS.';

  return {
    title,
    description,
    openGraph: { title, description, images: ['/images/logos/logo_myappcube.png'] },
    alternates: {
      canonical: `${base}/${locale}/games`,
      languages: { en: `${base}/en/games`, es: `${base}/es/games` },
    },
  };
}

export default async function GamesPage() {
  const t = await getTranslations('gamesSection');

  const [featured, ...rest] = games;

  return (
    <>
      {/* Page header */}
      <section className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-6 block">
                {t('label')}
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
                {t('title')}
              </h1>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl">
                {t('subtitle')}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured game */}
      {featured && <FeaturedGameSection game={featured} />}

      {/* Rest of games */}
      {rest.map((game, i) => (
        <GameRow key={game.slug} game={game} index={i} />
      ))}
    </>
  );
}
