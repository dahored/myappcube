---
name: web-page-indie-studio-developer
description: Use this skill when building or maintaining a Next.js promotional website for an indie mobile app/game studio. Covers architecture, i18n, SEO, component patterns, styling conventions, performance, and store integrations. Reusable across similar studio sites.
---

# Web Page — Indie Mobile Studio Developer

A comprehensive guide for building promotional websites for indie mobile app/game studios using Next.js 15 App Router.

## Archetype
This skill applies to sites that:
- Showcase mobile apps/games (landing pages, features, screenshots)
- Support multiple languages (i18n with next-intl)
- Include store badge links (App Store, Google Play)
- Have a dark/light mode
- Are deployed on Vercel with SEO-first priorities
- May include special features: TV mode, Firebase realtime sync, carousels

---

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | **Next.js 15** App Router | Server components default |
| Language | **TypeScript** strict | Interfaces near components |
| Styling | **Tailwind CSS v4** | CSS-based config, `@theme inline` |
| i18n | **next-intl ^4** | JSON messages, locale segment |
| Images | **next/image** | AVIF+WebP, TTL 30d |
| Icons | **lucide-react** | Consistent icon library |
| Realtime | **Firebase** | Only for interactive features |
| Fonts | **next/font/google** | Geist (UI) + Poppins (headings) |
| Hosting | **Vercel** | Edge functions, custom domain |

---

## Project Structure

```
src/
  app/
    layout.tsx              ← Root: fonts, GA, metadata, theme flash prevention
    robots.ts               ← SEO: robots.txt
    sitemap.ts              ← SEO: dynamic sitemap from config
    [locale]/
      layout.tsx            ← Locale: Header, Footer, NextIntlClientProvider
      page.tsx              ← Home: hero, featured, sections
      games/
        page.tsx            ← Games list
        [slug]/
          page.tsx          ← Game detail: hero, features, screenshots, CTA
          privacy/page.tsx
          terms/page.tsx
          delete-account/page.tsx
  components/
    layout/                 ← Header, Footer, MobileNav
    ui/                     ← Generic reusable: carousel, mockup, badges, reveal
    sections/               ← Composed page sections: Hero, Bento, FAQ, About
  config/
    studio.ts               ← Studio metadata, socials, URLs
    games.ts                ← Game data + Game interface + formatDownloads()
    faq.ts                  ← FAQ key pairs
    animations.ts           ← ENABLE_SCROLL_ANIMATIONS flag
  i18n/
    routing.ts              ← locales, defaultLocale
    navigation.ts           ← createNavigation (Link, useRouter, usePathname)
    request.ts              ← getRequestConfig: loads /messages/{locale}.json
  lib/
    firebase.ts             ← Firebase init (only if realtime features)
  middleware.ts             ← next-intl locale detection + x-pathname header
messages/
  en.json, es.json, pt.json, fr.json, it.json, de.json
public/
  images/
    logos/, stores/, avatars/
    games/[slug]/banner/, logo/, screenshots/[locale]/, howtoplay/, categories/
  app-ads.txt               ← AdMob/AdSense compliance
```

---

## Tailwind v4 Setup

No `tailwind.config.js`. Configuration is in `globals.css`:

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));   /* Class-based dark mode */

