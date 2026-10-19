export interface WebApp {
  slug: string;
  /** Fallback name — localized name lives in messages under `apps.<slug>.name` */
  name: string;
  /** Root URL of the app; non-default locales are served at `<url>/<locale>` */
  url: string;
  /** Locale served at the root URL (no locale prefix) */
  defaultLocale: string;
  icon: string;
  /** Preview image per locale, with `en` as fallback */
  banner: Record<string, string>;
  genre: string;
  platform: 'Web';
  /** Tailwind color token used for the glow/accent (same tokens as games) */
  accent: string;
}

export const apps: WebApp[] = [
  {
    slug: 'amigo-secreto',
    name: 'Amigo Secreto',
    url: 'https://amigosecreto.myappcube.com',
    defaultLocale: 'es',
    icon: '/images/apps/amigo-secreto/icon.png',
    banner: {
      es: '/images/apps/amigo-secreto/banner_es.jpg',
      en: '/images/apps/amigo-secreto/banner_en.jpg',
    },
    genre: 'Party / Social',
    platform: 'Web',
    accent: 'violet',
  },
];

export function appUrl(app: WebApp, locale: string): string {
  return locale === app.defaultLocale ? `${app.url}/` : `${app.url}/${locale}`;
}
