"use client";

import { useSyncExternalStore } from "react";
import { AppButton } from "@/components/app-button";
import {
  applyProfileName,
  applyTheme,
  themes,
} from "@/components/theme-provider";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useState } from "react";

function subscribeProfile(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("kept-profile", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("kept-profile", onStoreChange);
  };
}

function readName() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.localStorage.getItem("kept-name") ?? "";
}

function readTheme() {
  if (typeof window === "undefined") {
    return "peach";
  }
  return window.localStorage.getItem("kept-theme") ?? "peach";
}

export function ProfileForm() {
  const mounted = useHasMounted();
  const storedName = useSyncExternalStore(subscribeProfile, readName, () => "");
  const storedTheme = useSyncExternalStore(
    subscribeProfile,
    readTheme,
    () => "peach"
  );
  const [name, setName] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const liveName = name ?? storedName;
  const liveTheme = theme ?? storedTheme;

  if (!mounted) {
    return <p className="text-muted-foreground">Opening profile…</p>;
  }

  return (
    <form
      className="max-w-xl space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        applyProfileName(liveName.trim());
        applyTheme(liveTheme);
        window.dispatchEvent(new Event("kept-profile"));
        setSaved(true);
      }}
    >
      <div>
        <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)]">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          A name and a kitchen color. No accounts in this prototype — it only
          lives in this browser.
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Your name</span>
        <input
          value={liveName}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
          placeholder="The cook this kitchen belongs to"
          className="h-11 w-full rounded-xl border-2 border-border bg-card px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring"
        />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Kitchen color</legend>
        <p className="mb-3 text-sm text-muted-foreground">
          Peach is the default. Sage and berry are here if peach is too sweet.
        </p>
        <div className="flex flex-wrap gap-2">
          {themes.map((item) => (
            <AppButton
              key={item.id}
              type="button"
              variant={liveTheme === item.id ? "primary" : "secondary"}
              aria-pressed={liveTheme === item.id}
              onClick={() => {
                setTheme(item.id);
                applyTheme(item.id);
                setSaved(false);
              }}
            >
              {item.label}
            </AppButton>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <AppButton type="submit">Save profile</AppButton>
        {saved ? (
          <p className="text-sm text-muted-foreground">Saved in this browser.</p>
        ) : null}
      </div>
    </form>
  );
}