:root {
  --background: #ffffff;
  --foreground: #09090b;
}
.dark {
  --background: #09090b;
  --foreground: #fafafa;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-poppins: var(--font-poppins);
}
```

Custom font utility example: add `--font-poppins: var(--font-poppins);` under `@theme inline` → enables `font-poppins` as Tailwind class.

### Dark Mode Pattern
- **Toggle**: `document.documentElement.classList.toggle('dark')`
- **Persist**: `localStorage.setItem('theme', value)`
- **Flash prevention** (inline script in root `<head>`):
  ```js
  (function(){
    var t=localStorage.getItem('theme');
    var p=window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(t==='dark'||(!t&&p)){document.documentElement.classList.add('dark');}
  })();
  ```

---

## i18n Pattern (next-intl)

### Setup
```ts
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'es', 'pt', 'fr', 'it', 'de'],
  defaultLocale: 'es',
});
```

```ts
// src/i18n/navigation.ts — use these instead of next/navigation
export const { Link, redirect, useRouter, usePathname, getPathname } = createNavigation(routing);
```

```ts
// src/middleware.ts
export default createMiddleware(routing);
export const config = { matcher: ['/((?!_next|.*\\..*).*)'] };
```

### Translation Usage
```tsx
// Server component
const t = await getTranslations('namespace');
return <h1>{t('key')}</h1>;

// Client component
const t = useTranslations('namespace');
return <h1>{t('key')}</h1>;

// Check if translation exists before using
if (tGame.has(`${slug}.description`)) { ... }
```

### Message File Structure
```json
{
  "nav": { "games": "Games", "contact": "Contact" },
  "home": { "headline": "...", "tagline": "..." },
  "games": {
    "[slug]": {
      "description": "...",
      "step1Title": "...", "step1Desc": "...",
      "modeClassicTitle": "...", "modeClassicDesc": "..."
    }
  },
  "bento": { "title": "...", "c1label": "...", "c5title": "..." },
  "faq": { "q1": "...", "a1": "...", "q2": "...", "a2": "..." },
  "common": { "downloadOn": "...", "getItOn": "...", "appStore": "...", "googlePlay": "..." }
}
```

### Locale-aware Screenshots
```tsx
const screenshotLocale = ['es', 'pt', 'fr', 'it', 'de'].includes(locale) ? 'es' : 'en';
const screenshots = files.map(f => ({
  src: `/images/games/${slug}/screenshots/${screenshotLocale}/${f}`,
  alt: `${name} screenshot ${i + 1}`,
}));
```

---

## Data Config Pattern

### Game Interface (`src/config/games.ts`)
```ts
interface Game {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  banner: string;            // Path to banner image
  logo: string;              // Path to logo image
  genre: string;             // "Party / Social"
  platform: string;          // "Android" | "iOS" | "Android & iOS"
  accent: string;            // Tailwind color name: 'orange' | 'violet' | 'emerald'
  comingSoon?: boolean;
  storeUrl?: { ios?: string; android?: string };
  ratings?: { android?: number; ios?: number };
  downloads?: { android?: number; ios?: number };
}

export function formatDownloads(downloads: Game['downloads']): string | null {
  // Returns "30k+", "1.2M+" or null if no data
}
```

### Studio Config (`src/config/studio.ts`)
```ts
export const studio = {
  name: 'Studio Name',
  siteUrl: 'https://example.com',
  email: 'contact@example.com',
  googlePlayDeveloperUrl: 'https://play.google.com/...',
  adsensePublisherId: 'ca-pub-...',
  comingSoon: process.env.NEXT_PUBLIC_COMING_SOON !== 'false',
};

