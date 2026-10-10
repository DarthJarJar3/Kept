import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { BrandMark } from "@/design-system";

export const metadata: Metadata = {
  title: "Sign in — Spoonful",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-[clamp(2rem,6vw,4rem)]">
      <div className="mb-8">
        <BrandMark />
      </div>
      <LoginForm />
    </main>
  );
}
