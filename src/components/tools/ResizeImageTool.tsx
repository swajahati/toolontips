"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  getImageDimensions,
  isRasterImage,
  resizeImageFile,
  type Dimensions,
  type ImageResult,
} from "@/lib/imageTools";
import type { Tool, ToolStatus } from "@/types";

export function ResizeImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [mode, setMode] = useState<"pixels" | "percent">("pixels");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [scale, setScale] = useState(50);
  const [keepAspect, setKeepAspect] = useState(true);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<ImageResult | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    getImageDimensions(file)
      .then((size) => {
        if (!active) return;
        setDimensions(size);
        setWidth(size.width);
        setHeight(size.height);
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
        setStatusMessage(t("tool.error"));
      });

    return () => {
      active = false;
    };
  }, [file]);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleProcess() {
    if (!file || !isRasterImage(file)) {
      setStatus("error");
      setStatusMessage(t("tool.error"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const next = await resizeImageFile(file, {
        mode,
        width,
        height,
        scale,
        keepAspect,
      });
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
              setDimensions(null);
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
          {dimensions && (
            <p className="mt-2 text-xs text-muted">
              {t("toolPdf.resultSize")}: {dimensions.width} × {dimensions.height}
            </p>
          )}
        </>
      }
      options={
        <div className="space-y-4">
          <Field label={t("toolUi.resizeImage.mode")}>
            <select
              value={mode}
              onChange={(event) => {
                setMode(event.target.value as "pixels" | "percent");
                reset();
              }}
              className={inputClass}
            >
              <option value="pixels">{t("toolUi.resizeImage.pixels")}</option>
              <option value="percent">{t("toolUi.resizeImage.percentage")}</option>
            </select>
          </Field>
          {mode === "pixels" ? (
            <>
              <Field label={t("toolUi.resizeImage.width")}>
                <input
                  type="number"
                  min={1}
                  max={12000}
                  value={width}
                  onChange={(event) => {
                    setWidth(Number(event.target.value));
                    reset();
                  }}
                  className={inputClass}
                />
              </Field>
              <Field label={t("toolUi.resizeImage.height")}>
                <input
                  type="number"
                  min={1}
                  max={12000}
                  value={height}
                  onChange={(event) => {
                    setHeight(Number(event.target.value));
                    reset();
                  }}
                  className={inputClass}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={keepAspect}
                  onChange={(event) => {
                    setKeepAspect(event.target.checked);
                    reset();
                  }}
                  className="size-4 accent-[var(--color-primary)]"
                />
                <span>{t("toolUi.resizeImage.keepAspect")}</span>
              </label>
            </>
          ) : (
            <Field label={t("toolUi.resizeImage.scale")}>
              <input
                type="number"
                min={1}
                max={500}
                value={scale}
                onChange={(event) => {
                  setScale(Number(event.target.value));
                  reset();
                }}
                className={inputClass}
              />
            </Field>
          )}
          <Button type="button" onClick={handleProcess} disabled={!file || status === "loading"}>
            {t("toolUi.resizeImage.process")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name, result.mime)}
    />
  );
}
