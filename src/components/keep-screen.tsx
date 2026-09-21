"use client";

import { useSearchParams } from "next/navigation";
import { KeepRecipeForm } from "@/components/keep-recipe-form";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";
import { mergeRecipeLists } from "@/lib/recipes";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useKeptRecipes } from "@/lib/use-kept-recipes";

export function KeepScreen() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? undefined;
  const kept = useKeptRecipes();
  const mounted = useHasMounted();
  const initial = slug
    ? mergeRecipeLists(kept).find((recipe) => recipe.slug === slug)
    : undefined;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="keep" />
      <PageShell>
        <p className="text-sm text-muted-foreground">
          Save it the way you actually make it — folder, tags, a photo, and your
          amounts.
        </p>
        <h1 className="mt-2 text-[clamp(1.75rem,3vw+1rem,2.5rem)]">
          {initial ? "Edit this recipe" : "Keep a recipe"}
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          This is a visual prototype. It stays in this browser so you can open it
          from My Kitchen and see the same details as the other kept recipes.
        </p>
        <div className="mt-8">
          {!mounted ? (
            <p className="text-muted-foreground">Opening the keep form…</p>
          ) : (
            <KeepRecipeForm
              key={`${slug ?? "new"}-${initial ? "loaded" : "empty"}`}
              initial={initial}
            />
          )}
        </div>
      </PageShell>
    </div>
  );
}
