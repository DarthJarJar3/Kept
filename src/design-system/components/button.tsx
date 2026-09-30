import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "ds-button ds-button-primary",
  secondary: "ds-button ds-button-secondary",
  peach: "ds-button ds-button-soft",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  "aria-current"?: "page" | "true" | boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(variants[variant], className);
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
