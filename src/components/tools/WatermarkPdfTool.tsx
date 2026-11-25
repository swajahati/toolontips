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
import {
  parsePageSpec,
  type PageScope,
  type WatermarkOptions,
  type WatermarkPosition,
} from "@/lib/pdfProcessor";
import { getPdfPageCount, renderPdfPage, type RenderedPage } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function WatermarkPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"text" | "image">("text");
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#cc0000");
  const [opacity, setOpacity] = useState(0.25);
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState<WatermarkPosition>("center");
  const [scope, setScope] = useState<PageScope>("all");
  const [spec, setSpec] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoWidth, setLogoWidth] = useState(35);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [preview, setPreview] = useState<RenderedPage | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    file
      .arrayBuffer()
      .then(getPdfPageCount)
      .then((count) => {
        if (active) setPageCount(count);
      })
      .catch((error) => {
        if (!active) return;
        setStatus("error");
        setStatusMessage(describePdfError(error));
      });

    return () => {
      active = false;
    };
  }, [file]);

  const buildOptions = useCallback(async (): Promise<WatermarkOptions> => {
    if (scope === "custom" && pageCount !== null) parsePageSpec(spec, pageCount);

    if (mode === "text") {
      if (!text.trim()) throw new Error("NO_WATERMARK_TEXT");
      return {
        mode: "text",
        text: text.trim(),
        fontSize,
        color,
        opacity,
        rotation,
        position,
        scope,
        spec,
      };
    }

    if (!logo) throw new Error("NO_LOGO");
    if (!["image/jpeg", "image/png"].includes(logo.type)) throw new Error("UNSUPPORTED_IMAGE");
    return {
      mode: "image",
      image: { bytes: await logo.arrayBuffer(), type: logo.type },
      widthPercent: logoWidth,
      opacity,
      rotation,
      position,
      scope,
      spec,
    };
  }, [scope, pageCount, spec, mode, text, fontSize, color, opacity, rotation, position, logo, logoWidth]);

  useEffect(() => {
    if (!file) return;
    let active = true;

    const timer = setTimeout(async () => {
      try {
        const source = await file.arrayBuffer();
        const options = await buildOptions();
        const output = await runPdfJob({ type: "watermark", file: source, options }, 240_000);
        if (!active) return;
        const rendered = await renderPdfPage(toArrayBuffer(output), 1, "png", 1, 0.9);
        if (active) setPreview(rendered);
      } catch {
        if (active) setPreview(null);
      }
    }, 900);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [file, buildOptions]);

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
    setPreview(null);
  }

  async function handleApply() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const source = await file.arrayBuffer();
      const options = await buildOptions();
      const bytes = await runPdfJob({ type: "watermark", file: source, options }, 240_000);
      setResult({ bytes, name: "watermarked.pdf" });

      try {
        const rendered = await renderPdfPage(toArrayBuffer(bytes), 1, "png", 1, 0.9);
        setPreview(rendered);
      } catch {
        setPreview(null);
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
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          <Field label={t("toolExtra.watermarkType")}>
            <select
              value={mode}
              onChange={(event) => {
                setMode(event.target.value as "text" | "image");
                resetOutput();
              }}
              className={inputClass}
            >
              <option value="text">{t("toolExtra.watermarkText")}</option>
              <option value="image">{t("toolExtra.watermarkImage")}</option>
            </select>
          </Field>

          {mode === "text" ? (
            <>
              <Field label={t("toolExtra.watermarkTextLabel")}>
                <input
                  type="text"
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                    resetOutput();
                  }}
                  className={inputClass}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t("toolExtra.fontSize")}>
                  <input
                    type="number"
                    min={8}
                    max={200}
                    value={fontSize}
                    onChange={(event) => {
                      setFontSize(Number(event.target.value) || 8);
                      resetOutput();
                    }}
                    className={inputClass}
                  />
                </Field>
                <Field label={t("toolExtra.color")}>
                  <input
                    type="color"
                    value={color}
                    onChange={(event) => {
                      setColor(event.target.value);
                      resetOutput();
                    }}
                    className="mt-1 h-10 w-full cursor-pointer rounded-lg border border-border bg-surface"
                  />
                </Field>
              </div>
            </>
          ) : (
            <>
              <DropZone
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                maxSizeMb={20}
                onFiles={(selected) => {
                  setLogo(selected[0] ?? null);
                  resetOutput();
                }}
              />
              {logo && <FileList files={[logo]} onRemove={() => setLogo(null)} />}
              <Field label={t("toolExtra.logoWidth")}>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={logoWidth}
                  onChange={(event) => {
                    setLogoWidth(Number(event.target.value) || 5);
                    resetOutput();
                  }}
                  className={inputClass}
                />
              </Field>
            </>
          )}

          <Field label={t("toolExtra.position")}>
            <select
              value={position}
              onChange={(event) => {
                setPosition(event.target.value as WatermarkPosition);
                resetOutput();
              }}
              className={inputClass}
            >
              <option value="center">{t("toolExtra.positionCenter")}</option>
              <option value="top-left">{t("toolExtra.positionTopLeft")}</option>
              <option value="top-right">{t("toolExtra.positionTopRight")}</option>
              <option value="bottom-left">{t("toolExtra.positionBottomLeft")}</option>
              <option value="bottom-right">{t("toolExtra.positionBottomRight")}</option>
              <option value="tiled">{t("toolExtra.positionTiled")}</option>
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label={t("toolExtra.rotation")}>
              <select
                value={rotation}
                onChange={(event) => {
                  setRotation(Number(event.target.value));
                  resetOutput();
                }}
                className={inputClass}
              >
                <option value={0}>{t("toolExtra.rotationNone")}</option>
                <option value={45}>{t("toolExtra.rotationDiagonal")}</option>
                <option value={90}>{t("toolExtra.rotationQuarter")}</option>
                <option value={180}>{t("toolExtra.rotationHalf")}</option>
                <option value={270}>{t("toolExtra.rotationThreeQuarters")}</option>
              </select>
            </Field>
            <Field label={`${t("toolExtra.opacity")} ${Math.round(opacity * 100)}%`}>
              <input
                type="range"
                min={0.05}
                max={1}
                step={0.05}
                value={opacity}
                onChange={(event) => {
                  setOpacity(Number(event.target.value));
                  resetOutput();
                }}
                className="mt-3 w-full accent-[var(--color-primary)]"
              />
            </Field>
          </div>

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

          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolExtra.applyWatermark")}
          </Button>
        </div>
      }
      result={
        preview || result ? (
          <div className="w-full space-y-3">
            <p className="text-xs font-semibold text-muted">{t("toolExtra.previewTitle")}</p>
            {preview && (
              <PreviewImage
                bytes={preview.bytes}
                mime={preview.mime}
                alt={t("toolExtra.previewAlt")}
                width={preview.width}
                height={preview.height}
              />
            )}
            <p className="text-xs text-muted">{t("toolExtra.previewHint")}</p>
            {result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
          </div>
        ) : undefined
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
