import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="home" />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <section className="max-w-3xl">
          <h1 className="text-4xl leading-[1.12] text-balance sm:text-5xl sm:leading-[1.1]">
            Keep the recipe the way you actually make it.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Then find it when dinner starts — not buried in a blog, a screenshot,
            or last year&apos;s search history.
          </p>
          <div className="mt-8">
            <Link
              href="/kitchen"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-6 text-base"
              )}
            >
              Find a recipe I kept
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section
          aria-label="What a kept recipe looks like"
          className="mt-14 max-w-3xl rounded-2xl border border-border bg-card p-4 sm:p-6"
        >
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Same cookies. Your version.
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
      </main>
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
          ? "rounded-xl border border-primary/35 bg-[oklch(0.96_0.03_52)] p-4"
          : "rounded-xl border border-border bg-muted/60 p-4"
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
