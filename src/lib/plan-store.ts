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

export type PlanDay = (typeof PLAN_DAYS)[number];
export type WeekPlan = Record<PlanDay, string | null>;

const STORAGE_KEY = "kept-prototype-plan";

let snapshotRaw: string | null = null;
let snapshotPlan: WeekPlan = emptyPlan();
const listeners = new Set<() => void>();

function emptyPlan(): WeekPlan {
  return {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null,
  };
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
    const parsed = raw ? (JSON.parse(raw) as WeekPlan) : emptyPlan();
    snapshotPlan = { ...emptyPlan(), ...parsed };
  } catch {
    snapshotPlan = emptyPlan();
  }
  return snapshotPlan;
}

export function saveWeekPlan(plan: WeekPlan) {
  const next = { ...emptyPlan(), ...plan };
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotPlan = next;
  emit();
}

export function setPlanDay(day: PlanDay, slug: string | null) {
  saveWeekPlan({ ...readWeekPlan(), [day]: slug });
}

export function useWeekPlan(): WeekPlan {
  return useSyncExternalStore(subscribePlan, readWeekPlan, emptyPlan);
}
