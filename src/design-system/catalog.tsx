import { BrandMark } from "@/design-system/components/brand-mark";
import { Button } from "@/design-system/components/button";
import { Chip } from "@/design-system/components/chip";
import { Field, TextArea } from "@/design-system/components/field";
import { Panel } from "@/design-system/components/panel";

const swatches = [
  ["Cream", "var(--spoonful-cream)", "var(--foreground)"],
  ["Coral", "var(--spoonful-coral)", "#ffffff"],
  ["Rose", "var(--spoonful-rose)", "#ffffff"],
  ["Blush", "var(--spoonful-blush)", "#5c2222"],
  ["Ink", "var(--foreground)", "var(--spoonful-cream)"],
  ["Card", "var(--card)", "var(--foreground)"],
  ["Wash", "var(--secondary)", "var(--secondary-foreground)"],
  ["Line", "var(--border)", "var(--foreground)"],
] as const;

export function DesignSystemCatalog() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <p className="ds-kicker">Design system</p>
        <h1 className="ds-display mt-3">Spoonful</h1>
        <p className="ds-body mt-4">
          Cream paper, a coral spoon mark, and blush washes. These are the
          styles and components the rest of Spoonful uses.
        </p>
      </header>

      <section>
        <h2 className="ds-title">Color</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map(([name, fill, ink]) => (
            <div
              key={name}
              className="ds-swatch"
              style={{ background: fill, color: ink }}
            >
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="ds-title">Type</h2>
        <Panel className="mt-4 space-y-4 p-5">
          <p className="ds-kicker">Plus Jakarta Sans</p>
          <p className="ds-display">Keep the recipe you make.</p>
          <p className="ds-title">Weeknight lemon chicken</p>
          <p className="ds-body">
            Body copy stays warm gray so the title and the coral action can
            carry the screen.
          </p>
        </Panel>
      </section>

      <section>
        <h2 className="ds-title">Buttons</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>Start cooking</Button>
          <Button variant="secondary">Save for later</Button>
          <Button variant="peach">Guidance</Button>
        </div>
      </section>

      <section>
        <h2 className="ds-title">Fields</h2>
        <Panel className="mt-4 grid gap-4 p-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Recipe name</span>
            <Field placeholder="Coconut curry red lentil dahl" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Notes</span>
            <TextArea placeholder="Chill overnight. This oven runs hot." />
          </label>
        </Panel>
      </section>

      <section>
        <h2 className="ds-title">Chips and cards</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Panel className="p-4">
            <p className="text-lg font-bold tracking-tight">Most popular</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>Weeknight</Chip>
              <Chip tone="muted">30 min</Chip>
              <Chip tone="muted">chicken</Chip>
            </div>
          </Panel>
          <Panel className="flex items-center p-4">
            <BrandMark />
          </Panel>
        </div>
      </section>

      <section>
        <h2 className="ds-title">Accents</h2>
        <p className="ds-body mt-2">
          Rose and Berry only change the accent. Paper, type, and shape stay
          the same.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <AccentPreview title="Coral" className="ds-theme-mealtime" />
          <AccentPreview title="Rose" className="ds-theme-garden" />
          <AccentPreview title="Berry" className="ds-theme-berry" />
        </div>
      </section>
    </div>
  );
}

function AccentPreview({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <div className={`${className} ds-panel space-y-3 p-4`}>
      <p className="text-lg font-bold tracking-tight">{title}</p>
      <span className="ds-button ds-button-primary">Primary</span>
      <span className="ds-chip">Soft chip</span>
    </div>
  );
}
