import { CookScreen } from "@/components/cook-screen";
import { getRecipe } from "@/lib/recipes";

type CookPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CookPage({ params }: CookPageProps) {
  const { slug } = await params;
  return <CookScreen slug={slug} baked={getRecipe(slug) ?? null} />;
}
