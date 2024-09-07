import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { GeistSans } from 'geist/font/sans';
import { HeaderProvider } from '../contexts/HeaderContext';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'REST/GraphiQL Client application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <HeaderProvider>
          <Toaster position="bottom-right" />
          <div className="container">
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </div>
        </HeaderProvider>
      </body>
    </html>
  );
}
