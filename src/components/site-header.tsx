"use client";

import { AppButton } from "@/components/app-button";

type NavId = "home" | "kitchen" | "recipe" | "keep" | "plan" | "profile";

const links: { id: NavId; href: string; label: string }[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "kitchen", href: "/kitchen", label: "My Kitchen" },
  { id: "keep", href: "/keep", label: "Keep" },
  { id: "plan", href: "/plan", label: "Plan" },
  { id: "profile", href: "/profile", label: "Profile" },
];

export function SiteHeader({ current = "home" }: { current?: NavId }) {
  const activeId = current === "recipe" ? "kitchen" : current;

  return (
    <header className="sticky top-0 z-20 border-b-2 border-primary/35 bg-secondary/95 shadow-[0_8px_24px_-18px_oklch(0.45_0.06_45)] backdrop-blur">
      <div className="page-shell page-shell-wide py-3">
        <nav aria-label="Main" className="site-nav">
          <AppButton
            href="/"
            variant="peach"
            className="font-heading text-lg shrink-0"
            aria-current={activeId === "home" ? "page" : undefined}
            aria-label="Kept home"
          >
            Kept
          </AppButton>
          {links.map((link) => (
            <AppButton
              key={link.id}
              href={link.href}
              variant={activeId === link.id ? "primary" : "secondary"}
              className="shrink-0"
              aria-current={activeId === link.id ? "page" : undefined}
            >
              {link.label}
            </AppButton>
          ))}
        </nav>
      </div>
    </header>
  );
}
