---
name: architect-developer
description: Use this skill when creating a new page, component, or feature for the myappcube website, or when making architecture decisions.
---

# Architect Developer — myappcube web

## Stack
- **Next.js 15** — App Router, TypeScript strict
- **Tailwind CSS** — utility-first styling, no CSS modules
- **Firebase** — Auth, Firestore (when needed)
- **Vercel** — hosting + edge functions
- **next/image** — all images optimized
- **next/link** — all internal navigation

## Component Rules

### Server Component (default)
Use for: pages, layouts, static content, SEO-critical sections.
```tsx
// No 'use client' needed
export default function GamePage() {
  return <main>...</main>;
}
```

### Client Component
Use ONLY when needed: `useState`, `useEffect`, event handlers, browser APIs.
```tsx
'use client';
import { useState } from 'react';
export default function ContactForm() { ... }
```

### Component location
```
src/components/
  ui/           ← Generic: Button, Card, Badge
  layout/       ← Header, Footer, Nav
  games/        ← GameCard, GameHero, etc.
```

## Page Template
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title — myappcube',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og/page-image.png'],
  },
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* content */}
    </main>
  );
}
```

## Adding a New Game

1. Add metadata to `src/config/games.ts`
2. Create `src/app/games/[slug]/page.tsx`
3. Create `src/app/games/[slug]/privacy/page.tsx`
4. Create `src/app/games/[slug]/terms/page.tsx`
5. Add `generateStaticParams` for static generation

## Firebase Setup (`src/lib/firebase.ts`)
```ts
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // ... other config
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export default app;
```

## Environment Variables
```
# .env.local (never commit)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Do NOT
- Use `<a>` for internal links — use `<Link>`
- Use `<img>` — use `<Image>` from `next/image`
- Put secrets in `NEXT_PUBLIC_*` env vars
- Add CSS modules or styled-components — Tailwind only
- Use `useEffect` for data that can be fetched server-side
