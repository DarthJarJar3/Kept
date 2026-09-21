import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const box =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 min-h-11 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors select-none";

const variants = {
  primary:
    "border-primary bg-primary text-primary-foreground hover:bg-primary/85",
  secondary:
    "border-border bg-card text-foreground hover:bg-secondary",
  peach:
    "border-primary/40 bg-secondary text-secondary-foreground hover:bg-accent",
};

type AppButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
  "aria-current"?: "page" | "true" | boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function AppButton({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: AppButtonProps) {
  const classes = cn(box, variants[variant], className);
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-current={props["aria-current"]}
      >
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
