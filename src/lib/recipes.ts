export type Ingredient = {
  name: string;
  original: string;
  kept: string;
  changed: boolean;
};

export type Recipe = {
  slug: string;
  title: string;
  emoji: string;
  folder: string;
  tags: string[];
  source: string;
  lastCooked: string;
  time: string;
  servings: string;
  whyKept: string;
  notes: string[];
  ingredients: Ingredient[];
  steps: string[];
};

export const folders = ["Weeknight", "Baking", "Sunday dinner"] as const;

export const recipes: Recipe[] = [
  {
    slug: "brown-butter-chocolate-chip",
    title: "Brown butter chocolate chip cookies",
    emoji: "🍪",
    folder: "Baking",
    tags: ["chocolate", "cookies", "weekend"],
    source: "Some food blog, 2023",
    lastCooked: "Saturday",
    time: "40 min + chill",
    servings: "24 cookies",
    whyKept: "The version that actually came out chewy in this oven.",
    notes: [
      "Brown the butter until it smells nutty, then cool 10 minutes.",
      "Cut the sugar by ¼ cup or they spread too far.",
      "Chill the dough overnight. Same-day bake is too cakey.",
    ],
    ingredients: [
      {
        name: "unsalted butter",
        original: "1 cup, melted",
        kept: "1 cup, browned",
        changed: true,
      },
      {
        name: "brown sugar",
        original: "1 cup",
        kept: "1 cup",
        changed: false,
      },
      {
        name: "granulated sugar",
        original: "¾ cup",
        kept: "½ cup",
        changed: true,
      },
      {
        name: "eggs",
        original: "2",
        kept: "2",
        changed: false,
      },
      {
        name: "vanilla",
        original: "1 tsp",
        kept: "2 tsp",
        changed: true,
      },
      {
        name: "all-purpose flour",
        original: "2¼ cups",
        kept: "2¼ cups",
        changed: false,
      },
      {
        name: "chocolate chips",
        original: "2 cups",
        kept: "1½ cups + chopped dark bar",
        changed: true,
      },
    ],
    steps: [
      "Brown the butter in a light pan. Pour into a bowl and cool until just warm.",
      "Whisk in both sugars, then eggs and vanilla.",
      "Fold in flour, salt, and baking soda. Stir in chocolate.",
      "Scoop onto a tray, cover, and chill overnight.",
      "Bake at 350°F for 10–12 minutes. Pull when edges are set and centers look underdone.",
    ],
  },
  {
    slug: "weeknight-lemon-chicken",
    title: "Weeknight lemon chicken",
    emoji: "🍋",
    folder: "Weeknight",
    tags: ["chicken", "30-min", "dinner"],
    source: "Pinterest pin",
    lastCooked: "Tuesday",
    time: "30 min",
    servings: "4",
    whyKept: "The one that actually gets dinner on the table between 5:30 and 6.",
    notes: [
      "Thighs, not breasts. Breasts dry out before the sauce is ready.",
      "Zest one extra lemon. Juice alone is flat.",
      "Serve over rice so the pan sauce is not wasted.",
    ],
    ingredients: [
      {
        name: "chicken",
        original: "4 breasts",
        kept: "6 boneless thighs",
        changed: true,
      },
      {
        name: "lemons",
        original: "1, juiced",
        kept: "2, zest + juice",
        changed: true,
      },
      {
        name: "garlic",
        original: "2 cloves",
        kept: "4 cloves",
        changed: true,
      },
      {
        name: "olive oil",
        original: "2 tbsp",
        kept: "2 tbsp",
        changed: false,
      },
      {
        name: "chicken broth",
        original: "½ cup",
        kept: "½ cup",
        changed: false,
      },
      {
        name: "fresh thyme",
        original: "optional",
        kept: "a few sprigs",
        changed: true,
      },
    ],
    steps: [
      "Pat thighs dry and season with salt and pepper.",
      "Sear in olive oil until golden, about 4 minutes a side. Set aside.",
      "Sauté garlic 30 seconds. Add zest, juice, broth, and thyme.",
      "Return chicken. Simmer 8–10 minutes until cooked through.",
      "Spoon sauce over everything. Eat with rice or crusty bread.",
    ],
  },
  {
    slug: "sourdough-sandwich-loaf",
    title: "Sourdough sandwich loaf",
    emoji: "🍞",
    folder: "Baking",
    tags: ["sourdough", "bread", "weekend"],
    source: "King Arthur comments section",
    lastCooked: "Sunday",
    time: "Overnight",
    servings: "1 loaf",
    whyKept: "The loaf that actually sandwiches without shredding.",
    notes: [
      "This oven runs hot. 450° for 20 minutes, then 400°.",
      "Dutch oven with the lid on for the first 20.",
      "Do not skip the overnight fridge proof if you want a tighter crumb.",
    ],
    ingredients: [
      {
        name: "active starter",
        original: "100 g",
        kept: "100 g",
        changed: false,
      },
      {
        name: "bread flour",
        original: "500 g",
        kept: "450 g bread + 50 g whole wheat",
        changed: true,
      },
      {
        name: "water",
        original: "350 g",
        kept: "340 g",
        changed: true,
      },
      {
        name: "salt",
        original: "10 g",
        kept: "12 g",
        changed: true,
      },
    ],
    steps: [
      "Mix starter, water, and flour. Rest 30 minutes.",
      "Add salt. Stretch and fold 3 times over 2 hours.",
      "Shape into a loaf. Proof in the fridge overnight.",
      "Preheat Dutch oven 30 minutes at 450°F.",
      "Score, bake 20 minutes covered, 20–25 uncovered at 400°F.",
    ],
  },
  {
    slug: "sunday-pot-roast",
    title: "Sunday pot roast",
    emoji: "🍖",
    folder: "Sunday dinner",
    tags: ["beef", "slow", "family"],
    source: "Mom's text, then a blog",
    lastCooked: "Last Sunday",
    time: "4 hours",
    servings: "6–8",
    whyKept: "The roast the table actually asks for again.",
    notes: [
      "Red wine instead of all broth. Half and half if the bottle is already open.",
      "Carrots in for the last hour so they are not mush.",
      "Chuck roast only. Other cuts never get as tender.",
    ],
    ingredients: [
      {
        name: "chuck roast",
        original: "3 lb",
        kept: "3–4 lb chuck",
        changed: true,
      },
      {
        name: "onion",
        original: "1",
        kept: "2",
        changed: true,
      },
      {
        name: "carrots",
        original: "4, from the start",
        kept: "6, last hour",
        changed: true,
      },
      {
        name: "beef broth",
        original: "2 cups",
        kept: "1 cup broth + 1 cup red wine",
        changed: true,
      },
      {
        name: "tomato paste",
        original: "none",
        kept: "1 tbsp",
        changed: true,
      },
    ],
    steps: [
      "Salt the roast the night before if you remember.",
      "Sear hard on all sides. Remove.",
      "Soften onions. Stir in tomato paste, then wine and broth.",
      "Return roast. Low oven, 300°F, covered, about 3 hours.",
      "Add carrots for the last hour. Rest 15 minutes before slicing.",
    ],
  },
  {
    slug: "banana-bread",
    title: "Banana bread that freezes",
    emoji: "🍌",
    folder: "Baking",
    tags: ["banana", "breakfast", "freeze"],
    source: "A screenshot from 2019",
    lastCooked: "Monday",
    time: "70 min",
    servings: "1 loaf",
    whyKept: "The loaf we actually finish instead of throwing away.",
    notes: [
      "Three very ripe bananas. Two is dry.",
      "Walnuts in half the pan so picky eaters still eat it.",
      "Wrap slices and freeze. Toast from frozen.",
    ],
    ingredients: [
      {
        name: "ripe bananas",
        original: "2",
        kept: "3, mashed",
        changed: true,
      },
      {
        name: "sugar",
        original: "1 cup",
        kept: "¾ cup",
        changed: true,
      },
      {
        name: "butter",
        original: "½ cup, melted",
        kept: "½ cup, melted",
        changed: false,
      },
      {
        name: "eggs",
        original: "2",
        kept: "2",
        changed: false,
      },
      {
        name: "flour",
        original: "1½ cups",
        kept: "1½ cups",
        changed: false,
      },
      {
        name: "walnuts",
        original: "none",
        kept: "½ cup, one half of the pan",
        changed: true,
      },
    ],
    steps: [
      "Heat oven to 350°F. Butter a loaf pan.",
      "Mash bananas. Stir in melted butter, sugar, eggs, vanilla.",
      "Fold in flour, baking soda, and salt. Do not overmix.",
      "Pour half. Sprinkle walnuts. Pour the rest.",
      "Bake 55–65 minutes. Cool before slicing or it gums.",
    ],
  },
  {
    slug: "cilantro-lime-rice",
    title: "Cilantro lime rice",
    emoji: "🌿",
    folder: "Weeknight",
    tags: ["side", "15-min", "rice"],
    source: "A burrito-chain copycat post",
    lastCooked: "Tuesday",
    time: "20 min",
    servings: "4",
    whyKept: "The side that makes leftover chicken into a meal.",
    notes: [
      "Toast the rice in oil first or it tastes steamed and bland.",
      "Zest plus juice. Juice alone disappears.",
      "Salt it like you mean it after fluffing.",
    ],
    ingredients: [
      {
        name: "long-grain rice",
        original: "1 cup, rinsed",
        kept: "1 cup, toasted then simmered",
        changed: true,
      },
      {
        name: "lime",
        original: "1, juiced",
        kept: "1, zest + juice",
        changed: true,
      },
      {
        name: "cilantro",
        original: "2 tbsp",
        kept: "a packed handful",
        changed: true,
      },
      {
        name: "oil",
        original: "none",
        kept: "1 tbsp, to toast",
        changed: true,
      },
    ],
    steps: [
      "Toast rice in oil until it smells nutty, 2 minutes.",
      "Add water and a pinch of salt. Simmer covered 15 minutes.",
      "Rest 5 minutes. Fluff.",
      "Fold in zest, juice, cilantro, and more salt than you think.",
    ],
  },
];

export const allTags = Array.from(
  new Set(recipes.flatMap((recipe) => recipe.tags))
).sort();

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getFolderCount(folder: string) {
  return recipes.filter((recipe) => recipe.folder === folder).length;
}
