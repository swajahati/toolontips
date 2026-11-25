"use client";

import { useEffect, useId, useState } from "react";
import { Cookie } from "lucide-react";
import { CONSENT_EVENT } from "@/components/layout/CookieSettingsButton";
import { Button } from "@/components/ui/Button";
import { t } from "@/i18n/translations";
import { saveConsent, useConsent } from "@/lib/consent";

export function ConsentBanner() {
  const titleId = useId();
  const consent = useConsent();
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [adsEnabled, setAdsEnabled] = useState(false);

  useEffect(() => {
    const open = () => {
      if (consent) {
        setAnalytics(consent.analytics);
        setAdsEnabled(consent.ads);
      }
      setManaging(true);
    };
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, [consent]);

  function save(choice: { analytics: boolean; ads: boolean }) {
    saveConsent(choice);
    setManaging(false);
    setAnalytics(false);
    setAdsEnabled(false);
  }

  if (!managing && consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface shadow-[0_-8px_30px_rgba(15,23,42,0.12)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 id={titleId} className="flex items-center gap-2 text-base font-bold">
            <Cookie className="size-5 text-primary" aria-hidden="true" />
            {t("consent.title")}
          </h2>
          <p className="mt-2 text-sm text-muted">{t("consent.body")}</p>
          <p className="mt-1 text-xs text-muted">{t("consent.note")}</p>
          {managing && (
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked disabled className="size-4 accent-[var(--primary)]" />
                {t("consent.essential")}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="size-4 accent-[var(--primary)]"
                />
                {t("consent.analytics")}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={adsEnabled}
                  onChange={(event) => setAdsEnabled(event.target.checked)}
                  className="size-4 accent-[var(--primary)]"
                />
                {t("consent.ads")}
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {managing ? (
            <>
              <Button onClick={() => save({ analytics, ads: adsEnabled })}>{t("consent.save")}</Button>
              {consent !== null && (
                <Button variant="secondary" onClick={() => setManaging(false)}>
                  {t("consent.hide")}
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={() => save({ analytics: true, ads: true })}>{t("consent.accept")}</Button>
              <Button variant="secondary" onClick={() => save({ analytics: false, ads: false })}>
                {t("consent.reject")}
              </Button>
              <Button variant="ghost" onClick={() => setManaging(true)}>
                {t("consent.manage")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
