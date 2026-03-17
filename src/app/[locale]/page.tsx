import type { Metadata } from 'next';
import { games } from '@/config/games';
import { studio } from '@/config/studio';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedGameSection from '@/components/sections/FeaturedGameSection';
import AboutSection from '@/components/sections/AboutSection';
import GamesSection from '@/components/sections/GamesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BentoSection from '@/components/sections/BentoSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';

const base = studio.siteUrl;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  const title = 'myappcube — Mobile App & Game Studio';
  const description = isEs
    ? 'myappcube es un estudio independiente que crea apps y juegos móviles únicos para conectar personas. Descarga El Infiltrado en Android.'
    : 'myappcube is an independent studio crafting unique mobile apps and games to connect people. Download El Infiltrado on Android.';

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
