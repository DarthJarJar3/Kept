"use client";

import { useSyncExternalStore } from "react";
import {
  findKeptRecipe,
  readKeptRecipes,
  subscribeKept,
} from "@/lib/kept-store";
import type { Recipe } from "@/lib/recipes";

export function useKeptRecipes(): Recipe[] {
  return useSyncExternalStore(subscribeKept, readKeptRecipes, () => []);
}

export function useKeptRecipe(slug: string): Recipe | undefined {
  return useSyncExternalStore(
    subscribeKept,
    () => findKeptRecipe(slug),
    () => undefined
  );
}
