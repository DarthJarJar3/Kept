import { SiteHeader } from "@/components/site-header";
import { KitchenBoard } from "@/components/kitchen-board";

export default function KitchenPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="kitchen" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <KitchenBoard />
      </main>
    </div>
  );
}
