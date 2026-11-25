"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { FileList, ResultSummary } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function MergePdfTool({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleMerge() {
    if (files.length < 2) {
      setStatus("error");
      setStatusMessage(t("toolPdf.noFiles"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
      const bytes = await runPdfJob({ type: "merge", files: buffers });
      setResult({ bytes, name: "merged.pdf" });
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
      privacyNote={t("toolPdf.privacy")}
      dropzone={
        <>
          <DropZone
            multiple
            accept="application/pdf,.pdf"
            onFiles={(selected) => {
              setFiles(selected);
              reset();
            }}
          />
          <FileList
            files={files}
            onRemove={(index) => {
              setFiles((current) => current.filter((_, position) => position !== index));
              reset();
            }}
          />
        </>
      }
      options={
        <div className="space-y-3">
          <p className="text-sm text-muted">
            {t("toolPdf.filesSelected", { count: files.length })}
          </p>
          <Button type="button" onClick={handleMerge} disabled={files.length < 2 || status === "loading"}>
            {t("toolPdf.mergeAction")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
