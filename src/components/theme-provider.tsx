"use client";

import { type ReactNode, useEffect } from "react";

export const themes = [
  { id: "peach", label: "Peach" },
  { id: "sage", label: "Sage" },
  { id: "berry", label: "Berry" },
] as const;

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const theme = window.localStorage.getItem("kept-theme") ?? "peach";
    const name = window.localStorage.getItem("kept-name") ?? "";
    document.documentElement.dataset.theme = theme;
    if (name) {
      document.documentElement.dataset.profileName = name;
    }
  }, []);
  return children;
}

export function applyTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("kept-theme", theme);
  window.dispatchEvent(new Event("kept-profile"));
}

export function applyProfileName(name: string) {
  document.documentElement.dataset.profileName = name;
  window.localStorage.setItem("kept-name", name);
  window.dispatchEvent(new Event("kept-profile"));
}
