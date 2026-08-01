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

export const metadata: Metadata = {
  title: "Onyx.AI — White-Label-Systeme. Gebaut. Übergeben. Deins.",
  description:
    "Onyx baut dir dein eigenes System — Dashboards, Portale, interne Tools. Im White-Label, vollständig übergeben, auf deiner Infrastruktur, unter deiner Marke.",
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
        <Nav />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
