import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LangAttribute from '@/components/LangAttribute';
import ComingSoon from '@/components/ui/ComingSoon';
import { studio } from '@/config/studio';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound();
  }

  if (studio.comingSoon) {
    return <ComingSoon />;
  }

  const messages = await getMessages();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isTvMode = pathname.includes('/tv-mode');

  return (
    <NextIntlClientProvider messages={messages}>
      <LangAttribute locale={locale} />
      {!isTvMode && <Header />}
      <main className={isTvMode ? 'flex-1' : 'flex-1 pt-16'}>{children}</main>
      {!isTvMode && <Footer />}
    </NextIntlClientProvider>
  );
}
