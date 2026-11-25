"use client";

import { useState } from "react";
import { TextToolShell } from "@/components/tool/TextToolShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { formatJson, minifyJson } from "@/lib/textTools";
import type { Tool, ToolStatus } from "@/types";

export function JsonFormatterTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();

  function clear() {
    setInput("");
    setOutput("");
    setStatus("empty");
    setStatusMessage(undefined);
  }

  function process(minify: boolean) {
    if (!input.trim()) {
      setOutput("");
      setStatus("empty");
      setStatusMessage(undefined);
      return;
    }

    try {
      setOutput(minify ? minifyJson(input) : formatJson(input, indent));
      setStatus("success");
      setStatusMessage(t("toolUi.json.valid"));
    } catch {
      setOutput("");
      setStatus("error");
      setStatusMessage(t("toolUi.json.error"));
    }
  }

  const actions = (
    <div className="space-y-3">
      <Field label={t("toolUi.json.indent")}>
        <select
          className={inputClass}
          value={indent}
          onChange={(event) => setIndent(Number(event.target.value))}
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
        </select>
      </Field>
      <div className="grid gap-2 sm:grid-cols-3">
        <Button type="button" onClick={() => process(false)}>
          {t("toolUi.json.format")}
        </Button>
        <Button type="button" variant="secondary" onClick={() => process(true)}>
          {t("toolUi.json.minify")}
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
        setStatus("empty");
        setStatusMessage(undefined);
      }}
      output={output}
      placeholder="Paste JSON here"
      status={status}
      statusMessage={statusMessage}
      actions={actions}
      privacyNote="Your JSON is checked and formatted in this browser tab. Nothing is uploaded."
    />
  );
}
