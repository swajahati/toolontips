"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { parsePageSpec } from "@/lib/pdfProcessor";
import { getPdfPageCount } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function SplitPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [spec, setSpec] = useState("");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    file
      .arrayBuffer()
      .then(getPdfPageCount)
      .then((count) => {
        if (active) setPageCount(count);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [file]);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleSplit() {
    if (!file) return;

    try {
      if (pageCount !== null) parsePageSpec(spec, pageCount);
    } catch {
      setStatus("error");
      setStatusMessage(t("toolPdf.invalidPages"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const bytes = await file.arrayBuffer();
      const output = await runPdfJob({ type: "split", file: bytes, spec });
      setResult({ bytes: output, name: "extracted-pages.pdf" });
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
            accept="application/pdf,.pdf"
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              setPageCount(null);
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-4">
          <Field
            label={t("toolPdf.pages")}
            hint={pageCount ? `${t("toolPdf.resultPages")}: ${pageCount}` : t("toolPdf.pagesHint")}
          >
            <input
              type="text"
              value={spec}
              onChange={(event) => {
                setSpec(event.target.value);
                reset();
              }}
              placeholder="1, 3-5"
              className={inputClass}
            />
          </Field>
          <Button type="button" onClick={handleSplit} disabled={!file || status === "loading"}>
            {t("toolPdf.splitAction")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
