"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_LOADED_EVENT, adConfig } from "@/config/ads";
import { t } from "@/i18n/translations";
import { useConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ className = "" }: { className?: string }) {
  const consent = useConsent();
  const pushed = useRef(false);

  useEffect(() => {
    if (!adConfig.enabled || !adConfig.configured || !consent?.ads || pushed.current) return;

    const push = () => {
      if (pushed.current) return;
      try {
        (window.adsbygoogle ??= []).push({});
        pushed.current = true;
      } catch {
        return;
      }
    };

    const script = document.querySelector<HTMLScriptElement>("script[data-adsense-loader]");
    if (script?.dataset.adsenseLoaded === "true") {
      push();
      return;
    }

    window.addEventListener(ADSENSE_LOADED_EVENT, push);
    return () => window.removeEventListener(ADSENSE_LOADED_EVENT, push);
  }, [consent?.ads]);

  if (!adConfig.enabled || !adConfig.configured || !consent?.ads) return null;

  return (
    <aside
      aria-label={t("ads.label")}
      className={`flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface-muted ${className}`}
      style={{ height: adConfig.height }}
    >
      <span className="px-3 pt-2 text-[10px] uppercase tracking-wide text-muted">
        {t("ads.label")}
      </span>
      <ins
        className="adsbygoogle block w-full flex-1"
        data-ad-client={adConfig.publisherId}
        data-ad-slot={adConfig.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
