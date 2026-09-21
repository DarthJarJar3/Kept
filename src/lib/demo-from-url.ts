import type { Recipe } from "@/lib/recipes";

/** Visual stand-in for “paste a URL.” This prototype does not scrape the web. */
export function recipeFromPastedUrl(url: string): Recipe {
  const source = url.trim() || "a recipe I pasted";
  return {
    slug: "demo-from-url",
    title: "Sheet pan honey garlic salmon",
    emoji: "🐟",
    folder: "Weeknight",
    tags: ["dinner", "30-min"],
    source,
    lastCooked: "Not yet",
    time: "25 min",
    servings: "4",
    whyKept: "The weeknight fish that actually browns instead of steaming.",
    notes: [
      "Pat the salmon very dry or the honey just slides off.",
      "Broccoli on the same pan. Extra 5 minutes if the florets are huge.",
    ],
    ingredients: [
      {
        name: "salmon fillets",
        original: "4",
        kept: "4",
        changed: false,
      },
      {
        name: "honey",
        original: "2 tbsp",
        kept: "1 tbsp honey + 1 tbsp soy",
        changed: true,
      },
      {
        name: "garlic",
        original: "2 cloves",
        kept: "4 cloves",
        changed: true,
      },
      {
        name: "broccoli",
        original: "none",
        kept: "1 big head, same pan",
        changed: true,
      },
    ],
    steps: [
      "Heat the oven to 425°F. Line a sheet pan.",
      "Toss broccoli with oil and salt. Push to the sides.",
      "Pat salmon dry. Whisk honey, soy, and garlic. Spoon over the fish.",
      "Roast 12–14 minutes. Broil 1 minute if you want more color.",
    ],
    favorite: false,
  };
}
