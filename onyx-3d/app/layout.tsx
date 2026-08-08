import type { Metadata } from "next";
import { Archivo, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const title = "Onyx.AI — White-Label-Systeme. Gebaut. Übergeben. Deins.";
const description =
  "Onyx.AI baut dir dein eigenes System — spezialisiert auf Handwerk & Bau, offen für jede Branche. Dashboards, Portale, interne Tools. Im White-Label, vollständig übergeben, auf deiner Infrastruktur, unter deiner Marke.";

export const metadata: Metadata = {
  metadataBase: new URL("https://onyx-ai.de"),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "de_DE",
    type: "website",
    images: ["/generated/chaos-to-portal.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/generated/chaos-to-portal.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${instrumentSans.variable} ${plexMono.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <Nav />
        {/* Static, always-rendered duplicate of the "contact" form so Netlify's
            build-time bot reliably registers the form and every field name,
            even though the real forms (ContactSection, MidFormSection) are
            client-rendered React components. */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message" />
          <input type="text" name="bot-field" />
        </form>
        <div id="main-content">{children}</div>
        <CookieConsent />
      </body>
    </html>
  );
}
