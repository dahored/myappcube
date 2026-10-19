import { getLocale, getTranslations } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { apps, appUrl } from '@/config/apps';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GamesCarousel from '@/components/ui/GamesCarousel';

/** Home "Our apps" section — same layout as GamesSection (carousel + sticky CTA). */
export default async function AppsSection() {
  const t = await getTranslations('appsPage');
  const tApps = await getTranslations('apps');
  const locale = await getLocale();

  if (apps.length === 0) return null;

  const slides = apps.map((app) => ({
    slug: app.slug,
    name: tApps(`${app.slug}.name` as never),
    genre: t('webOnly'),
    banner: app.banner[locale] ?? app.banner.en,
    logo: app.icon,
    href: appUrl(app, locale),
    external: true,
    exploreLabel: t('open'),
    comingSoonLabel: '',
    comingSoonTitle: '',
  }));

  return (
    <section id="apps" className="relative border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      {/* Sticky CTA */}
      <div className="absolute flex items-end justify-center top-0 left-0 right-0 h-full">
        <div className="sticky bottom-6 z-40 flex items-end justify-center pointer-events-none mb-28 mt-8">
          <ScrollReveal delay={0} repeat>
            <Link
              href="/apps"
              className="pointer-events-auto flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-zinc-200/80 dark:bg-white/10 dark:border dark:border-white/15 backdrop-blur-md"
            >
              <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                {t('viewAll')}
              </span>
              <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <div className="py-20 pb-48 md:py-28 md:pb-48">

        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400">
              {t('label')}
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            {t('title')}
          </h2>
          <p className="text-center text-zinc-500 mb-12">{t('homeSubtitle')}</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GamesCarousel games={slides} />
        </ScrollReveal>

      </div>
    </section>
  );
}
