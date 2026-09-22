import { KiAgentenPage, kiAgentenMetadata } from "@/components/pages/AgentPages";

export const metadata = kiAgentenMetadata("de");

export default function Page() {
  return <KiAgentenPage lang="de" />;
}
