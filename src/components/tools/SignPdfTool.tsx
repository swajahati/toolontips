"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PageScopeControl } from "@/components/tools/PageScopeControl";
import { PreviewImage } from "@/components/tools/PreviewImage";
import { SignaturePad } from "@/components/tools/SignaturePad";
import { t } from "@/i18n/translations";
import { toArrayBuffer } from "@/lib/buffer";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { parsePageSpec, type PageScope } from "@/lib/pdfProcessor";
import { getPdfPageCount, renderPdfPage, type RenderedPage } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

function typedSignatureDataUrl(text: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 240;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_ERROR");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#111827";
  context.font = "italic 86px cursive";
  context.textBaseline = "middle";
  context.fillText(text.trim(), 20, canvas.height / 2);
  return canvas.toDataURL("image/png");
}

async function dataUrlToBytes(dataUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(dataUrl);
  return response.arrayBuffer();
}

export function SignPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"type" | "draw" | "upload">("type");
  const [typed, setTyped] = useState("");
  const [drawn, setDrawn] = useState("");
  const [upload, setUpload] = useState<File | null>(null);
  const [scope, setScope] = useState<PageScope>("all");
  const [spec, setSpec] = useState("");
  const [xPercent, setXPercent] = useState(10);
  const [yPercent, setYPercent] = useState(75);
  const [widthPercent, setWidthPercent] = useState(35);
  const [opacity, setOpacity] = useState(1);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [preview, setPreview] = useState<RenderedPage | null>(null);

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
    setResult(null);
    setPreview(null);
  }

  async function signatureBytes(): Promise<ArrayBuffer> {
    if (mode === "type") {
      if (!typed.trim()) throw new Error("NO_SIGNATURE");
      return dataUrlToBytes(typedSignatureDataUrl(typed));
    }
    if (mode === "draw") {
      if (!drawn) throw new Error("NO_SIGNATURE");
      return dataUrlToBytes(drawn);
    }
    if (!upload) throw new Error("NO_SIGNATURE");
    if (!["image/png", "image/jpeg"].includes(upload.type)) throw new Error("UNSUPPORTED_IMAGE");
    return upload.arrayBuffer();
  }

  async function handleApply() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);
    setResult(null);
    setPreview(null);

    try {
      if (scope === "custom" && pageCount !== null) parsePageSpec(spec, pageCount);
      const source = await file.arrayBuffer();
      const bytes = await runPdfJob(
        {
          type: "sign",
          file: source,
          options: {
            signature: { bytes: await signatureBytes(), type: mode === "upload" && upload?.type === "image/jpeg" ? "image/jpeg" : "image/png" },
            scope,
            spec,
            xPercent,
            yPercent,
            widthPercent,
            opacity,
          },
        },
        240_000,
      );
      setResult({ bytes, name: "signed.pdf" });

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
          <Field label={t("toolExtra.signatureType")}>
            <select
              value={mode}
              onChange={(event) => {
                setMode(event.target.value as "type" | "draw" | "upload");
                resetOutput();
              }}
              className={inputClass}
            >
              <option value="type">{t("toolExtra.signatureTypeText")}</option>
              <option value="draw">{t("toolExtra.signatureTypeDraw")}</option>
              <option value="upload">{t("toolExtra.signatureTypeUpload")}</option>
            </select>
          </Field>

          {mode === "type" && (
            <Field label={t("toolExtra.typeSignatureLabel")}>
              <input
                type="text"
                value={typed}
                onChange={(event) => {
                  setTyped(event.target.value);
                  resetOutput();
                }}
                placeholder="Your name"
                className={inputClass}
              />
              {typed.trim() && (
                <p
                  className="mt-3 text-4xl text-foreground"
                  style={{ fontFamily: "cursive" }}
                >
                  {typed}
                </p>
              )}
            </Field>
          )}

          {mode === "draw" && <SignaturePad onChange={setDrawn} />}

          {mode === "upload" && (
            <>
              <DropZone
                accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                maxSizeMb={20}
                onFiles={(selected) => {
                  setUpload(selected[0] ?? null);
                  resetOutput();
                }}
              />
              {upload && <FileList files={[upload]} />}
            </>
          )}

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

          <div className="grid grid-cols-2 gap-3">
            <Field label={t("toolExtra.signatureX")}>
              <input
                type="number"
                min={0}
                max={100}
                value={xPercent}
                onChange={(event) => {
                  setXPercent(Number(event.target.value) || 0);
                  resetOutput();
                }}
                className={inputClass}
              />
            </Field>
            <Field label={t("toolExtra.signatureY")}>
              <input
                type="number"
                min={0}
                max={100}
                value={yPercent}
                onChange={(event) => {
                  setYPercent(Number(event.target.value) || 0);
                  resetOutput();
                }}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label={`${t("toolExtra.signatureWidth")} ${widthPercent}%`}>
            <input
              type="range"
              min={5}
              max={80}
              value={widthPercent}
              onChange={(event) => {
                setWidthPercent(Number(event.target.value));
                resetOutput();
              }}
              className="mt-3 w-full accent-[var(--color-primary)]"
            />
          </Field>

          <Field label={`${t("toolExtra.opacity")} ${Math.round(opacity * 100)}%`}>
            <input
              type="range"
              min={0.3}
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

          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolExtra.signAction")}
          </Button>
        </div>
      }
      result={
        preview || result ? (
          <div className="w-full space-y-3">
            {preview && (
              <PreviewImage
                bytes={preview.bytes}
                mime={preview.mime}
                alt={t("toolExtra.previewAlt")}
                width={preview.width}
                height={preview.height}
              />
            )}
            {result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
          </div>
        ) : undefined
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
