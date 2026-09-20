import { SiteHeader } from "@/components/site-header";
import { KeepRecipeForm } from "@/components/keep-recipe-form";

export default function KeepPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="keep" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-sm text-muted-foreground">
          Save it the way you actually make it — folder, tags, and your amounts.
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl">Keep a recipe</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          This is a visual prototype. It stays in this browser so you can open it
          from My kitchen and see the same details as the other kept recipes.
        </p>
        <div className="mt-8">
          <KeepRecipeForm />
        </div>
      </main>
    </div>
  );
}
