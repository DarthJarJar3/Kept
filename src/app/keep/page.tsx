import { KeepScreen } from "@/components/keep-screen";

type KeepPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function KeepPage({ searchParams }: KeepPageProps) {
  const { slug } = await searchParams;
  return <KeepScreen slug={slug} />;
}
