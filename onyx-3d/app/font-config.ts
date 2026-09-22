import { Archivo, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

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

/** Headline-Font des Onyx-Logos, für h1/h2/h3 (siehe globals.css). */
const integral = localFont({
  variable: "--font-integral",
  display: "swap",
  src: [
    { path: "./fonts/integral-cf-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/integral-cf-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/integral-cf-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/integral-cf-extra-bold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/integral-cf-heavy.woff2", weight: "900", style: "normal" },
  ],
});

export const fontClassNames = `${archivo.variable} ${instrumentSans.variable} ${plexMono.variable} ${integral.variable}`;
