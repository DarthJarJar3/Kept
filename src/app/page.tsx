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
            Cook from a recipe you saved.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Find it in your list, or add one you want to keep.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton href="/kitchen" className="w-full sm:w-auto">
              Find my recipes
              <ArrowRight className="size-4" />
            </AppButton>
            <AppButton href="/keep" variant="secondary" className="w-full sm:w-auto">
              <Plus className="size-4" />
              Add a recipe
            </AppButton>
          </div>
        </section>
      </PageShell>
    </div>
  );
}
