import { useSyncExternalStore } from "react";

export type PantryItem = {
  id: string;
  name: string;
};

const STORAGE_KEY = "kept-prototype-pantry";
const SEED_MARKER = "__seed__";

export const STARTER_PANTRY = [
  "chicken",
  "lemon",
  "garlic",
  "olive oil",
  "chicken broth",
  "thyme",
  "rice",
  "lime",
  "cilantro",
  "butter",
  "eggs",
  "flour",
  "sugar",
  "salt",
  "banana",
];

let snapshotRaw: string | null = null;
let snapshotItems: PantryItem[] = starterItems();
const listeners = new Set<() => void>();

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function starterItems(): PantryItem[] {
  return STARTER_PANTRY.map((name) => ({ id: `starter-${name}`, name }));
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function normalize(value: unknown): PantryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const row = item as Partial<PantryItem>;
    if (typeof row.name !== "string" || !row.name.trim()) {
      return [];
    }
    return [{ id: row.id || newId(), name: row.name.trim() }];
  });
}

export function subscribePantry(onStoreChange: () => void) {
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

export function readPantry(): PantryItem[] {
  if (typeof window === "undefined") {
    return snapshotItems;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const key = raw === null ? SEED_MARKER : raw;
  if (key === snapshotRaw) {
    return snapshotItems;
  }
  snapshotRaw = key;
  if (raw === null) {
    snapshotItems = starterItems();
    return snapshotItems;
  }
  try {
    snapshotItems = normalize(JSON.parse(raw));
  } catch {
    snapshotItems = [];
  }
  return snapshotItems;
}

function savePantry(items: PantryItem[]) {
  const next = normalize(items);
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotItems = next;
  emit();
}

export function addPantryItem(name: string) {
  const trimmed = name.trim();
  if (!trimmed) {
    return;
  }
  const items = readPantry();
  const key = trimmed.toLowerCase();
  if (items.some((item) => item.name.toLowerCase() === key)) {
    return;
  }
  savePantry([...items, { id: newId(), name: trimmed }]);
}

export function removePantryItem(id: string) {
  savePantry(readPantry().filter((item) => item.id !== id));
}

const serverPantry = starterItems();

export function usePantry(): PantryItem[] {
  return useSyncExternalStore(subscribePantry, readPantry, () => serverPantry);
}
