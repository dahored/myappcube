import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: [
    'en', 'es', 'pt', 'fr', 'it', 'de',
    'tr', 'ja', 'ar', 'ko', 'pl', 'nl', 'ru', 'id', 'vi', 'th',
  ],
  defaultLocale: 'es',
});
