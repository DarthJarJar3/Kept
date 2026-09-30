import { DesignSystemCatalog } from "@/design-system/catalog";
import { PageShell } from "@/components/page-shell";
import { SiteHeader } from "@/components/site-header";

export default function DesignSystemPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="system" />
      <PageShell>
        <DesignSystemCatalog />
      </PageShell>
    </div>
  );
}
