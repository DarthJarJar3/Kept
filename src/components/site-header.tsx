"use client";

import Link from "next/link";
import { AppButton } from "@/components/app-button";
import { BrandMark } from "@/design-system";

type NavId =
  | "home"
  | "kitchen"
  | "recipe"
  | "keep"
  | "plan"
  | "pantry"
  | "grocery"
  | "profile"
  | "system";

const links: { id: NavId; href: string; label: string }[] = [
  { id: "kitchen", href: "/kitchen", label: "Recipes" },
  { id: "keep", href: "/keep", label: "Add recipe" },
  { id: "plan", href: "/plan", label: "Plan ahead" },
];

export function SiteHeader({ current = "home" }: { current?: NavId }) {
  const activeId = current === "recipe" ? "kitchen" : current;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="page-shell page-shell-wide py-3">
        <nav aria-label="Main" className="site-nav">
          <BrandMark current={activeId === "home"} />
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
          <Link
            href="/profile"
            aria-current={activeId === "profile" ? "page" : undefined}
            className={`ml-auto shrink-0 px-2 text-sm underline-offset-4 ${
              activeId === "profile"
                ? "font-medium text-foreground underline"
                : "text-muted-foreground"
            }`}
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
