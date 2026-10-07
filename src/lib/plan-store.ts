import { useSyncExternalStore } from "react";

export const PLAN_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const MEAL_SLOTS = ["breakfast", "lunch", "dinner", "dessert"] as const;

export const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  dessert: "Dessert",
};

export type PlanDay = (typeof PLAN_DAYS)[number];
export type MealSlot = (typeof MEAL_SLOTS)[number];

export type MealEntry =
  | { id: string; kind: "recipe"; slug: string }
  | { id: string; kind: "note"; text: string };

export type DayMeals = {
  breakfast: MealEntry[];
  lunch: MealEntry[];
  dinner: MealEntry[];
  dessert: MealEntry[];
  dessertOpen: boolean;
};

export type WeekPlan = Record<PlanDay, DayMeals>;

const STORAGE_KEY = "kept-prototype-plan";

let snapshotRaw: string | null = null;
let snapshotPlan: WeekPlan = emptyPlan();
const listeners = new Set<() => void>();

function emptyDay(): DayMeals {
  return {
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: [],
    dessertOpen: false,
  };
}

function emptyPlan(): WeekPlan {
  return {
    Monday: emptyDay(),
    Tuesday: emptyDay(),
    Wednesday: emptyDay(),
    Thursday: emptyDay(),
    Friday: emptyDay(),
    Saturday: emptyDay(),
    Sunday: emptyDay(),
  };
}

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function asEntries(value: unknown): MealEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const entries: MealEntry[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const entry = item as { id?: string; kind?: string; slug?: string; text?: string };
    if (entry.kind === "recipe" && typeof entry.slug === "string") {
      entries.push({ id: entry.id || newId(), kind: "recipe", slug: entry.slug });
    } else if (entry.kind === "note" && typeof entry.text === "string" && entry.text.trim()) {
      entries.push({ id: entry.id || newId(), kind: "note", text: entry.text.trim() });
    }
  }
  return entries;
}

function normalizeDay(value: unknown): DayMeals {
  if (typeof value === "string" && value.trim()) {
    return {
      ...emptyDay(),
      dinner: [{ id: `kept-${value}`, kind: "recipe", slug: value }],
    };
  }
  if (!value || typeof value !== "object") {
    return emptyDay();
  }
  const day = value as Partial<DayMeals>;
  const dessert = asEntries(day.dessert);
  return {
    breakfast: asEntries(day.breakfast),
    lunch: asEntries(day.lunch),
    dinner: asEntries(day.dinner),
    dessert,
    dessertOpen: Boolean(day.dessertOpen) || dessert.length > 0,
  };
}

function normalizePlan(parsed: unknown): WeekPlan {
  const source = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  const next = emptyPlan();
  for (const day of PLAN_DAYS) {
    next[day] = normalizeDay(source[day]);
  }
  return next;
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribePlan(onStoreChange: () => void) {
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

export function readWeekPlan(): WeekPlan {
  if (typeof window === "undefined") {
    return snapshotPlan;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === snapshotRaw) {
    return snapshotPlan;
  }

  snapshotRaw = raw;
  try {
    snapshotPlan = normalizePlan(raw ? JSON.parse(raw) : {});
  } catch {
    snapshotPlan = emptyPlan();
  }
  return snapshotPlan;
}

export function saveWeekPlan(plan: WeekPlan) {
  const next = normalizePlan(plan);
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotPlan = next;
  emit();
}

function updateDay(day: PlanDay, recipe: (current: DayMeals) => DayMeals) {
  const plan = readWeekPlan();
  saveWeekPlan({ ...plan, [day]: recipe(plan[day]) });
}

export function addPlanRecipe(day: PlanDay, slot: MealSlot, slug: string) {
  updateDay(day, (current) => {
    const entries = current[slot];
    if (entries.some((entry) => entry.kind === "recipe" && entry.slug === slug)) {
      return slot === "dessert" ? { ...current, dessertOpen: true } : current;
    }
    return {
      ...current,
      dessertOpen: current.dessertOpen || slot === "dessert",
      [slot]: [...entries, { id: newId(), kind: "recipe", slug }],
    };
  });
}

export function addPlanNote(day: PlanDay, slot: MealSlot, text: string) {
  const note = text.trim();
  if (!note) {
    return;
  }
  updateDay(day, (current) => ({
    ...current,
    dessertOpen: current.dessertOpen || slot === "dessert",
    [slot]: [...current[slot], { id: newId(), kind: "note", text: note }],
  }));
}

export function removePlanEntry(day: PlanDay, slot: MealSlot, id: string) {
  updateDay(day, (current) => ({
    ...current,
    [slot]: current[slot].filter((entry) => entry.id !== id),
  }));
}

export function openDessert(day: PlanDay) {
  updateDay(day, (current) => ({ ...current, dessertOpen: true }));
}

const serverPlan = emptyPlan();

export function useWeekPlan(): WeekPlan {
  return useSyncExternalStore(subscribePlan, readWeekPlan, () => serverPlan);
}
