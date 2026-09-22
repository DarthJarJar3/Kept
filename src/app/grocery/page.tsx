import { GroceryBoard } from "@/components/grocery-board";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";

export default function GroceryPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="grocery" />
      <PageShell wide>
        <GroceryBoard />
      </PageShell>
    </div>
  );
}
