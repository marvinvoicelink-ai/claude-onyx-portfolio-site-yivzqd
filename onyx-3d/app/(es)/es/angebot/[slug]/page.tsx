import type { Metadata } from "next";
import AngebotDetailPage, { angebotDetailMetadata, offeringParams } from "@/components/pages/AngebotDetailPage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offeringParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return angebotDetailMetadata(slug, "es");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <AngebotDetailPage slug={slug} lang="es" />;
}
