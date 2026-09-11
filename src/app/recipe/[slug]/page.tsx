import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { getRecipe } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="recipe" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-sm text-muted-foreground">
          <Link href="/kitchen" className="hover:text-foreground hover:underline">
            My kitchen
          </Link>
          <span aria-hidden> / </span>
          {recipe.folder}
        </p>

        <div className="mt-3 flex items-start gap-3">
          <div
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-3xl"
          >
            {recipe.emoji}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">{recipe.title}</h1>
            <p className="mt-2 text-muted-foreground">
              From {recipe.source}. Last cooked {recipe.lastCooked.toLowerCase()}.{" "}
              {recipe.time} · {recipe.servings}.
            </p>
            <p className="mt-3 max-w-2xl">{recipe.notes.join(" ")}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{recipe.folder}</Badge>
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-2xl">Ingredients</h2>
          <ul className="mt-3 space-y-2">
            {recipe.ingredients.map((item) => (
              <li key={item.name} className="flex gap-3 border-b border-border/70 py-2 text-sm">
                <span className="w-40 shrink-0 font-medium sm:w-48">{item.kept}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl">Steps</h2>
          <ol className="mt-3 space-y-3">
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
      </main>
    </div>
  );
}
