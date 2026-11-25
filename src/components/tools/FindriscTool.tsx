"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { HealthRiskNotice } from "@/components/tool/HealthRiskNotice";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateFindrisc, type FindriscResult, type Sex } from "@/lib/healthCalculators";
import { useHealthCalculation } from "@/lib/useHealthCalculation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

type FamilyHistory = "none" | "extended" | "firstDegree";

export function FindriscTool({ tool }: { tool: Tool }) {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex | "">("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [inactive, setInactive] = useState("no");
  const [produce, setProduce] = useState("no");
  const [medication, setMedication] = useState("no");
  const [glucose, setGlucose] = useState("no");
  const [family, setFamily] = useState<FamilyHistory>("none");
  const { status, result, error, calculate } = useHealthCalculation<FindriscResult>();

  function handleSubmit() {
    calculate(() => {
      const ageValue = Number(age);
      const weightValue = Number(weight);
      const heightValue = Number(height);
      const waistValue = Number(waist);

      if (!Number.isFinite(ageValue) || ageValue < 18 || ageValue > 120) {
        return { ok: false as const, error: tr("toolUi.health.ageError") };
      }
      if (!sex) return { ok: false as const, error: tr("toolUi.health.sexError") };
      if (
        !Number.isFinite(weightValue) ||
        !Number.isFinite(heightValue) ||
        !Number.isFinite(waistValue) ||
        weightValue < 30 ||
        weightValue > 300 ||
        heightValue < 120 ||
        heightValue > 220 ||
        waistValue < 50 ||
        waistValue > 220
      ) {
        return { ok: false as const, error: tr("toolUi.health.sizeError") };
      }

      const value = calculateFindrisc({
        age: ageValue,
        sex,
        weightKg: weightValue,
        heightCm: heightValue,
        waistCm: waistValue,
        inactive: inactive === "yes",
        lowFruitVegetables: produce === "yes",
        bloodPressureMedication: medication === "yes",
        highGlucoseHistory: glucose === "yes",
        familyHistory: family,
      });
      return { ok: true as const, value };
    });
  }

  const bandLabel = result ? tr(`toolUi.health.bands.${result.band}`) : "";

  return (
    <CalculatorShell
      tool={tool}
      status={status}
      statusMessage={error || (status === "success" ? tr("toolUi.health.ready") : undefined)}
      privacyNote={tr("toolUi.health.privacy")}
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.health.findrisc.note")}`}
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
              <input className={inputClass} type="number" min="18" max="120" inputMode="numeric" value={age} onChange={(event) => setAge(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.sex")}>
              <select className={inputClass} value={sex} onChange={(event) => setSex(event.target.value as Sex | "")}>
                <option value="">{tr("toolUi.health.choose")}</option>
                <option value="female">{tr("toolUi.health.female")}</option>
                <option value="male">{tr("toolUi.health.male")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.weightKg")}>
              <input className={inputClass} type="number" min="30" max="300" step="0.1" inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.heightCm")}>
              <input className={inputClass} type="number" min="120" max="220" step="0.1" inputMode="decimal" value={height} onChange={(event) => setHeight(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.findrisc.waist")} hint={tr("toolUi.health.findrisc.waistHint")}>
              <input className={inputClass} type="number" min="50" max="220" step="0.1" inputMode="decimal" value={waist} onChange={(event) => setWaist(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.findrisc.inactive")}>
              <select className={inputClass} value={inactive} onChange={(event) => setInactive(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.findrisc.produce")}>
              <select className={inputClass} value={produce} onChange={(event) => setProduce(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.findrisc.medication")}>
              <select className={inputClass} value={medication} onChange={(event) => setMedication(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.findrisc.glucose")}>
              <select className={inputClass} value={glucose} onChange={(event) => setGlucose(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.findrisc.family")}>
              <select className={inputClass} value={family} onChange={(event) => setFamily(event.target.value as FamilyHistory)}>
                <option value="none">{tr("toolUi.health.findrisc.familyNone")}</option>
                <option value="extended">{tr("toolUi.health.findrisc.familyExtended")}</option>
                <option value="firstDegree">{tr("toolUi.health.findrisc.familyFirstDegree")}</option>
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
              <ResultRow label={tr("toolUi.health.score")} value={`${formatNumber(result.score, "en-US")} / 26`} emphasis />
              <ResultRow label={tr("toolUi.health.result")} value={bandLabel} />
              <ResultRow label={tr("toolUi.health.bmi")} value={formatNumber(result.bmi, "en-US", { maximumFractionDigits: 1 })} />
              {result.breakdown.map((item) => (
                <ResultRow key={item.key} label={tr(`toolUi.health.findrisc.${item.key}`)} value={formatNumber(item.points, "en-US")} />
              ))}
            </>
          )}
        </>
      }
    />
  );
}
