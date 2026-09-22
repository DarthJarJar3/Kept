const SKIP = new Set([
  "and",
  "the",
  "with",
  "for",
  "fresh",
  "ripe",
  "unsalted",
  "granulated",
  "boneless",
  "packed",
  "active",
  "large",
  "small",
  "whole",
  "purpose",
  "all",
  "long",
  "grain",
  "brown",
  "dark",
  "extra",
]);

const MUST_MATCH = ["broth", "stock", "paste", "chip", "powder", "sauce"];

function stem(word: string) {
  if (word.length > 3 && word.endsWith("es")) {
    return word.slice(0, -2);
  }
  if (word.length > 3 && word.endsWith("s")) {
    return word.slice(0, -1);
  }
  return word;
}

export function ingredientWords(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z]+/)
    .map(stem)
    .filter((word) => word.length > 2 && !SKIP.has(word));
}

function sharesWord(left: string[], right: string[]) {
  return left.some((word) =>
    right.some((owned) => owned === word || owned.startsWith(word) || word.startsWith(owned))
  );
}

export function ingredientCovered(name: string, pantryNames: string[]) {
  const needed = ingredientWords(name);
  if (needed.length === 0) {
    return false;
  }
  const required = needed.filter((word) =>
    MUST_MATCH.some((marker) => word.startsWith(marker))
  );
  return pantryNames.some((item) => {
    const have = ingredientWords(item);
    const qualifiers = required.length === 0 || sharesWord(required, have);
    return sharesWord(needed, have) && qualifiers;
  });
}
