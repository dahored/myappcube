import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  ChevronRight,
  Users,
  Zap,
  Trophy,
  Hammer,
  Shield,
  Wind,
  Flame,
  Waves,
  Bomb,
  CircleDot,
} from 'lucide-react';
import { games } from '@/config/games';
import { studio } from '@/config/studio';
import { routing } from '@/i18n/routing';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ─── Static params ─────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── Metadata ──────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const game = games.find((g) => g.slug === 'disaster-tycoon')!;
  const tGame = await getTranslations({ locale, namespace: 'games.disaster-tycoon' as never });
  const description = (tGame as (k: string) => string)('description');

  return {
    title: game.name,
    description,
    keywords: ['disaster tycoon', 'roblox game', 'build and destroy', 'roblox disaster', 'myappcube', 'juego roblox', 'construye y destruye'],
    openGraph: {
      type: 'website',
      title: `${game.name} — myappcube`,
      description,
      images: [{ url: game.banner, width: 1920, height: 1080, alt: `${game.name} banner` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} — myappcube`,
      description,
      images: [game.banner],
    },
    alternates: {
      canonical: `${studio.siteUrl}/${locale}/games/disaster-tycoon`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `${studio.siteUrl}/${l}/games/disaster-tycoon`])),
        'x-default': `${studio.siteUrl}/es/games/disaster-tycoon`,
      },
    },
  };
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

const disasters = [
  { icon: CircleDot,  key: 'disasterMeteorite' as const, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { icon: Wind,       key: 'disasterTornado'   as const, color: 'text-sky-400',    bg: 'bg-sky-500/10 border-sky-500/20'       },
  { icon: Waves,      key: 'disasterEarthquake' as const, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20'   },
  { icon: Waves,      key: 'disasterTsunami'   as const, color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20'     },
  { icon: Flame,      key: 'disasterFireRain'  as const, color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20'       },
  { icon: CircleDot,  key: 'disasterBlackHole' as const, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  { icon: Bomb,       key: 'disasterNuke'      as const, color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20'   },
];

const defenses = [
  { icon: Hammer, key: 'defenseWalls'   as const, color: 'text-zinc-400'  },
  { icon: Shield, key: 'defenseBunkers' as const, color: 'text-blue-400'  },
  { icon: Shield, key: 'defenseShields' as const, color: 'text-cyan-400'  },
  { icon: Zap,    key: 'defenseTowers'  as const, color: 'text-amber-400' },
];


export default async function DisasterTycoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const game = games.find((g) => g.slug === 'disaster-tycoon')!;
  const tGame = await getTranslations({ locale, namespace: 'games.disaster-tycoon' as never });
  const tDetail = await getTranslations('gameDetail');
  const t = (key: string) => (tGame as (k: string) => string)(key);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: t('description'),
    genre: game.genre,
    gamePlatform: 'Roblox',
    numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 8 },
    image: `${studio.siteUrl}${game.banner}`,
    url: game.robloxUrl,
    author: { '@type': 'Organization', name: 'myappcube', url: studio.siteUrl },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    potentialAction: { '@type': 'PlayAction', target: game.robloxUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-zinc-950 overflow-hidden -mt-16 pt-16">
        <div className="absolute inset-0 bg-linear-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="w-full py-24 md:py-36">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8 px-6">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-3xl" />
                <Image
                  src={game.logo}
                  alt={game.name}
                  width={96}
                  height={96}
                  className="relative rounded-3xl shadow-2xl border border-white/10"
                  priority
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-50">
                {game.name}
              </h1>
              <p className="mt-4 text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
                {t('tagline')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">
                  {game.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">
                  Roblox
                </span>
              </div>
            </ScrollReveal>

            {game.robloxUrl && (
              <ScrollReveal delay={300}>
                <a
                  href={game.robloxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-lg shadow-blue-900/40"
                >
                  <Zap className="w-5 h-5" />
                  {t('playOnRoblox')}
                </a>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950">
        <div className="container mx-auto px-6 pb-20">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden max-w-3xl mx-auto shadow-2xl border border-white/5">
              <Image
                src={game.banner}
                alt={`${game.name} banner`}
                width={1200}
                height={675}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4">
            {[
              { icon: Users,  value: '8',      label: t('statsPlayers')   },
              { icon: Zap,    value: '7',      label: t('statsDisasters') },
              { icon: Trophy, value: '1',      label: t('statsWinner')    },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                <span className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {value}
                </span>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Build your base ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400">
                  {t('buildLabel')}
                </span>
              </div>
              <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                {t('buildTitle')}
              </h2>
              <p className="text-center text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-14 leading-relaxed">
                {t('buildDesc')}
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {defenses.map(({ icon: Icon, key, color }, i) => (
                <ScrollReveal key={key} delay={i * 80}>
                  <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 h-full">
                    <Icon className={`w-8 h-8 ${color}`} />
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t(key)}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Disasters ────────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400">
                  {t('disastersLabel')}
                </span>
              </div>
              <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                {t('disastersTitle')}
              </h2>
              <p className="text-center text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-14 leading-relaxed">
                {t('disastersDesc')}
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {disasters.map(({ icon: Icon, key, color, bg }, i) => (
                <ScrollReveal key={key} delay={i * 60}>
                  <div className={`flex items-center gap-3 p-4 rounded-2xl border ${bg} h-full`}>
                    <Icon className={`w-7 h-7 shrink-0 ${color}`} />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t(key)}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gameplay video ────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400">
                  {t('galleryLabel')}
                </span>
              </div>
              <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-14">
                {t('galleryTitle')}
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xl aspect-video">
                <video
                  src="/images/games/disaster-tycoon/videos/disaster_tycoon.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-8">

            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-6 bg-blue-500/15 blur-3xl rounded-full" />
                <Image
                  src={game.logo}
                  alt={game.name}
                  width={80}
                  height={80}
                  className="relative rounded-2xl border border-white/10"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-50">
                {t('ctaTitle')}
              </h2>
              <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
                {t('ctaDesc')}
              </p>
            </ScrollReveal>

            {game.robloxUrl && (
              <ScrollReveal delay={200}>
                <a
                  href={game.robloxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition-colors shadow-xl shadow-blue-900/40"
                >
                  <Zap className="w-5 h-5" />
                  {t('playOnRoblox')}
                </a>
              </ScrollReveal>
            )}

            <ScrollReveal delay={250}>
              <Link
                href="/games"
                className="inline-flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                <span className="text-base font-medium text-zinc-100 whitespace-nowrap">
                  {tDetail('allGames')}
                </span>
                <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-5 h-5 text-white" />
                </span>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}
