/**
 * FeaturedGameSection — used for the FIRST game.
 * Centered layout, full-width showcase. Apple-style product hero.
 */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
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
      className="relative border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />

      <div className="container mx-auto px-6 py-24 md:py-36">

        <ScrollReveal delay={0}>
          {/* Chip */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-semibold tracking-widest uppercase">
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

          {/* "Learn more" pill — above the image */}
          {!game.comingSoon && (
            <div className="flex justify-center mb-14">
              <Link
                href={`/games/${game.slug}`}
                className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
              >
                {t('featuredCta')}
              </Link>
            </div>
          )}
        </ScrollReveal>

        {/* Banner image */}
        <ScrollReveal delay={150} from="bottom">
          <div className="relative mx-auto max-w-2xl">
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
    </section>
  );
}
