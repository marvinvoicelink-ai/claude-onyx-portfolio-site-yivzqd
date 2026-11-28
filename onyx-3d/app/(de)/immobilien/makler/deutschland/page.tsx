import MaklerPage, { maklerMetadata } from "@/components/pages/MaklerPage";

// Zielseite der Makler-Anzeigen in Deutschland (Stadtvilla, ImmoScout24/Immowelt statt Idealista).
export const metadata = maklerMetadata("de");

export default function Page() {
  return <MaklerPage markt="de" />;
}
