import Link from "next/link";
import { Carrot } from "lucide-react";

export function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} aria-label="Kept home" className="ds-mark">
      <span className="ds-mark-icon">
        <Carrot className="size-5" />
      </span>
      <span className="ds-mark-word">Kept</span>
    </Link>
  );
}
