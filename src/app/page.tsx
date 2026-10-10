import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { AppButton } from "@/components/app-button";
import { EarlyStageModal } from "@/components/early-stage-modal";
import { HomeGreeting } from "@/components/home-greeting";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="home" />
      <main className="relative flex flex-1 flex-col">
        <section className="landing-hero" aria-labelledby="landing-brand">
          <div className="landing-hero-media" aria-hidden="true">
            <Image
              src="/images/hero-food.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="landing-hero-image object-cover"
            />
          </div>
          <div className="landing-hero-scrim" aria-hidden="true" />
          <div className="landing-hero-content page-shell">
            <HomeGreeting className="mb-4 text-[rgb(255_248_239_/_0.78)]" />
            <p id="landing-brand" className="landing-brand">
              Spoonful
            </p>
            <h1 className="landing-headline">
              Cook from a recipe you saved.
            </h1>
            <p className="landing-support">
              Find it in your list, or add one you want to keep.
            </p>
            <div className="landing-cta mt-8 flex flex-col gap-3 sm:flex-row">
              <AppButton href="/kitchen" className="w-full sm:w-auto">
                Find my recipes
                <ArrowRight className="size-4" />
              </AppButton>
              <AppButton
                href="/keep"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Plus className="size-4" />
                Add a recipe
              </AppButton>
            </div>
          </div>
        </section>
      </main>
      <EarlyStageModal />
    </div>
  );
}
