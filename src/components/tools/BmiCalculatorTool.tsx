"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { HealthRiskNotice } from "@/components/tool/HealthRiskNotice";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { bmiStandards, getBmiStandard } from "@/data/healthBmiStandards";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateBmi, type BmiBodyType, type BmiResult } from "@/lib/healthCalculators";
import { useHealthCalculation } from "@/lib/useHealthCalculation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

type Units = "imperial" | "metric";

export function BmiCalculatorTool({ tool }: { tool: Tool }) {
  const [units, setUnits] = useState<Units>("metric");
  const [standardId, setStandardId] = useState("standard");
  const [bodyType, setBodyType] = useState<BmiBodyType>("general");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const { status, result, error, calculate } = useHealthCalculation<BmiResult>();

  function handleSubmit() {
    calculate(() => {
      const standard = getBmiStandard(standardId);
      const heightValue = Number(height);
      const weightValue = Number(weight);

      if (!standard) {
        return { ok: false as const, error: tr("toolUi.health.bmiTool.standardError") };
      }
      if (
        !Number.isFinite(heightValue) ||
        !Number.isFinite(weightValue) ||
        heightValue <= 0 ||
        weightValue <= 0
      ) {
        return { ok: false as const, error: tr("toolUi.health.bmiTool.inputError") };
      }

      const heightCm = units === "metric" ? heightValue : heightValue * 2.54;
      const weightKg = units === "metric" ? weightValue : weightValue * 0.45359237;

      if (heightCm < 120 || heightCm > 220 || weightKg < 30 || weightKg > 300) {
        return { ok: false as const, error: tr("toolUi.health.bmiTool.rangeError") };
      }

      return { ok: true as const, value: calculateBmi(weightKg, heightCm, standard.bands, bodyType) };
    });
  }

  const standard = getBmiStandard(standardId);
  const bandLabel = result ? tr(`toolUi.health.bmiTool.bands.${result.band}`) : "";
  const guidanceDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

  return (
    <CalculatorShell
      tool={tool}
      status={status}
      statusMessage={error || (status === "success" ? tr("toolUi.health.ready") : undefined)}
      privacyNote={tr("toolUi.health.privacy")}
      note={`${tr("toolUi.health.bmiTool.note")} ${standard?.source ?? ""} ${tr("toolUi.health.bmiTool.checkedLabel")} ${standard?.checked ?? ""}.`}
      inputs={
        <>
          <HealthRiskNotice />
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Field label={tr("toolUi.health.bmiTool.standard")}>
              <select className={inputClass} value={standardId} onChange={(event) => setStandardId(event.target.value)}>
                {bmiStandards.map((item) => (
                  <option key={item.id} value={item.id}>
                    {tr(`toolUi.health.bmiTool.standards.${item.nameKey}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={tr("toolUi.health.bmiTool.bodyType")}>
              <select className={inputClass} value={bodyType} onChange={(event) => setBodyType(event.target.value as BmiBodyType)}>
                {(["general", "athletic", "lean", "higherBodyFat"] as const).map((item) => (
                  <option key={item} value={item}>
                    {tr(`toolUi.health.bmiTool.bodyTypes.${item}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={tr("toolUi.health.units")}>
              <select
                className={inputClass}
                value={units}
                onChange={(event) => {
                  setUnits(event.target.value as Units);
                  setHeight("");
                  setWeight("");
                }}
              >
                <option value="metric">{tr("toolUi.health.metric")}</option>
                <option value="imperial">{tr("toolUi.health.imperial")}</option>
              </select>
            </Field>
            <Field label={units === "metric" ? tr("toolUi.health.heightCm") : tr("toolUi.health.bmiTool.heightInches")}>
              <input className={inputClass} type="number" min="0" step="0.1" inputMode="decimal" value={height} onChange={(event) => setHeight(event.target.value)} />
            </Field>
            <Field label={units === "metric" ? tr("toolUi.health.weightKg") : tr("toolUi.health.bmiTool.weightPounds")}>
              <input className={inputClass} type="number" min="0" step="0.1" inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value)} />
            </Field>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90" type="submit">
              {tr("calculator.calculate")}
            </button>
          </form>
        </>
      }
      results={
        <>
          {status === "empty" && <p className="text-sm text-muted">{tr("toolUi.health.empty")}</p>}
          {status === "loading" && <p className="text-sm text-muted">{tr("toolUi.health.calculating")}</p>}
          {result && (
            <>
              <ResultRow label={tr("toolUi.health.bmiTool.value")} value={formatNumber(result.value, "en-US", { maximumFractionDigits: 1 })} emphasis />
              <ResultRow label={tr("toolUi.health.result")} value={bandLabel} />
              <ResultRow label={tr("toolUi.health.bmiTool.usedStandard")} value={tr(`toolUi.health.bmiTool.standards.${standard?.nameKey ?? "standard"}`)} />
              <ResultRow label={tr("toolUi.health.bmiTool.usedBodyType")} value={tr(`toolUi.health.bmiTool.bodyTypes.${bodyType}`)} />
              <div className="mt-4 rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-base font-bold">{tr(`toolUi.health.bmiTool.guidance.plans.${result.guidance}.title`)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {tr(`toolUi.health.bmiTool.guidance.plans.${result.guidance}.summary`)}
                </p>
                <h4 className="mt-4 text-sm font-semibold">{tr("toolUi.health.bmiTool.guidance.title")}</h4>
                <ol className="mt-2 space-y-2 text-sm leading-6 text-muted">
                  {guidanceDays.map((day) => (
                    <li key={day}>
                      <span className="font-semibold">{tr(`toolUi.health.bmiTool.guidance.days.${day}`)}</span>{" "}
                      {tr(`toolUi.health.bmiTool.guidance.plans.${result.guidance}.${day}`)}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs leading-6 text-muted">{tr("toolUi.health.bmiTool.guidance.safety")}</p>
                <p className="mt-2 text-xs leading-6 text-muted">{tr("toolUi.health.bmiTool.guidance.source")}</p>
              </div>
            </>
          )}
        </>
      }
    />
  );
}
