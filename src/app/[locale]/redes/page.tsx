import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ExternalLink } from 'lucide-react';
import { socials } from '@/config/studio';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Redes sociales — myappcube',
  description: 'Seguí a myappcube en Instagram, Facebook y YouTube.',
  openGraph: {
    title: 'Redes sociales — myappcube',
    description: 'Seguí a myappcube en Instagram, Facebook y YouTube.',
    images: ['/images/logos/logo_myappcube.png'],
  },
};

const socialDescriptions: Record<string, 'instagram' | 'facebook' | 'youtube'> = {
  Instagram: 'instagram',
  Facebook: 'facebook',
  YouTube: 'youtube',
};

const socialColors: Record<string, string> = {
  Instagram: 'from-pink-500/20 to-orange-400/10 border-pink-500/20 hover:border-pink-400/40',
  Facebook:  'from-blue-600/20 to-blue-400/10 border-blue-500/20 hover:border-blue-400/40',
  YouTube:   'from-red-600/20 to-red-400/10 border-red-500/20 hover:border-red-400/40',
};

const socialIconColors: Record<string, string> = {
  Instagram: 'text-pink-400',
  Facebook:  'text-blue-400',
  YouTube:   'text-red-400',
};

export default async function RedesPage() {
  const t = await getTranslations('socials');

  return (
    <main className="min-h-screen bg-zinc-950 -mt-16 pt-16">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-violet-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 py-24 md:py-32 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-50 mb-4">
              {t('title')}
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cards */}
      <section className="container mx-auto px-6 pb-24 max-w-2xl">
        <div className="flex flex-col gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon;
            const descKey = socialDescriptions[social.label];
            const colorClass = socialColors[social.label] ?? 'from-zinc-700/20 to-zinc-600/10 border-zinc-700/30 hover:border-zinc-500/50';
            const iconColor = socialIconColors[social.label] ?? 'text-zinc-400';

            return (
              <ScrollReveal key={social.label} delay={i * 80}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-5 p-6 rounded-2xl bg-linear-to-br ${colorClass} border bg-zinc-900/60 transition-all duration-200 hover:bg-zinc-800/60`}
                >
                  <div className={`shrink-0 ${iconColor}`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-50 text-lg leading-tight">{social.label}</p>
                    {descKey && (
                      <p className="text-zinc-400 text-sm mt-1">{t(descKey)}</p>
                    )}
                  </div>

                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
