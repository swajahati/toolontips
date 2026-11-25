"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { CopyButton } from "@/components/tool/CopyButton";
import { ResultRow } from "@/components/tool/ResultRow";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/tools/Fields";
import { t, type TranslationKey } from "@/i18n/translations";
import {
  estimatePasswordStrength,
  generatePassword,
  type PasswordMode,
  type PasswordOptions,
  type PasswordStrength,
} from "@/lib/textTools";
import type { Tool } from "@/types";

const strengthLabels: Record<PasswordStrength, TranslationKey> = {
  weak: "toolUi.password.weak",
  fair: "toolUi.password.fair",
  strong: "toolUi.password.strong",
  veryStrong: "toolUi.password.veryStrong",
};

export function PasswordGeneratorTool({ tool }: { tool: Tool }) {
  const [mode, setMode] = useState<PasswordMode>("random");
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(6);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [password, setPassword] = useState("");

  const options: PasswordOptions = {
    mode,
    length,
    wordCount,
    upper,
    lower,
    numbers,
    symbols,
    excludeSimilar,
  };
  const strength = estimatePasswordStrength(options);

  function changeMode(value: PasswordMode) {
    setMode(value);
    setPassword("");
  }

  function changeLength(value: number) {
    setLength(value);
    setPassword("");
  }

  function changeWordCount(value: number) {
    setWordCount(value);
    setPassword("");
  }

  function changeExcludeSimilar(value: boolean) {
    setExcludeSimilar(value);
    setPassword("");
  }

  function changeSet(
    key: "upper" | "lower" | "numbers" | "symbols",
    value: boolean,
  ) {
    if (!value && [upper, lower, numbers, symbols].filter(Boolean).length === 1) return;
    if (key === "upper") setUpper(value);
    if (key === "lower") setLower(value);
    if (key === "numbers") setNumbers(value);
    if (key === "symbols") setSymbols(value);
    setPassword("");
  }

  const inputs = (
    <div className="space-y-5">
      <Field label={t("toolUi.password.mode")}>
        <select
          className={inputClass}
          value={mode}
          onChange={(event) => changeMode(event.target.value as PasswordMode)}
        >
          <option value="random">{t("toolUi.password.random")}</option>
          <option value="passphrase">{t("toolUi.password.passphrase")}</option>
        </select>
      </Field>

      {mode === "random" ? (
        <Field label={t("toolUi.password.length")}>
          <input
            className={inputClass}
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={(event) => changeLength(Number(event.target.value))}
          />
        </Field>
      ) : (
        <Field label={t("toolUi.password.words")}>
          <input
            className={inputClass}
            type="number"
            min={3}
            max={12}
            value={wordCount}
            onChange={(event) => changeWordCount(Number(event.target.value))}
          />
        </Field>
      )}

      {mode === "random" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={t("toolUi.password.upper")}>
            <input
              className="mt-2 size-4"
              type="checkbox"
              checked={upper}
              onChange={(event) => changeSet("upper", event.target.checked)}
            />
          </Field>
          <Field label={t("toolUi.password.lower")}>
            <input
              className="mt-2 size-4"
              type="checkbox"
              checked={lower}
              onChange={(event) => changeSet("lower", event.target.checked)}
            />
          </Field>
          <Field label={t("toolUi.password.numbers")}>
            <input
              className="mt-2 size-4"
              type="checkbox"
              checked={numbers}
              onChange={(event) => changeSet("numbers", event.target.checked)}
            />
          </Field>
          <Field label={t("toolUi.password.symbols")}>
            <input
              className="mt-2 size-4"
              type="checkbox"
              checked={symbols}
              onChange={(event) => changeSet("symbols", event.target.checked)}
            />
          </Field>
        </div>
      )}

      <Field label={t("toolUi.password.excludeSimilar")}>
        <input
          className="mt-2 size-4"
          type="checkbox"
          checked={excludeSimilar}
          onChange={(event) => changeExcludeSimilar(event.target.checked)}
        />
      </Field>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => setPassword(generatePassword(options))}>
          {t("toolUi.password.generate")}
        </Button>
        <Button type="button" variant="ghost" onClick={() => setPassword("")}>
          {t("common.clear")}
        </Button>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-4">
      <div className="min-h-16 rounded-lg border border-border bg-surface-muted p-4 font-mono text-lg font-semibold break-all">
        {password}
      </div>
      <ResultRow label={t("toolUi.password.strength")} value={t(strengthLabels[strength])} emphasis />
      <CopyButton value={password} />
      <p className="text-xs leading-6 text-muted">{t("toolUi.password.warning")}</p>
    </div>
  );

  return (
    <CalculatorShell
      tool={tool}
      inputs={inputs}
      results={results}
      privacyNote="Your password is generated in this browser tab. Nothing is uploaded or stored."
    />
  );
}
