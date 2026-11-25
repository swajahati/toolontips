"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { getPdfPageCount, renderPdfPage } from "@/lib/pdfRender";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
  mime: "image/jpeg" | "image/png";
  width: number;
  height: number;
}

export function PdfToJpgTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
    setPreviewUrl(null);
  }

  async function handleRender() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const bytes = await file.arrayBuffer();
      const rendered = await renderPdfPage(bytes, pageNumber, format, scale, 0.92);
      const extension = format === "png" ? "png" : "jpg";
      const next = {
        bytes: rendered.bytes,
        name: `page-${pageNumber}.${extension}`,
        mime: rendered.mime,
        width: rendered.width,
        height: rendered.height,
      };

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const previewCopy = rendered.bytes.buffer.slice(
        rendered.bytes.byteOffset,
        rendered.bytes.byteOffset + rendered.bytes.byteLength,
      ) as ArrayBuffer;
      setPreviewUrl(URL.createObjectURL(new Blob([previewCopy], { type: rendered.mime })));
      setResult(next);
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
              setPageNumber(1);
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-4">
          <Field
            label={t("toolPdf.page")}
            hint={pageCount ? `${t("toolPdf.resultPages")}: ${pageCount}` : undefined}
          >
            <input
              type="number"
              min={1}
              max={pageCount ?? undefined}
              value={pageNumber}
              onChange={(event) => {
                setPageNumber(Number(event.target.value) || 1);
                reset();
              }}
              className={inputClass}
            />
          </Field>
          <Field label={t("toolPdf.format")}>
            <select
              value={format}
              onChange={(event) => {
                setFormat(event.target.value as "jpeg" | "png");
                reset();
              }}
              className={inputClass}
            >
              <option value="jpeg">{t("toolPdf.formatJpeg")}</option>
              <option value="png">{t("toolPdf.formatPng")}</option>
            </select>
          </Field>
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
              <option value={2}>{t("toolPdf.scaleHigh")}</option>
              <option value={2.8}>{t("toolPdf.scalePrint")}</option>
            </select>
          </Field>
          <Button type="button" onClick={handleRender} disabled={!file || status === "loading"}>
            {t("toolPdf.renderAction")}
          </Button>
        </div>
      }
      result={
        result ? (
          <div className="w-full space-y-3">
            {previewUrl && (
              <Image
                unoptimized
                src={previewUrl}
                alt={t("toolPdf.previewAlt")}
                width={result.width}
                height={result.height}
                className="h-auto max-h-64 w-auto rounded-lg border border-border object-contain"
              />
            )}
            <ResultSummary name={result.name} bytes={result.bytes.byteLength} />
          </div>
        ) : undefined
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name, result.mime)}
    />
  );
}
