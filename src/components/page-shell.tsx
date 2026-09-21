import type { ReactNode } from "react";

export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <main
      className={
        wide
          ? "page-shell page-shell-wide flex-1 py-[clamp(1.25rem,3vw,2.5rem)]"
          : "page-shell flex-1 py-[clamp(1.25rem,3vw,2.5rem)]"
      }
    >
      {children}
    </main>
  );
}
