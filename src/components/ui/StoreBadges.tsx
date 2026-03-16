import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

interface StoreBadgesProps {
  ios?: string;
  android?: string;
  className?: string;
}

export default async function StoreBadges({ ios, android, className = '' }: StoreBadgesProps) {
  const t = await getTranslations('common');

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {ios && (
        <a
          href={ios}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-2 rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/15 dark:backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-100"
          aria-label={t('downloadOn') + ' ' + t('appStore')}
        >
          <Image
            src="/images/stores/apple_store.png"
            alt="App Store"
            width={32}
            height={32}
            className="shrink-0 w-8 h-8 p-0.5"
          />
          <div className="text-left leading-tight">
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium">{t('downloadOn')}</p>
            <p className="text-zinc-900 dark:text-zinc-50 text-base font-semibold tracking-tight">{t('appStore')}</p>
          </div>
        </a>
      )}

      {android && (
        <a
          href={android}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-2 rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/15 dark:backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-100"
          aria-label={t('getItOn') + ' ' + t('googlePlay')}
        >
          <img
            src="/images/stores/google_play.svg"
            alt="Google Play"
            width={32}
            height={32}
            className="shrink-0 w-8 h-8"
          />
          <div className="text-left leading-tight">
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium">{t('getItOn')}</p>
            <p className="text-zinc-900 dark:text-zinc-50 text-base font-semibold tracking-tight">{t('googlePlay')}</p>
          </div>
        </a>
      )}
    </div>
  );
}
