"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { ResultRow } from "@/components/tool/ResultRow";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/tools/Fields";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { countWords } from "@/lib/textTools";
import type { Tool } from "@/types";

export function WordCounterTool({ tool }: { tool: Tool }) {
  const [text, setText] = useState("");
  const counts = countWords(text);
  const number = (value: number) => formatNumber(value, "en-US");

  const inputs = (
    <div className="space-y-4">
      <Field label={t("common.input")}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type or paste your text here"
          className={`${inputClass} min-h-64 resize-y`}
        />
      </Field>
      <Button type="button" variant="secondary" onClick={() => setText("")}>
        {t("common.clear")}
      </Button>
    </div>
  );

  const results = (
    <div className="space-y-1">
      <ResultRow label={t("toolUi.wordCounter.words")} value={number(counts.words)} emphasis />
      <ResultRow label={t("toolUi.wordCounter.characters")} value={number(counts.characters)} />
      <ResultRow
        label={t("toolUi.wordCounter.charactersNoSpaces")}
        value={number(counts.charactersNoSpaces)}
      />
      <ResultRow label={t("toolUi.wordCounter.sentences")} value={number(counts.sentences)} />
      <ResultRow label={t("toolUi.wordCounter.paragraphs")} value={number(counts.paragraphs)} />
      <ResultRow
        label={t("toolUi.wordCounter.readingTime")}
        value={`${number(counts.readingMinutes)} ${t("toolUi.wordCounter.minutes")}`}
      />
    </div>
  );

  return (
    <CalculatorShell
      tool={tool}
      inputs={inputs}
      results={results}
      privacyNote="Your text stays in this browser tab. Nothing is uploaded."
    />
  );
}
