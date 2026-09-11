import Link from "next/link";
import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  allTags,
  filterRecipes,
  folders,
  getFolderCount,
  kitchenHref,
  recipes,
  type Recipe,
} from "@/lib/recipes";

type KitchenBoardProps = {
  folder?: string;
  tag?: string;
  query?: string;
};

export function KitchenBoard({ folder, tag, query = "" }: KitchenBoardProps) {
  const visible = filterRecipes({ folder, tag, query });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl">My kitchen</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Find a recipe you already made work — by the folder you would look in,
          or a tag that lives on more than one shelf.
        </p>
      </div>

      <form action="/kitchen" method="get" className="relative max-w-md">
        {folder ? <input type="hidden" name="folder" value={folder} /> : null}
        {tag ? <input type="hidden" name="tag" value={tag} /> : null}
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          name="q"
          defaultValue={query}
          placeholder="Search kept recipes"
          aria-label="Search kept recipes"
          className="h-11 w-full rounded-lg border border-input bg-card pr-20 pl-9 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
        >
          Find
        </button>
      </form>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {recipes.length}
        {folder ? ` in ${folder}` : ""}
        {tag ? ` tagged ${tag}` : ""}
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
              })}
              label={`${item} (${getFolderCount(item)})`}
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
          {allTags.map((item) => (
            <FilterChip
              key={item}
              href={kitchenHref({
                folder,
                tag: tag === item ? undefined : item,
                query,
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
            Clear a folder or tag, or try a different name.
          </p>
          <Link
            href="/kitchen"
            className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Show everything
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2" data-recipe-count={visible.length}>
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
      className="rounded-2xl border border-border bg-card p-4"
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
  const shape = kind === "folder" ? "rounded-lg" : "rounded-full";
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={
        active
          ? `inline-flex ${shape} bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground`
          : kind === "folder"
            ? `inline-flex ${shape} bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-accent`
            : `inline-flex ${shape} border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted`
      }
    >
      {label}
    </Link>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="block h-full rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-[oklch(0.99_0.015_55)]"
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl"
        >
          {recipe.emoji}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg leading-snug">{recipe.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{recipe.whyKept}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="rounded-md">
          {recipe.folder}
        </Badge>
        {recipe.tags.map((item) => (
          <Badge key={item} variant="outline" className="rounded-full">
            {item}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
