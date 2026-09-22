import { useSyncExternalStore } from "react";

export const AISLES = [
  "Produce",
  "Dairy",
  "Meat",
  "Frozen",
  "Baking",
  "Pantry",
  "Other",
] as const;

export type Aisle = (typeof AISLES)[number];

export type GroceryItem = {
  id: string;
  name: string;
  amount: string;
  aisle: Aisle;
  checked: boolean;
  recipes: string[];
};

export type GroceryDraft = {
  name: string;
  amount: string;
  recipeTitle?: string;
};

const STORAGE_KEY = "kept-prototype-grocery";

let snapshotRaw: string | null = null;
let snapshotItems: GroceryItem[] = [];
const listeners = new Set<() => void>();

const AISLE_WORDS: { aisle: Aisle; words: string[] }[] = [
  { aisle: "Frozen", words: ["frozen"] },
  {
    aisle: "Baking",
    words: ["flour", "sugar", "vanilla", "chocolate", "yeast", "cocoa", "baking", "walnut"],
  },
  {
    aisle: "Dairy",
    words: ["butter", "milk", "cheese", "yogurt", "yoghurt", "cream", "egg"],
  },
  {
    aisle: "Meat",
    words: ["chicken", "beef", "salmon", "pork", "thigh", "roast", "bacon", "fish"],
  },
  {
    aisle: "Produce",
    words: [
      "lemon",
      "lime",
      "onion",
      "garlic",
      "carrot",
      "broccoli",
      "cilantro",
      "thyme",
      "banana",
      "herb",
      "lettuce",
      "tomato",
      "potato",
      "apple",
    ],
  },
  {
    aisle: "Pantry",
    words: [
      "rice",
      "broth",
      "oil",
      "soy",
      "honey",
      "salt",
      "pasta",
      "bean",
      "starter",
      "vinegar",
      "stock",
    ],
  },
];

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function guessAisle(name: string): Aisle {
  const text = name.toLowerCase();
  if (/\b(broth|stock|paste|oil|rice|honey|soy|vinegar|salt)\b/.test(text)) {
    return "Pantry";
  }
  for (const group of AISLE_WORDS) {
    if (group.words.some((word) => text.includes(word))) {
      return group.aisle;
    }
  }
  return "Other";
}

function itemKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function normalizeItems(value: unknown): GroceryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const row = item as Partial<GroceryItem>;
    if (typeof row.name !== "string" || !row.name.trim()) {
      return [];
    }
    const aisle = AISLES.includes(row.aisle as Aisle) ? (row.aisle as Aisle) : guessAisle(row.name);
    return [
      {
        id: row.id || newId(),
        name: row.name.trim(),
        amount: typeof row.amount === "string" ? row.amount : "",
        aisle,
        checked: Boolean(row.checked),
        recipes: Array.isArray(row.recipes)
          ? row.recipes.filter((title): title is string => typeof title === "string")
          : [],
      },
    ];
  });
}

export function subscribeGrocery(onStoreChange: () => void) {
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

export function readGrocery(): GroceryItem[] {
  if (typeof window === "undefined") {
    return snapshotItems;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === snapshotRaw) {
    return snapshotItems;
  }
  snapshotRaw = raw;
  try {
    snapshotItems = normalizeItems(raw ? JSON.parse(raw) : []);
  } catch {
    snapshotItems = [];
  }
  return snapshotItems;
}

function saveGrocery(items: GroceryItem[]) {
  const next = normalizeItems(items);
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotItems = next;
  emit();
}

export function addIngredientsToGrocery(drafts: GroceryDraft[]) {
  const items = [...readGrocery()];
  for (const draft of drafts) {
    const name = draft.name.trim();
    if (!name) {
      continue;
    }
    const key = itemKey(name);
    const existing = items.find((item) => itemKey(item.name) === key && !item.checked);
    const title = draft.recipeTitle?.trim();
    if (existing) {
      if (title && !existing.recipes.includes(title)) {
        existing.recipes = [...existing.recipes, title];
      }
      if (draft.amount && draft.amount !== existing.amount && !existing.amount.includes(draft.amount)) {
        existing.amount = existing.amount
          ? `${existing.amount} + ${draft.amount}`
          : draft.amount;
      }
      continue;
    }
    items.push({
      id: newId(),
      name,
      amount: draft.amount.trim(),
      aisle: guessAisle(name),
      checked: false,
      recipes: title ? [title] : [],
    });
  }
  saveGrocery(items);
}

export function toggleGroceryItem(id: string) {
  saveGrocery(
    readGrocery().map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
  );
}

export function setGroceryAisle(id: string, aisle: Aisle) {
  saveGrocery(
    readGrocery().map((item) => (item.id === id ? { ...item, aisle } : item))
  );
}

export function clearCheckedGrocery() {
  saveGrocery(readGrocery().filter((item) => !item.checked));
}

export function groceryAsText(items: GroceryItem[] = readGrocery()) {
  const needed = items.filter((item) => !item.checked);
  if (needed.length === 0) {
    return "Grocery list is clear.";
  }
  return AISLES.flatMap((aisle) => {
    const rows = needed.filter((item) => item.aisle === aisle);
    if (rows.length === 0) {
      return [];
    }
    return [
      aisle,
      ...rows.map((item) => {
        const amount = item.amount ? `${item.amount} ` : "";
        const recipes = item.recipes.length ? ` (${item.recipes.join(", ")})` : "";
        return `- ${amount}${item.name}${recipes}`;
      }),
      "",
    ];
  })
    .join("\n")
    .trim();
}

export function useGrocery(): GroceryItem[] {
  return useSyncExternalStore(subscribeGrocery, readGrocery, () => []);
}
