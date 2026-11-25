"use client";

import { useEffect } from "react";
import { ADSENSE_LOADED_EVENT, adConfig } from "@/config/ads";
import { useConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseLoader() {
  const consent = useConsent();

  useEffect(() => {
    if (!adConfig.enabled || !adConfig.publisherConfigured || !consent?.ads) return;

    const announce = () => window.dispatchEvent(new Event(ADSENSE_LOADED_EVENT));
    const existing = document.querySelector<HTMLScriptElement>("script[data-adsense-loader]");
    if (existing) {
      if (existing.dataset.adsenseLoaded === "true") announce();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adConfig.publisherId)}`;
    script.dataset.adsenseLoader = "true";
    script.addEventListener("load", () => {
      script.dataset.adsenseLoaded = "true";
      announce();
    });
    document.head.appendChild(script);
  }, [consent?.ads]);

  return null;
}
