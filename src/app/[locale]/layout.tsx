import type { Metadata } from 'next';
import '../../styles/globals.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { GeistSans } from 'geist/font/sans';
import { HeaderProvider } from '@/src/contexts/HeaderContext';
import { ParamsProvider } from '@/src/contexts/ParamsContext';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'REST/GraphiQL Client application',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={GeistSans.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <HeaderProvider>
            <ParamsProvider>
              <Toaster position="bottom-right" />
              <div className="container">
                <Header />
                <main className="main">{children}</main>
                <Footer />
              </div>
            </ParamsProvider>
          </HeaderProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
