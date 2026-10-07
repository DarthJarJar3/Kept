# Spoonful

A recipe app for a personal catalogue you cook from. Open a recipe you already saved, and Spoonful keeps you oriented while you make it.

Team: William Gifford, Ethan Wood, Caleb Caten, and George Summerill.

- **GitHub (public):** https://github.com/DarthJarJar3/Kept
- **This write-up:** [README.md](https://github.com/DarthJarJar3/Kept/blob/main/README.md)
- **First assignment (three screens, when the app was called Kept):** [OLD_3SCREENS_README.MD](./OLD_3SCREENS_README.MD)
- **Live prototype:** paste your Vercel URL here after deploy

The repository is still named Kept. The product name is Spoonful.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:43123](http://localhost:43123).

Type and layout scale with the viewport. Buttons share one boxed, rounded style.

---

## What the app is for

Spoonful is where cooking enthusiasts keep the recipes they already make and come back to them. The catalogue is the center of the product. You are here to use your own recipes, with notes, tags, and the amounts you actually cook with.

When you select a recipe, the app guides you through making it. You check off getting the ingredients out, then check off each step. A progress bar shows how far through the recipe you are, so it is easy to tell where you left off.

Recipes enter the catalogue in two ways:

- Paste the recipe as raw text.
- Paste a link to a recipe page. The app extracts the recipe text from that site.

Planning sits beside the catalogue. You choose a range of days, the recipes you might cook on those days, and how many people you are cooking for. The app then tells you how much of each ingredient you need.

**Value.** Keep the recipes you love, the way you make them. You cook from the version that already worked, and you can see where you are in it.

**Who it is for.** People who cook and bake at home several times a week, pull recipes off the internet, tweak sugar and technique, and look those recipes up again before dinner or a weekend bake.

**Need.** After cooking from a blog, a pin, or a screenshot, that same cook cannot find the version that already worked without hunting bookmarks, photos, and search history. Once she is in the recipe, a long page makes it hard to tell which ingredients are out and which step she is on.

**Affordance sentence** on the current landing screen: Cook from a recipe you saved.

---

## Main screens

These are the core of the app. The Spoonful name in the navbar is the home button. Opening a recipe from the catalogue is the cook-through, so that screen is not its own nav item. Profile is where settings live.

| Screen | Where | Job |
| --- | --- | --- |
| **Home** | `/` | Say what Spoonful is for, then send you to your recipes or to add one. |
| **Recipes** | `/kitchen` | The catalogue. Find a saved recipe and open it. |
| **Add recipe** | `/keep` | Paste a link, or write the version you already make. |
| **Plan ahead** | `/plan` | Pick a range of days and how many people, then see how much of each ingredient the recipes in that range need. |
| **Cook-through** | `/recipe/...` | The recipe you selected. The aim is checkboxes for ingredients and steps, plus a progress bar. |

The first IS551 prototype proved a smaller slice of this: a landing screen, My Kitchen, and one kept recipe. That write-up, including the design questions and the before-and-after of the landing page, is in [OLD_3SCREENS_README.MD](./OLD_3SCREENS_README.MD).

---

## What this prototype does today

- **Home** states the keep-and-find idea and links into Recipes and Add recipe.
- **Recipes** finds by folder, tag, favorite, name, or ingredient. Folders and tags stay in two separate groups. Opening a card goes to that recipe.
- **Recipe** shows your version: notes in one region, and changed amounts next to what the source called for. You can send it to Plan. Checkboxes and a progress bar are still ahead of this screen.
- **Add recipe** lets you type a recipe, including a meal photo, or paste a link. Pasting a link fills a sample recipe so the flow is visible. It does not yet read the page, and it does not yet accept a raw paste of recipe text.
- **Plan ahead** is the current week. You set the first and last day, set how many people you are cooking for, and place recipes on meals. The ingredient list covers only the days in that range and scales each recipe from the servings written on it. A meal that is only a short note, like yoghurt, stays off the list.
- **Profile** (`/profile`) is in the navbar. It holds your name, the kitchen color, and is where further settings will live.
- **Pantry** (`/pantry`), the **grocery list** (`/grocery`), and the **design system** (`/design-system`) are still in the app. They are not in the main navbar.

Saved recipes, the week plan, the plan’s date range and headcount, pantry items, the grocery list, and profile settings live in the browser’s local storage. There is no account yet.

Seed recipes ship in `src/lib/recipes.ts`. Anything you add in the browser is stored on top of those.
