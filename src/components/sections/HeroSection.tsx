import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronsDown, Gamepad2, ChevronRight } from 'lucide-react';
import { games } from '@/config/games';
import FloatingGameIcons from '@/components/ui/FloatingGameIcons';

export default async function HeroSection() {
  const t = await getTranslations('home');

  return (
    <section className="relative min-h-screen -mt-16 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-zinc-950">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 -z-20 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(113 113 122 / 0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute top-[30%] left-[15%] w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-[55%] right-[10%] w-64 h-64 rounded-full bg-emerald-500/8 blur-3xl" />
      </div>

      {/* Floating game icons with parallax */}
      <FloatingGameIcons icons={[
        { rotate: '-rotate-12', scale: 'scale-90', size: 72, speed: -0.15, logo: games[0].logo, name: games[0].name },
        { rotate: 'rotate-6',   scale: 'scale-80', size: 64, speed: -0.22, logo: games[0].logo, name: games[0].name },
        { rotate: 'rotate-3',   scale: 'scale-70', size: 56, speed: -0.10, logo: games[0].logo, name: games[0].name },
        { rotate: 'rotate-12',  scale: 'scale-90', size: 72, speed: -0.20, logo: games[1].logo, name: games[1].name },
        { rotate: '-rotate-6',  scale: 'scale-80', size: 64, speed: -0.13, logo: games[1].logo, name: games[1].name },
        { rotate: '-rotate-3',  scale: 'scale-70', size: 56, speed: -0.25, logo: games[1].logo, name: games[1].name },
      ]} />

      {/* Radial fade mask — edges fade to zinc-950 */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,#09090b_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        <p className="mb-8 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-zinc-500">
          <Gamepad2 className="w-4 h-4" />
          myappcube studio
        </p>

        <Image
          src="/images/logos/logo_myappcube.png"
          alt="myappcube"
          width={112}
          height={112}
          className="mb-8 rounded-2xl"
          priority
        />

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight pb-2 mb-6 bg-linear-to-r from-violet-300 via-fuchsia-300 to-orange-400 bg-clip-text text-transparent">
          {t('headline')}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
          {t('tagline')}
        </p>

        <Link
          href="#games"
          className="inline-flex items-center gap-4 pl-5 pr-2 py-2 h-13 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-sm transition-colors"
        >
          <span className="text-base font-medium text-zinc-100 whitespace-nowrap">
            {t('scrollCta')}
          </span>
          <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
            <ChevronRight className="w-5 h-5 text-white" />
          </span>
        </Link>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#games"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronsDown className="w-10 h-10 animate-bounce" />
      </Link>

    </section>
  );
}
