"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import {
  getMortgageRegion,
  getMortgageSubRegion,
  type MortgageSource,
} from "@/config/mortgageRegions";
import { formatCurrency, formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateMortgage } from "@/lib/financeCalculators";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

interface MortgageDefaults {
  ratePercent: number;
  standardYears: number;
  downPaymentPercent: number;
  propertyTaxPercent: number;
  insuranceAnnual: number;
  feesAnnual: number;
  mortgageInsuranceRate: number;
  typicalHomePrice?: number;
}

interface LocationResponse {
  country: string;
  region: string;
  source: string;
}

function nonNegative(value: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, parsed);
}

function percent(value: number, locale: string): string {
  return `${formatNumber(value, locale, { maximumFractionDigits: 2 })}%`;
}

interface ScheduleDisplayRow {
  label: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

function buildScheduleRows(
  schedule: ReturnType<typeof calculateMortgage>["schedule"],
  mode: "monthly" | "yearly",
  locale: string,
): ScheduleDisplayRow[] {
  if (mode === "monthly") {
    return schedule.map((row) => ({
      label: formatNumber(row.period, locale),
      payment: row.payment,
      principal: row.principal,
      interest: row.interest,
      balance: row.balance,
    }));
  }

  const yearly = new Map<number, ScheduleDisplayRow>();
  for (const row of schedule) {
    const year = Math.ceil(row.period / 12);
    const current = yearly.get(year);
    if (!current) {
      yearly.set(year, {
        label: formatNumber(year, locale),
        payment: row.payment,
        principal: row.principal,
        interest: row.interest,
        balance: row.balance,
      });
      continue;
    }
    current.payment += row.payment;
    current.principal += row.principal;
    current.interest += row.interest;
    current.balance = row.balance;
  }
  return Array.from(yearly.values());
}

function SourceLine({ label, source }: { label: string; source: MortgageSource }) {
  return (
    <div className="text-xs leading-5 text-muted">
      <p className="font-medium text-foreground">{label}</p>
      <p>{source.label}</p>
      {source.url && (
        <a className="text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">
          {source.url}
        </a>
      )}
      <p>
        {tr("calculator.sourceChecked")}: {source.checked}
      </p>
    </div>
  );
}

export function MortgageCalculatorTool({ tool }: { tool: Tool }) {
  const initialRegion = getMortgageRegion("US");
  const [countryCode, setCountryCode] = useState(initialRegion.code);
  const [regionCode, setRegionCode] = useState("");
  const [homePrice, setHomePrice] = useState(String(initialRegion.typicalHomePrice));
  const [downPaymentMode, setDownPaymentMode] = useState<"amount" | "percent">("percent");
  const [downPayment, setDownPayment] = useState(String(initialRegion.downPaymentPercent));
  const [years, setYears] = useState(String(initialRegion.standardYears));
  const [annualRate, setAnnualRate] = useState(String(initialRegion.ratePercent));
  const [propertyTaxMode, setPropertyTaxMode] = useState<"percent" | "amount">("percent");
  const [propertyTaxPercent, setPropertyTaxPercent] = useState(String(initialRegion.propertyTaxPercent));
  const [propertyTaxAmount, setPropertyTaxAmount] = useState(
    String(Math.round(initialRegion.typicalHomePrice * initialRegion.propertyTaxPercent / 100)),
  );
  const [insuranceAnnual, setInsuranceAnnual] = useState(String(initialRegion.insuranceAnnual));
  const [feesAnnual, setFeesAnnual] = useState(String(initialRegion.feesAnnual));
  const [mortgageInsurance, setMortgageInsurance] = useState(true);
  const [mortgageInsuranceRate, setMortgageInsuranceRate] = useState(
    String(initialRegion.mortgageInsuranceRate),
  );
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<"monthly" | "yearly">("monthly");
  const [locationMessage, setLocationMessage] = useState<string | undefined>();

  const applyDefaults = useCallback((defaults: MortgageDefaults) => {
    const price = Math.round(defaults.typicalHomePrice ?? initialRegion.typicalHomePrice);
    setHomePrice(String(price));
    setDownPaymentMode("percent");
    setDownPayment(String(defaults.downPaymentPercent));
    setYears(String(defaults.standardYears));
    setAnnualRate(String(defaults.ratePercent));
    setPropertyTaxMode("percent");
    setPropertyTaxPercent(String(defaults.propertyTaxPercent));
    setPropertyTaxAmount(String(Math.round(price * defaults.propertyTaxPercent / 100)));
    setInsuranceAnnual(String(defaults.insuranceAnnual));
    setFeesAnnual(String(defaults.feesAnnual));
    setMortgageInsuranceRate(String(defaults.mortgageInsuranceRate));
  }, [initialRegion.typicalHomePrice]);

  useEffect(() => {
    let active = true;

    async function detectLocation() {
      try {
        const locationResponse = await fetch("/api/location", { cache: "no-store" });
        if (!locationResponse.ok) throw new Error("LOCATION_FAILED");
        const location = (await locationResponse.json()) as LocationResponse;

        const country = getMortgageRegion(location.country);
        const subRegion = getMortgageSubRegion(country.code, location.region);

        if (!active) return;
        setCountryCode(country.code);
        setRegionCode(subRegion?.code ?? "");
        setLocationMessage(location.source === "default" ? tr("toolUi.mortgage.locationDefault") : tr("toolUi.mortgage.locationFound"));

        const ratesResponse = await fetch(
          `/api/mortgage-rates?country=${encodeURIComponent(country.code)}&region=${encodeURIComponent(subRegion?.code ?? "")}`,
          { cache: "no-store" },
        );

        if (!ratesResponse.ok) {
          applyDefaults({
            ratePercent: country.ratePercent,
            standardYears: country.standardYears,
            downPaymentPercent: country.downPaymentPercent,
            propertyTaxPercent: subRegion?.propertyTaxPercent ?? country.propertyTaxPercent,
            insuranceAnnual: country.insuranceAnnual,
            feesAnnual: country.feesAnnual,
            mortgageInsuranceRate: country.mortgageInsuranceRate,
            typicalHomePrice: subRegion?.typicalHomePrice ?? country.typicalHomePrice,
          });
          return;
        }

        const rates = (await ratesResponse.json()) as MortgageDefaults;
        if (active) applyDefaults(rates);
      } catch {
        if (!active) return;
        setCountryCode("US");
        setRegionCode("");
        setLocationMessage(tr("toolUi.mortgage.locationFailed"));
      }
    }

    void detectLocation();
    return () => {
      active = false;
    };
  }, [applyDefaults]);

  const country = getMortgageRegion(countryCode);
  const currency = country.currency;
  const locale = country.locale;

  const price = nonNegative(homePrice);
  const downInput = nonNegative(downPayment);
  const downAmount = downPaymentMode === "percent"
    ? price * Math.min(100, downInput) / 100
    : Math.min(price, downInput);
  const downPercent = price > 0 ? downAmount / price * 100 : 0;
  const loanAmount = Math.max(0, price - downAmount);

  const propertyTaxAnnual = propertyTaxMode === "percent"
    ? price * nonNegative(propertyTaxPercent) / 100
    : nonNegative(propertyTaxAmount);
  const propertyTaxMonthly = propertyTaxAnnual / 12;
  const homeInsuranceMonthly = nonNegative(insuranceAnnual) / 12;
  const feesMonthly = nonNegative(feesAnnual) / 12;
  const mortgageInsuranceMonthly = mortgageInsurance && downPercent < 20
    ? loanAmount * nonNegative(mortgageInsuranceRate) / 100 / 12
    : 0;

  const result = useMemo(
    () =>
      calculateMortgage({
        principal: loanAmount,
        annualRate: nonNegative(annualRate),
        years: nonNegative(years),
        frequency: "monthly",
        propertyTax: propertyTaxMonthly,
        insurance: homeInsuranceMonthly,
        pmi: mortgageInsuranceMonthly,
        extra: 0,
      }),
    [loanAmount, annualRate, years, propertyTaxMonthly, homeInsuranceMonthly, mortgageInsuranceMonthly],
  );

  const breakdown = useMemo(
    () => [
      { label: tr("toolUi.mortgage.principalAndInterest"), value: result.periodicPayment, color: "#2563eb" },
      { label: tr("toolUi.mortgage.monthlyPropertyTax"), value: propertyTaxMonthly, color: "#16a34a" },
      { label: tr("toolUi.mortgage.monthlyInsurance"), value: homeInsuranceMonthly, color: "#f97316" },
      { label: tr("toolUi.mortgage.monthlyFees"), value: feesMonthly, color: "#7c3aed" },
      { label: tr("toolUi.mortgage.monthlyMortgageInsurance"), value: mortgageInsuranceMonthly, color: "#db2777" },
    ],
    [result.periodicPayment, propertyTaxMonthly, homeInsuranceMonthly, feesMonthly, mortgageInsuranceMonthly],
  );

  const breakdownTotal = breakdown.reduce((sum, part) => sum + part.value, 0);
  const breakdownGradient = breakdownTotal > 0
    ? breakdown.map((part, index) => {
        const start = breakdown.slice(0, index).reduce((sum, item) => sum + item.value / breakdownTotal * 100, 0);
        const end = start + part.value / breakdownTotal * 100;
        return `${part.color} ${start}% ${end}%`;
      }).join(", ")
    : "#d4d4d8 0% 100%";

  const scheduleRows = buildScheduleRows(result.schedule, scheduleMode, locale);

  function handleCountryChange(code: string) {
    const next = getMortgageRegion(code);
    setCountryCode(next.code);
    setRegionCode("");
    applyDefaults({
      ratePercent: next.ratePercent,
      standardYears: next.standardYears,
      downPaymentPercent: next.downPaymentPercent,
      propertyTaxPercent: next.propertyTaxPercent,
      insuranceAnnual: next.insuranceAnnual,
      feesAnnual: next.feesAnnual,
      mortgageInsuranceRate: next.mortgageInsuranceRate,
      typicalHomePrice: next.typicalHomePrice,
    });
  }

  function handleRegionChange(code: string) {
    const nextSubRegion = getMortgageSubRegion(countryCode, code);
    setRegionCode(nextSubRegion?.code ?? "");
    applyDefaults({
      ratePercent: country.ratePercent,
      standardYears: country.standardYears,
      downPaymentPercent: country.downPaymentPercent,
      propertyTaxPercent: nextSubRegion?.propertyTaxPercent ?? country.propertyTaxPercent,
      insuranceAnnual: country.insuranceAnnual,
      feesAnnual: country.feesAnnual,
      mortgageInsuranceRate: country.mortgageInsuranceRate,
      typicalHomePrice: nextSubRegion?.typicalHomePrice ?? country.typicalHomePrice,
    });
  }

  function handlePropertyTaxModeChange(mode: "percent" | "amount") {
    setPropertyTaxMode(mode);
    if (mode === "amount" && propertyTaxMode === "percent") {
      setPropertyTaxAmount(String(Math.round(propertyTaxAnnual)));
    }
  }

  function useLocalAverage() {
    setAnnualRate(String(country.ratePercent));
  }

  const activeSegmentClass = "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground";
  const inactiveSegmentClass = "rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted";

  return (
    <CalculatorShell
      tool={tool}
      privacyNote={tr("toolUi.mortgage.privacy")}
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.mortgage.locationNote")} Payment formula: M = P * r * (1+r)^n / ((1+r)^n - 1).`}
      inputs={
        <div className="space-y-5">
          {locationMessage && <p className="rounded-lg bg-surface-muted p-3 text-xs leading-5 text-muted">{locationMessage}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr("toolUi.mortgage.country")}>
              <select className={inputClass} value={countryCode} onChange={(event) => handleCountryChange(event.target.value)}>
                {[getMortgageRegion("US"), getMortgageRegion("GB"), getMortgageRegion("CA"), getMortgageRegion("AU"), getMortgageRegion("IN"), getMortgageRegion("PK"), getMortgageRegion("EU")].map((item) => (
                  <option key={item.code} value={item.code}>{item.name}</option>
                ))}
              </select>
            </Field>
            <Field label={tr("toolUi.mortgage.region")}>
              <select className={inputClass} value={regionCode} onChange={(event) => handleRegionChange(event.target.value)}>
                <option value="">{tr("toolUi.mortgage.regionOptional")}</option>
                {country.regions.map((item) => (
                  <option key={item.code} value={item.code}>{item.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={tr("toolUi.mortgage.homePrice")}>
            <input className={inputClass} type="number" min="0" step="1000" value={homePrice} onChange={(event) => setHomePrice(event.target.value)} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Field label={tr("toolUi.mortgage.downMode")}>
              <select className={inputClass} value={downPaymentMode} onChange={(event) => setDownPaymentMode(event.target.value as "amount" | "percent")}>
                <option value="percent">{tr("toolUi.mortgage.percent")}</option>
                <option value="amount">{tr("toolUi.mortgage.amount")} ({currency})</option>
              </select>
            </Field>
            <Field label={`${tr("toolUi.mortgage.downPayment")} (${downPaymentMode === "percent" ? "%" : currency})`}>
              <input className={inputClass} type="number" min="0" max={downPaymentMode === "percent" ? 100 : undefined} step={downPaymentMode === "percent" ? 1 : 1000} value={downPayment} onChange={(event) => setDownPayment(event.target.value)} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr("toolUi.mortgage.term")}>
              <input className={inputClass} type="number" min="1" step="1" value={years} onChange={(event) => setYears(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.mortgage.annualRate")}>
              <input className={inputClass} type="number" min="0" step="0.01" value={annualRate} onChange={(event) => setAnnualRate(event.target.value)} />
            </Field>
          </div>

          <button type="button" className="text-sm font-medium text-primary underline underline-offset-4" onClick={useLocalAverage}>
            {tr("toolUi.mortgage.useLocalRate")} ({percent(country.ratePercent, locale)})
          </button>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr("toolUi.mortgage.propertyTaxMode")}>
              <select className={inputClass} value={propertyTaxMode} onChange={(event) => handlePropertyTaxModeChange(event.target.value as "percent" | "amount")}>
                <option value="percent">{tr("toolUi.mortgage.percent")}</option>
                <option value="amount">{tr("toolUi.mortgage.amount")}</option>
              </select>
            </Field>
            {propertyTaxMode === "percent" ? (
              <Field label={`${tr("toolUi.mortgage.propertyTax")} (%)`}>
                <input className={inputClass} type="number" min="0" step="0.01" value={propertyTaxPercent} onChange={(event) => setPropertyTaxPercent(event.target.value)} />
              </Field>
            ) : (
              <Field label={`${tr("toolUi.mortgage.propertyTaxAmount")} (${currency})`}>
                <input className={inputClass} type="number" min="0" step="100" value={propertyTaxAmount} onChange={(event) => setPropertyTaxAmount(event.target.value)} />
              </Field>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`${tr("toolUi.mortgage.insurance")} (${currency})`}>
              <input className={inputClass} type="number" min="0" step="100" value={insuranceAnnual} onChange={(event) => setInsuranceAnnual(event.target.value)} />
            </Field>
            <Field label={`${tr("toolUi.mortgage.fees")} (${currency})`}>
              <input className={inputClass} type="number" min="0" step="100" value={feesAnnual} onChange={(event) => setFeesAnnual(event.target.value)} />
            </Field>
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-border"
              checked={mortgageInsurance}
              onChange={(event) => setMortgageInsurance(event.target.checked)}
            />
            <span>{tr("toolUi.mortgage.mortgageInsurance")}</span>
          </label>
          <Field label={tr("toolUi.mortgage.mortgageInsuranceRate")}>
            <input className={inputClass} type="number" min="0" step="0.01" value={mortgageInsuranceRate} onChange={(event) => setMortgageInsuranceRate(event.target.value)} />
          </Field>
        </div>
      }
      results={
        <div className="space-y-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-muted">{tr("toolUi.mortgage.monthlyTotal")}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-primary">
              {formatCurrency(result.allInPayment, currency, locale)}
            </p>
          </div>

          <ResultRow label={tr("toolUi.mortgage.loanAmount")} value={formatCurrency(loanAmount, currency, locale)} />
          <ResultRow label={tr("toolUi.mortgage.downPaymentPercent")} value={percent(downPercent, locale)} />
          <ResultRow label={tr("toolUi.mortgage.principalAndInterest")} value={formatCurrency(result.periodicPayment, currency, locale)} />
          <ResultRow label={tr("toolUi.mortgage.totalInterest")} value={formatCurrency(result.totalInterest, currency, locale)} />
          <ResultRow label={tr("toolUi.mortgage.payoffYears")} value={formatNumber(result.payoffYears, locale, { maximumFractionDigits: 1 })} />

          <div className="rounded-xl border border-border bg-surface-muted p-4">
            <p className="text-sm font-semibold">{tr("toolUi.mortgage.monthlyBreakdown")}</p>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
              <div
                role="img"
                aria-label={tr("toolUi.mortgage.monthlyBreakdown")}
                className="size-32 shrink-0 rounded-full"
                style={{ background: `conic-gradient(${breakdownGradient})` }}
              >
                <div className="flex size-full items-center justify-center rounded-full bg-surface p-3 text-center">
                  <span className="text-xs font-semibold">{formatCurrency(result.allInPayment, currency, locale)}</span>
                </div>
              </div>
              <ul className="w-full space-y-2 text-xs">
                {breakdown.map((part) => {
                  const share = breakdownTotal > 0 ? part.value / breakdownTotal * 100 : 0;
                  return (
                    <li key={part.label} className="flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: part.color }} />
                        <span className="truncate">{part.label}</span>
                      </span>
                      <span className="font-semibold">{formatCurrency(part.value, currency, locale)} · {percent(share, locale)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-4 text-xs">
            <SourceLine label={tr("toolUi.mortgage.rateSource")} source={country.rateSource} />
            <SourceLine label={tr("toolUi.mortgage.propertyTaxSource")} source={country.propertyTaxSource} />
          </div>

          <button type="button" className="text-sm font-medium text-primary underline underline-offset-4" onClick={() => setScheduleOpen((value) => !value)}>
            {scheduleOpen ? tr("toolUi.mortgage.hideSchedule") : tr("toolUi.mortgage.showSchedule")}
          </button>

          {scheduleOpen && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-pressed={scheduleMode === "monthly"}
                  className={scheduleMode === "monthly" ? activeSegmentClass : inactiveSegmentClass}
                  onClick={() => setScheduleMode("monthly")}
                >
                  {tr("toolUi.mortgage.scheduleMonthly")}
                </button>
                <button
                  type="button"
                  aria-pressed={scheduleMode === "yearly"}
                  className={scheduleMode === "yearly" ? activeSegmentClass : inactiveSegmentClass}
                  onClick={() => setScheduleMode("yearly")}
                >
                  {tr("toolUi.mortgage.scheduleYearly")}
                </button>
              </div>
              <div className="max-h-72 overflow-auto rounded-lg border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-surface-muted">
                    <tr>
                      <th className="px-2 py-2">{scheduleMode === "monthly" ? tr("toolUi.mortgage.scheduleMonthly") : tr("toolUi.mortgage.year")}</th>
                      <th className="px-2 py-2">{tr("toolUi.mortgage.payment")}</th>
                      <th className="px-2 py-2">{tr("toolUi.mortgage.principalPaid")}</th>
                      <th className="px-2 py-2">{tr("toolUi.mortgage.interestPaid")}</th>
                      <th className="px-2 py-2">{tr("toolUi.mortgage.balance")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleRows.map((row) => (
                      <tr key={row.label} className="border-t border-border">
                        <td className="px-2 py-1">{row.label}</td>
                        <td className="px-2 py-1">{formatCurrency(row.payment, currency, locale)}</td>
                        <td className="px-2 py-1">{formatCurrency(row.principal, currency, locale)}</td>
                        <td className="px-2 py-1">{formatCurrency(row.interest, currency, locale)}</td>
                        <td className="px-2 py-1">{formatCurrency(row.balance, currency, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
