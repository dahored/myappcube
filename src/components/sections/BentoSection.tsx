import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Users, PartyPopper, Star } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { games } from '@/config/games';

export default async function BentoSection() {
  const t = await getTranslations('bento');
  const game = games[0];

  return (
    <section className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="container mx-auto px-6 py-20 md:py-28">

        <ScrollReveal>
          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-center text-zinc-500 mb-14">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="flex flex-col gap-3 max-w-6xl mx-auto">

          {/* Row 1: big image card + 2 stacked cards */}
          <ScrollReveal className="flex flex-col lg:flex-row gap-3">

            {/* Card 1 — large image */}
            <div className="relative overflow-hidden rounded-2xl flex-[2] min-h-[400px] lg:min-h-[460px]">
              <Image src={game.banner} alt={game.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-2">
                  {t('c1label')}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug max-w-xs">
                  {t('c1title')}
                </h3>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3 flex-1">

              {/* Card 2 — no app needed */}
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800/60 p-6 pt-9 flex flex-col justify-between flex-1 min-h-[200px]">
                <Users className="w-10 h-10 text-violet-400" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{t('c2title')}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{t('c2desc')}</p>
                </div>
              </div>

              {/* Card 3 — every round unique */}
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 pt-9 flex flex-col justify-between flex-1 min-h-[200px]">
                <PartyPopper className="w-10 h-10 text-orange-400" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{t('c3title')}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{t('c3desc')}</p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Row 2: rating + download CTA */}
          <ScrollReveal delay={100} className="flex flex-col sm:flex-row gap-3">

            {/* Card 4 — rating */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800/60 p-6 flex flex-col items-center justify-center text-center gap-2 flex-1 min-h-[180px]">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-5xl font-bold text-white leading-none">4.8</p>
              <p className="text-sm text-zinc-500">{t('c4desc')}</p>
            </div>

            {/* Card 5 — download CTA */}
            <div className="rounded-2xl bg-violet-600/10 border border-violet-500/20 p-7 flex flex-col sm:flex-row items-center gap-5 flex-[2] min-h-[180px]">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-white text-xl mb-1">{t('c5title')}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{t('c5desc')}</p>
              </div>
              {game.storeUrl?.android && (
                <a
                  href={game.storeUrl.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors shrink-0"
                >
                  <Image
                    src="/images/stores/google_play.png"
                    alt="Google Play"
                    width={32}
                    height={32}
                    className="shrink-0"
                  />
                  <div className="text-left leading-tight">
                    <p className="text-zinc-400 text-[10px] font-medium">{t('c5badge')}</p>
                    <p className="text-white text-base font-semibold tracking-tight">Google Play</p>
                  </div>
                </a>
              )}
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
