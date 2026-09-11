import type { ReactNode } from "react";
import Link from "next/link";
import { Folder, Pencil, Share2, Tags } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="home" />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <section className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            For home cooks who actually cook
          </p>
          <h1 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
            Keep your recipes in one place.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Save recipes from the internet, edit them to your taste, and organize
            them so you can find them later.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kitchen"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base")}
            >
              Create a free account
            </Link>
            <Link
              href="/kitchen"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 px-5 text-base"
              )}
            >
              Browse recipes
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Pencil className="size-4" />}
            title="Edit any recipe"
            body="Change amounts, swap ingredients, and keep the version that worked."
          />
          <Feature
            icon={<Folder className="size-4" />}
            title="Folders"
            body="Weeknight, baking, Sunday dinner — put recipes where you look."
          />
          <Feature
            icon={<Tags className="size-4" />}
            title="Tags"
            body="Find the same recipe in more than one way without duplicating it."
          />
          <Feature
            icon={<Share2 className="size-4" />}
            title="Share later"
            body="Send a kept recipe to someone else when you are ready."
          />
        </section>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
