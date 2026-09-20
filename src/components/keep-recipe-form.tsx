"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { allTags, folders, type Recipe } from "@/lib/recipes";
import { saveKeptRecipe, slugifyTitle } from "@/lib/kept-store";
import { cn } from "@/lib/utils";

const emojis = ["🍪", "🍋", "🍞", "🍖", "🍌", "🌿", "🍲", "🥗", "🥧", "☕"];

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

const areaClass =
  "min-h-28 w-full rounded-lg border border-input bg-card px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

type IngredientDraft = {
  name: string;
  kept: string;
  original: string;
};

export function KeepRecipeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🍪");
  const [folder, setFolder] = useState<(typeof folders)[number]>("Weeknight");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [source, setSource] = useState("");
  const [whyKept, setWhyKept] = useState("");
  const [notes, setNotes] = useState("");
  const [ingredients, setIngredients] = useState<IngredientDraft[]>([
    { name: "", kept: "", original: "" },
    { name: "", kept: "", original: "" },
  ]);
  const [steps, setSteps] = useState("");

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  }

  function addCustomTag() {
    const tag = customTag.trim().toLowerCase();
    if (!tag) {
      return;
    }
    setSelectedTags((current) =>
      current.includes(tag) ? current : [...current, tag]
    );
    setCustomTag("");
  }

  function updateIngredient(
    index: number,
    key: keyof IngredientDraft,
    value: string
  ) {
    setIngredients((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim() || "Untitled kept recipe";
    const noteLines = notes
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const stepLines = steps
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const keptIngredients = ingredients
      .filter((item) => item.name.trim() && item.kept.trim())
      .map((item) => ({
        name: item.name.trim(),
        kept: item.kept.trim(),
        original: item.original.trim(),
        changed: Boolean(item.original.trim()),
      }));

    const recipe: Recipe = {
      slug: slugifyTitle(trimmedTitle),
      title: trimmedTitle,
      emoji,
      folder,
      tags: selectedTags,
      source: source.trim() || "A blog I do not want to hunt for again",
      lastCooked: "Today",
      time: time.trim() || "Weeknight",
      servings: servings.trim() || "4",
      whyKept:
        whyKept.trim() || "The version that actually worked in this kitchen.",
      notes: noteLines,
      ingredients:
        keptIngredients.length > 0
          ? keptIngredients
          : [
              {
                name: "your ingredients",
                original: "",
                kept: "as you actually use them",
                changed: false,
              },
            ],
      steps:
        stepLines.length > 0
          ? stepLines
          : ["Cook it the way you already know works."],
    };

    saveKeptRecipe(recipe);
    router.push(`/recipe/${recipe.slug}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Icon</legend>
          <div className="flex flex-wrap gap-2">
            {emojis.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setEmoji(item)}
                aria-pressed={emoji === item}
                className={
                  emoji === item
                    ? "flex size-11 items-center justify-center rounded-lg bg-primary text-xl text-primary-foreground"
                    : "flex size-11 items-center justify-center rounded-lg bg-secondary text-xl"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Recipe name</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Brown butter chocolate chip cookies"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-border bg-card p-4">
          <legend className="font-heading text-lg">Folder</legend>
          <p className="mb-3 text-sm text-muted-foreground">
            One place you would look
          </p>
          <div className="flex flex-wrap gap-2">
            {folders.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFolder(item)}
                aria-pressed={folder === item}
                className={
                  folder === item
                    ? "rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                    : "rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-accent"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-card p-4">
          <legend className="font-heading text-lg">Tags</legend>
          <p className="mb-3 text-sm text-muted-foreground">
            Find this recipe another way
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleTag(item)}
                aria-pressed={selectedTags.includes(item)}
                className={
                  selectedTags.includes(item)
                    ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                    : "rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted"
                }
              >
                {item}
              </button>
            ))}
            {selectedTags
              .filter((item) => !allTags.includes(item))
              .map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleTag(item)}
                  className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                >
                  {item}
                </button>
              ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={customTag}
              onChange={(event) => setCustomTag(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addCustomTag();
                }
              }}
              placeholder="Add a tag"
              className={cn(fieldClass, "h-9")}
            />
            <button
              type="button"
              onClick={addCustomTag}
              className={cn(buttonVariants({ variant: "outline" }), "h-9")}
            >
              Add
            </button>
          </div>
        </fieldset>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Time</span>
          <input
            value={time}
            onChange={(event) => setTime(event.target.value)}
            placeholder="30 min"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Servings</span>
          <input
            value={servings}
            onChange={(event) => setServings(event.target.value)}
            placeholder="4"
            className={fieldClass}
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-2 block text-sm font-medium">Where it came from</span>
          <input
            value={source}
            onChange={(event) => setSource(event.target.value)}
            placeholder="A Pinterest pin, 2022"
            className={fieldClass}
          />
        </label>
      </div>

      <section className="rounded-2xl border border-primary/35 bg-[oklch(0.96_0.03_52)] p-5">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          Your version
        </p>
        <label className="mt-3 block">
          <span className="mb-2 block text-sm font-medium">
            Why this is the one you keep
          </span>
          <input
            value={whyKept}
            onChange={(event) => setWhyKept(event.target.value)}
            placeholder="The version that actually came out chewy in this oven."
            className={fieldClass}
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium">
            Notes (one per line)
          </span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={"Cut the sugar by ¼ cup.\nChill the dough overnight."}
            className={areaClass}
          />
        </label>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl">Ingredients</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your amount is the one you cook from. Fill in the blog amount only
              if you changed it.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setIngredients((current) => [
                ...current,
                { name: "", kept: "", original: "" },
              ])
            }
            className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
        <ul className="mt-4 space-y-3">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="grid gap-2 rounded-xl border border-border bg-card p-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <input
                value={item.name}
                onChange={(event) =>
                  updateIngredient(index, "name", event.target.value)
                }
                placeholder="Ingredient"
                aria-label={`Ingredient ${index + 1} name`}
                className={cn(fieldClass, "h-10")}
              />
              <input
                value={item.kept}
                onChange={(event) =>
                  updateIngredient(index, "kept", event.target.value)
                }
                placeholder="How you use it"
                aria-label={`Ingredient ${index + 1} kept amount`}
                className={cn(fieldClass, "h-10")}
              />
              <input
                value={item.original}
                onChange={(event) =>
                  updateIngredient(index, "original", event.target.value)
                }
                placeholder="Blog called for…"
                aria-label={`Ingredient ${index + 1} original amount`}
                className={cn(fieldClass, "h-10")}
              />
              <button
                type="button"
                onClick={() =>
                  setIngredients((current) =>
                    current.length === 1
                      ? current
                      : current.filter((_, itemIndex) => itemIndex !== index)
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={`Remove ingredient ${index + 1}`}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <label className="block">
        <span className="mb-2 block font-heading text-2xl">Steps</span>
        <p className="mb-3 text-sm text-muted-foreground">One step per line.</p>
        <textarea
          value={steps}
          onChange={(event) => setSteps(event.target.value)}
          placeholder={
            "Brown the butter until it smells nutty.\nChill overnight.\nBake 10–12 minutes."
          }
          className={cn(areaClass, "min-h-40")}
        />
      </label>

      <button
        type="submit"
        className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base")}
      >
        Keep this recipe
      </button>
    </form>
  );
}
