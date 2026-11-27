import ImmobilienPage, { immobilienMetadata } from "@/components/pages/ImmobilienPage";

export const metadata = immobilienMetadata();

export default function Page() {
  return <ImmobilienPage />;
}
