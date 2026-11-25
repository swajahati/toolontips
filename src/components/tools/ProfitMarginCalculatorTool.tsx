"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { FinanceLocationFields } from "@/components/tool/FinanceLocationFields";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatCurrency, formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateProfitMargin } from "@/lib/financeCalculators";
import { useFinanceLocation } from "@/lib/useFinanceLocation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

export function ProfitMarginCalculatorTool({ tool }: { tool: Tool }) {
  const location = useFinanceLocation();
  const [mode, setMode] = useState<"margin" | "markup" | "sellingPrice">("margin");
  const [cost, setCost] = useState("100");
  const [value, setValue] = useState("30");

  const { country } = location;
  const { currency, locale } = country;
  const result = useMemo(() => calculateProfitMargin({ mode, cost: Number(cost), value: Number(value) }), [mode, cost, value]);
  const valueLabel = mode === "margin" ? tr("toolUi.profit.targetMargin") : mode === "markup" ? tr("toolUi.profit.targetMarkup") : tr("toolUi.profit.price");

  function handleCountryChange(code: string) {
    location.setCountryCode(code);
  }

  function handleRegionChange(code: string) {
    location.setRegionCode(code);
  }

  return (
    <CalculatorShell
      tool={tool}
      privacyNote={tr("toolUi.finance.privacy")}
      note={`${tr("calculator.estimateNote")} Margin = profit / selling price. Markup = profit / cost.`}
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
          <Field label={tr("toolUi.profit.mode")}>
            <select className={inputClass} value={mode} onChange={(e) => setMode(e.target.value as "margin" | "markup" | "sellingPrice")}>
              <option value="margin">{tr("toolUi.profit.margin")}</option>
              <option value="markup">{tr("toolUi.profit.markup")}</option>
              <option value="sellingPrice">{tr("toolUi.profit.sellingPrice")}</option>
            </select>
          </Field>
          <Field label={tr("toolUi.profit.cost")}>
            <input className={inputClass} type="number" min="0" step="1" value={cost} onChange={(e) => setCost(e.target.value)} />
          </Field>
          <Field label={valueLabel}>
            <input className={inputClass} type="number" min="0" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} />
          </Field>
        </>
      }
      results={
        <>
          <ResultRow label={tr("toolUi.profit.priceResult")} value={formatCurrency(result.sellingPrice, currency, locale)} emphasis />
          <ResultRow label={tr("toolUi.profit.grossProfit")} value={formatCurrency(result.grossProfit, currency, locale)} />
          <ResultRow label={tr("toolUi.profit.marginResult")} value={`${formatNumber(result.margin * 100, locale, { maximumFractionDigits: 2 })}%`} />
          <ResultRow label={tr("toolUi.profit.markupResult")} value={`${formatNumber(result.markup * 100, locale, { maximumFractionDigits: 2 })}%`} />
        </>
      }
    />
  );
}
