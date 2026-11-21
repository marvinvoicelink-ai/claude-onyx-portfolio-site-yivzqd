import type { Metadata } from "next";
import RootShell from "@/components/RootShell";

const title = "Onyx.AI — White-Label-Systeme. Gebaut. Übergeben. Deins.";
const description =
  "Onyx.AI baut dir dein eigenes System — spezialisiert auf mittelständische Unternehmen, egal aus welcher Branche. Dashboards, Portale, interne Tools, KI-Agenten. Im White-Label, vollständig übergeben, auf deiner Infrastruktur, unter deiner Marke.";

export const metadata: Metadata = {
  metadataBase: new URL("https://onyx-ai.de"),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "de_DE",
    alternateLocale: ["es_ES"],
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

export default function DeRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="de">{children}</RootShell>;
}
