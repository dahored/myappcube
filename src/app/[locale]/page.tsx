import type { Metadata } from 'next';
import { games } from '@/config/games';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedGameSection from '@/components/sections/FeaturedGameSection';
import GameRow from '@/components/sections/GameRow';
import FaqSection from '@/components/sections/FaqSection';

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
  const [featured, ...rest] = games;

  return (
    <>
      <HeroSection />
      {featured && <FeaturedGameSection game={featured} />}
      {rest.map((game, i) => (
        <GameRow key={game.slug} game={game} index={i} />
      ))}
      <FaqSection />
    </>
  );
}
