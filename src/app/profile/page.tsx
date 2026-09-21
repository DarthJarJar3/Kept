import { PageShell } from "@/components/page-shell";
import { ProfileForm } from "@/components/profile-form";
import { SiteHeader } from "@/components/site-header";

export default function ProfilePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader current="profile" />
      <PageShell>
        <ProfileForm />
      </PageShell>
    </div>
  );
}
