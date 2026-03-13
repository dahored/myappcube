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
  ratings?: {
    android?: number;
    ios?: number;
  };
  downloads?: {
    android?: number;
    ios?: number;
  };
}

/** Returns total downloads across platforms formatted as "30k+", "1.2M+", etc. */
export function formatDownloads(downloads: Game['downloads']): string | null {
  if (!downloads) return null;
  const total = (downloads.android ?? 0) + (downloads.ios ?? 0);
  if (total === 0) return null;
  if (total >= 1_000_000) return `${(total / 1_000_000).toFixed(total % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (total >= 1_000) return `${Math.floor(total / 1_000)}k+`;
  return `${total}+`;
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
      android: 'https://play.google.com/store/apps/details?id=com.diegohernandez.myappcube.game.elinfiltrado',
      // ios: 'https://play.google.com/store/apps/details?id=com.myappcube.elinfiltrado',
    },
    ratings: { 
      android: 5, 
      // ios: 5 
    },
    downloads: {
      // android: 10000,
      // ios: 20000,
    }
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
