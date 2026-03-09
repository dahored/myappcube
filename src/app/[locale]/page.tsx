import type { Metadata } from 'next';
import { games } from '@/config/games';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedGameSection from '@/components/sections/FeaturedGameSection';
import AboutSection from '@/components/sections/AboutSection';
import GamesSection from '@/components/sections/GamesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BentoSection from '@/components/sections/BentoSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';

const base = 'https://myappcube.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  const title = 'myappcube — Mobile Game Studio';
  const description = isEs
    ? 'myappcube crea juegos móviles de fiesta divertidos y únicos. Descarga El Infiltrado en Android.'
    : 'myappcube crafts fun and unique mobile party games. Download El Infiltrado on Android.';

  return {
    title,
    description,
    openGraph: { title, description, images: ['/images/logos/logo_myappcube.png'] },
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { en: `${base}/en`, es: `${base}/es` },
    },
  };
}

export default function HomePage() {
  const [featured] = games;

  return (
    <>
      <HeroSection />
      {featured && <FeaturedGameSection game={featured} />}
      <BentoSection />
      <GamesSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
