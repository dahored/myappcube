---
name: code-review
description: Use this skill when the user asks for a code review, asks to review changes, or asks if code follows the project's conventions and best practices.
---

# Code Review Checklist — myappcube web

## HTML / JSX
- [ ] Semantic tags used: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- [ ] All images use `next/image` (`<Image>`) — never `<img>`
- [ ] All internal links use `next/link` (`<Link>`) — never `<a href>`
- [ ] All images have descriptive `alt` text
- [ ] Form inputs have associated `<label>` elements

## TypeScript
- [ ] No `any` types
- [ ] Props interfaces defined near the component
- [ ] Server vs Client components typed correctly (no `useState` in Server Components)

## Next.js App Router
- [ ] Pages that need interactivity have `'use client'` at the top
- [ ] Static pages use Server Components (no `'use client'`) for best SEO/performance
- [ ] Metadata exported from `layout.tsx` or `page.tsx` (`export const metadata`)
- [ ] Dynamic routes use `generateStaticParams` for static generation
- [ ] `loading.tsx` / `error.tsx` present for routes that fetch data

## Tailwind CSS
- [ ] No inline `style={{}}` — all styles via Tailwind classes
- [ ] Responsive: uses `sm:`, `md:`, `lg:` breakpoints — mobile-first
- [ ] No magic numbers — use Tailwind spacing scale (`p-4`, `mt-8`, not `p-[17px]`)
- [ ] Dark mode classes used if dark mode supported (`dark:`)

## Firebase
- [ ] Firebase config imported from `@/lib/firebase` — never duplicated
- [ ] No Firebase secrets in client code — use environment variables
- [ ] Firestore reads in Server Components or API routes where possible
- [ ] Auth state managed via a single context/hook — not scattered across components

## Performance & SEO
- [ ] Each page exports `metadata` with `title` and `description`
- [ ] Open Graph tags set for shareable pages (game landing pages)
- [ ] No `useEffect` for data that could be fetched server-side
- [ ] Images specify `width` and `height` (or `fill` with a sized container)

## Environment Variables
- [ ] Public vars prefixed with `NEXT_PUBLIC_`
- [ ] No secrets in `NEXT_PUBLIC_*` variables
- [ ] `.env.local` in `.gitignore` — never committed
