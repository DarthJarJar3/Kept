"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AppButton } from "@/components/app-button";

type ActionFeedbackContextValue = {
  notify: (message: string) => void;
};

const ActionFeedbackContext = createContext<ActionFeedbackContextValue | null>(
  null
);

const DISMISS_MS = 4500;

export function ActionFeedbackProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearTimer();
    setMessage(null);
  }, [clearTimer]);

  const notify = useCallback(
    (next: string) => {
      clearTimer();
      setMessage(next);
      timerRef.current = window.setTimeout(() => {
        setMessage(null);
        timerRef.current = null;
      }, DISMISS_MS);
    },
    [clearTimer]
  );

  useEffect(() => () => clearTimer(), [clearTimer]);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ActionFeedbackContext.Provider value={value}>
      {children}
      {message ? (
        <div className="action-feedback-host" aria-live="polite" aria-atomic="true">
          <div className="action-feedback-toast" role="status">
            <p className="action-feedback-message">{message}</p>
            <AppButton
              type="button"
              variant="secondary"
              onClick={dismiss}
              className="min-h-9 px-3 text-sm"
            >
              Dismiss
            </AppButton>
          </div>
        </div>
      ) : null}
    </ActionFeedbackContext.Provider>
  );
}

export function useActionFeedback() {
  const context = useContext(ActionFeedbackContext);
  if (!context) {
    throw new Error("useActionFeedback must be used within ActionFeedbackProvider");
  }
  return context;
}
