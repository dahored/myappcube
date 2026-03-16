/**
 * FeaturedGameSection — used for the FIRST game.
 * Centered layout, full-width showcase. Apple-style product hero.
 */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';
import StoreBadges from '@/components/ui/StoreBadges';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Game } from '@/config/games';

const accentGlow: Record<string, string> = {
  orange: 'from-orange-500/20 via-orange-400/10 to-violet-600/20',
  violet: 'from-violet-600/20 via-violet-400/10 to-violet-600/20',
  emerald: 'from-emerald-500/20 via-emerald-400/10 to-violet-600/20',
};


export default async function FeaturedGameSection({ game }: { game: Game }) {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tGame = await getTranslations('games');

  const glow = accentGlow[game.accent] ?? accentGlow.violet;
  const description = tGame.has(`${game.slug}.description`)
    ? tGame(`${game.slug}.description` as never)
    : game.description;

  return (
    <section
      id="games"
      className="relative border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900"
    >
      {/*
        Sticky CTA — placed FIRST (before content) so that sticky-bottom works
        while scrolling DOWN through the section.
        h-0 + overflow-visible + items-end = zero layout height; the button
        hangs upward from the stuck point at bottom-6 of the viewport.
      */}
      {!game.comingSoon && (
        <div className='absolute flex items-end justify-center top-0 left-0 right-0 h-full'>
          <div className="sticky bottom-6 z-40 overflow-visible flex items-end justify-center pointer-events-none mb-28 mt-8">
            <ScrollReveal delay={0} repeat>
              <Link
                href={`/games/${game.slug}`}
                className="pointer-events-auto flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-zinc-200/80 dark:bg-white/10 dark:border dark:border-white/15 backdrop-blur-md"
              >
                <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                  {t('featuredCta')}
                </span>
                <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-5 h-5 text-white" />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* overflow-hidden on inner div only — keeps glow clipped without breaking sticky */}
      <div className="overflow-hidden">
        <div className="container mx-auto px-6 py-24 pb-48 md:py-44 md:pb-48">
          <div className="max-w-6xl mx-auto">

            <ScrollReveal delay={0}>
              {/* Chip */}
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400">
                  {game.comingSoon ? tCommon('comingSoon') : t('featuredLabel')}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-center text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                {game.name}
              </h2>

              {/* Description */}
              <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {description}
              </p>

              {/* Spacer below description */}
              <div className="mb-14" />
            </ScrollReveal>

            {/* Banner image */}
            <ScrollReveal delay={150} from="bottom">
              <div className="relative mx-auto max-w-lg">
                <div className={`absolute -inset-4 bg-linear-to-r ${glow} blur-2xl rounded-3xl`} />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/5">
                  <Image
                    src={game.banner}
                    alt={game.name}
                    width={800}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Store badges — below the image */}
            {!game.comingSoon && (game.storeUrl?.ios || game.storeUrl?.android) && (
              <ScrollReveal delay={250}>
                <StoreBadges
                  ios={game.storeUrl?.ios}
                  android={game.storeUrl?.android}
                  className="mt-10 mb-4"
                />
              </ScrollReveal>
            )}

            {/* Genre + platform tags */}
            <ScrollReveal delay={300}>
              <div className="flex items-center justify-center gap-3 mt-6">
                <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                  {game.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                  {game.platform}
                </span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}
