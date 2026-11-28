import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImmobilienPage, { immobilienMetadata, immobilienVariantenParams } from "@/components/pages/ImmobilienPage";
import { varianteZu } from "@/components/immobilien/varianten";

// Ein Einstieg pro Anzeige (/immobilien/einrichtung, /zeitraffer, /projektseite, /rundgang)
// und je eine Seite pro Zielgruppe (/immobilien/bautraeger, /makler).
type Props = { params: Promise<{ variante: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return immobilienVariantenParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variante } = await params;
  return immobilienMetadata(variante);
}

export default async function Page({ params }: Props) {
  const { variante } = await params;
  const v = varianteZu(variante);
  if (!v) notFound();
  return <ImmobilienPage variante={v} />;
}
