"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { HealthRiskNotice } from "@/components/tool/HealthRiskNotice";
import { ResultRow } from "@/components/tool/ResultRow";
import { Field, inputClass } from "@/components/tools/Fields";
import { countries } from "@/data/countries";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { calculateAscvdRisk, type AscvdResult, type Sex } from "@/lib/healthCalculators";
import { useHealthCalculation } from "@/lib/useHealthCalculation";
import type { Tool } from "@/types";

const tr = (key: string) => t(key as never);

type Race = "white" | "africanAmerican";

export function AscvdRiskEstimatorTool({ tool }: { tool: Tool }) {
  const [countryCode, setCountryCode] = useState("US");
  const [sex, setSex] = useState<Sex | "">("");
  const [race, setRace] = useState<Race | "">("");
  const [age, setAge] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [hdl, setHdl] = useState("");
  const [systolic, setSystolic] = useState("");
  const [treated, setTreated] = useState("no");
  const [smoker, setSmoker] = useState("no");
  const [diabetes, setDiabetes] = useState("no");
  const { status, result, error, calculate } = useHealthCalculation<AscvdResult>();

  function handleSubmit() {
    calculate(() => {
      const ageValue = Number(age);
      const cholesterolValue = Number(cholesterol);
      const hdlValue = Number(hdl);
      const systolicValue = Number(systolic);

      if (countryCode !== "US") {
        return { ok: false as const, error: tr("toolUi.health.ascvd.countryError") };
      }
      if (!sex || !race) {
        return { ok: false as const, error: tr("toolUi.health.sexError") };
      }
      if (
        !Number.isFinite(ageValue) ||
        !Number.isFinite(cholesterolValue) ||
        !Number.isFinite(hdlValue) ||
        !Number.isFinite(systolicValue) ||
        ageValue < 40 ||
        ageValue > 79 ||
        cholesterolValue < 130 ||
        cholesterolValue > 320 ||
        hdlValue < 20 ||
        hdlValue > 100 ||
        systolicValue < 90 ||
        systolicValue > 200
      ) {
        return { ok: false as const, error: tr("toolUi.health.ascvd.rangeError") };
      }

      const value = calculateAscvdRisk({
        countryCode,
        sex,
        race,
        age: ageValue,
        totalCholesterol: cholesterolValue,
        hdl: hdlValue,
        systolic: systolicValue,
        bpTreated: treated === "yes",
        smoker: smoker === "yes",
        diabetes: diabetes === "yes",
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
      note={`${tr("calculator.estimateNote")} ${tr("toolUi.health.ascvd.note")}`}
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
            <Field label={tr("toolUi.health.country")}>
              <select className={inputClass} value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>{item.name}</option>
                ))}
              </select>
            </Field>
            <Field label={tr("toolUi.health.sex")}>
              <select className={inputClass} value={sex} onChange={(event) => setSex(event.target.value as Sex | "")}>
                <option value="">{tr("toolUi.health.choose")}</option>
                <option value="female">{tr("toolUi.health.female")}</option>
                <option value="male">{tr("toolUi.health.male")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.ascvd.race")} hint={tr("toolUi.health.ascvd.raceHint")}>
              <select className={inputClass} value={race} onChange={(event) => setRace(event.target.value as Race | "")}>
                <option value="">{tr("toolUi.health.choose")}</option>
                <option value="white">{tr("toolUi.health.ascvd.white")}</option>
                <option value="africanAmerican">{tr("toolUi.health.ascvd.africanAmerican")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.age")}>
              <input className={inputClass} type="number" min="40" max="79" inputMode="numeric" value={age} onChange={(event) => setAge(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.ascvd.totalCholesterol")}>
              <input className={inputClass} type="number" min="130" max="320" step="1" inputMode="numeric" value={cholesterol} onChange={(event) => setCholesterol(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.ascvd.hdl")}>
              <input className={inputClass} type="number" min="20" max="100" step="1" inputMode="numeric" value={hdl} onChange={(event) => setHdl(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.ascvd.systolic")}>
              <input className={inputClass} type="number" min="90" max="200" step="1" inputMode="numeric" value={systolic} onChange={(event) => setSystolic(event.target.value)} />
            </Field>
            <Field label={tr("toolUi.health.ascvd.treated")}>
              <select className={inputClass} value={treated} onChange={(event) => setTreated(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.ascvd.smoker")}>
              <select className={inputClass} value={smoker} onChange={(event) => setSmoker(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
              </select>
            </Field>
            <Field label={tr("toolUi.health.ascvd.diabetes")}>
              <select className={inputClass} value={diabetes} onChange={(event) => setDiabetes(event.target.value)}>
                <option value="no">{tr("toolUi.health.no")}</option>
                <option value="yes">{tr("toolUi.health.yes")}</option>
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
              <ResultRow
                label={tr("toolUi.health.ascvd.tenYear")}
                value={`${formatNumber(result.percent, "en-US", { maximumFractionDigits: 1 })}%`}
                emphasis
              />
              <ResultRow label={tr("toolUi.health.result")} value={bandLabel} />
            </>
          )}
        </>
      }
    />
  );
}
