import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Users, PartyPopper, Star, Download } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { games, formatDownloads } from '@/config/games';

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

          {/* Row 2: rating (conditional) + download CTA */}
          <ScrollReveal delay={100} className="flex flex-col sm:flex-row gap-3">

            {/* Card 4 — rating: only shown if at least one platform has a rating */}
            {(game.ratings?.ios || game.ratings?.android) && (
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800/60 p-6 flex items-center justify-around gap-4 flex-1 min-h-[180px]">
                {game.ratings?.ios && (
                  <div className="flex flex-col items-center gap-1.5">
                    <Image src="/images/stores/apple_store.png" alt="App Store" width={28} height={28} className="w-7 h-7" />
                    <p className="text-4xl font-bold text-white leading-none mt-1">{game.ratings.ios.toFixed(1)}</p>
                    <div className="relative flex gap-0.5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 text-zinc-700" />)}
                      </div>
                      <div className="absolute inset-0 flex gap-0.5 overflow-hidden" style={{ width: `${(game.ratings.ios / 5) * 100}%` }}>
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400 shrink-0" />)}
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">App Store</p>
                  </div>
                )}
                {game.ratings?.ios && game.ratings?.android && (
                  <div className="w-px h-14 bg-zinc-700/60 shrink-0" />
                )}
                {game.ratings?.android && (
                  <div className="flex flex-col items-center gap-1.5">
                    <Image src="/images/stores/google_play.png" alt="Google Play" width={28} height={28} className="w-7 h-7" />
                    <p className="text-4xl font-bold text-white leading-none mt-1">{game.ratings.android.toFixed(1)}</p>
                    <div className="relative flex gap-0.5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 text-zinc-700" />)}
                      </div>
                      <div className="absolute inset-0 flex gap-0.5 overflow-hidden" style={{ width: `${(game.ratings.android / 5) * 100}%` }}>
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400 shrink-0" />)}
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Google Play</p>
                  </div>
                )}
              </div>
            )}

            {/* Card 5 — download CTA: only shown if at least one store URL exists */}
            {(game.storeUrl?.android || game.storeUrl?.ios) && (
              <div className="rounded-2xl bg-violet-600/10 border border-violet-500/20 p-7 flex flex-col sm:flex-row items-center gap-5 flex-[2] min-h-[180px]">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-white text-xl mb-1">{t('c5title')}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t('c5desc')}</p>
                  {formatDownloads(game.downloads) && (
                    <div className="flex items-center gap-1.5 mt-8 sm:justify-start justify-center">
                      <Download className="w-4 h-4 text-violet-400 shrink-0" />
                      <span className="text-sm font-bold text-white">{formatDownloads(game.downloads)}</span>
                      <span className="text-sm font-normal text-white">{t('c5downloads')}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  {game.storeUrl?.ios && (
                    <a
                      href={game.storeUrl.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors w-full"
                    >
                      <Image
                        src="/images/stores/apple_store.png"
                        alt="App Store"
                        width={32}
                        height={32}
                        className="shrink-0 w-8 h-8"
                      />
                      <div className="text-left leading-tight">
                        <p className="text-zinc-400 text-[10px] font-medium">{t('c5badge')}</p>
                        <p className="text-white text-base font-semibold tracking-tight">App Store</p>
                      </div>
                    </a>
                  )}
                  {game.storeUrl?.android && (
                    <a
                      href={game.storeUrl.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors w-full"
                    >
                      <Image
                        src="/images/stores/google_play.png"
                        alt="Google Play"
                        width={32}
                        height={32}
                        className="shrink-0 w-8 h-8"
                      />
                      <div className="text-left leading-tight">
                        <p className="text-zinc-400 text-[10px] font-medium">{t('c5badge')}</p>
                        <p className="text-white text-base font-semibold tracking-tight">Google Play</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
