"use client";

import { useSyncExternalStore } from "react";

export interface ConsentState {
  essential: true;
  analytics: boolean;
  ads: boolean;
  savedAt: string;
}

export const CONSENT_STORAGE_KEY = "toolontips-consent";
export const CONSENT_SAVED_EVENT = "toolontips:consent-saved";

function isConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    record.essential === true &&
    typeof record.analytics === "boolean" &&
    typeof record.ads === "boolean" &&
    typeof record.savedAt === "string"
  );
}

let cachedRaw: string | null = null;
let cachedState: ConsentState | null = null;

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === cachedRaw) return cachedState;
    cachedRaw = raw;
    if (!raw) {
      cachedState = null;
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    cachedState = isConsentState(parsed) ? parsed : null;
    return cachedState;
  } catch {
    cachedState = null;
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; ads: boolean }): void {
  const state: ConsentState = {
    essential: true,
    analytics: choice.analytics,
    ads: choice.ads,
    savedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CONSENT_SAVED_EVENT));
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CONSENT_SAVED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_SAVED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useConsent(): ConsentState | null {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}
