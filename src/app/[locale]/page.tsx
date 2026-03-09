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

export const metadata: Metadata = {
  title: 'myappcube — Mobile Game Studio',
  description: 'We craft fun and unique mobile games for everyone.',
  openGraph: {
    title: 'myappcube — Mobile Game Studio',
    description: 'We craft fun and unique mobile games for everyone.',
    images: ['/images/logos/logo_myappcube.png'],
  },
};

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
