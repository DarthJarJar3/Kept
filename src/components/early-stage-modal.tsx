"use client";

import { useEffect, useId, useState } from "react";
import { AppButton } from "@/components/app-button";

export function EarlyStageModal() {
  const [open, setOpen] = useState(true);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="prototype-modal" role="presentation">
      <button
        type="button"
        className="prototype-modal-backdrop"
        aria-label="Dismiss early-stage notice"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="prototype-modal-panel"
      >
        <p className="ds-kicker">Heads up</p>
        <h2 id={titleId} className="mt-3 text-2xl font-bold tracking-tight text-balance">
          Spoonful is an early-stage prototype
        </h2>
        <p id={descriptionId} className="mt-3 text-base leading-relaxed text-muted-foreground">
          You are looking at a work-in-progress demo. Features may be incomplete,
          rough, or change without notice. Thanks for trying it while we shape
          the product.
        </p>
        <div className="mt-6 flex justify-end">
          <AppButton type="button" autoFocus onClick={() => setOpen(false)}>
            Got it
          </AppButton>
        </div>
      </div>
    </div>
  );
}
