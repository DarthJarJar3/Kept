"use client";

import { useSearchParams } from "next/navigation";
import { AppButton } from "@/components/app-button";
import {
  PLAN_DAYS,
  setPlanDay,
  useWeekPlan,
  type PlanDay,
} from "@/lib/plan-store";
import {
  mergeRecipeLists,
  recipes as seedRecipes,
  type Recipe,
} from "@/lib/recipes";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useKeptRecipes } from "@/lib/use-kept-recipes";

export function PlanBoard() {
  const searchParams = useSearchParams();
  const addSlug = searchParams.get("add");
  const mounted = useHasMounted();
  const plan = useWeekPlan();
  const kept = useKeptRecipes();
  const recipes = mergeRecipeLists(kept, seedRecipes);
  const pending = addSlug
    ? recipes.find((recipe) => recipe.slug === addSlug)
    : undefined;

  if (!mounted) {
    return <p className="text-muted-foreground">Opening this week’s plan…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">This week</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          A light plan, not a calendar product. Drop a kept recipe onto a night
          so dinner is already decided.
        </p>
      </div>

      {pending ? (
        <section className="rounded-2xl border-2 border-primary/40 bg-secondary/70 p-4 sm:p-5">
          <p className="text-sm font-medium">Add {pending.title} to which night?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLAN_DAYS.map((day) => (
              <AppButton
                key={day}
                type="button"
                variant="secondary"
                onClick={() => setPlanDay(day, pending.slug)}
              >
                {day}
              </AppButton>
            ))}
          </div>
        </section>
      ) : null}

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PLAN_DAYS.map((day) => (
          <li key={day}>
            <DayCard
              day={day}
              slug={plan[day]}
              recipes={recipes}
              pending={pending}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DayCard({
  day,
  slug,
  recipes,
  pending,
}: {
  day: PlanDay;
  slug: string | null;
  recipes: Recipe[];
  pending?: Recipe;
}) {
  const recipe = slug
    ? recipes.find((item) => item.slug === slug)
    : undefined;

  return (
    <article className="flex h-full flex-col rounded-2xl border-2 border-border bg-card p-4">
      <h2 className="font-heading text-xl">{day}</h2>
      {recipe ? (
        <div className="mt-3 flex-1">
          <div className="overflow-hidden rounded-xl border-2 border-border">
            {recipe.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={recipe.photo}
                alt=""
                className="h-28 w-full object-cover"
              />
            ) : (
              <div className="flex h-20 items-center justify-center bg-secondary text-3xl">
                {recipe.emoji}
              </div>
            )}
          </div>
          <p className="mt-3 text-lg leading-snug">{recipe.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{recipe.time}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <AppButton href={`/recipe/${recipe.slug}`}>Open</AppButton>
            <AppButton
              type="button"
              variant="secondary"
              onClick={() => setPlanDay(day, null)}
            >
              Clear
            </AppButton>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-1 flex-col gap-3">
          <p className="text-sm text-muted-foreground">Nothing planned yet.</p>
          {pending ? (
            <AppButton type="button" onClick={() => setPlanDay(day, pending.slug)}>
              Put {pending.title} here
            </AppButton>
          ) : (
            <AppButton href="/kitchen" variant="secondary">
              Find a recipe
            </AppButton>
          )}
        </div>
      )}
    </article>
  );
}
