"use client";

import Image from "next/image";
import { KeepRecipeForm } from "@/components/keep-recipe-form";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";
import { mergeRecipeLists } from "@/lib/recipes";
import { useKeptRecipes, useRemovedSlugs } from "@/lib/use-kept-recipes";

export function KeepScreen({ slug }: { slug?: string }) {
  const kept = useKeptRecipes();
  const removed = useRemovedSlugs();
  const initial = slug
    ? mergeRecipeLists(kept, undefined, removed).find(
        (recipe) => recipe.slug === slug
      )
    : undefined;
  const editing = Boolean(initial);
  const title = editing ? "Edit this recipe" : "Add a recipe";
  const lede = editing
    ? "Change the amounts, notes, or photo — this stays the version you cook from."
    : "Paste a link, or write the version you already make. It joins your catalogue.";

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="keep" />
      <section
        className="keep-hero"
        aria-label={editing ? "Edit recipe" : "Add a recipe"}
      >
        <Image
          src="/keep-food.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="keep-hero-media"
        />
        <div className="keep-hero-scrim" aria-hidden="true" />
        <div className="keep-hero-content">
          <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">{title}</h1>
          <p className="keep-hero-lede mt-2">{lede}</p>
        </div>
      </section>
      <PageShell>
        <KeepRecipeForm
          key={`${slug ?? "new"}-${initial ? "loaded" : "empty"}`}
          initial={initial}
        />
      </PageShell>
    </div>
  );
}
