import type { Metadata } from "next";
import RootShell from "@/components/RootShell";

const title = "Onyx.AI — Sistemas en marca blanca. Construidos. Entregados. Tuyos.";
const description =
  "Onyx.AI construye tu propio sistema para empresas medianas de cualquier sector: paneles, portales, herramientas internas y agentes de IA. En marca blanca, entregado por completo, en tu infraestructura y bajo tu marca.";

export const metadata: Metadata = {
  metadataBase: new URL("https://onyx-ai.de"),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "es_ES",
    alternateLocale: ["de_DE"],
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

export default function EsRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="es">{children}</RootShell>;
}
