"use client";

import { KeepRecipeForm } from "@/components/keep-recipe-form";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";
import { mergeRecipeLists } from "@/lib/recipes";
import { useKeptRecipes } from "@/lib/use-kept-recipes";

export function KeepScreen({ slug }: { slug?: string }) {
  const kept = useKeptRecipes();
  const initial = slug
    ? mergeRecipeLists(kept).find((recipe) => recipe.slug === slug)
    : undefined;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="keep" />
      <PageShell>
        <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">
          {initial ? "Edit this recipe" : "Add a recipe"}
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          {initial
            ? "Change the amounts, notes, or photo — this stays the version you cook from."
            : "Paste a link, or write the version you already make. It joins your catalogue."}
        </p>
        <div className="mt-8">
          <KeepRecipeForm
            key={`${slug ?? "new"}-${initial ? "loaded" : "empty"}`}
            initial={initial}
          />
        </div>
      </PageShell>
    </div>
  );
}
