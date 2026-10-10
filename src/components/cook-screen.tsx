"use client";

import { SiteHeader } from "@/components/site-header";
import { PageShell } from "@/components/page-shell";
import { CookMode } from "@/components/cook-mode";
import { AppButton } from "@/components/app-button";
import { useKeptRecipe } from "@/lib/use-kept-recipes";
import type { Recipe } from "@/lib/recipes";

export function CookScreen({
  slug,
  baked,
}: {
  slug: string;
  baked: Recipe | null;
}) {
  const stored = useKeptRecipe(slug);
  const recipe = stored ?? baked ?? null;

  if (!recipe) {
    return (
      <div className="flex min-h-full flex-col">
        <SiteHeader current="recipe" />
        <PageShell>
          <h1 className="text-3xl">That recipe is not here</h1>
          <p className="mt-2 text-muted-foreground">
            It may have been a prototype keep that only lived in another
            browser.
          </p>
          <AppButton href="/kitchen" className="mt-4">
            Back to Recipes
          </AppButton>
        </PageShell>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="recipe" />
      <PageShell wide>
        <CookMode recipe={recipe} />
      </PageShell>
    </div>
  );
}
