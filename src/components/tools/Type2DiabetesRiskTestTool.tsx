"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { HealthRiskNotice } from "@/components/tool/HealthRiskNotice";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateType2Risk, type Sex, type Type2RiskResult } from "@/lib/healthCalculators";
import { useHealthCalculation } from "@/lib/useHealthCalculation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

type Units = "imperial" | "metric";

export function Type2DiabetesRiskTestTool({ tool }: { tool: Tool }) {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex | "">("");
  const [gestational, setGestational] = useState("no");
  const [family, setFamily] = useState("no");
  const [bloodPressure, setBloodPressure] = useState("no");
  const [inactive, setInactive] = useState("no");
  const [units, setUnits] = useState<Units>("imperial");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const { status, result, error, calculate } = useHealthCalculation<Type2RiskResult>();

  function handleSubmit() {
    calculate(() => {
      const ageValue = Number(age);
      const heightValue = Number(height);
      const weightValue = Number(weight);

      if (!Number.isFinite(ageValue) || ageValue < 18 || ageValue > 120) {
        return { ok: false as const, error: tr("toolUi.health.ageError") };
      }
      if (!sex) return { ok: false as const, error: tr("toolUi.health.sexError") };

      const heightInches = units === "imperial" ? heightValue : heightValue / 2.54;
      const weightPounds = units === "imperial" ? weightValue : weightValue * 2.2046226218;

      if (
        !Number.isFinite(heightValue) ||
        !Number.isFinite(weightValue) ||
        heightInches < 58 ||
        heightInches > 76 ||
        weightPounds < 50 ||
        weightPounds > 700
      ) {
        return { ok: false as const, error: tr("toolUi.health.sizeError") };
      }

      try {
        const value = calculateType2Risk({
          age: ageValue,
          sex,
          gestationalDiabetes: sex === "female" && gestational === "yes",
          firstDegreeRelative: family === "yes",
          highBloodPressure: bloodPressure === "yes",
          inactive: inactive === "yes",
          heightInches,
          weightPounds,
        });
        return { ok: true as const, value };
      } catch {
        return { ok: false as const, error: tr("toolUi.health.sizeError") };
      }
    });
  }

  const bandLabel = result ? tr(`toolUi.health.bands.${result.band}`) : "";

  return (
    <CalculatorShell
      tool={tool}
      status={status}
      statusMessage={error || (status === "success" ? tr("toolUi.health.ready") : undefined)}
      privacyNote={tr("toolUi.health.privacy")}
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.health.type2.note")}`}
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
            <Field label={tr("toolUi.health.age")}>
              <input
                className={inputClass}
                type="number"
                min="18"
                max="120"
                inputMode="numeric"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </Field>
            <Field label={tr("toolUi.health.sex")}>
              <select
                className={inputClass}
                value={sex}
                onChange={(event) => setSex(event.target.value as Sex | "")}
              >
                <option value="">{tr("toolUi.health.choose")}</option>
                <option value="female">{tr("toolUi.health.female")}</option>
                <option value="male">{tr("toolUi.health.male")}</option>
              </select>
            </Field>
            {sex === "female" && (
              <Field label={tr("toolUi.health.type2.gestational")}>
                <select className={inputClass} value={gestational} onChange={(event) => setGestational(event.target.value)}>
                  <option value="no">{tr("toolUi.health.no")}</option>
                  <option value="yes">{tr("toolUi.health.yes")}</option>
                </select>
              </Field>
            )}
            <Field label={tr("toolUi.health.type2.family")}>
              <select className={inputClass} value={family} onChange={(event) => setFamily(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.type2.bloodPressure")}>
              <select className={inputClass} value={bloodPressure} onChange={(event) => setBloodPressure(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.type2.inactive")}>
              <select className={inputClass} value={inactive} onChange={(event) => setInactive(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
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
                <option value="imperial">{tr("toolUi.health.imperial")}</option>
                <option value="metric">{tr("toolUi.health.metric")}</option>
              </select>
            </Field>
            <Field label={units === "imperial" ? tr("toolUi.health.heightInches") : tr("toolUi.health.heightCm")}>
              <input className={inputClass} type="number" min="0" step="0.1" inputMode="decimal" value={height} onChange={(event) => setHeight(event.target.value)} />
            </Field>
            <Field label={units === "imperial" ? tr("toolUi.health.weightPounds") : tr("toolUi.health.weightKg")}>
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
              <ResultRow label={tr("toolUi.health.score")} value={`${formatNumber(result.score, "en-US")} / 10`} emphasis />
              <ResultRow label={tr("toolUi.health.result")} value={bandLabel} />
              {result.breakdown.map((item) => (
                <ResultRow
                  key={item.key}
                  label={tr(`toolUi.health.type2.${item.key}`)}
                  value={formatNumber(item.points, "en-US")}
                />
              ))}
            </>
          )}
        </>
      }
    />
  );
}
