"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  allTags,
  folders,
  getFolderCount,
  recipes,
  type Recipe,
} from "@/lib/recipes";

export function KitchenBoard() {
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery =
        !needle ||
        recipe.title.toLowerCase().includes(needle) ||
        recipe.tags.some((item) => item.includes(needle)) ||
        recipe.folder.toLowerCase().includes(needle);
      const matchesFolder = !folder || recipe.folder === folder;
      const matchesTag = !tag || recipe.tags.includes(tag);
      return matchesQuery && matchesFolder && matchesTag;
    });
  }, [folder, query, tag]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl">My kitchen</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Find a recipe you already made work — by name, folder, or tag.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search kept recipes"
          className="h-11 bg-card pl-9"
          aria-label="Search kept recipes"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {folders.map((item) => (
          <FilterChip
            key={item}
            label={`${item} (${getFolderCount(item)})`}
            active={folder === item}
            onClick={() => setFolder((current) => (current === item ? null : item))}
          />
        ))}
        {allTags.map((item) => (
          <FilterChip
            key={item}
            label={`#${item}`}
            active={tag === item}
            onClick={() => setTag((current) => (current === item ? null : item))}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <p className="font-medium">No kept recipes match that.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Clear a folder or tag, or try a different name.
          </p>
          <button
            type="button"
            className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
            onClick={() => {
              setQuery("");
              setFolder(null);
              setTag(null);
            }}
          >
            Show everything
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
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

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
          : "rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-accent"
      }
    >
      {label}
    </button>
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
        <Badge variant="secondary">{recipe.folder}</Badge>
        {recipe.tags.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
