import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { panelClass } from "@/design-system/styles";

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "article";
};

export function Panel({
  as: Tag = "section",
  className,
  ...props
}: PanelProps) {
  return <Tag className={cn(panelClass, className)} {...props} />;
}
