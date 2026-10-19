import type { Metadata } from 'next';
import { games } from '@/config/games';
import { studio } from '@/config/studio';
import { routing } from '@/i18n/routing';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedGameSection from '@/components/sections/FeaturedGameSection';
import AboutSection from '@/components/sections/AboutSection';
import GamesSection from '@/components/sections/GamesSection';
import AppsSection from '@/components/sections/AppsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BentoSection from '@/components/sections/BentoSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import AdUnit from '@/components/ui/AdUnit';

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
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}`])),
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
      <AppsSection />
      <AboutSection />
      <AdUnit slot="homeInContent" />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
