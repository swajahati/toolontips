"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { FinanceLocationFields } from "@/components/tool/FinanceLocationFields";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatCurrency } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateLoan } from "@/lib/financeCalculators";
import { useFinanceLocation } from "@/lib/useFinanceLocation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

export function LoanCalculatorTool({ tool }: { tool: Tool }) {
  const location = useFinanceLocation();
  const [principal, setPrincipal] = useState("25000");
  const [rateOverride, setRateOverride] = useState<string | null>(null);
  const [years, setYears] = useState("5");

  const { country } = location;
  const { currency, locale } = country;
  const annualRate = rateOverride ?? String(country.ratePercent);

  const result = useMemo(
    () => calculateLoan({ principal: Number(principal), annualRate: Number(annualRate), years: Number(years) }),
    [principal, annualRate, years],
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
      note={`${tr("calculator.estimateNote")} Payment formula: M = P * r * (1+r)^n / ((1+r)^n - 1).`}
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
          <Field label={tr("toolUi.loan.principal")}>
            <input className={inputClass} type="number" min="0" step="100" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          </Field>
          <Field label={tr("toolUi.loan.annualRate")}>
            <input className={inputClass} type="number" min="0" step="0.01" value={annualRate} onChange={(e) => setRateOverride(e.target.value)} />
          </Field>
          <button type="button" className="text-sm font-medium text-primary underline underline-offset-4" onClick={() => setRateOverride(null)}>
            {tr("toolUi.loan.useLocalRate")}
          </button>
          <Field label={tr("toolUi.loan.term")}>
            <input className={inputClass} type="number" min="1" step="1" value={years} onChange={(e) => setYears(e.target.value)} />
          </Field>
          <div className="text-xs leading-5 text-muted">
            <p className="font-medium text-foreground">{tr("toolUi.loan.rateSource")}</p>
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
          <ResultRow label={tr("toolUi.loan.monthlyPayment")} value={formatCurrency(result.monthlyPayment, currency, locale)} emphasis />
          <ResultRow label={tr("toolUi.loan.totalInterest")} value={formatCurrency(result.totalInterest, currency, locale)} />
          <ResultRow label={tr("toolUi.loan.totalRepayment")} value={formatCurrency(result.totalRepayment, currency, locale)} />
        </>
      }
    />
  );
}
