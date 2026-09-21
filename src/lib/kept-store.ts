import type { CookEvent, Recipe } from "@/lib/recipes";

const STORAGE_KEY = "kept-prototype-recipes";

let snapshotRaw: string | null = null;
let snapshotRecipes: Recipe[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeKept(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStoreChange);
  }
  return () => {
    listeners.delete(onStoreChange);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStoreChange);
    }
  };
}

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
  emit();
}

export function findKeptRecipe(slug: string) {
  return readKeptRecipes().find((recipe) => recipe.slug === slug);
}

export function upsertRecipe(recipe: Recipe) {
  saveKeptRecipe(recipe);
}

export function addCookEvent(recipe: Recipe, event: Omit<CookEvent, "id">) {
  const next: Recipe = {
    ...recipe,
    lastCooked: event.kind === "made" ? "Today" : recipe.lastCooked,
    cookLog: [
      { ...event, id: `${Date.now()}` },
      ...(recipe.cookLog ?? []),
    ],
  };
  saveKeptRecipe(next);
  return next;
}
