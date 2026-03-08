import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Nav links with pipe separators */}
        <nav className="flex flex-wrap items-center gap-x-0 text-sm text-zinc-500">
          {[
            { href: '/privacy', label: t('privacy') },
            { href: '/terms', label: t('terms') },
          ].map((link, i, arr) => (
            <span key={link.href} className="flex items-center">
              <Link href={link.href} className={`hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors px-3${i === 0 ? ' pl-0' : ''}`}>
                {link.label}
              </Link>
              {i < arr.length - 1 && (
                <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>
              )}
            </span>
          ))}
        </nav>

        {/* Copyright — right side */}
        <p className="text-sm text-zinc-500">
          &copy; {year} myappcube. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
