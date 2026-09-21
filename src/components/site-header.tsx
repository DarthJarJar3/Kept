"use client";

import { ArrowLeft } from "lucide-react";
import { AppButton } from "@/components/app-button";

type NavId = "home" | "kitchen" | "recipe" | "keep" | "plan" | "profile";

const links: { id: NavId; href: string; label: string }[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "kitchen", href: "/kitchen", label: "My Kitchen" },
  { id: "keep", href: "/keep", label: "Keep" },
  { id: "plan", href: "/plan", label: "Plan" },
  { id: "profile", href: "/profile", label: "Profile" },
];

const titles: Record<NavId, string> = {
  home: "Home",
  kitchen: "My Kitchen",
  recipe: "Recipe",
  keep: "Keep a recipe",
  plan: "This week",
  profile: "Profile",
};

export function SiteHeader({ current = "home" }: { current?: NavId }) {
  const back =
    current === "home"
      ? null
      : current === "recipe" || current === "keep"
        ? { href: "/kitchen", label: "Back" }
        : { href: "/", label: "Back" };

  return (
    <header className="sticky top-0 z-20 border-b-2 border-primary/35 bg-secondary/95 shadow-[0_8px_24px_-18px_oklch(0.45_0.06_45)] backdrop-blur">
      <div className="page-shell page-shell-wide flex flex-col gap-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <AppButton
              href="/"
              variant={current === "home" ? "primary" : "peach"}
              className="font-heading text-lg sm:text-xl"
              aria-current={current === "home" ? "page" : undefined}
            >
              Kept
            </AppButton>
            <div className="min-w-0">
              <p className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
                You are here
              </p>
              <p className="truncate font-heading text-lg leading-tight">
                {titles[current]}
              </p>
            </div>
          </div>
          {back ? (
            <AppButton href={back.href} variant="secondary" className="sm:hidden">
              <ArrowLeft className="size-4" />
              {back.label}
            </AppButton>
          ) : null}
        </div>
        <nav aria-label="Main" className="site-nav">
          {back ? (
            <AppButton
              href={back.href}
              variant="secondary"
              className="hidden shrink-0 sm:inline-flex"
            >
              <ArrowLeft className="size-4" />
              {back.label}
            </AppButton>
          ) : null}
          {links.map((link) => (
            <AppButton
              key={link.id}
              href={link.href}
              variant={current === link.id ? "primary" : "secondary"}
              className="shrink-0"
              aria-current={current === link.id ? "page" : undefined}
            >
              {link.label}
            </AppButton>
          ))}
        </nav>
      </div>
    </header>
  );
}
