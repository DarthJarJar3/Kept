"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/components/app-button";
import { fieldClass, fieldCompactClass, fieldGrowClass } from "@/design-system";
import {
  MEAL_SLOTS,
  PLAN_DAYS,
  SLOT_LABELS,
  addPlanNote,
  addPlanRecipe,
  openDessert,
  removePlanEntry,
  useWeekPlan,
  type MealEntry,
  type MealSlot,
  type PlanDay,
  type WeekPlan,
} from "@/lib/plan-store";
import {
  mergeRecipeLists,
  recipes as seedRecipes,
  type Recipe,
} from "@/lib/recipes";
import { formatMeasure, measureOf, parseServes } from "@/lib/scale";
import { useKeptRecipes } from "@/lib/use-kept-recipes";

const PEOPLE_KEY = "kept-prototype-plan-people";
const FROM_KEY = "kept-prototype-plan-from";
const TO_KEY = "kept-prototype-plan-to";

const NOTE_PLACEHOLDERS: Record<MealSlot, string> = {
  breakfast: "Yoghurt, toast, an apple…",
  lunch: "Grilled cheese, leftovers, a salad…",
  dinner: "Tacos, pot roast, lemon chicken…",
  dessert: "Cookies, ice cream, fruit…",
};

function isPlanDay(value: string | null): value is PlanDay {
  return PLAN_DAYS.includes(value as PlanDay);
}

function daysInRange(from: PlanDay, to: PlanDay): PlanDay[] {
  let start = PLAN_DAYS.indexOf(from);
  let end = PLAN_DAYS.indexOf(to);
  if (start > end) {
    [start, end] = [end, start];
  }
  return PLAN_DAYS.slice(start, end + 1);
}

