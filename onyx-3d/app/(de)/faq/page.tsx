import { FaqPage, faqMetadata } from "@/components/pages/SimplePages";

export const metadata = faqMetadata("de");

export default function Page() {
  return <FaqPage lang="de" />;
}
