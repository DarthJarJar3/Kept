import { PageShell } from "@/components/page-shell";
import { PlanBoard } from "@/components/plan-board";
import { SiteHeader } from "@/components/site-header";

type PlanPageProps = {
  searchParams: Promise<{ add?: string }>;
};

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const { add } = await searchParams;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="plan" />
      <PageShell wide>
        <PlanBoard addSlug={add} />
      </PageShell>
    </div>
  );
}
