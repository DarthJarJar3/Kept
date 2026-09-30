"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Heart, Plus, Search } from "lucide-react";
import { AppButton } from "@/components/app-button";
import { useKeptRecipes } from "@/lib/use-kept-recipes";
import {
  allTags as seedTags,
  filterRecipes,
  folders,
  kitchenHref,
  mergeRecipeLists,
  recipes as seedRecipes,
  type Recipe,
} from "@/lib/recipes";

type KitchenBoardProps = {
  folder?: string;
  tag?: string;
  query?: string;
  favorite?: boolean;
};

export function KitchenBoard({
  folder,
  tag,
  query = "",
  favorite = false,
}: KitchenBoardProps) {
  const kept = useKeptRecipes();
  const recipes = mergeRecipeLists(kept, seedRecipes);
  const tags = Array.from(
    new Set([...seedTags, ...kept.flatMap((recipe) => recipe.tags), "favorites"])
  ).sort();
  const visible = filterRecipes({
    folder,
    tag: tag === "favorites" ? undefined : tag,
    query,
    favorite: favorite || tag === "favorites",
    list: recipes,
  });

  function folderCount(name: string) {
    return recipes.filter((recipe) => recipe.folder === name).length;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">My Kitchen</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Find a recipe you already made work — by folder, tag, favorite, name,
            or an ingredient.
          </p>
        </div>
        <AppButton href="/keep" className="w-full sm:w-auto">
          <Plus className="size-4" />
          Keep a recipe
        </AppButton>
      </div>

      <form action="/kitchen" method="get" className="relative max-w-xl">
        {folder ? <input type="hidden" name="folder" value={folder} /> : null}
        {tag ? <input type="hidden" name="tag" value={tag} /> : null}
        {favorite ? <input type="hidden" name="favorite" value="1" /> : null}
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          name="q"
          defaultValue={query}
          placeholder="Search names, tags, or ingredients"
          aria-label="Search kept recipes"
          className="h-12 w-full rounded-full border border-border bg-card pr-24 pl-10 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring"
        />
        <AppButton type="submit" className="absolute top-1/2 right-1.5 min-h-9 -translate-y-1/2 px-3">
          Find
        </AppButton>
      </form>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {recipes.length}
        {folder ? ` in ${folder}` : ""}
        {tag ? ` tagged ${tag}` : ""}
        {favorite ? " in Favorites" : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <FilterGroup
          title="Folders"
          hint="One place you would look"
          legend="Filter by folder"
        >
          {folders.map((item) => (
            <FilterChip
              key={item}
              href={kitchenHref({
                folder: folder === item ? undefined : item,
                tag,
                query,
                favorite,
              })}
              label={`${item} (${folderCount(item)})`}
              kind="folder"
              active={folder === item}
            />
          ))}
        </FilterGroup>
        <FilterGroup
          title="Tags"
          hint="Find the same recipe another way"
          legend="Filter by tag"
        >
          <FilterChip
            href={kitchenHref({
              folder,
              tag,
              query,
              favorite: !favorite,
            })}
            label={`Favorites (${recipes.filter((recipe) => recipe.favorite).length})`}
            kind="tag"
            active={favorite}
          />
          {tags
            .filter((item) => item !== "favorites")
            .map((item) => (
              <FilterChip
                key={item}
                href={kitchenHref({
                  folder,
                  tag: tag === item ? undefined : item,
                  query,
                  favorite,
                })}
                label={item}
                kind="tag"
                active={tag === item}
              />
            ))}
        </FilterGroup>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <p className="font-medium">No kept recipes match that.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Clear a folder or tag, or try a different name or ingredient.
          </p>
          <AppButton href="/kitchen" variant="secondary" className="mt-4">
            Show everything
          </AppButton>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((recipe) => (
            <li key={recipe.slug}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  hint,
  legend,
  children,
}: {
  title: string;
  hint: string;
  legend: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={legend}
      className="rounded-3xl border border-border bg-card p-4 shadow-mealtime"
    >
      <div className="mb-3">
        <p className="font-heading text-lg leading-none">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  kind,
  active,
}: {
  href: string;
  label: string;
  kind: "folder" | "tag";
  active: boolean;
}) {
  return (
    <AppButton
      href={href}
      aria-current={active ? "true" : undefined}
      variant={active ? "primary" : kind === "folder" ? "peach" : "secondary"}
    >
      {label}
    </AppButton>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="block h-full overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-mealtime transition-transform hover:-translate-y-0.5"
    >
      {recipe.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={recipe.photo}
          alt=""
          className="h-40 w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="flex h-28 items-center justify-center rounded-2xl bg-secondary text-4xl">
          {recipe.emoji}
        </div>
      )}
      <div className="px-2 pt-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg leading-snug">{recipe.title}</h2>
          {recipe.favorite ? (
            <Heart className="size-4 shrink-0 fill-primary text-primary" />
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{recipe.whyKept}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
            {recipe.folder}
          </span>
          {recipe.tags.map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
