"use client";

import { useState } from "react";
import { TextToolShell } from "@/components/tool/TextToolShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { convertText, type TextEncoding, type TextOperation } from "@/lib/textTools";
import type { Tool, ToolStatus } from "@/types";

export function Base64UrlEncoderTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState<TextOperation>("encode");
  const [encoding, setEncoding] = useState<TextEncoding>("base64");
  const [status, setStatus] = useState<ToolStatus>("empty");

  function clear() {
    setInput("");
    setOutput("");
    setStatus("empty");
  }

  function process() {
    if (!input) {
      setOutput("");
      setStatus("empty");
      return;
    }

    try {
      setOutput(convertText(input, operation, encoding));
      setStatus("empty");
    } catch {
      setOutput("");
      setStatus("error");
    }
  }

  const actions = (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t("toolUi.base64.operation")}>
          <select
            className={inputClass}
            value={operation}
            onChange={(event) => {
              setOperation(event.target.value as TextOperation);
              setOutput("");
              setStatus("empty");
            }}
          >
            <option value="encode">{t("toolUi.base64.encode")}</option>
            <option value="decode">{t("toolUi.base64.decode")}</option>
          </select>
        </Field>
        <Field label={t("toolUi.base64.encoding")}>
          <select
            className={inputClass}
            value={encoding}
            onChange={(event) => {
              setEncoding(event.target.value as TextEncoding);
              setOutput("");
              setStatus("empty");
            }}
          >
            <option value="base64">{t("toolUi.base64.base64")}</option>
            <option value="base64Url">{t("toolUi.base64.base64Url")}</option>
            <option value="urlComponent">{t("toolUi.base64.urlComponent")}</option>
          </select>
        </Field>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" onClick={process}>
          {t("toolUi.base64.process")}
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
      }}
      output={output}
      outputLabel={t(operation === "encode" ? "toolUi.base64.encode" : "toolUi.base64.decode")}
      placeholder="Type or paste text here"
      status={status}
      actions={actions}
      privacyNote="Your text is encoded or decoded in this browser tab. Nothing is uploaded."
    />
  );
}
