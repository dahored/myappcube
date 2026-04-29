import type { MetadataRoute } from 'next';
import { studio } from '@/config/studio';
import { games } from '@/config/games';
import { routing } from '@/i18n/routing';

const base = studio.siteUrl;
const locales = routing.locales;

function url(path: string, locale: string) {
  return `${base}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ['', '/games', '/redes', '/contact', '/privacy', '/terms'];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((path) =>
    locales.map((locale) => ({
      url: url(path, locale),
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/games' ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, url(path, l)])),
      },
    }))
  );

  const gameEntries: MetadataRoute.Sitemap = games
    .filter((g) => !g.comingSoon)
    .flatMap((game) => {
      const isMobile = game.type !== 'roblox';
      return locales.flatMap((locale) => [
        {
          url: url(`/games/${game.slug}`, locale),
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, url(`/games/${game.slug}`, l)])
            ),
          },
        },
        ...(isMobile ? [
          {
            url: url(`/games/${game.slug}/privacy`, locale),
            lastModified: now,
            changeFrequency: 'yearly' as const,
            priority: 0.4,
            alternates: {
              languages: Object.fromEntries(
                locales.map((l) => [l, url(`/games/${game.slug}/privacy`, l)])
              ),
            },
          },
          {
            url: url(`/games/${game.slug}/terms`, locale),
            lastModified: now,
            changeFrequency: 'yearly' as const,
            priority: 0.4,
            alternates: {
              languages: Object.fromEntries(
                locales.map((l) => [l, url(`/games/${game.slug}/terms`, l)])
              ),
            },
          },
          {
            url: url(`/games/${game.slug}/delete-account`, locale),
            lastModified: now,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
            alternates: {
              languages: Object.fromEntries(
                locales.map((l) => [l, url(`/games/${game.slug}/delete-account`, l)])
              ),
            },
          },
        ] : []),
      ]);
    });

  return [...staticEntries, ...gameEntries];
}
