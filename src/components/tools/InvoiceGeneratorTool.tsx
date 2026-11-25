"use client";

import { useState, type FormEvent } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { FinanceLocationFields } from "@/components/tool/FinanceLocationFields";
import { ResultRow } from "@/components/tool/ResultRow";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/tools/Fields";
import { getVatRateForRegion, getVatRuleForLocation } from "@/data/taxRules";
import { formatCurrency } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  calculateInvoiceTotals,
  createInvoicePdf,
  type InvoiceInput,
  type InvoiceTotals,
} from "@/lib/invoicePdf";
import { useFinanceLocation } from "@/lib/useFinanceLocation";
import type { Tool, ToolStatus } from "@/types";

const tr = (key: string) => t(key as never);

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "INR", "PKR"] as const;

interface InvoiceFields {
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  number: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  taxRate: string;
  notes: string;
}

type InvoiceFormFields = Omit<InvoiceFields, "currency" | "taxRate">;

interface ItemField {
  description: string;
  quantity: string;
  rate: string;
}

interface InvoiceResult {
  bytes: Uint8Array;
  filename: string;
  totals: InvoiceTotals;
}

const initialFields: InvoiceFormFields = {
  yourName: "",
  yourEmail: "",
  yourAddress: "",
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  number: "",
  invoiceDate: "",
  dueDate: "",
  notes: "",
};

function emptyItem(): ItemField {
  return { description: "", quantity: "1", rate: "" };
}

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function isValidDateValue(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
}

