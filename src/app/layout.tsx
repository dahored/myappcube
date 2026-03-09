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
  title: 'myappcube — Mobile Game Studio',
  description: 'We craft fun and unique mobile games.',
  openGraph: {
    title: 'myappcube',
    description: 'We craft fun and unique mobile games.',
    images: ['/images/logos/logo_myappcube.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&p)){document.documentElement.classList.add('dark');}})();` }} />
      </head>
      <body className={`${geist.variable} font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 min-h-screen flex flex-col`}>
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
