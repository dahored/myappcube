import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { studio } from '@/config/studio';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(studio.siteUrl),
  title: {
    default: 'myappcube — Mobile Game Studio',
    template: '%s — myappcube',
  },
  description: 'myappcube crafts fun and unique mobile party games. Download El Infiltrado and more on Android and iOS.',
  keywords: ['mobile games', 'party games', 'android games', 'ios games', 'el infiltrado', 'myappcube', 'juegos movil', 'juegos de fiesta'],
  authors: [{ name: 'myappcube', url: studio.siteUrl }],
  creator: 'myappcube',
  openGraph: {
    type: 'website',
    siteName: 'myappcube',
    title: 'myappcube — Mobile Game Studio',
    description: 'myappcube crafts fun and unique mobile party games.',
    images: [{ url: '/images/logos/logo_myappcube.png', width: 512, height: 512, alt: 'myappcube logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'myappcube — Mobile Game Studio',
    description: 'myappcube crafts fun and unique mobile party games.',
    images: ['/images/logos/logo_myappcube.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&p)){document.documentElement.classList.add('dark');}})();` }} />
      </head>
      <body className={`${geist.variable} font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'myappcube',
              url: studio.siteUrl,
              logo: `${studio.siteUrl}/images/logos/logo_myappcube.png`,
              email: studio.email,
              sameAs: [
                'https://www.instagram.com/myappcube/',
                'https://www.facebook.com/profile.php?id=61586452775068',
                'https://youtube.com/@myappcube',
                studio.googlePlayDeveloperUrl,
              ],
            }),
          }}
        />
        {children}
        {/* AdSense — uncomment when adding ad units to the site
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${studio.adsensePublisherId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </body>
    </html>
  );
}
