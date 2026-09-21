import { Suspense } from "react";
import { KeepScreen } from "@/components/keep-screen";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";

export default function KeepPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-full flex-col">
          <SiteHeader current="keep" />
          <PageShell>
            <p className="text-muted-foreground">Opening the keep form…</p>
          </PageShell>
        </div>
      }
    >
      <KeepScreen />
    </Suspense>
  );
}
