import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import MobileNav from '@/components/layout/MobileNav';

export default async function Header() {
  const t = await getTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-16">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Image
            src="/images/logos/logo_myappcube.png"
            alt="myappcube"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">myappcube</span>
        </Link>

        <MobileNav gamesLabel={t('games')} socialsLabel={t('socials')} />
        </div>
      </div>
    </header>
  );
}
