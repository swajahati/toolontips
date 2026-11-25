"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { FinanceLocationFields } from "@/components/tool/FinanceLocationFields";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { getVatRateForRegion, getVatRuleForLocation } from "@/data/taxRules";
import { formatCurrency, formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateVat, vatRateNeedsCustom } from "@/lib/financeCalculators";
import { useFinanceLocation } from "@/lib/useFinanceLocation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

function percentString(rate: number): string {
  return String(Number((rate * 100).toFixed(2)));
}

export function VatGstCalculatorTool({ tool }: { tool: Tool }) {
  const { countryCode, regionCode, source, ready, setCountryCode, setRegionCode } = useFinanceLocation();
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("100");
  const [rateOverride, setRateOverride] = useState<string | null>(null);

  const rule = useMemo(() => getVatRuleForLocation(countryCode), [countryCode]);
  const defaultRatePercent = useMemo(
    () => percentString(getVatRateForRegion(rule, regionCode) ?? rule.rates[0].rate),
    [rule, regionCode],
  );
  const displayedRate = rateOverride ?? defaultRatePercent;
  const result = useMemo(
    () => calculateVat({ amount: Number(amount), rate: Number(displayedRate), mode }),
    [amount, displayedRate, mode],
  );
  const needsCustom = vatRateNeedsCustom(rule) || rule.rates.some((r) => r.label.toLowerCase().includes("custom"));

  function handleCountryChange(code: string) {
    setCountryCode(code);
    setRateOverride(null);
  }

  function handleRegionChange(code: string) {
    setRegionCode(code);
    setRateOverride(null);
  }

  return (
    <CalculatorShell
      tool={tool}
      privacyNote={tr("toolUi.finance.privacy")}
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.vat.notes")}: ${rule.notes.join(" ")}`}
      inputs={
        <>
          <FinanceLocationFields
            countryCode={countryCode}
            regionCode={regionCode}
            source={source}
            ready={ready}
            onCountryChange={handleCountryChange}
            onRegionChange={handleRegionChange}
          />
          <p className="text-xs leading-5 text-muted">{tr("toolUi.vat.regionNote")}</p>
          <Field label={tr("toolUi.vat.mode")}>
            <select className={inputClass} value={mode} onChange={(e) => setMode(e.target.value as "add" | "remove")}>
              <option value="add">{tr("toolUi.vat.add")}</option>
              <option value="remove">{tr("toolUi.vat.remove")}</option>
            </select>
          </Field>
          <Field label={tr("toolUi.vat.amount")}>
            <input className={inputClass} type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label={needsCustom ? tr("toolUi.vat.customRate") : tr("toolUi.vat.rate")}>
            {rule.rates.length > 1 && !needsCustom ? (
              <select className={inputClass} value={displayedRate} onChange={(e) => setRateOverride(e.target.value)}>
                {rule.rates.map((r) => (
                  <option key={r.label} value={percentString(r.rate)}>
                    {r.label} ({formatNumber(r.rate * 100, rule.locale, { maximumFractionDigits: 2 })}%)
                  </option>
                ))}
              </select>
            ) : (
              <input className={inputClass} type="number" min="0" step="0.01" value={displayedRate} onChange={(e) => setRateOverride(e.target.value)} />
            )}
          </Field>
          <button type="button" className="text-sm font-medium text-primary underline underline-offset-4" onClick={() => setRateOverride(null)}>
            {tr("toolUi.vat.useLocalRate")} ({formatNumber(Number(defaultRatePercent), rule.locale, { maximumFractionDigits: 2 })}%)
          </button>
          {(rule.code === "US" || rule.code === "IN" || rule.code === "EU-VAT") && (
            <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              {tr("toolUi.vat.customRate")}
            </p>
          )}
          <div className="rounded-lg bg-surface-muted p-3 text-xs leading-6 text-muted">
            <p className="font-medium text-foreground">{rule.name}</p>
            <p><span className="font-medium">{tr("calculator.source")}:</span> {rule.sourceName}</p>
            <p><span className="font-medium">{tr("calculator.taxYear")}:</span> {rule.taxYear}</p>
            <p><span className="font-medium">{tr("calculator.lastUpdated")}:</span> {rule.lastUpdated}</p>
            {rule.sourceUrl && (
              <p className="break-all">
                <a className="text-primary underline underline-offset-4" href={rule.sourceUrl} target="_blank" rel="noreferrer">
                  {rule.sourceUrl}
                </a>
              </p>
            )}
          </div>
        </>
      }
      results={
        <>
          <ResultRow label={tr("toolUi.vat.netAmount")} value={formatCurrency(result.netAmount, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.vat.taxAmount")} value={formatCurrency(result.taxAmount, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.vat.grossAmount")} value={formatCurrency(result.grossAmount, rule.currency, rule.locale)} emphasis />
        </>
      }
    />
  );
}
