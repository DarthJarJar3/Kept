import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { chipClass, chipMutedClass } from "@/design-system/styles";

export function Chip({
  tone = "soft",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "soft" | "muted" }) {
  return (
    <span
      className={cn(tone === "muted" ? chipMutedClass : chipClass, className)}
      {...props}
    />
  );
}
