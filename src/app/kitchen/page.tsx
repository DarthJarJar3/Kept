import { SiteHeader } from "@/components/site-header";
import { KitchenBoard } from "@/components/kitchen-board";

type KitchenPageProps = {
  searchParams: Promise<{
    folder?: string;
    tag?: string;
    q?: string;
    favorite?: string;
    page?: string;
  }>;
};

export default async function KitchenPage({ searchParams }: KitchenPageProps) {
  const params = await searchParams;
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="kitchen" />
      <KitchenBoard
        folder={params.folder}
        tag={params.tag}
        query={params.q}
        favorite={params.favorite === "1"}
        page={page}
      />
    </div>
  );
}
