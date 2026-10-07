"use client";

import { useSyncExternalStore } from "react";
import {
  findKeptRecipe,
  readKeptRecipes,
  subscribeKept,
} from "@/lib/kept-store";
import type { Recipe } from "@/lib/recipes";

const emptyRecipes: Recipe[] = [];

export function useKeptRecipes(): Recipe[] {
  return useSyncExternalStore(subscribeKept, readKeptRecipes, () => emptyRecipes);
}

export function useKeptRecipe(slug: string): Recipe | undefined {
  return useSyncExternalStore(
    subscribeKept,
    () => findKeptRecipe(slug),
    () => undefined
  );
}
