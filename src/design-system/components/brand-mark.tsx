import Link from "next/link";
import { SpoonIcon } from "@/design-system/components/spoon-icon";

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
        <SpoonIcon className="size-5" />
      </span>
      <span className="ds-mark-word">Spoonful</span>
    </Link>
  );
}
