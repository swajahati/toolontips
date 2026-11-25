"use client";

import { useState } from "react";
import { TextToolShell } from "@/components/tool/TextToolShell";
import { Button } from "@/components/ui/Button";
import { t, type TranslationKey } from "@/i18n/translations";
import { convertCase, type CaseStyle } from "@/lib/textTools";
import type { Tool } from "@/types";

const styles: CaseStyle[] = [
  "title",
  "sentence",
  "upper",
  "lower",
  "camel",
  "snake",
  "kebab",
];

const labels: Record<CaseStyle, TranslationKey> = {
  title: "toolUi.case.title",
  sentence: "toolUi.case.sentence",
  upper: "toolUi.case.upper",
  lower: "toolUi.case.lower",
  camel: "toolUi.case.camel",
  snake: "toolUi.case.snake",
  kebab: "toolUi.case.kebab",
};

export function CaseConverterTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [style, setStyle] = useState<CaseStyle>("title");

  function clear() {
    setInput("");
    setOutput("");
  }

  function convert() {
    setOutput(convertCase(input, style));
  }

  const actions = (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {styles.map((item) => (
          <Button
            key={item}
            type="button"
            variant={item === style ? "primary" : "secondary"}
            onClick={() => {
              setStyle(item);
              setOutput("");
            }}
          >
            {t(labels[item])}
          </Button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" onClick={convert}>
          {t("toolUi.case.convert")}
        </Button>
        <Button type="button" variant="ghost" onClick={clear}>
          {t("common.clear")}
        </Button>
      </div>
    </div>
  );

  return (
    <TextToolShell
      tool={tool}
      input={input}
      onInputChange={(value) => {
        setInput(value);
        setOutput("");
      }}
      output={output}
      placeholder="Type or paste text to convert"
      actions={actions}
      privacyNote="Your text is converted in this browser tab. Nothing is uploaded."
    />
  );
}
