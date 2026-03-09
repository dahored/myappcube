import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Users, Globe, Layers, Quote, SlidersHorizontal, Eye, Ghost, MessageCircle, Vote, Trophy, type LucideIcon } from 'lucide-react';
import { games } from '@/config/games';
import { routing } from '@/i18n/routing';
import StoreBadges from '@/components/ui/StoreBadges';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StickyScreenshots from '@/components/ui/StickyScreenshots';
import BentoSection from '@/components/sections/BentoSection';

/* ─── Static params ─────────────────────────────────────────────────────── */

export function generateStaticParams() {
  const slugs = games.filter((g) => !g.comingSoon).map((g) => g.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

/* ─── Metadata ──────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};

  const base = 'https://myappcube.com';

  return {
    title: game.name,
    description: game.description,
    openGraph: {
      type: 'website',
      title: game.name,
      description: game.description,
      images: [{ url: game.banner, width: 1200, height: 675, alt: `${game.name} banner` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: game.name,
      description: game.description,
      images: [game.banner],
    },
    alternates: {
      canonical: `${base}/${locale}/games/${slug}`,
      languages: {
        en: `${base}/en/games/${slug}`,
        es: `${base}/es/games/${slug}`,
      },
    },
  };
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

type HowToPlayKey =
  | 'step1Title' | 'step1Desc'
  | 'step2Title' | 'step2Desc'
  | 'step3Title' | 'step3Desc'
  | 'step4Title' | 'step4Desc'
  | 'step5Title' | 'step5Desc'
  | 'step6Title' | 'step6Desc';

const stepMeta: { icon: LucideIcon; color: string; numBg: string }[] = [
  { icon: SlidersHorizontal, color: 'text-blue-400',   numBg: 'bg-blue-500'   },
  { icon: Eye,               color: 'text-violet-400', numBg: 'bg-violet-500' },
  { icon: Ghost,             color: 'text-orange-400', numBg: 'bg-orange-500' },
  { icon: MessageCircle,     color: 'text-teal-400',   numBg: 'bg-teal-500'   },
  { icon: Vote,              color: 'text-pink-400',   numBg: 'bg-pink-500'   },
  { icon: Trophy,            color: 'text-amber-400',  numBg: 'bg-amber-500'  },
];

type ModeKey =
  | 'modeClassicTitle' | 'modeClassicDesc'
  | 'modeHardTitle'    | 'modeHardDesc'
  | 'modeChaosTitle'   | 'modeChaosDesc';

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug && !g.comingSoon);
  if (!game) notFound();

  const t = await getTranslations('gameDetail');
  const tGame = await getTranslations({ locale, namespace: `games.${slug}` as never });

  /* ── How-to-play steps ──────────────────────────────────────────────── */
  const howToPlayImages = [
    '/images/games/el-infiltrado/howtoplay/hoy_to_play_1.jpg',
    '/images/games/el-infiltrado/howtoplay/hoy_to_play_2.jpg',
    '/images/games/el-infiltrado/howtoplay/hoy_to_play_3.jpg',
    '/images/games/el-infiltrado/howtoplay/hoy_to_play_4.jpg',
    '/images/games/el-infiltrado/howtoplay/hoy_to_play_5.jpg',
    '/images/games/el-infiltrado/howtoplay/how_to_play_6.jpg',
  ];

  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({
    num: n,
    title: (tGame as (k: HowToPlayKey) => string)(`step${n}Title` as HowToPlayKey),
    desc: (tGame as (k: HowToPlayKey) => string)(`step${n}Desc` as HowToPlayKey),
    img: howToPlayImages[n - 1],
    meta: stepMeta[n - 1],
  }));

  /* ── Game modes ─────────────────────────────────────────────────────── */
  const modes = [
    {
      key: 'classic',
      title: (tGame as (k: ModeKey) => string)('modeClassicTitle'),
      desc: (tGame as (k: ModeKey) => string)('modeClassicDesc'),
      color: 'from-orange-500/20 to-amber-400/10',
      badge: 'text-orange-400 bg-orange-400/10',
    },
    {
      key: 'hard',
      title: (tGame as (k: ModeKey) => string)('modeHardTitle'),
      desc: (tGame as (k: ModeKey) => string)('modeHardDesc'),
      color: 'from-red-600/20 to-rose-400/10',
      badge: 'text-red-400 bg-red-400/10',
    },
    {
      key: 'chaos',
      title: (tGame as (k: ModeKey) => string)('modeChaosTitle'),
      desc: (tGame as (k: ModeKey) => string)('modeChaosDesc'),
      color: 'from-violet-600/20 to-purple-400/10',
      badge: 'text-violet-400 bg-violet-400/10',
    },
  ];

  /* ── Screenshots ────────────────────────────────────────────────────── */
  const screenshotLocale = locale === 'es' ? 'es' : 'en';
  const screenshotFiles = [
    `01_homescreen_app_${screenshotLocale}.PNG`,
    `02_gamesetup_app_${screenshotLocale}.PNG`,
    `06_reveal_player_show_word_app_${screenshotLocale}.PNG`,
    `07_reveal_player_show_word_infiltrado_app_${screenshotLocale}.PNG`,
    `09_started_play_timer_${screenshotLocale}.PNG`,
    `10_votation_${screenshotLocale}.PNG`,
    `12_show_result_win_${screenshotLocale}.PNG`,
  ];

  const screenshots = screenshotFiles.map((file, i) => ({
    src: `/images/games/el-infiltrado/screenshots/${screenshotLocale}/${file}`,
    alt: `${game.name} screenshot ${i + 1}`,
  }));

  /* ── Stats ──────────────────────────────────────────────────────────── */
  const stats = [
    { icon: Users, value: '3–30', label: t('statsPlayers') },
    { icon: Globe, value: '6', label: t('statsLanguages') },
    { icon: Layers, value: '3', label: t('statsModes') },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: game.name,
    description: game.description,
    operatingSystem: game.storeUrl?.ios ? 'Android, iOS' : 'Android',
    applicationCategory: 'GameApplication',
    genre: game.genre,
    image: `https://myappcube.com${game.banner}`,
    screenshot: screenshots.map((s) => `https://myappcube.com${s.src}`),
    author: { '@type': 'Organization', name: 'myappcube', url: 'https://myappcube.com' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(game.storeUrl?.android && { installUrl: game.storeUrl.android }),
    ...(game.storeUrl?.ios && { installUrl: game.storeUrl.ios }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-zinc-950 overflow-hidden -mt-16 pt-16">
        {/* Background glow */}
        <div className="absolute inset-0 bg-linear-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="w-full py-24 md:py-36">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8 px-6">
            {/* Logo */}
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-orange-500/20 blur-2xl rounded-3xl" />
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

            {/* Name + tagline */}
            <ScrollReveal delay={100}>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-50">
                {game.name}
              </h1>
              <p className="mt-4 text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
                {(tGame as (k: string) => string)('tagline')}
              </p>
            </ScrollReveal>

            {/* Tags */}
            <ScrollReveal delay={200}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">
                  {game.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">
                  {game.platform}
                </span>
              </div>
            </ScrollReveal>

            {/* Store badges */}
            {(game.storeUrl?.ios || game.storeUrl?.android) && (
              <ScrollReveal delay={300}>
                <StoreBadges
                  ios={game.storeUrl?.ios}
                  android={game.storeUrl?.android}
                />
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950">
        <div className="container mx-auto px-6 pb-20">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden max-w-2xl mx-auto shadow-2xl border border-white/5">
              <Image
                src={game.banner}
                alt={`${game.name} banner`}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                <span className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {value}
                </span>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to play ──────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">

            <ScrollReveal>
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-orange-500 dark:text-orange-400">
                  {t('howToPlayLabel')}
                </span>
              </div>
              <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-16">
                {t('howToPlayTitle')}
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-16">
              {steps.map((step, i) => {
                const { icon: StepIcon, color, numBg } = step.meta;
                return (
                  <ScrollReveal key={step.num} delay={i * 80}>
                    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Image */}
                      <div className="w-full md:w-1/2 shrink-0">
                        <div className="relative rounded-2xl overflow-hidden aspect-video border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl">
                          <Image
                            src={step.img}
                            alt={step.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                          <StepIcon className={`w-8 h-8 shrink-0 ${color}`} />
                          <span className={`shrink-0 w-6 h-6 rounded-full ${numBg} text-white text-xs font-bold flex items-center justify-center`}>
                            {step.num}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── Game modes ───────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">

            <ScrollReveal>
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-orange-500 dark:text-orange-400">
                  {t('modesLabel')}
                </span>
              </div>
              <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-14">
                {t('modesTitle')}
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-4">
              {modes.map((mode, i) => (
                <ScrollReveal key={mode.key} delay={i * 80}>
                  <div className={`relative rounded-2xl p-6 bg-linear-to-br ${mode.color} bg-white dark:bg-transparent border border-zinc-200/60 dark:border-zinc-800/60 h-full`}>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${mode.badge} mb-4`}>
                      {mode.title}
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{mode.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Strategy tip */}
            <ScrollReveal delay={200}>
              <div className="mt-10 flex gap-4 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/40">
                <Quote className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-widest mb-2">
                    {(tGame as (k: string) => string)('tipTitle')}
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                    {(tGame as (k: string) => string)('tip')}
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Screenshots ──────────────────────────────────────────────── */}
      <StickyScreenshots
        screenshots={screenshots}
        label={t('screenshotsLabel')}
        title={t('screenshotsTitle')}
      />

      {/* ── Bento ────────────────────────────────────────────────────── */}
      <BentoSection />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Download CTA ─────────────────────────────────────────────── */}
      <section className="bg-zinc-950">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-8">

            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-6 bg-orange-500/15 blur-3xl rounded-full" />
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
                {t('downloadTitle')}
              </h2>
              <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
                {t('downloadDesc')}
              </p>
            </ScrollReveal>

            {(game.storeUrl?.ios || game.storeUrl?.android) && (
              <ScrollReveal delay={200}>
                <StoreBadges
                  ios={game.storeUrl?.ios}
                  android={game.storeUrl?.android}
                />
              </ScrollReveal>
            )}

            <ScrollReveal delay={250}>
              <Link
                href="/games"
                className="inline-flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-sm transition-colors"
              >
                <span className="text-base font-medium text-zinc-100 whitespace-nowrap">
                  {locale === 'es' ? 'Todos los juegos' : 'All games'}
                </span>
                <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-5 h-5 text-white" />
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex items-center gap-1 text-base text-zinc-500">
                <Link href={`/games/${slug}/privacy`} className="hover:text-zinc-300 transition-colors px-3">
                  {locale === 'es' ? 'Privacidad' : 'Privacy'}
                </Link>
                <span className="text-zinc-700 select-none">|</span>
                <Link href={`/games/${slug}/terms`} className="hover:text-zinc-300 transition-colors px-3">
                  {locale === 'es' ? 'Términos' : 'Terms'}
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}
