/**
 * AppRow — used for the 2nd, 3rd, etc. web apps on /apps.
 * Same alternating layout as GameRow; CTA opens the app in a new tab.
 */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { appUrl, type WebApp } from '@/config/apps';

const accentChip: Record<string, string> = {
  orange: 'text-orange-600 dark:text-orange-400',
  violet: 'text-violet-600 dark:text-violet-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  blue: 'text-blue-600 dark:text-blue-400',
};

const accentBtn: Record<string, string> = {
  orange: 'bg-orange-500 hover:bg-orange-400 shadow-orange-900/30',
  violet: 'bg-violet-600 hover:bg-violet-500 shadow-violet-900/30',
  emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30',
  blue: 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/30',
};

const accentGlow: Record<string, string> = {
  orange: 'from-orange-500/20 to-orange-400/5',
  violet: 'from-violet-600/20 to-violet-400/5',
  emerald: 'from-emerald-500/20 to-emerald-400/5',
  blue: 'from-blue-600/20 to-blue-400/5',
};

export default async function AppRow({ app, index, locale }: { app: WebApp; index: number; locale: string }) {
  const t = await getTranslations('appsPage');
  const tHome = await getTranslations('home');
  const tApps = await getTranslations('apps');

  const name = tApps(`${app.slug}.name` as never);
  const isEven = index % 2 === 0;
  const chip = accentChip[app.accent] ?? accentChip.violet;
  const btn = accentBtn[app.accent] ?? accentBtn.violet;
  const glow = accentGlow[app.accent] ?? accentGlow.violet;

  return (
    <section className={`border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden ${isEven ? 'bg-white dark:bg-zinc-950' : 'bg-zinc-50 dark:bg-zinc-900'}`}>
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
          <ScrollReveal from={isEven ? 'left' : 'right'} className="flex-1 text-center lg:text-left">
            <span className={`text-xs font-semibold tracking-widest uppercase mb-6 ${chip}`}>
              {tHome('featuredLabel')}
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
              {name}
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              {tApps(`${app.slug}.description` as never)}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                {app.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                {t('webOnly')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={appUrl(app, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-7 py-3 rounded-full text-white text-sm font-semibold transition-colors shadow-lg ${btn}`}
              >
                {t('open')}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal from={isEven ? 'right' : 'left'} delay={100} className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className={`absolute -inset-6 bg-linear-to-br ${glow} blur-3xl rounded-3xl`} />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/5 aspect-video">
                <Image src={app.banner[locale] ?? app.banner.en} alt={name} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
        </div>
      </div>
    </section>
  );
}
