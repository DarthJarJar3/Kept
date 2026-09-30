import { ArrowRight, Plus } from "lucide-react";
import { AppButton } from "@/components/app-button";
import { HomeGreeting } from "@/components/home-greeting";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="home" />
      <PageShell>
        <section className="max-w-3xl">
          <HomeGreeting />
          <h1 className="text-[clamp(1.85rem,4vw+0.5rem,3.15rem)] leading-[1.12] text-balance">
            Keep the recipe the way you actually make it.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Then find it when dinner starts — not buried in a blog, a screenshot,
            or last year&apos;s search history.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton href="/kitchen" className="w-full sm:w-auto">
              Find my recipes
              <ArrowRight className="size-4" />
            </AppButton>
            <AppButton href="/keep" variant="secondary" className="w-full sm:w-auto">
              <Plus className="size-4" />
              Keep a recipe
            </AppButton>
          </div>
        </section>

        <section
          aria-label="What a kept recipe looks like"
          className="mt-14 max-w-4xl rounded-3xl border border-border bg-card p-4 shadow-mealtime sm:p-6"
        >
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Same cookies. Yours.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <CompareCard
              label="The blog you lost"
              tone="lost"
              lines={[
                "¾ cup sugar, melted butter",
                "Bake the same day",
                "Somewhere in a bookmark folder",
              ]}
            />
            <CompareCard
              label="What you kept"
              tone="kept"
              lines={[
                "½ cup sugar, browned butter",
                "Chill overnight — this oven runs hot",
                "Baking · chocolate · weekend",
              ]}
            />
          </div>
        </section>
      </PageShell>
    </div>
  );
}

function CompareCard({
  label,
  tone,
  lines,
}: {
  label: string;
  tone: "lost" | "kept";
  lines: string[];
}) {
  const kept = tone === "kept";
  return (
    <div
      className={
        kept
          ? "rounded-2xl bg-secondary p-4"
          : "rounded-2xl bg-muted p-4"
      }
    >
      <p
        className={
          kept
            ? "text-sm font-medium text-foreground"
            : "text-sm font-medium text-muted-foreground"
        }
      >
        {label}
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {lines.map((line) => (
          <li
            key={line}
            className={kept ? "text-foreground" : "text-muted-foreground"}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
