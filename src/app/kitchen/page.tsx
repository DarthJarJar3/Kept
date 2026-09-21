import { SiteHeader } from "@/components/site-header";
import { KitchenBoard } from "@/components/kitchen-board";
import { PageShell } from "@/components/page-shell";

type KitchenPageProps = {
  searchParams: Promise<{
    folder?: string;
    tag?: string;
    q?: string;
    favorite?: string;
  }>;
};

export default async function KitchenPage({ searchParams }: KitchenPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="kitchen" />
      <PageShell wide>
        <KitchenBoard
          folder={params.folder}
          tag={params.tag}
          query={params.q}
          favorite={params.favorite === "1"}
        />
      </PageShell>
    </div>
  );
}
