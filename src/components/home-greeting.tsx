"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

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

export function HomeGreeting({ className }: { className?: string }) {
  const name = useSyncExternalStore(subscribeProfile, readName, () => "");
  if (!name) {
    return null;
  }
  return (
    <p
      className={cn(
        "mb-3 text-sm font-medium tracking-wide text-muted-foreground uppercase",
        className,
      )}
    >
      {name}&apos;s kitchen
    </p>
  );
}
