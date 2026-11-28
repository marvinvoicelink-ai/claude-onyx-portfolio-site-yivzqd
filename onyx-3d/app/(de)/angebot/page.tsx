import AngebotPage, { angebotMetadata } from "@/components/pages/AngebotPage";

export const metadata = angebotMetadata("de");

export default function Page() {
  return <AngebotPage lang="de" />;
}
