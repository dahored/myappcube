import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://myappcube.com'),
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5119314285197382"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
