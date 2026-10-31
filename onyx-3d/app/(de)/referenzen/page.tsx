import ReferenzenPage, { referenzenMetadata } from "@/components/pages/ReferenzenPage";

export const metadata = referenzenMetadata("de");

export default function Page() {
  return <ReferenzenPage lang="de" />;
}
