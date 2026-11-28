import MaklerPage, { maklerMetadata } from "@/components/pages/MaklerPage";

// Zielseite der Makler-Anzeigen (eigene Seite, nicht eine Variante von /immobilien).
export const metadata = maklerMetadata("es");

export default function Page() {
  return <MaklerPage />;
}
