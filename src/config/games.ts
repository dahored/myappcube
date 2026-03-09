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
    banner: '/images/games/el-infiltrado/banner/home_banner.png',
    logo: '/images/games/el-infiltrado/logo/logo.jpg',
    genre: 'Party / Social',
    platform: 'Android',
    accent: 'orange',
    storeUrl: {
      android: 'https://play.google.com/store/apps/details?id=com.myappcube.elinfiltrado',
    },
  },
  // ── Coming soon ──────────────────────────────────────────────────────────
  {
    slug: 'oculto',
    name: 'Oculto',
    tagline: '???',
    description: '???',
    banner: '/images/games/el-infiltrado/banner/banner.png',
    logo: '/images/logos/logo_myappcube.png',
    genre: 'Oculto',
    platform: 'Android',
    accent: 'violet',
    comingSoon: true,
  },
];
