import type { Recipe } from "@/lib/recipes";

const STORAGE_KEY = "kept-prototype-recipes";

let snapshotRaw: string | null = null;
let snapshotRecipes: Recipe[] = [];

export function slugifyTitle(title: string) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "kept-recipe"}-${Date.now().toString().slice(-6)}`;
}

export function readKeptRecipes(): Recipe[] {
  if (typeof window === "undefined") {
    return snapshotRecipes;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === snapshotRaw) {
    return snapshotRecipes;
  }

  snapshotRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Recipe[]) : [];
    snapshotRecipes = Array.isArray(parsed) ? parsed : [];
  } catch {
    snapshotRecipes = [];
  }
  return snapshotRecipes;
}

export function saveKeptRecipe(recipe: Recipe) {
  const next = [
    recipe,
    ...readKeptRecipes().filter((item) => item.slug !== recipe.slug),
  ];
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotRecipes = next;
}

export function findKeptRecipe(slug: string) {
  return readKeptRecipes().find((recipe) => recipe.slug === slug);
}