function ingredientNeeds(
  plan: WeekPlan,
  recipes: Recipe[],
  days: PlanDay[],
  people: number
) {
  const buckets = new Map<
    string,
    { name: string; value: number; unit: string; raw: string; count: number }
  >();

  for (const day of days) {
    for (const slot of MEAL_SLOTS) {
      for (const entry of plan[day][slot]) {
        if (entry.kind !== "recipe") {
          continue;
        }
        const recipe = recipes.find((item) => item.slug === entry.slug);
        if (!recipe) {
          continue;
        }
        const factor = people / parseServes(recipe.servings);
        for (const item of recipe.ingredients) {
          const nameKey = item.name.trim().toLowerCase();
          const measured = measureOf(item.kept);
          if (!measured) {
            const raw = item.kept.trim();
            const key = `${nameKey}|raw|${raw.toLowerCase()}`;
            const existing = buckets.get(key);
            if (existing) {
              existing.count += 1;
            } else {
              buckets.set(key, {
                name: item.name.trim(),
                value: 0,
                unit: "",
                raw,
                count: 1,
              });
            }
            continue;
          }
          const unitKey = measured.unit.toLowerCase();
          const key = `${nameKey}|${unitKey}`;
          const existing = buckets.get(key);
          if (existing) {
            existing.value += measured.value * factor;
          } else {
            buckets.set(key, {
              name: item.name.trim(),
              value: measured.value * factor,
              unit: measured.unit,
              raw: "",
              count: 1,
            });
          }
        }
      }
    }
  }

  return [...buckets.values()]
    .map((bucket) => ({
      name: bucket.name,
      amount: bucket.raw
        ? bucket.count > 1
          ? `${bucket.raw} × ${bucket.count}`
          : bucket.raw
        : formatMeasure(bucket.value, bucket.unit),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function PlanBoard({ addSlug }: { addSlug?: string }) {
  const plan = useWeekPlan();
  const kept = useKeptRecipes();
  const recipes = mergeRecipeLists(kept, seedRecipes);
  const pending = addSlug
    ? recipes.find((recipe) => recipe.slug === addSlug)
    : undefined;
  const [slot, setSlot] = useState<MealSlot>("dinner");
  const [placed, setPlaced] = useState("");
  const [people, setPeople] = useState("4");
  const [fromDay, setFromDay] = useState<PlanDay>("Monday");
  const [toDay, setToDay] = useState<PlanDay>("Sunday");
  const [hydrated, setHydrated] = useState(false);
  const headcount = Math.max(1, Math.round(Number(people)) || 1);

  useEffect(() => {
    const storedPeople = window.localStorage.getItem(PEOPLE_KEY);
    const storedFrom = window.localStorage.getItem(FROM_KEY);
    const storedTo = window.localStorage.getItem(TO_KEY);
    if (storedPeople && Number(storedPeople) >= 1) {
      setPeople(String(Math.round(Number(storedPeople))));
    }
    if (isPlanDay(storedFrom)) {
      setFromDay(storedFrom);
    }
    if (isPlanDay(storedTo)) {
      setToDay(storedTo);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    window.localStorage.setItem(PEOPLE_KEY, String(headcount));
    window.localStorage.setItem(FROM_KEY, fromDay);
    window.localStorage.setItem(TO_KEY, toDay);
  }, [hydrated, headcount, fromDay, toDay]);
  const range = daysInRange(fromDay, toDay);
  const rangeLabel =
    range.length === 1 ? range[0] : `${range[0]}–${range[range.length - 1]}`;
  const needs = ingredientNeeds(plan, recipes, range, headcount);
  const inRange = new Set(range);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">Plan ahead</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Choose the days you might cook, say how many people you are cooking
          for, and see how much of each ingredient those recipes need.
        </p>
      </div>

      <section className="ds-panel p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="block text-sm lg:w-44">
            <span className="font-medium">From</span>
            <select
              value={fromDay}
              onChange={(event) => setFromDay(event.target.value as PlanDay)}
              className={`${fieldClass} mt-1 w-full`}
              aria-label="First day in the plan"
            >
              {PLAN_DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm lg:w-44">
            <span className="font-medium">To</span>
            <select
              value={toDay}
              onChange={(event) => setToDay(event.target.value as PlanDay)}
              className={`${fieldClass} mt-1 w-full`}
              aria-label="Last day in the plan"
            >
              {PLAN_DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium">People</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
              className={`${fieldCompactClass} mt-1`}
              aria-label="How many people you are cooking for"
            />
          </label>
        </div>

        <h2 className="mt-6 font-heading text-xl">
          Ingredients for {rangeLabel}, {headcount}{" "}
          {headcount === 1 ? "person" : "people"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Amounts scale from the servings written on each recipe to this many
          people. A short note, like yoghurt, stays off this list.
        </p>
        {needs.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No recipes in this range yet. Open a recipe and choose Add to plan,
            or jot a meal on a day below.
          </p>
        ) : (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {needs.map((item) => (
              <li
                key={`${item.name}-${item.amount}`}
                className="rounded-2xl border border-border px-3 py-2 text-sm"
              >
                <span className="font-medium">{item.amount}</span> {item.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      {pending ? (
        <section className="ds-panel-wash p-4 sm:p-5">
          <p className="font-medium">Add {pending.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick the meal, then the day.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {MEAL_SLOTS.map((item) => (
              <AppButton
                key={item}
                type="button"
                variant={slot === item ? "primary" : "secondary"}
                onClick={() => setSlot(item)}
              >
                {SLOT_LABELS[item]}
              </AppButton>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLAN_DAYS.map((day) => (
              <AppButton
                key={day}
                type="button"
                variant="secondary"
                onClick={() => {
                  addPlanRecipe(day, slot, pending.slug);
                  setPlaced(`${SLOT_LABELS[slot]} · ${day}`);
                }}
              >
                {day}
              </AppButton>
            ))}
          </div>
          {placed ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Added to {placed}.
            </p>
          ) : null}
        </section>
      ) : null}

      <ul className="grid gap-4 xl:grid-cols-2">
        {PLAN_DAYS.map((day) => (
          <li key={day}>
            <article
              className={`ds-panel p-4 ${inRange.has(day) ? "" : "opacity-50"}`}
            >
              <h2 className="font-heading text-2xl">{day}</h2>
              {inRange.has(day) ? null : (
                <p className="mt-1 text-sm text-muted-foreground">
                  Outside this range. It stays off the ingredient list.
                </p>
              )}
              {MEAL_SLOTS.filter((item) => item !== "dessert").map((item) => (
                <MealSlotEditor
                  key={item}
                  day={day}
                  slot={item}
                  entries={plan[day][item]}
                  recipes={recipes}
                />
              ))}
              {plan[day].dessertOpen ? (
                <MealSlotEditor
                  day={day}
                  slot="dessert"
                  entries={plan[day].dessert}
                  recipes={recipes}
                />
              ) : (
                <div className="mt-4">
                  <AppButton
                    type="button"
                    variant="secondary"
                    onClick={() => openDessert(day)}
                  >
                    Add dessert
                  </AppButton>
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MealSlotEditor({
  day,
  slot,
  entries,
  recipes,
}: {
  day: PlanDay;
  slot: MealSlot;
  entries: MealEntry[];
  recipes: Recipe[];
}) {
  const [draft, setDraft] = useState("");

  function addNote() {
    addPlanNote(day, slot, draft);
    setDraft("");
  }

  return (
    <section className="mt-4 border-t border-border pt-4">
      <h3 className="font-heading text-lg">{SLOT_LABELS[slot]}</h3>
      {entries.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {entries.map((entry) => (
            <MealRow
              key={entry.id}
              day={day}
              slot={slot}
              entry={entry}
              recipes={recipes}
            />
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addNote();
            }
          }}
          placeholder={NOTE_PLACEHOLDERS[slot]}
          aria-label={`${SLOT_LABELS[slot]} note for ${day}`}
          className={fieldGrowClass}
        />
        <AppButton type="button" variant="secondary" onClick={addNote}>
          Add note
        </AppButton>
      </div>
    </section>
  );
}

function MealRow({
  day,
  slot,
  entry,
  recipes,
}: {
  day: PlanDay;
  slot: MealSlot;
  entry: MealEntry;
  recipes: Recipe[];
}) {
  if (entry.kind === "note") {
    return (
      <li className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border px-3 py-2">
        <p>{entry.text}</p>
        <AppButton
          type="button"
          variant="secondary"
          onClick={() => removePlanEntry(day, slot, entry.id)}
        >
          Remove
        </AppButton>
      </li>
    );
  }

  const recipe = recipes.find((item) => item.slug === entry.slug);
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-secondary/40 px-3 py-2">
      <p>
        <span className="mr-2">{recipe?.emoji ?? "🍽️"}</span>
        {recipe?.title ?? "A kept recipe"}
      </p>
      <div className="flex flex-wrap gap-2">
        <AppButton href={`/recipe/${entry.slug}`}>Open</AppButton>
        <AppButton
          type="button"
          variant="secondary"
          onClick={() => removePlanEntry(day, slot, entry.id)}
        >
          Remove
        </AppButton>
      </div>
    </li>
  );
}
