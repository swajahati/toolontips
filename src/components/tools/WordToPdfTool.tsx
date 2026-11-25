"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { FileList, ResultSummary } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { docxToPdf } from "@/lib/docxToPdf";
import { describePdfError } from "@/lib/pdfErrors";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

function pdfName(name: string): string {
  return `${name.replace(/\.docx$/i, "")}.pdf`;
}

export function WordToPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
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
      const bytes = await docxToPdf(file);
      setResult({ bytes, name: pdfName(file.name) });
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
      privacyNote={t("toolWord.privacy")}
      dropzone={
        <>
          <DropZone
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            maxSizeMb={50}
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
          <p className="text-xs text-muted">{t("toolWord.limit")}</p>
          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolWord.action")}
          </Button>
        </div>
      }
      result={result ? <ResultSummary name={result.name} bytes={result.bytes.byteLength} /> : undefined}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
