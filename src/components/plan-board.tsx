"use client";

import { useState } from "react";
import { AppButton } from "@/components/app-button";
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
} from "@/lib/plan-store";
import {
  mergeRecipeLists,
  recipes as seedRecipes,
  type Recipe,
} from "@/lib/recipes";
import { useKeptRecipes } from "@/lib/use-kept-recipes";

const fieldClass =
  "h-11 min-w-0 flex-1 rounded-xl border-2 border-border bg-background px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring";

export function PlanBoard({ addSlug }: { addSlug?: string }) {
  const plan = useWeekPlan();
  const kept = useKeptRecipes();
  const recipes = mergeRecipeLists(kept, seedRecipes);
  const pending = addSlug
    ? recipes.find((recipe) => recipe.slug === addSlug)
    : undefined;
  const [slot, setSlot] = useState<MealSlot>("dinner");
  const [placed, setPlaced] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">This week</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Breakfast, lunch, and dinner for each day. Jot something small, like
          yoghurt, or drop in a kept recipe like grilled cheese.
        </p>
      </div>

      {pending ? (
        <section className="rounded-2xl border-2 border-primary/40 bg-secondary/70 p-4 sm:p-5">
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
            <article className="rounded-2xl border-2 border-border bg-card p-4">
              <h2 className="font-heading text-2xl">{day}</h2>
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
          placeholder="Yoghurt, toast, an apple…"
          aria-label={`${SLOT_LABELS[slot]} note for ${day}`}
          className={fieldClass}
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
      <li className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-border px-3 py-2">
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
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-border bg-secondary/40 px-3 py-2">
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
