"use client";

import { t } from "@/i18n/translations";

export const CONSENT_EVENT = "toolontips:open-consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
      className="underline decoration-border underline-offset-4 hover:text-foreground"
    >
      {t("consent.footerLink")}
    </button>
  );
}
