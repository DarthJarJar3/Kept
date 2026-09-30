"use client";

import Link from "next/link";
import { Carrot } from "lucide-react";
import { AppButton } from "@/components/app-button";

type NavId =
  | "home"
  | "kitchen"
  | "recipe"
  | "keep"
  | "plan"
  | "pantry"
  | "grocery"
  | "profile";

const links: { id: NavId; href: string; label: string }[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "kitchen", href: "/kitchen", label: "My Kitchen" },
  { id: "keep", href: "/keep", label: "Keep" },
  { id: "plan", href: "/plan", label: "Plan" },
  { id: "pantry", href: "/pantry", label: "Pantry" },
  { id: "grocery", href: "/grocery", label: "List" },
  { id: "profile", href: "/profile", label: "Profile" },
];

export function SiteHeader({ current = "home" }: { current?: NavId }) {
  const activeId = current === "recipe" ? "kitchen" : current;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="page-shell page-shell-wide py-3">
        <nav aria-label="Main" className="site-nav">
          <Link
            href="/"
            aria-label="Kept home"
            className="mr-1 inline-flex shrink-0 items-center gap-2 pr-1"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-forest text-white">
              <Carrot className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">Kept</span>
          </Link>
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