export function InvoiceGeneratorTool({ tool }: { tool: Tool }) {
  const location = useFinanceLocation();
  const [formFields, setFormFields] = useState<InvoiceFormFields>(initialFields);
  const [items, setItems] = useState<ItemField[]>([emptyItem()]);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [currencyOverride, setCurrencyOverride] = useState<string | null>(null);
  const [taxRateOverride, setTaxRateOverride] = useState<string | null>(null);

  const currency = currencyOverride ?? location.country.currency;
  const locale = location.country.locale;
  const vatRule = getVatRuleForLocation(location.countryCode);
  const localTaxRate =
    getVatRateForRegion(vatRule, location.regionCode) ?? vatRule.rates[0]?.rate ?? 0;
  const localTaxRateValue = String(Number((localTaxRate * 100).toFixed(2)));
  const taxRate = taxRateOverride ?? localTaxRateValue;
  const fields: InvoiceFields = { ...formFields, currency, taxRate };

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  function handleCountryChange(code: string) {
    location.setCountryCode(code);
    setCurrencyOverride(null);
    setTaxRateOverride(null);
    resetOutput();
  }

  function handleRegionChange(code: string) {
    location.setRegionCode(code);
    setCurrencyOverride(null);
    setTaxRateOverride(null);
    resetOutput();
  }

  function updateField<K extends keyof InvoiceFormFields>(key: K, value: InvoiceFormFields[K]) {
    setFormFields((current) => ({ ...current, [key]: value }));
    resetOutput();
  }

  function updateItem(index: number, patch: Partial<ItemField>) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    );
    resetOutput();
  }

  function addItem() {
    setItems((current) => [...current, emptyItem()]);
    resetOutput();
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    resetOutput();
  }

  function validateFields(): boolean {
    const required = [
      fields.yourName,
      fields.clientName,
      fields.number,
      fields.invoiceDate,
      fields.dueDate,
    ];

    if (required.some((value) => !value.trim())) return false;
    if (!isValidDateValue(fields.invoiceDate) || !isValidDateValue(fields.dueDate)) return false;
    if (fields.dueDate < fields.invoiceDate) return false;
    if (!isValidEmail(fields.yourEmail) || !isValidEmail(fields.clientEmail)) return false;

    const taxRate = fields.taxRate.trim() === "" ? 0 : Number(fields.taxRate);
    if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) return false;

    return items.every((item) => {
      const quantity = Number(item.quantity);
      const rate = Number(item.rate);
      return (
        item.description.trim().length > 0 &&
        Number.isFinite(quantity) &&
        quantity > 0 &&
        Number.isFinite(rate) &&
        rate >= 0
      );
    });
  }

  function buildInput(): InvoiceInput {
    return {
      ...fields,
      taxRate: fields.taxRate.trim() === "" ? 0 : Number(fields.taxRate),
      items: items.map((item) => ({
        description: item.description.trim(),
        quantity: Number(item.quantity),
        rate: Number(item.rate),
      })),
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateFields()) {
      setResult(null);
      setStatus("error");
      setStatusMessage(undefined);
      return;
    }

    const input = buildInput();
    setStatus("loading");
    setStatusMessage(`${tr("toolUi.invoice.generate")}…`);
    setResult(null);

    try {
      const bytes = await createInvoicePdf(input, locale);
      const filename =
        input.number
          .trim()
          .replace(/[^a-z0-9_-]+/gi, "-")
          .replace(/^-+|-+$/g, "") || "invoice";
      setResult({
        bytes,
        filename: `${filename}.pdf`,
        totals: calculateInvoiceTotals(input),
      });
      setStatus("success");
      setStatusMessage(undefined);
    } catch {
      setResult(null);
      setStatus("error");
      setStatusMessage(undefined);
    }
  }

  function download() {
    if (!result) return;
    downloadBytes(result.bytes, result.filename);
  }

  return (
    <CalculatorShell
      tool={tool}
      status={status}
      statusMessage={statusMessage}
      privacyNote={tr("toolUi.finance.privacy")}
      inputs={
        <form onSubmit={handleSubmit} className="space-y-5">
          <fieldset disabled={status === "loading"} className="space-y-5">
            <FinanceLocationFields
              countryCode={location.countryCode}
              regionCode={location.regionCode}
              source={location.source}
              ready={location.ready}
              onCountryChange={handleCountryChange}
              onRegionChange={handleRegionChange}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={tr("toolUi.invoice.yourName")}>
                <input
                  required
                  value={fields.yourName}
                  onChange={(event) => updateField("yourName", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={tr("toolUi.invoice.yourEmail")}>
                <input
                  type="email"
                  value={fields.yourEmail}
                  onChange={(event) => updateField("yourEmail", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label={tr("toolUi.invoice.yourAddress")}>
              <textarea
                rows={3}
                value={fields.yourAddress}
                onChange={(event) => updateField("yourAddress", event.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={tr("toolUi.invoice.clientName")}>
                <input
                  required
                  value={fields.clientName}
                  onChange={(event) => updateField("clientName", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={tr("toolUi.invoice.clientEmail")}>
                <input
                  type="email"
                  value={fields.clientEmail}
                  onChange={(event) => updateField("clientEmail", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label={tr("toolUi.invoice.clientAddress")}>
              <textarea
                rows={3}
                value={fields.clientAddress}
                onChange={(event) => updateField("clientAddress", event.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={tr("toolUi.invoice.number")}>
                <input
                  required
                  value={fields.number}
                  onChange={(event) => updateField("number", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={tr("toolUi.invoice.currency")}>
                <select
                  value={fields.currency}
                  onChange={(event) => {
                    setCurrencyOverride(event.target.value);
                    resetOutput();
                  }}
                  className={inputClass}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={tr("toolUi.invoice.invoiceDate")}>
                <input
                  type="date"
                  required
                  value={fields.invoiceDate}
                  onChange={(event) => updateField("invoiceDate", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={tr("toolUi.invoice.dueDate")}>
                <input
                  type="date"
                  required
                  value={fields.dueDate}
                  onChange={(event) => updateField("dueDate", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="space-y-3 rounded-lg border border-border p-3">
                  <Field label={tr("toolUi.invoice.description")}>
                    <input
                      required
                      value={item.description}
                      onChange={(event) =>
                        updateItem(index, { description: event.target.value })
                      }
                      className={inputClass}
                    />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label={tr("toolUi.invoice.quantity")}>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0.01"
                        step="0.01"
                        required
                        value={item.quantity}
                        onChange={(event) => updateItem(index, { quantity: event.target.value })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label={tr("toolUi.invoice.rate")}>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        required
                        value={item.rate}
                        onChange={(event) => updateItem(index, { rate: event.target.value })}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeItem(index)}
                    >
                      {tr("toolUi.invoice.removeItem")}
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addItem}>
                {tr("toolUi.invoice.addItem")}
              </Button>
            </div>

            <div className="space-y-2">
              <Field label={tr("toolUi.invoice.taxRate")}>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="0.01"
                  value={fields.taxRate}
                  onChange={(event) => {
                    setTaxRateOverride(event.target.value);
                    resetOutput();
                  }}
                  className={inputClass}
                />
              </Field>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setTaxRateOverride(null);
                  resetOutput();
                }}
              >
                {tr("toolUi.invoice.useLocalTax")}
              </Button>
              <div className="text-xs leading-5 text-muted">
                <p className="font-medium text-foreground">
                  {tr("toolUi.invoice.taxSource")}
                </p>
                <p>{vatRule.name}</p>
                <p>{vatRule.sourceName}</p>
                {vatRule.sourceUrl && (
                  <a
                    className="text-primary underline underline-offset-4"
                    href={vatRule.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {vatRule.sourceUrl}
                  </a>
                )}
                <p>
                  {tr("calculator.sourceChecked")}: {vatRule.lastUpdated}
                </p>
              </div>
            </div>

            <Field label={tr("toolUi.invoice.notes")}>
              <textarea
                rows={4}
                value={fields.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Button type="submit" className="w-full">
              {tr("toolUi.invoice.generate")}
            </Button>
          </fieldset>
        </form>
      }
      results={
        <div className="space-y-4">
          <ResultRow
            label={tr("toolUi.invoice.subtotal")}
            value={
              result
                ? formatCurrency(result.totals.subtotal, fields.currency, locale)
                : "—"
            }
          />
          <ResultRow
            label={tr("toolUi.invoice.tax")}
            value={
              result ? formatCurrency(result.totals.tax, fields.currency, locale) : "—"
            }
          />
          <ResultRow
            label={tr("toolUi.invoice.total")}
            value={
              result ? formatCurrency(result.totals.total, fields.currency, locale) : "—"
            }
            emphasis
          />
          {result && <DownloadButton onClick={download} />}
        </div>
      }
    />
  );
}
