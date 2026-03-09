import Image from 'next/image';
import { studio } from '@/config/studio';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-6 bg-violet-500/20 blur-3xl rounded-full" />
          <Image
            src="/images/logos/logo_myappcube.png"
            alt="myappcube"
            width={72}
            height={72}
            className="relative rounded-2xl shadow-2xl border border-white/10"
            priority
          />
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-50">myappcube</span>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-50">
          Próximamente
        </h1>
        <p className="text-zinc-400 text-lg">
          Coming soon
        </p>
      </div>

      <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
        Estamos preparando algo. Mientras tanto, escríbenos a{' '}
        <a
          href={`mailto:${studio.email}`}
          className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2"
        >
          {studio.email}
        </a>
        .
      </p>
    </div>
  );
}
