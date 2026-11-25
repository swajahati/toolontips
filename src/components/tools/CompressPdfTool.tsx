"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { getPdfPageCount, renderPdfPage } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function CompressPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"standard" | "strong">("standard");
  const [quality, setQuality] = useState(0.65);
  const [scale, setScale] = useState(1.5);
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

  async function handleCompress() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const bytes = await file.arrayBuffer();
      let output: Uint8Array;

      if (mode === "standard") {
        output = await runPdfJob({ type: "compress", file: bytes });
      } else {
        const total = pageCount ?? (await getPdfPageCount(bytes));
        const images = [];
        for (let page = 1; page <= total; page += 1) {
          const rendered = await renderPdfPage(bytes, page, "jpeg", scale, quality);
          images.push({ bytes: rendered.bytes.buffer as ArrayBuffer, type: "image/jpeg" });
        }
        output = await runPdfJob({ type: "images", images, pageSize: "fit", fit: "contain" });
      }

      setResult({ bytes: output, name: "compressed.pdf" });
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
          <Field label={t("toolPdf.mode")}>
            <select
              value={mode}
              onChange={(event) => {
                setMode(event.target.value as "standard" | "strong");
                reset();
              }}
              className={inputClass}
            >
              <option value="standard">{t("toolPdf.modeStandard")}</option>
              <option value="strong">{t("toolPdf.modeStrong")}</option>
            </select>
          </Field>
          {mode === "strong" && (
            <>
              <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                {t("toolPdf.strongWarning")}
              </p>
              <Field label={t("toolPdf.scale")}>
                <select
                  value={scale}
                  onChange={(event) => {
                    setScale(Number(event.target.value));
                    reset();
                  }}
                  className={inputClass}
                >
                  <option value={1}>{t("toolPdf.scaleNormal")}</option>
                  <option value={1.5}>{t("toolPdf.scaleHigh")}</option>
                  <option value={2}>{t("toolPdf.scalePrint")}</option>
                </select>
              </Field>
              <Field label={t("toolPdf.quality")}>
                <input
                  type="range"
                  min={0.35}
                  max={0.9}
                  step={0.05}
                  value={quality}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    reset();
                  }}
                  className="mt-2 w-full accent-[var(--color-primary)]"
                />
              </Field>
            </>
          )}
          <Button type="button" onClick={handleCompress} disabled={!file || status === "loading"}>
            {t("toolPdf.compressAction")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
