import { SiteHeader } from "@/components/site-header";
import { KitchenBoard } from "@/components/kitchen-board";

type KitchenPageProps = {
  searchParams: Promise<{ folder?: string; tag?: string; q?: string }>;
};

export default async function KitchenPage({ searchParams }: KitchenPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="kitchen" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <KitchenBoard
          folder={params.folder}
          tag={params.tag}
          query={params.q}
        />
      </main>
    </div>
  );
}
