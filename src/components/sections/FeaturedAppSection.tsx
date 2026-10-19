/**
 * FeaturedAppSection — used for the FIRST web app on /apps.
 * Same layout as FeaturedGameSection; store badges replaced by an "Open app" button.
 */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { appUrl, type WebApp } from '@/config/apps';

const accentGlow: Record<string, string> = {
  orange: 'from-orange-500/20 via-orange-400/10 to-violet-600/20',
  violet: 'from-violet-600/20 via-violet-400/10 to-violet-600/20',
  emerald: 'from-emerald-500/20 via-emerald-400/10 to-violet-600/20',
  blue: 'from-blue-600/20 via-blue-400/10 to-violet-600/20',
};

export default async function FeaturedAppSection({ app, locale }: { app: WebApp; locale: string }) {
  const t = await getTranslations('appsPage');
  const tHome = await getTranslations('home');
  const tApps = await getTranslations('apps');

  const glow = accentGlow[app.accent] ?? accentGlow.violet;
  const name = tApps(`${app.slug}.name` as never);
  const href = appUrl(app, locale);

  return (
    <section className="relative border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900">
      {/* Sticky CTA — same pattern as FeaturedGameSection */}
      <div className="absolute flex items-end justify-center top-0 left-0 right-0 h-full">
        <div className="sticky bottom-6 z-40 overflow-visible flex items-end justify-center pointer-events-none mb-28 mt-8">
          <ScrollReveal delay={0} repeat>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="pointer-events-auto flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-zinc-200/80 dark:bg-white/10 dark:border dark:border-white/15 backdrop-blur-md"
            >
              <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                {t('open')}
              </span>
              <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </span>
            </a>
          </ScrollReveal>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="container mx-auto px-6 py-24 pb-48 md:py-44 md:pb-48">
          <div className="max-w-6xl mx-auto">

            <ScrollReveal delay={0}>
              <div className="flex justify-center mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400">
                  {tHome('featuredLabel')}
                </span>
              </div>

              <h2 className="text-center text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                {name}
              </h2>

              <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {tApps(`${app.slug}.description` as never)}
              </p>

              <div className="mb-14" />
            </ScrollReveal>

            <ScrollReveal delay={150} from="bottom">
              <a href={href} target="_blank" rel="noopener noreferrer" className="relative mx-auto max-w-lg block">
                <div className={`absolute -inset-4 bg-linear-to-r ${glow} blur-2xl rounded-3xl`} />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/5">
                  <Image
                    src={app.banner[locale] ?? app.banner.en}
                    alt={name}
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex items-center justify-center gap-3 mt-10">
                <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                  {app.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                  {t('webOnly')}
                </span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}
