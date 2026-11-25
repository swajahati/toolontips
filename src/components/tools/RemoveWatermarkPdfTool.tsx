"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PageScopeControl } from "@/components/tools/PageScopeControl";
import { PreviewImage } from "@/components/tools/PreviewImage";
import { t } from "@/i18n/translations";
import { toArrayBuffer } from "@/lib/buffer";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { getWatermarkTexts, parsePageSpec, type PageScope } from "@/lib/pdfProcessor";
import { getPdfPageCount, renderPdfPage, type RenderedPage } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

function parseTexts(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/\r?\n/)
        .map((text) => text.trim())
        .filter((text) => text.length > 0),
    ),
  );
}

export function RemoveWatermarkPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [detectedTexts, setDetectedTexts] = useState<string[]>([]);
  const [scope, setScope] = useState<PageScope>("all");
  const [spec, setSpec] = useState("");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [beforePreview, setBeforePreview] = useState<RenderedPage | null>(null);
  const [afterPreview, setAfterPreview] = useState<RenderedPage | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    void (async () => {
      try {
        const source = await file.arrayBuffer();
        const [count, foundTexts, preview] = await Promise.all([
          getPdfPageCount(source.slice(0)),
          getWatermarkTexts(source.slice(0)),
          renderPdfPage(source.slice(0), 1, "png", 1, 0.9),
        ]);
        if (!active) return;
        setPageCount(count);
        setDetectedTexts(foundTexts);
        if (foundTexts.length > 0) setTextInput(foundTexts.join("\n"));
        setBeforePreview(preview);
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

  const buildOptions = useCallback(() => {
    if (scope === "custom" && pageCount !== null) parsePageSpec(spec, pageCount);

    const texts = parseTexts(textInput);
    if (texts.length === 0) throw new Error("NO_WATERMARK_TEXT");

    return { texts, scope, spec };
  }, [scope, pageCount, spec, textInput]);

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
    setAfterPreview(null);
  }

  async function handleApply() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);
    setResult(null);
    setAfterPreview(null);

    try {
      const source = await file.arrayBuffer();
      const options = buildOptions();
      const bytes = await runPdfJob(
        { type: "remove-watermark", file: source, options },
        240_000,
      );

      setResult({ bytes, name: "watermark-removed.pdf" });

      try {
        const rendered = await renderPdfPage(toArrayBuffer(bytes), 1, "png", 1, 0.9);
        setAfterPreview(rendered);
      } catch {
        setAfterPreview(null);
      }

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
            maxSizeMb={100}
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              setPageCount(null);
              setDetectedTexts([]);
              setTextInput("");
              setBeforePreview(null);
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          {detectedTexts.length > 0 && (
            <p className="rounded-lg bg-surface-muted px-3 py-2 text-xs text-muted">
              {t("toolExtra.detectedWatermark", { text: detectedTexts.join(", ") })}
            </p>
          )}

          <Field label={t("toolExtra.removeWatermarkLabel")} hint={t("toolExtra.removeWatermarkHint")}>
            <textarea
              value={textInput}
              onChange={(event) => {
                setTextInput(event.target.value);
                resetOutput();
              }}
              rows={3}
              className={inputClass}
              placeholder="CONFIDENTIAL"
            />
          </Field>

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

          {beforePreview && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted">{t("toolExtra.beforePreview")}</p>
              <PreviewImage
                bytes={beforePreview.bytes}
                mime={beforePreview.mime}
                alt={t("toolExtra.previewAlt")}
                width={beforePreview.width}
                height={beforePreview.height}
              />
            </div>
          )}

          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolExtra.removeWatermarkAction")}
          </Button>
        </div>
      }
      result={
        afterPreview || result ? (
          <div className="w-full space-y-3">
            <p className="text-xs font-semibold text-muted">{t("toolExtra.afterPreview")}</p>
            {afterPreview && (
              <PreviewImage
                bytes={afterPreview.bytes}
                mime={afterPreview.mime}
                alt={t("toolExtra.previewAlt")}
                width={afterPreview.width}
                height={afterPreview.height}
              />
            )}
            {result && (
              <ResultSummary name={result.name} bytes={result.bytes.byteLength} pages={pageCount ?? undefined} />
            )}
          </div>
        ) : undefined
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
