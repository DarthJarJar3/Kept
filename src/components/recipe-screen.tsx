"use client";

import { SiteHeader } from "@/components/site-header";
import { RecipeView } from "@/components/recipe-view";
import { useKeptRecipe } from "@/lib/use-kept-recipes";
import type { Recipe } from "@/lib/recipes";

export function RecipeScreen({
  slug,
  baked,
}: {
  slug: string;
  baked: Recipe | null;
}) {
  const stored = useKeptRecipe(slug);
  const recipe = baked ?? stored ?? null;

  if (!recipe) {
    return (
      <div className="flex min-h-full flex-col">
        <SiteHeader current="recipe" />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="text-3xl">That recipe is not here</h1>
          <p className="mt-2 text-muted-foreground">
            It may have been a prototype keep that only lived in another
            browser.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="recipe" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <RecipeView recipe={recipe} />
      </main>
    </div>
  );
}
