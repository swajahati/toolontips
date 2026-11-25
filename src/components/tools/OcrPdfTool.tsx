"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PageScopeControl } from "@/components/tools/PageScopeControl";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { ocrPdf } from "@/lib/ocrPdf";
import { parsePageSpec, type PageScope } from "@/lib/pdfProcessor";
import { getPdfPageCount } from "@/lib/pdfRender";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

function selectedPages(scope: PageScope, spec: string, pageCount: number | null): number[] {
  if (!pageCount) return [];
  const indexes = Array.from({ length: pageCount }, (_, index) => index);
  if (scope === "custom") {
    try {
      return parsePageSpec(spec, pageCount).map((index) => index + 1);
    } catch {
      return [];
    }
  }
  return indexes
    .filter((index) => (scope === "odd" ? index % 2 === 0 : scope === "even" ? index % 2 === 1 : true))
    .map((index) => index + 1);
}

export function OcrPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [scope, setScope] = useState<PageScope>("all");
  const [spec, setSpec] = useState("");
  const [dpi, setDpi] = useState<200 | 300>(300);
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    (async () => {
      try {
        const count = await getPdfPageCount(await file.arrayBuffer());
        if (active) setPageCount(count);
      } catch (error) {
        if (!active) return;
        setStatus("error");
        setStatusMessage(describePdfError(error));
      }
    })();

    return () => {
      active = false;
    };
  }, [file]);

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setProgress(null);
    setResult(null);
  }

  async function handleApply() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);
    setProgress(0);
    setResult(null);

    try {
      const bytes = await ocrPdf(await file.arrayBuffer(), {
        pageNumbers: selectedPages(scope, spec, pageCount),
        dpi,
        onProgress: setProgress,
      });
      setResult({ bytes, name: "searchable.pdf" });
      setStatus("success");
      setProgress(null);
    } catch (error) {
      setStatus("error");
      setStatusMessage(describePdfError(error));
      setProgress(null);
    }
  }

  return (
    <ToolShell
      title={tool.name}
      description={tool.description}
      status={status}
      statusMessage={statusMessage}
      privacyNote={t("toolOcr.privacy")}
      dropzone={
        <>
          <DropZone
            accept="application/pdf,.pdf"
            maxSizeMb={50}
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              setPageCount(null);
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          <PageScopeControl
            scope={scope}
            spec={spec}
            pageCount={pageCount}
            onScopeChange={(value) => {
              setScope(value);
              resetOutput();
            }}
            onSpecChange={(value) => {
              setSpec(value);
              resetOutput();
            }}
          />
          <Field label={t("toolOcr.dpi")} hint={t("toolOcr.dpiHint")}>
            <select
              value={dpi}
              onChange={(event) => {
                setDpi(event.target.value === "200" ? 200 : 300);
                resetOutput();
              }}
              className={inputClass}
            >
              <option value="200">{t("toolOcr.dpi200")}</option>
              <option value="300">{t("toolOcr.dpi300")}</option>
            </select>
          </Field>
          {status === "loading" && progress !== null && (
            <p className="text-xs text-muted">
              {t("toolOcr.progress")}: {Math.round(progress * 100)}%
            </p>
          )}
          <p className="text-xs text-muted">{t("toolOcr.limit")}</p>
          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolOcr.action")}
          </Button>
        </div>
      }
      result={result ? <ResultSummary name={result.name} bytes={result.bytes.byteLength} /> : undefined}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