export const socials: Social[] = [
  { label: 'Instagram', href: '...', icon: Instagram },
  { label: 'Facebook',  href: '...', icon: Facebook },
  { label: 'YouTube',   href: '...', icon: Youtube },
];
```

---

## Server vs Client Components

### Default: Server Component
Use for pages, layouts, static sections, SEO content, data fetching.
```tsx
// No directive needed
export default async function GamePage({ params }) {
  const t = await getTranslations('games');
  const game = games.find(g => g.slug === params.slug);
  return <main>...</main>;
}
```

### Client Component: Only When Needed
Use ONLY for: `useState`, `useEffect`, event handlers, browser APIs (localStorage, scroll, matchMedia), Firebase realtime.
```tsx
'use client';
import { useState, useEffect } from 'react';
```

### Common Client Components in This Pattern
- `CarouselControls` — dot indicators, pause button
- `GamesCarousel` — touch drag, auto-rotate
- `StickyScreenshots` — scroll-synced screenshot transitions
- `ScrollReveal` — Intersection Observer animations
- `ThemeToggle` — localStorage dark mode
- `LocaleSwitcher` — client navigation
- `FloatingGameIcons` — parallax on scroll

---

## Key Reusable Component Templates

### StoreBadges (Server, Async)
```tsx
export default async function StoreBadges({ ios, android, className = '' }) {
  const t = await getTranslations('common');
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {ios && (
        <a href={ios} target="_blank" rel="noopener noreferrer"
           className="group flex items-center gap-3 px-5 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-105 active:scale-100">
          <Image src="/images/stores/apple_store.png" alt="App Store" width={32} height={32} className="shrink-0 w-8 h-8 p-0.5" />
          <div className="text-left leading-tight">
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium">{t('downloadOn')}</p>
            <p className="text-zinc-900 dark:text-zinc-50 text-base font-semibold tracking-tight">{t('appStore')}</p>
          </div>
        </a>
      )}
      {android && (
        <a href={android} ...>
          <img src="/images/stores/google_play.svg" alt="Google Play" width={32} height={32} className="shrink-0 w-8 h-8" />
          ...
        </a>
      )}
    </div>
  );
}
```

### PhoneMockup (Server)
```tsx
// CSS-padding approach: adapts to image height, no clipping
export default function PhoneMockup({ src, alt, className, sizes, priority }) {
  return (
    <div className={`relative ${className}`}>
      <div style={{ background: '#18181b', borderRadius: '12.31% / 5.69%', padding: '3.33%', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}>
        <div style={{ borderRadius: '10.99% / 4.89%', overflow: 'hidden' }}>
          <Image src={src} alt={alt} width={1290} height={2796} style={{ display: 'block', width: '100%', height: 'auto' }} sizes={sizes} priority={priority} />
        </div>
      </div>
      {/* SVG overlay: dynamic island + buttons */}
      <svg viewBox="0 0 390 844" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
        <rect x="13.5" y="13.5" width="363" height="817" rx="39.5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <rect x="145" y="20" width="100" height="24" rx="12" fill="#09090b"/>
        <rect x="387" y="192" width="3" height="56" rx="1.5" fill="#27272a"/>
        <rect x="0" y="172" width="3" height="36" rx="1.5" fill="#27272a"/>
        <rect x="0" y="220" width="3" height="56" rx="1.5" fill="#27272a"/>
      </svg>
    </div>
  );
}
```

### StickyScreenshots (Client) — Scroll-synced screenshots
```tsx
// Height: screenshots.length * 60 + 100 vh (scroll budget)
// Phone fills remaining space between header and dots with flex-1 + justify-between
// aspectRatio: '1 / 2.09' + maxHeight: '68vh' caps on large screens
```

### ScrollReveal (Client)
```tsx
<ScrollReveal delay={100} from="bottom" repeat={false}>
  <h2>Animated on scroll</h2>
</ScrollReveal>
```

### Two-tone Logo (Poppins + Tailwind)
```tsx
<span className="font-poppins font-bold text-lg tracking-tight">
  <span className="text-zinc-900 dark:text-white">myapp</span>
  <span className="text-violet-500">cube</span>
</span>
```

---

## Page Patterns

### Game Detail Page Structure
```
[slug]/page.tsx
  1. Hero section (banner image, logo, tagline, store badges)
  2. How-to-play section (step images + descriptions)
  3. Game modes section (mode cards)
  4. StickyScreenshots section (scroll-synced screenshots)
  5. Testimonials carousel
  6. BentoSection (features grid + download CTA)
```

### generateStaticParams for all locales × games
```tsx
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    games.map((g) => ({ locale, slug: g.slug }))
  );
}
```

### Dynamic Metadata
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const game = games.find(g => g.slug === slug);
  const base = studio.siteUrl;
  return {
    title: game.name,
    description: game.tagline,
    openGraph: {
      title: `${game.name} — ${studio.name}`,
      images: [{ url: game.banner, width: 1200, height: 675 }],
    },
    alternates: {
      canonical: `${base}/${locale}/games/${slug}`,
      languages: Object.fromEntries(routing.locales.map(l => [l, `${base}/${l}/games/${slug}`])),
    },
  };
}
```

