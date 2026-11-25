"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { HealthRiskNotice } from "@/components/tool/HealthRiskNotice";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateBmr, calculateTdee, type Sex, type TdeeResult } from "@/lib/healthCalculators";
import { useHealthCalculation } from "@/lib/useHealthCalculation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

const activityLevels = [
  { id: "light", palMin: 1.4, palMax: 1.69 },
  { id: "moderate", palMin: 1.7, palMax: 1.99 },
  { id: "vigorous", palMin: 2.0, palMax: 2.39 },
] as const;

type ActivityId = (typeof activityLevels)[number]["id"];

export function BmrTdeeCalculatorTool({ tool }: { tool: Tool }) {
  const [sex, setSex] = useState<Sex | "">("");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityId, setActivityId] = useState<ActivityId>("light");
  const { status, result, error, calculate } = useHealthCalculation<TdeeResult>();

  function handleSubmit() {
    calculate(() => {
      const ageValue = Number(age);
      const heightValue = Number(heightCm);
      const weightValue = Number(weightKg);
      const activity = activityLevels.find((item) => item.id === activityId);

      if (!sex) {
        return { ok: false as const, error: tr("toolUi.health.sexError") };
      }
      if (!activity) {
        return { ok: false as const, error: tr("toolUi.health.bmrTdee.activityError") };
      }
      if (
        !Number.isFinite(ageValue) ||
        !Number.isFinite(heightValue) ||
        !Number.isFinite(weightValue) ||
        ageValue < 19 ||
        ageValue > 78 ||
        heightValue < 120 ||
        heightValue > 220 ||
        weightValue < 30 ||
        weightValue > 300
      ) {
        return { ok: false as const, error: tr("toolUi.health.bmrTdee.rangeError") };
      }

      const bmr = calculateBmr({ sex, age: ageValue, heightCm: heightValue, weightKg: weightValue });
      return { ok: true as const, value: calculateTdee(bmr, activity.palMin, activity.palMax) };
    });
  }

  return (
    <CalculatorShell
      tool={tool}
      status={status}
      statusMessage={error || (status === "success" ? tr("toolUi.health.ready") : undefined)}
      privacyNote={tr("toolUi.health.privacy")}
      note={tr("toolUi.health.bmrTdee.note")}
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
            <Field label={tr("toolUi.health.sex")}>
              <select className={inputClass} value={sex} onChange={(event) => setSex(event.target.value as Sex | "")}>
                <option value="">{tr("toolUi.health.choose")}</option>
                <option value="female">{tr("toolUi.health.female")}</option>
                <option value="male">{tr("toolUi.health.male")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.age")}>
              <input className={inputClass} type="number" min="19" max="78" inputMode="numeric" value={age} onChange={(event) => setAge(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.heightCm")}>
              <input className={inputClass} type="number" min="120" max="220" step="0.1" inputMode="decimal" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.weightKg")}>
              <input className={inputClass} type="number" min="30" max="300" step="0.1" inputMode="decimal" value={weightKg} onChange={(event) => setWeightKg(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.bmrTdee.activity")}>
              <select className={inputClass} value={activityId} onChange={(event) => setActivityId(event.target.value as ActivityId)}>
                {activityLevels.map((item) => (
                  <option key={item.id} value={item.id}>
                    {tr(`toolUi.health.bmrTdee.levels.${item.id}`)}
                  </option>
                ))}
              </select>
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
              <ResultRow label={tr("toolUi.health.bmrTdee.bmr")} value={`${formatNumber(result.bmr, "en-US", { maximumFractionDigits: 0 })} kcal/day`} emphasis />
              <ResultRow label={tr("toolUi.health.bmrTdee.tdeeRange")} value={`${formatNumber(result.min, "en-US", { maximumFractionDigits: 0 })}–${formatNumber(result.max, "en-US", { maximumFractionDigits: 0 })} kcal/day`} />
              <ResultRow label={tr("toolUi.health.bmrTdee.planning")} value={`${formatNumber(result.midpoint, "en-US", { maximumFractionDigits: 0 })} kcal/day`} />
            </>
          )}
        </>
      }
    />
  );
}
