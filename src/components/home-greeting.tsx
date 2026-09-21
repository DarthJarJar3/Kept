"use client";

import { useSyncExternalStore } from "react";

function subscribeProfile(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("kept-profile", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("kept-profile", onStoreChange);
  };
}

function readName() {
  return window.localStorage.getItem("kept-name") ?? "";
}

export function HomeGreeting() {
  const name = useSyncExternalStore(subscribeProfile, readName, () => "");
  if (!name) {
    return null;
  }
  return (
    <p className="mb-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
      {name}&apos;s kitchen
    </p>
  );
}
