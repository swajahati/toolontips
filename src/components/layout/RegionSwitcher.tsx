"use client";

import { useId, useSyncExternalStore } from "react";
import { countries, getCountry } from "@/data/countries";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/i18n/format";
import { t } from "@/i18n/translations";

const storageKey = "toolontips-country";
const regionEvent = "toolontips:region-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(regionEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(regionEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(storageKey);
}

function getServerSnapshot() {
  return siteConfig.defaultCountry;
}

export function RegionSwitcher() {
  const countryId = useId();
  const languageId = useId();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const code =
    typeof stored === "string" && countries.some((country) => country.code === stored)
      ? stored
      : siteConfig.defaultCountry;
  const country = getCountry(code);

  function handleChange(nextCode: string) {
    window.localStorage.setItem(storageKey, nextCode);
    window.dispatchEvent(new CustomEvent(regionEvent, { detail: { code: nextCode } }));
  }

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor={countryId}>
        {t("region.countryLabel")}
      </label>
      <select
        id={countryId}
        value={code}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-lg border border-border bg-surface px-2.5 py-2 text-sm text-foreground"
      >
        {countries.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor={languageId}>
        {t("region.languageLabel")}
      </label>
      <select
        id={languageId}
        defaultValue="en"
        className="hidden rounded-lg border border-border bg-surface px-2.5 py-2 text-sm text-foreground sm:block"
      >
        <option value="en">English</option>
      </select>
      <span className="sr-only">
        {t("region.example")}: {formatCurrency(1234.56, country.currency, country.locale)}
      </span>
    </div>
  );
}
