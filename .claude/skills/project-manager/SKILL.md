---
name: project-manager
description: Use this skill when the user asks about project status, what's pending, what's next, or when planning work for the myappcube website.
---

# Project Status — myappcube website

## Overview
Studio showcase website for myappcube — landing pages, game pages, privacy/terms, and future Firebase integrations.

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Firebase
**Hosting:** Vercel (custom domain: myappcube.com)

## Route Map
```
/                             ← Home / studio landing
/games                        ← Games showcase
/games/el-infiltrado          ← El Infiltrado landing page
/games/el-infiltrado/privacy  ← Privacy policy
/games/el-infiltrado/terms    ← Terms of service
/games/[slug]                 ← Future games (dynamic)
```

## File Structure
```
src/
  app/
    layout.tsx                ← Root layout (nav, footer, fonts)
    page.tsx                  ← Home
    games/
      page.tsx
      el-infiltrado/
        page.tsx
        privacy/page.tsx
        terms/page.tsx
  components/                 ← Shared UI components
  lib/
    firebase.ts               ← Firebase init (single instance)
  config/
    games.ts                  ← Game metadata (name, description, links)
```

## Completed
- [ ] Next.js 15 scaffold
- [ ] Tailwind CSS configured
- [ ] Firebase installed

## In Progress / Planned
- [ ] Root layout (nav + footer)
- [ ] Home page (studio hero, game cards)
- [ ] El Infiltrado landing page
- [ ] El Infiltrado privacy page
- [ ] El Infiltrado terms page
- [ ] SEO: metadata, Open Graph, sitemap
- [ ] Vercel deploy + custom domain

## Development Rules
- `npm run dev` to start local server
- Never commit `.env.local`
- All user-facing text in English + Spanish (consider i18n from the start)
- Mobile-first responsive design
- Server Components by default — `'use client'` only when needed
