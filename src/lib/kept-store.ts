import type { CookEvent, Recipe } from "@/lib/recipes";

const STORAGE_KEY = "kept-prototype-recipes";
const REMOVED_KEY = "kept-prototype-removed-slugs";

let snapshotRaw: string | null = null;
let snapshotRecipes: Recipe[] = [];
let removedSnapshotRaw: string | null = null;
let snapshotRemoved: string[] = [];
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

function writeKeptRecipes(next: Recipe[]) {
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotRecipes = next;
}

export function readRemovedSlugs(): string[] {
  if (typeof window === "undefined") {
    return snapshotRemoved;
  }

  const raw = window.localStorage.getItem(REMOVED_KEY);
  if (raw === removedSnapshotRaw) {
    return snapshotRemoved;
  }

  removedSnapshotRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    snapshotRemoved = Array.isArray(parsed)
      ? parsed.filter((slug) => typeof slug === "string" && slug.length > 0)
      : [];
  } catch {
    snapshotRemoved = [];
  }
  return snapshotRemoved;
}

function writeRemovedSlugs(next: string[]) {
  const unique = [...new Set(next)];
  const raw = JSON.stringify(unique);
  window.localStorage.setItem(REMOVED_KEY, raw);
  removedSnapshotRaw = raw;
  snapshotRemoved = unique;
}

function clearRemovedSlug(slug: string) {
  const current = readRemovedSlugs();
  if (!current.includes(slug)) {
    return;
  }
  writeRemovedSlugs(current.filter((item) => item !== slug));
}

export function isRecipeRemoved(slug: string) {
  return readRemovedSlugs().includes(slug);
}

export function saveKeptRecipe(recipe: Recipe) {
  clearRemovedSlug(recipe.slug);
  const next = [
    recipe,
    ...readKeptRecipes().filter((item) => item.slug !== recipe.slug),
  ];
  writeKeptRecipes(next);
  emit();
}

export function findKeptRecipe(slug: string) {
  return readKeptRecipes().find((recipe) => recipe.slug === slug);
}

export function upsertRecipe(recipe: Recipe) {
  saveKeptRecipe(recipe);
}

export function removeRecipeFromCatalog(slug: string) {
  const kept = readKeptRecipes().filter((recipe) => recipe.slug !== slug);
  writeKeptRecipes(kept);

  const removed = readRemovedSlugs();
  if (!removed.includes(slug)) {
    writeRemovedSlugs([...removed, slug]);
  }

  emit();
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
