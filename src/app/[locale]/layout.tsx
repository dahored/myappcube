import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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

  return (
    <NextIntlClientProvider messages={messages}>
      <LangAttribute locale={locale} />
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
