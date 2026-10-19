import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { apps } from '@/config/apps';
import { studio } from '@/config/studio';
import { routing } from '@/i18n/routing';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FeaturedAppSection from '@/components/sections/FeaturedAppSection';
import AppRow from '@/components/sections/AppRow';

const base = studio.siteUrl;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'appsPage' });
  const title = `${t('title')} — myappcube`;
  const description = t('subtitle');

  return {
    title,
    description,
    openGraph: { title, description, images: ['/images/logos/logo_myappcube.png'] },
    alternates: {
      canonical: `${base}/${locale}/apps`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}/apps`])),
    },
  };
}

export default async function AppsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('appsPage');

  const [featured, ...rest] = apps;

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

      {/* Featured app */}
      {featured && <FeaturedAppSection app={featured} locale={locale} />}

      {/* Rest of apps */}
      {rest.map((app, i) => (
        <AppRow key={app.slug} app={app} index={i} locale={locale} />
      ))}
    </>
  );
}