### JSON-LD Structured Data (MobileApplication)
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: game.name,
  operatingSystem: game.platform,
  applicationCategory: 'GameApplication',
  description: game.tagline,
  screenshot: screenshots.map(s => `${studio.siteUrl}${s.src}`),
  installUrl: game.storeUrl?.android || game.storeUrl?.ios,
}) }} />
```

---

## SEO & Performance Checklist

### Images
- Always use `<Image>` (next/image) — never `<img>` unless SVG icons
- Always provide `sizes` prop: `sizes="(max-width: 640px) 100vw, 800px"`
- `priority={true}` for above-fold images (hero, banner)
- Store SVG icons: use `<img>` (not `<Image>`) — SVGs need no optimization

### Fonts
```tsx
// layout.tsx — load once, inject as CSS variables
const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['700'] });
// Apply to <body>: className={`${geist.variable} ${poppins.variable} font-sans`}
```

### Scripts
```tsx
// Google Analytics — never blocking
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" strategy="lazyOnload" />
<Script id="ga-init" strategy="lazyOnload">{`...gtag config...`}</Script>
// Preconnect in <head>:
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

### Scroll Listeners
```tsx
window.addEventListener('scroll', handler, { passive: true });  // Always passive
```

### Modern Browsers (eliminates legacy polyfills ~12 KiB)
```json
"browserslist": {
  "production": ["chrome >= 92", "firefox >= 90", "safari >= 15", "edge >= 92"]
}
```

### Security Headers (next.config.ts)
```ts
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];
```

### next.config.ts — Standard Setup
```ts
const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};
export default withNextIntl(nextConfig);
```

---

## Store Badge Assets

### Google Play (SVG — square, no aspect ratio issues)
File: `/public/images/stores/google_play.svg`
```svg
<svg aria-hidden="true" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M0,0h40v40H0V0z"/>
  <path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8V34.3c0,0.4,0,0.7,0.1,1.1L20,20Z" fill="#4285F4"/>
  <path d="M20,20L27.8,12.1L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3Z" fill="#34A853"/>
  <path d="M35.3,16.4L27.8,12.1L20,20L27.8,27.8L35.3,23.6c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4Z" fill="#FBBC04"/>
  <path d="M20,20L4.3,35.3c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l17.4-9.9Z" fill="#EA4335"/>
</svg>
```

### App Store (PNG with padding)
```tsx
// Add p-0.5 to give visual breathing room matching Google Play icon
<Image src="/images/stores/apple_store.png" ... className="shrink-0 w-8 h-8 p-0.5" />
```

### AdMob Compliance
```
# public/app-ads.txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

---

## Environment Variables Template
```
# public (can be committed)
NEXT_PUBLIC_COMING_SOON=true          # set to 'false' in Vercel to launch

# Firebase (public, but guard against misuse)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Do NOT
- Use `<a href>` for internal navigation — use `Link` from `@/i18n/navigation`
- Use `<img>` for raster images — use `<Image>` from `next/image`
- Use `useEffect` to fetch data available server-side
- Use CSS modules or styled-components — Tailwind v4 only
- Add `'use client'` to components that don't need it
- Put secrets in `NEXT_PUBLIC_*` env vars
- Import `next/navigation` directly — use `@/i18n/navigation` for locale-aware routing
- Omit `sizes` prop on `<Image>` (causes Lighthouse warning)
- Use `width={x} height={x}` (square) for non-square images (causes aspect ratio Lighthouse warning)
