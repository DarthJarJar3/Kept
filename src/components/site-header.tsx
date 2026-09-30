"use client";

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
  { id: "home", href: "/", label: "Home" },
  { id: "kitchen", href: "/kitchen", label: "My Kitchen" },
  { id: "keep", href: "/keep", label: "Keep" },
  { id: "plan", href: "/plan", label: "Plan" },
  { id: "pantry", href: "/pantry", label: "Pantry" },
  { id: "grocery", href: "/grocery", label: "List" },
  { id: "profile", href: "/profile", label: "Profile" },
  { id: "system", href: "/design-system", label: "System" },
];

export function SiteHeader({ current = "home" }: { current?: NavId }) {
  const activeId = current === "recipe" ? "kitchen" : current;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="page-shell page-shell-wide py-3">
        <nav aria-label="Main" className="site-nav">
          <BrandMark />
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
