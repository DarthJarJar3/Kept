import Link from "next/link";
import { Carrot } from "lucide-react";

export function BrandMark({
  href = "/",
  current = false,
}: {
  href?: string;
  current?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Spoonful, home"
      aria-current={current ? "page" : undefined}
      className="ds-mark"
    >
      <span className="ds-mark-icon">
        <Carrot className="size-5" />
      </span>
      <span className="ds-mark-word">Spoonful</span>
    </Link>
  );
}
