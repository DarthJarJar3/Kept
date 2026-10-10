"use client";

import { useId } from "react";
import { AppButton } from "@/components/app-button";

type ConfirmPanelProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
};

/** Inline destructive confirm — matches catalogue remove pattern. */
export function ConfirmPanel({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className = "",
}: ConfirmPanelProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={`ds-panel border-destructive/25 p-5 ${className}`.trim()}
    >
      <h2 id={titleId} className="text-xl">
        {title}
      </h2>
      <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <AppButton
          type="button"
          onClick={onConfirm}
          className="bg-destructive text-white hover:brightness-95"
        >
          {confirmLabel}
        </AppButton>
        <AppButton type="button" variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </AppButton>
      </div>
    </div>
  );
}
