import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';

const reviewKeys = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const;

export default async function TestimonialsSection() {
  const t = await getTranslations('testimonials');

  const reviews = reviewKeys.map((k) => ({
    name: t(`${k}name` as Parameters<typeof t>[0]),
    text: t(k),
  }));

  return (
    <section id="testimonials" className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">

        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-orange-400">
              {t('label')}
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-zinc-50 mb-3">
            {t('title')}
          </h2>
          <p className="text-center text-zinc-500 mb-14">{t('subtitle')}</p>
        </ScrollReveal>

        <ScrollReveal>
          <TestimonialsCarousel reviews={reviews} />
        </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
