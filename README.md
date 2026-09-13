# Kept

Three-screen prototype for IS551 *First Three Screens*.

- **GitHub (public):** https://github.com/DarthJarJar3/Kept
- **This write-up:** [README.md](https://github.com/DarthJarJar3/Kept/blob/main/README.md)
- **Live prototype:** paste your Vercel URL here after deploy
- **First AI commit (before revision):** [`b390fb2`](https://github.com/DarthJarJar3/Kept/commit/b390fb2)
- **Landing after revision:** [`src/app/page.tsx` on main](https://github.com/DarthJarJar3/Kept/blob/main/src/app/page.tsx)

```bash
npm install
npm run dev
```

Open [http://localhost:43123](http://localhost:43123). Three screens only.

---

## 1. Need, persona, capability, and value

**Need.** After cooking from a blog, a pin, or a screenshot, a home cook cannot find the recipe that already worked in her kitchen without hunting bookmarks, photos, and search history, so she remakes it from memory or skips the dish.

**Persona.** Cooks and bakes several times a week at home, pulls recipes off the internet, tweaks sugar and technique, and looks them up again in the gap before dinner or a weekend bake.

**Primary capability.** Save a recipe as her own version, then find it later by folder or tag.

**Fundamental value.** Continuity. She cooks from the version that already worked instead of starting over.

These stay distinct on purpose. The need is the situation and the costly workaround. The capability is the observable action (save-and-find *her* version). The value is the payoff after that action (continuity at the stove). The need does not name the product.

**Affordance sentence** (dominant thing on the landing screen): Keep the recipe the way you actually make it.

---

## 2. Three screens

| Screen | Single job | Why it earned the slot | Design question it examines |
| --- | --- | --- | --- |
| **Landing** (`/`) | Signal continuity and the keep-and-find capability at first glance. | The value has to land before anyone will open the kitchen. A login or settings page would not show the product working. | After five seconds, do they know this is for *their* version of a recipe, not a place to browse the internet? |
| **My kitchen** (`/kitchen`) | Demonstrate finding a kept recipe by folder or tag. | Saving is incomplete if she cannot retrieve. This is the capability in action. | Do folders and tags read as two ways to find the same recipe, or as competing organization systems? |
| **Kept recipe** (`/recipe/...`) | Show the personal version in action: notes, changed amounts, cook from it. | Continuity becomes visible here: her version vs the blog. | Can they tell this is how she actually makes it, not a reprint of the original post? |

No fourth screen. No login. No settings.

---

## 3. Design question plan (Step 6)

Questions I would actually ask my wife — not findings. Predictions only, each tied to a part of the prototype. At least one from each group.

### Need

**Q.** Think about the last time you wanted to make something you’d already made. What did you end up doing to find it?

**Prediction.** She googled it again, scrolled screenshots, or asked in a family chat. Rests on the landing line about a blog, a screenshot, and last year’s search history.

**Q.** When you give up and just don’t make it, what’s usually going on?

**Prediction.** Dinner is already late, too many similar blog posts, or she cannot remember the site name. Rests on the Weeknight folder and the lemon chicken card (“the one that actually gets dinner on the table”).

### Value

**Q.** If you always had the version that already worked in your kitchen, what’s one or two words for what that would give you? Why those words?

**Prediction.** “Relief” or “certainty” — she would not re-guess the sugar or the oven time. Rests on the peach **Your version** box on the recipe screen.

**Q.** What would have to be true for you to use this instead of screenshots and searching again?

**Prediction.** Faster than the camera roll, and her notes have to sit with the ingredients. Rests on kitchen search plus notes grouped with the ingredient changes.

### Persona

**Q.** How often does this come up, and what are you usually doing when it does?

**Prediction.** A few times a week, standing in the kitchen before dinner or planning a Saturday bake. Rests on the persona and the Weeknight / Baking folders.

### Capability

**Q.** I’m going to show you this home screen for five seconds. *(Hide it.)* What does this product do?

**Prediction.** “It saves how I actually make recipes so I can find them later.” Rests on the affordance sentence and the single button **Find a recipe I kept**.

**Q.** What would you tap first, and what do you expect would happen?

**Prediction.** The peach button. She expects *her* recipes, not a sign-up wall. Rests on the revised hero (the first version offered **Create a free account** at equal weight).

---

## 4. Design justification and first read

I opened the prototype as if I had never seen it.

**Does the landing signal the primary capability and fundamental value at first glance, before reading?** Yes, after the revision. The largest type is the affordance sentence. The next line names the payoff (find it when dinner starts). One button names the capability. The cookie comparison underneath is supporting evidence, not a second product.

**Does every element on the landing earn its place?** After the revision, yes. The first output did not. The hero gave **Create a free account** and **Browse recipes** equal weight, then added four feature cards (edit, folders, tags, share). Sign-up and share **competed** with keep-and-find. Share is not the primary capability. Account creation is not a screen this assignment is testing. Those came out. “The blog you lost” vs “What you kept” stayed because it **signals** continuity; it does not ask for a different action.

**What belongs together, and which Gestalt grouping communicates it?**

- **Landing.** The two comparison cards share a **common region** (one bordered panel) and **similarity** within each card. **Figure–ground** makes “what you kept” the peach figure against the muted blog card.
- **My kitchen.** Folders and tags are two **common regions**. Folders use squared chips (**similarity** inside the group); tags use outline pills. That **distinction** keeps two retrieval methods from looking like one mixed filter row. Recipe cards share size, structure, and spacing (**similarity** + **proximity**).
- **Kept recipe.** Notes live in one peach **common region** labeled Your version. Ingredient rows that changed keep the blog amount nearby (**proximity**). Ingredients and steps sit in two columns — related lists, separate jobs.

**Do screens 2 and 3 stay on mission, and can you return home from everywhere?** Kitchen only finds. The recipe only shows her version. **Kept** in the header and **Back to home** return to the landing from both. The recipe also links back to My kitchen in the breadcrumb.

**What the first output got wrong, and what changed**

| Problem (course vocabulary) | First output ([`b390fb2`](https://github.com/DarthJarJar3/Kept/commit/b390fb2)) | Revision |
| --- | --- | --- |
| **Signaling / competing affordances** | Sign-up and browse were equal CTAs. Four feature cards, including share, split attention. Headline was generic: “Keep your recipes in one place.” | One affordance sentence. One CTA: Find a recipe I kept. Comparison supports that job. |
| **Grouping** | Folders and tags were one chip row, so they read as the same kind of control. | Separate regions; different chip shape for folders vs tags. |
| **Comprehension of the kept version** | Personal notes were a paragraph mixed with source, time, and servings. The ingredient list showed only the kept amounts, so “edit to your preference” was invisible. | Your version is a bounded region. Changed ingredients still show what the blog called for. |

The revision is not a color preference. Peach was already the theme. The change is what is **signaled**, what is **grouped**, and what a first-time user can **comprehend** in five seconds.

**Before-and-after.** Open the landing in the initial commit [`b390fb2`](https://github.com/DarthJarJar3/Kept/commit/b390fb2) (`src/app/page.tsx`) next to the current [home screen](https://github.com/DarthJarJar3/Kept/blob/main/src/app/page.tsx). Before: two buttons, four features, no owned-version comparison — nothing told you the primary capability. After: one sentence, one action, one comparison that makes continuity visible.
