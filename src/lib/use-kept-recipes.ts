"use client";

import { useSyncExternalStore } from "react";
import {
  findKeptRecipe,
  readKeptRecipes,
} from "@/lib/kept-store";
import type { Recipe } from "@/lib/recipes";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function useKeptRecipes(): Recipe[] {
  return useSyncExternalStore(subscribe, readKeptRecipes, () => []);
}

export function useKeptRecipe(slug: string): Recipe | undefined {
  return useSyncExternalStore(
    subscribe,
    () => findKeptRecipe(slug),
    () => undefined
  );
}
