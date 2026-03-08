import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default async function HeroSection() {
  const t = await getTranslations('home');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-225 h-225 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <ScrollReveal delay={0}>
        <Image
          src="/images/logos/logo_myappcube.png"
          alt="myappcube"
          width={100}
          height={100}
          className="mb-8 rounded-2xl"
          priority
        />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight pb-2 mb-6 bg-linear-to-b from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          {t('headline')}
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-lg mb-10 leading-relaxed">
          {t('tagline')}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <Link
          href="#games"
          className="group inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
        >
          {t('scrollCta')}
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
