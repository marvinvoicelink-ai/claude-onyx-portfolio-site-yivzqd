import type { Metadata, Viewport } from 'next';
// Onyx-Hausschriften, selbst gehostet: kein Nachladen von fremden Servern,
// die Anwendung startet auch ohne Internet.
import '@fontsource-variable/archivo';
import '@fontsource-variable/instrument-sans';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wertakte',
  description:
    'Objekt- und Gutachtenverwaltung für Immobiliensachverständige: Akten, Fristen, Fotodokumentation und Gutachten-Entwurf an einem Ort.',
};

export const viewport: Viewport = {
  themeColor: '#101010',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="onyx">
      <body>{children}</body>
    </html>
  );
}
