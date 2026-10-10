import { CookScreen } from "@/components/cook-screen";
import { getRecipe } from "@/lib/recipes";

type CookPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ serves?: string }>;
};

function parseServesParam(value: string | undefined) {
  if (!value) return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.min(24, Math.round(n));
}

export default async function CookPage({ params, searchParams }: CookPageProps) {
  const { slug } = await params;
  const { serves } = await searchParams;
  return (
    <CookScreen
      slug={slug}
      baked={getRecipe(slug) ?? null}
      serves={parseServesParam(serves)}
    />
  );
}
