"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

function unlockedName(name: string): string {
  return `${name.replace(/\.pdf$/i, "")}-unlocked.pdf`;
}

export function UnlockPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleApply() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);
    setResult(null);

    try {
      const bytes = await runPdfJob(
        { type: "unlock", file: await file.arrayBuffer(), password },
        300_000,
      );
      setResult({ bytes, name: unlockedName(file.name) });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setStatusMessage(describePdfError(error));
    }
  }

  return (
    <ToolShell
      title={tool.name}
      description={tool.description}
      status={status}
      statusMessage={statusMessage}
      privacyNote={t("toolSecurity.privacy")}
      dropzone={
        <>
          <DropZone
            accept="application/pdf,.pdf"
            maxSizeMb={100}
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          <Field label={t("toolSecurity.password")} hint={t("toolSecurity.passwordHint")}>
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                resetOutput();
              }}
              className={inputClass}
            />
          </Field>
          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolSecurity.unlockAction")}
          </Button>
        </div>
      }
      result={result ? <ResultSummary name={result.name} bytes={result.bytes.byteLength} /> : undefined}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
