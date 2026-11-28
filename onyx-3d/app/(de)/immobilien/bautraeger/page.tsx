import BautraegerPage, { bautraegerMetadata } from "@/components/pages/BautraegerPage";

// Zielseite der Bauträger-Anzeigen (eigene Seite, nicht eine Variante von /immobilien).
export const metadata = bautraegerMetadata("es");

export default function Page() {
  return <BautraegerPage />;
}
