export interface Game {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  banner: string;
  logo: string;
  genre: string;
  platform: string;
  /** Tailwind color token used for the glow/accent (e.g. 'orange', 'violet', 'emerald') */
  accent: string;
  comingSoon?: boolean;
  storeUrl?: {
    ios?: string;
    android?: string;
  };
}

export const games: Game[] = [
  {
    slug: 'el-infiltrado',
    name: 'El Infiltrado',
    tagline: '¿Puedes encontrar al infiltrado?',
    description:
      'Un juego de fiesta donde tus amigos intentan descubrir al infiltrado del grupo. Perfecto para reuniones — los jugadores no necesitan la app.',
    banner: '/images/games/el-infiltrado/banner.png',
    logo: '/images/games/el-infiltrado/logo.jpg',
    genre: 'Party / Social',
    platform: 'Android',
    accent: 'orange',
    storeUrl: {
      android: 'https://play.google.com/store/apps/details?id=com.myappcube.elinfiltrado',
    },
  },
  // ── Coming soon ──────────────────────────────────────────────────────────
  // These are placeholders to preview the multi-game layout.
  // Remove or replace when real games are ready.
  {
    slug: 'word-rush',
    name: 'Word Rush',
    tagline: 'Race against the clock.',
    description:
      'A fast-paced word game that tests your vocabulary and reflexes. Play solo or challenge your friends in real time.',
    banner: '/images/games/el-infiltrado/banner.png',
    logo: '/images/games/el-infiltrado/logo.jpg',
    genre: 'Word / Casual',
    platform: 'Android',
    accent: 'emerald',
    comingSoon: true,
  },
  {
    slug: 'cube-quest',
    name: 'Cube Quest',
    tagline: 'Build. Destroy. Repeat.',
    description:
      'A satisfying puzzle game where you stack, balance and explode cubes through increasingly creative levels.',
    banner: '/images/games/el-infiltrado/banner.png',
    logo: '/images/games/el-infiltrado/logo.jpg',
    genre: 'Puzzle',
    platform: 'Android',
    accent: 'violet',
    comingSoon: true,
  },
];
