import type { Metadata } from "next";
import BranchePage, { brancheMetadata, industryParams } from "@/components/pages/BranchePage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industryParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return brancheMetadata(slug, "de");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <BranchePage slug={slug} lang="de" />;
}
