"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { FinanceLocationFields } from "@/components/tool/FinanceLocationFields";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatCurrency } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateCompound } from "@/lib/financeCalculators";
import { useFinanceLocation } from "@/lib/useFinanceLocation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

export function CompoundInterestCalculatorTool({ tool }: { tool: Tool }) {
  const location = useFinanceLocation();
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("200");
  const [rateOverride, setRateOverride] = useState<string | null>(null);
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const { country } = location;
  const { currency, locale } = country;
  const annualRate = rateOverride ?? String(country.ratePercent);

  const result = useMemo(
    () =>
      calculateCompound({
        initial: Number(initial),
        monthly: Number(monthly),
        annualRate: Number(annualRate),
        years: Number(years),
        frequency,
      }),
    [initial, monthly, annualRate, years, frequency],
  );

  function handleCountryChange(code: string) {
    location.setCountryCode(code);
    setRateOverride(null);
  }

  function handleRegionChange(code: string) {
    location.setRegionCode(code);
    setRateOverride(null);
  }

  return (
    <CalculatorShell
      tool={tool}
      privacyNote={tr("toolUi.finance.privacy")}
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.finance.localRate")}: ${country.rateSource.label}. Compounding is applied using the selected frequency; monthly contributions are added before each month's growth.`}
      inputs={
        <>
          <FinanceLocationFields
            countryCode={location.countryCode}
            regionCode={location.regionCode}
            source={location.source}
            ready={location.ready}
            onCountryChange={handleCountryChange}
            onRegionChange={handleRegionChange}
          />
          <Field label={tr("toolUi.compound.initial")}>
            <input className={inputClass} type="number" min="0" step="100" value={initial} onChange={(e) => setInitial(e.target.value)} />
          </Field>
          <Field label={tr("toolUi.compound.monthly")}>
            <input className={inputClass} type="number" min="0" step="50" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          </Field>
          <Field label={tr("toolUi.compound.annualRate")}>
            <input className={inputClass} type="number" min="0" step="0.1" value={annualRate} onChange={(e) => setRateOverride(e.target.value)} />
          </Field>
          <button type="button" className="text-sm font-medium text-primary underline underline-offset-4" onClick={() => setRateOverride(null)}>
            {tr("toolUi.compound.useLocalRate")}
          </button>
          <Field label={tr("toolUi.compound.years")}>
            <input className={inputClass} type="number" min="0" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
          </Field>
          <Field label={tr("toolUi.compound.frequency")}>
            <select className={inputClass} value={frequency} onChange={(e) => setFrequency(e.target.value as "monthly" | "quarterly" | "yearly")}>
              <option value="monthly">{tr("toolUi.salary.monthly")}</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">{tr("toolUi.salary.annual")}</option>
            </select>
          </Field>
          <div className="text-xs leading-5 text-muted">
            <p className="font-medium text-foreground">{tr("toolUi.compound.rateSource")}</p>
            <p>{country.rateSource.label}</p>
            {country.rateSource.url && (
              <a className="text-primary underline underline-offset-4" href={country.rateSource.url} target="_blank" rel="noreferrer">
                {country.rateSource.url}
              </a>
            )}
            <p>
              {tr("calculator.sourceChecked")}: {country.rateSource.checked}
            </p>
          </div>
        </>
      }
      results={
        <>
          <ResultRow label={tr("toolUi.compound.finalBalance")} value={formatCurrency(result.finalBalance, currency, locale)} emphasis />
          <ResultRow label={tr("toolUi.compound.contributions")} value={formatCurrency(result.contributions, currency, locale)} />
          <ResultRow label={tr("toolUi.compound.interest")} value={formatCurrency(result.interest, currency, locale)} />
        </>
      }
    />
  );
}
