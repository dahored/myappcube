import { getTranslations } from 'next-intl/server';
import { Mail } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { studio, socials } from '@/config/studio';

export default async function ContactSection() {
  const t = await getTranslations('contact');
  const tFooter = await getTranslations('footer');

  return (
    <section className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-xl mx-auto text-center">

          <ScrollReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-6">
              {t('label')}
            </p>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-50 mb-4 leading-tight">
              {t('title')}
            </h2>

            <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Email CTA */}
            <a
              href={`mailto:${studio.email}?subject=${encodeURIComponent(tFooter('contactSubject'))}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t('emailCta')}
            </a>

            {/* Social links */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-700 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
