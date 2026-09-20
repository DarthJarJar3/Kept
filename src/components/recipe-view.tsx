import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/lib/recipes";

export function RecipeView({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <Link href="/kitchen" className="hover:text-foreground hover:underline">
          My kitchen
        </Link>
        <span aria-hidden> / </span>
        {recipe.folder}
      </p>

      <div className="mt-4 flex items-start gap-3">
        <div
          aria-hidden
          className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-3xl"
        >
          {recipe.emoji}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl">{recipe.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {recipe.time} · {recipe.servings} · last cooked{" "}
            {recipe.lastCooked.toLowerCase()}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-md">
              {recipe.folder}
            </Badge>
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <section
        aria-label="Your version"
        className="mt-8 rounded-2xl border border-primary/35 bg-[oklch(0.96_0.03_52)] p-5"
      >
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          Your version
        </p>
        <p className="mt-1 font-heading text-xl">{recipe.whyKept}</p>
        {recipe.notes.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            {recipe.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        ) : null}
        <p className="mt-4 text-xs text-muted-foreground">
          Originally from {recipe.source}. The list below is how you make it now.
        </p>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-2xl">Ingredients</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Changed amounts sit together so you can see what you actually use.
          </p>
          <ul className="mt-4 divide-y divide-border">
            {recipe.ingredients.map((item) => (
              <li key={`${item.name}-${item.kept}`} className="py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium">{item.name}</span>
                  <span>{item.kept}</span>
                </div>
                {item.changed ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Blog called for {item.original}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl">Steps</h2>
          <ol className="mt-4 space-y-3">
            {recipe.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                  {index + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
