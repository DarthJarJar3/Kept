const UNICODE: Record<string, number> = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
};

export function parseServes(servings: string) {
  const match = servings.replace(/–/g, "-").match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 4;
}

function parseLeadingNumber(text: string) {
  const trimmed = text.trim();
  const mixed = trimmed.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)(.*)$/);
  if (mixed) {
    return {
      value: Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]),
      rest: mixed[4],
    };
  }
  const fraction = trimmed.match(/^(\d+)\s*\/\s*(\d+)(.*)$/);
  if (fraction) {
    return {
      value: Number(fraction[1]) / Number(fraction[2]),
      rest: fraction[3],
    };
  }
  const unicodeMix = trimmed.match(/^(\d+)\s*([¼½¾⅓⅔])(.*)$/);
  if (unicodeMix) {
    return {
      value: Number(unicodeMix[1]) + UNICODE[unicodeMix[2]],
      rest: unicodeMix[3],
    };
  }
  const unicode = trimmed.match(/^([¼½¾⅓⅔])(.*)$/);
  if (unicode) {
    return { value: UNICODE[unicode[1]], rest: unicode[2] };
  }
  const decimal = trimmed.match(/^(\d+(\.\d+)?)(.*)$/);
  if (decimal) {
    return { value: Number(decimal[1]), rest: decimal[3] };
  }
  return null;
}

function formatNumber(value: number) {
  const rounded = Math.round(value * 8) / 8;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;
  const glyphs: Record<number, string> = {
    0.25: "¼",
    0.5: "½",
    0.75: "¾",
    0.125: "⅛",
    0.375: "⅜",
    0.625: "⅝",
    0.875: "⅞",
  };
  if (frac === 0) {
    return String(whole);
  }
  if (glyphs[frac]) {
    return whole ? `${whole} ${glyphs[frac]}` : glyphs[frac];
  }
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

export function measureOf(amount: string): { value: number; unit: string } | null {
  const parsed = parseLeadingNumber(amount);
  if (!parsed) {
    return null;
  }
  return { value: parsed.value, unit: parsed.rest.trim() };
}

export function formatMeasure(value: number, unit: string) {
  const formatted = formatNumber(value);
  if (!unit) {
    return formatted;
  }
  if (unit.startsWith(",") || unit.startsWith(".")) {
    return `${formatted}${unit}`;
  }
  return `${formatted} ${unit}`;
}

export function scaleAmount(amount: string, factor: number) {
  if (!Number.isFinite(factor) || Math.abs(factor - 1) < 0.001) {
    return amount;
  }
  const parsed = parseLeadingNumber(amount);
  if (!parsed) {
    return amount;
  }
  return `${formatNumber(parsed.value * factor)}${parsed.rest}`;
}
