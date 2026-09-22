import { PageShell } from "@/components/page-shell";
import { PantryBoard } from "@/components/pantry-board";
import { SiteHeader } from "@/components/site-header";

export default function PantryPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="pantry" />
      <PageShell wide>
        <PantryBoard />
      </PageShell>
    </div>
  );
}