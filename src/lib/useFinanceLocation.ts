"use client";

import { useEffect, useState } from "react";
import { getFinanceRegion, getFinanceSubRegion } from "@/config/financeRegions";

interface LocationResponse {
  country: string;
  region: string;
  source: string;
}

export function useFinanceLocation() {
  const [countryCode, setCountryCodeState] = useState("US");
  const [regionCode, setRegionCodeState] = useState("");
  const [source, setSource] = useState("default");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function detectLocation() {
      try {
        const response = await fetch("/api/location", { cache: "no-store" });
        if (!response.ok) return;
        const location = (await response.json()) as LocationResponse;
        const country = getFinanceRegion(location.country);
        const region = getFinanceSubRegion(country.code, location.region);

        if (!active) return;
        setCountryCodeState(country.code);
        setRegionCodeState(region?.code ?? "");
        setSource(location.source || "default");
        setReady(true);
      } catch {
        if (active) setReady(true);
      }
    }

    void detectLocation();
    return () => {
      active = false;
    };
  }, []);

  function setCountryCode(code: string) {
    const country = getFinanceRegion(code);
    setCountryCodeState(country.code);
    setRegionCodeState("");
  }

  function setRegionCode(code: string) {
    const region = getFinanceSubRegion(countryCode, code);
    setRegionCodeState(region?.code ?? "");
  }

  return {
    countryCode,
    regionCode,
    source,
    ready,
    country: getFinanceRegion(countryCode),
    region: getFinanceSubRegion(countryCode, regionCode),
    setCountryCode,
    setRegionCode,
  };
}
