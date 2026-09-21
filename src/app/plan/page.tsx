import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { PlanBoard } from "@/components/plan-board";
import { SiteHeader } from "@/components/site-header";

export default function PlanPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="plan" />
      <PageShell wide>
        <Suspense fallback={<p className="text-muted-foreground">Opening this week’s plan…</p>}>
          <PlanBoard />
        </Suspense>
      </PageShell>
    </div>
  );
}
