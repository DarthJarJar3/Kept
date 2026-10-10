"use client";

import { useSyncExternalStore } from "react";
import {
  findKeptRecipe,
  isRecipeRemoved,
  readKeptRecipes,
  readRemovedSlugs,
  subscribeKept,
} from "@/lib/kept-store";
import type { Recipe } from "@/lib/recipes";

const emptyRecipes: Recipe[] = [];
const emptyRemoved: string[] = [];

export function useKeptRecipes(): Recipe[] {
  return useSyncExternalStore(subscribeKept, readKeptRecipes, () => emptyRecipes);
}

export function useRemovedSlugs(): string[] {
  return useSyncExternalStore(
    subscribeKept,
    readRemovedSlugs,
    () => emptyRemoved
  );
}

export function useKeptRecipe(slug: string): Recipe | undefined {
  return useSyncExternalStore(
    subscribeKept,
    () => (isRecipeRemoved(slug) ? undefined : findKeptRecipe(slug)),
    () => undefined
  );
}

export function useRecipeRemoved(slug: string): boolean {
  return useSyncExternalStore(
    subscribeKept,
    () => isRecipeRemoved(slug),
    () => false
  );
}
