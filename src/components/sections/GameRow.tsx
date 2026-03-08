/**
 * GameRow — used for the 2nd, 3rd, etc. games.
 * Alternating left/right two-column layout. Apple product-row style.
 */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Game } from '@/config/games';

const accentChip: Record<string, string> = {
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
};

const accentBtn: Record<string, string> = {
  orange: 'bg-orange-500 hover:bg-orange-400 shadow-orange-900/30',
  violet: 'bg-violet-600 hover:bg-violet-500 shadow-violet-900/30',
  emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30',
};

const accentGlow: Record<string, string> = {
  orange: 'from-orange-500/20 to-orange-400/5',
  violet: 'from-violet-600/20 to-violet-400/5',
  emerald: 'from-emerald-500/20 to-emerald-400/5',
};

export default async function GameRow({
  game,
  index,
}: {
  game: Game;
  index: number;
}) {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tGame = await getTranslations('games');

  const description = tGame.has(`${game.slug}.description`)
    ? tGame(`${game.slug}.description` as never)
    : game.description;

  const isEven = index % 2 === 0;
  const chip = accentChip[game.accent] ?? accentChip.violet;
  const btn = accentBtn[game.accent] ?? accentBtn.violet;
  const glow = accentGlow[game.accent] ?? accentGlow.violet;

  return (
    <section className="border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div
          className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
        >
          {/* Text side */}
          <ScrollReveal from={isEven ? 'left' : 'right'} className="flex-1 text-center lg:text-left">
            {/* Chip */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase mb-6 ${chip}`}
            >
              {game.comingSoon ? tCommon('comingSoon') : t('featuredLabel')}
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
              {game.name}
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Tags */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                {game.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                {game.platform}
              </span>
            </div>

            {/* CTAs */}
            {!game.comingSoon && (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href={`/games/${game.slug}`}
                  className={`px-7 py-3 rounded-full text-white text-sm font-semibold transition-colors shadow-lg ${btn}`}
                >
                  {t('featuredCta')}
                </Link>
              </div>
            )}
          </ScrollReveal>

          {/* Image side */}
          <ScrollReveal from={isEven ? 'right' : 'left'} delay={100} className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className={`absolute -inset-6 bg-linear-to-br ${glow} blur-3xl rounded-3xl`} />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/5 aspect-square">
                <Image
                  src={game.banner}
                  alt={game.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
