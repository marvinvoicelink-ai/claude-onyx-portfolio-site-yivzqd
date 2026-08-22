import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wertakte',
  description:
    'Objekt- und Gutachtenverwaltung für Immobiliensachverständige: Akten, Fristen, Fotodokumentation und Gutachten-Entwurf an einem Ort.',
};

export const viewport: Viewport = {
  themeColor: '#191D21',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
