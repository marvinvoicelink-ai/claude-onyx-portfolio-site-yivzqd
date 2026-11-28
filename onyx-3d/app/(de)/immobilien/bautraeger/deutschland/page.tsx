import BautraegerPage, { bautraegerMetadata } from "@/components/pages/BautraegerPage";

// Zielseite der Bauträger-Anzeigen in Deutschland (Mehrfamilienhaus statt Mallorca-Villa).
export const metadata = bautraegerMetadata("de");

export default function Page() {
  return <BautraegerPage markt="de" />;
}
