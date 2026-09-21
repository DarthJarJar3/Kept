import { AppButton } from "@/components/app-button";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="home" />
      <PageShell>
        <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">
          That page is not here
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          It may have been a prototype keep that only lived in another browser,
          or a link that never existed.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <AppButton href="/kitchen">My Kitchen</AppButton>
          <AppButton href="/" variant="secondary">
            Home
          </AppButton>
        </div>
      </PageShell>
    </div>
  );
}
