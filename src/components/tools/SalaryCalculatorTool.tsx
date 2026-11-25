"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { FinanceLocationFields } from "@/components/tool/FinanceLocationFields";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { getIncomeTaxRuleForLocation } from "@/data/taxRules";
import { formatCurrency, formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateSalary } from "@/lib/financeCalculators";
import { useFinanceLocation } from "@/lib/useFinanceLocation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

export function SalaryCalculatorTool({ tool }: { tool: Tool }) {
  const { countryCode, regionCode, source, ready, setCountryCode, setRegionCode } = useFinanceLocation();
  const [gross, setGross] = useState("80000");
  const [period, setPeriod] = useState<"annual" | "monthly" | "weekly" | "hourly">("annual");
  const [hours, setHours] = useState("40");

  const rule = useMemo(() => getIncomeTaxRuleForLocation(countryCode, regionCode), [countryCode, regionCode]);
  const result = useMemo(
    () => calculateSalary({ gross: Number(gross), period, hoursPerWeek: Number(hours) }, rule),
    [gross, period, hours, rule],
  );

  return (
    <CalculatorShell
      tool={tool}
      privacyNote={tr("toolUi.finance.privacy")}
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.salary.notes")}: ${rule.notes.join(" ")}`}
      inputs={
        <>
          <FinanceLocationFields
            countryCode={countryCode}
            regionCode={regionCode}
            source={source}
            ready={ready}
            onCountryChange={setCountryCode}
            onRegionChange={setRegionCode}
          />
          <p className="text-xs leading-5 text-muted">{tr("toolUi.salary.locationNote")}</p>
          <Field label={tr("toolUi.salary.gross")}>
            <input className={inputClass} type="number" min="0" step="100" value={gross} onChange={(e) => setGross(e.target.value)} />
          </Field>
          <Field label={tr("toolUi.salary.period")}>
            <select className={inputClass} value={period} onChange={(e) => setPeriod(e.target.value as "annual" | "monthly" | "weekly" | "hourly")}>
              <option value="annual">{tr("toolUi.salary.annual")}</option>
              <option value="monthly">{tr("toolUi.salary.monthly")}</option>
              <option value="weekly">{tr("toolUi.salary.weekly")}</option>
              <option value="hourly">{tr("toolUi.salary.hourly")}</option>
            </select>
          </Field>
          {period === "hourly" && (
            <Field label={tr("toolUi.salary.hours")}>
              <input className={inputClass} type="number" min="1" step="1" value={hours} onChange={(e) => setHours(e.target.value)} />
            </Field>
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
          <ResultRow label={tr("toolUi.salary.takeHome")} value={formatCurrency(result.takeHomeAnnual, rule.currency, rule.locale)} emphasis />
          <ResultRow label={tr("toolUi.salary.monthly")} value={formatCurrency(result.takeHomeMonthly, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.salary.weekly")} value={formatCurrency(result.takeHomeWeekly, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.salary.hourly")} value={formatCurrency(result.takeHomeHourly, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.salary.grossAnnual")} value={formatCurrency(result.grossAnnual, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.salary.annualTax")} value={formatCurrency(result.annualTax, rule.currency, rule.locale)} />
          <ResultRow label={tr("toolUi.salary.effectiveRate")} value={`${formatNumber(result.effectiveRate * 100, rule.locale, { maximumFractionDigits: 2 })}%`} />
        </>
      }
    />
  );
}
