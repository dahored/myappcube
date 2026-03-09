import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail } from 'lucide-react';
import { studio, socials } from '@/config/studio';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FaqSection from '@/components/sections/FaqSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === 'es';
  return {
    title: es ? 'Contacto y FAQ — myappcube' : 'Contact & FAQ — myappcube',
    description: es
      ? 'Contacta al equipo de myappcube y encuentra respuestas a las preguntas más frecuentes sobre nuestras apps.'
      : 'Contact the myappcube team and find answers to the most common questions about our apps.',
    openGraph: {
      images: ['/images/logos/logo_myappcube.png'],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('contact');
  const es = locale === 'es';

  return (
    <main className="min-h-screen bg-zinc-950 -mt-16 pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-violet-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">
              {t('label')}
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-50 mb-4">
              {t('title')}
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact card */}
      <section className="container mx-auto px-6 pb-16 max-w-2xl">
        <ScrollReveal>
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center">
              <Mail className="w-6 h-6 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-50 font-semibold text-lg leading-tight mb-1">
                {es ? 'Escríbenos directamente' : 'Write to us directly'}
              </p>
              <p className="text-zinc-400 text-sm">{studio.email}</p>
            </div>
            <a
              href={`mailto:${studio.email}?subject=${encodeURIComponent(es ? 'Contacto myappcube' : 'Contact myappcube')}`}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
            >
              {t('emailCta')}
            </a>
          </div>
        </ScrollReveal>

        {/* Socials */}
        <ScrollReveal delay={80}>
          <div className="mt-4 flex items-center gap-3 justify-center">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <FaqSection />
    </main>
  );
}
