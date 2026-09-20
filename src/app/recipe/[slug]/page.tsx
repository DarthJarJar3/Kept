import { RecipeScreen } from "@/components/recipe-screen";
import { getRecipe } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  return <RecipeScreen slug={slug} baked={getRecipe(slug) ?? null} />;
}
