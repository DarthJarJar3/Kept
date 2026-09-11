import Link from "next/link";

type SiteHeaderProps = {
  current?: "home" | "kitchen" | "recipe";
};

export function SiteHeader({ current = "home" }: SiteHeaderProps) {
  return (
    <header className="border-b border-border/80 bg-[oklch(0.99_0.01_55)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-2xl tracking-tight text-foreground"
          aria-label="Kept, back to home"
        >
          Kept
        </Link>
        {current === "home" ? (
          <span className="text-sm text-muted-foreground">Your recipes</span>
        ) : (
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Back to home
          </Link>
        )}
      </div>
    </header>
  );
}
