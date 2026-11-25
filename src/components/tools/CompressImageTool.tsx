"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  compressImageFile,
  isRasterImage,
  savingsPercent,
  type ImageResult,
} from "@/lib/imageTools";
import type { Tool, ToolStatus } from "@/types";

export function CompressImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState("");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<ImageResult | null>(null);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleProcess() {
    if (!file || !isRasterImage(file)) {
      setStatus("error");
      setStatusMessage(t("toolUi.compressImage.unsupported"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const parsedWidth = Number(maxWidth);
      const next = await compressImageFile(
        file,
        quality,
        Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : undefined,
      );
      setResult(next);
      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(t("tool.error"));
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
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-4">
          <Field label={t("toolUi.compressImage.quality")}>
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
              className="w-full accent-[var(--color-primary)]"
            />
          </Field>
          <Field label={t("toolUi.compressImage.maxWidth")}>
            <input
              type="number"
              min={1}
              max={12000}
              value={maxWidth}
              onChange={(event) => {
                setMaxWidth(event.target.value);
                reset();
              }}
              className={inputClass}
            />
          </Field>
          <Button type="button" onClick={handleProcess} disabled={!file || status === "loading"}>
            {t("toolUi.compressImage.process")}
          </Button>
        </div>
      }
      result={
        result && (
          <div className="w-full space-y-1 text-left text-sm">
            <ResultSummary name={result.name} bytes={result.bytes.byteLength} />
            <p className="text-xs text-muted">
              {t("toolUi.compressImage.saved")}: {savingsPercent(file?.size ?? 0, result.bytes.byteLength)}%
            </p>
          </div>
        )
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name, result.mime)}
    />
  );
}
