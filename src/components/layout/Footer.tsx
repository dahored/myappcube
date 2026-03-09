import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { games } from '@/config/games';
import { studio, socials } from '@/config/studio';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      {/* Subfooter grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logos/logo_myappcube.png"
                alt="myappcube"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-zinc-900 dark:text-zinc-50">myappcube</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              {t('description')}
            </p>
            <a
              href={studio.googlePlayDeveloperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 self-start flex items-center gap-3 px-5 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <Image
                src="/images/stores/google_play.png"
                alt="Google Play"
                width={32}
                height={32}
                className="shrink-0 w-8 h-8"
              />
              <div className="text-left leading-tight">
                <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium">{t('storeCta')}</p>
                <p className="text-zinc-900 dark:text-zinc-50 text-base font-semibold tracking-tight">Google Play</p>
              </div>
            </a>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
              {t('company')}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/#about" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  {t('linkAbout')}
                </Link>
              </li>
              <li>
                <Link href="/#all-games" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  {t('linkGames')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  {t('linkContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Games column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
              {t('gamesCol')}
            </h3>
            <ul className="flex flex-col gap-3">
              {games.map((game) => (
                <li key={game.slug}>
                  {game.comingSoon ? (
                    <span className="text-sm text-zinc-400 dark:text-zinc-600">
                      {game.name}
                    </span>
                  ) : (
                    <Link href={`/games/${game.slug}`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                      {game.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
              {t('followUs')}
            </h3>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-x-0 text-sm text-zinc-500">
            {[
              { href: '/privacy', label: t('privacy') },
              { href: '/terms', label: t('terms') },
            ].map((link, i, arr) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className={`hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors px-3${i === 0 ? ' pl-0' : ''}`}
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>
                )}
              </span>
            ))}
          </nav>
          <p className="text-sm text-zinc-500">
            &copy; {year} myappcube. {t('rights')}
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
