"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  clampCrop,
  cropImageFile,
  fullCrop,
  getImageDimensions,
  isRasterImage,
  type CropRect,
  type Dimensions,
  type ImageResult,
} from "@/lib/imageTools";
import type { Tool, ToolStatus } from "@/types";

type Handle = "move" | "nw" | "ne" | "sw" | "se" | "n" | "e" | "s" | "w";

const handles: Array<{ name: Handle; className: string }> = [
  { name: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize" },
  { name: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize" },
  { name: "sw", className: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize" },
  { name: "se", className: "bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize" },
  { name: "n", className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize" },
  { name: "e", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize" },
  { name: "s", className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize" },
  { name: "w", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize" },
];

function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function resizeFromDrag(
  handle: Handle,
  start: CropRect,
  dx: number,
  dy: number,
  dimensions: Dimensions,
): CropRect {
  if (handle === "move") {
    return clampCrop(
      { ...start, left: start.left + dx, top: start.top + dy },
      dimensions.width,
      dimensions.height,
    );
  }

  const minSize = 10;
  let left = start.left;
  let top = start.top;
  let right = start.left + start.width;
  let bottom = start.top + start.height;

  if (handle.includes("w")) left = clampValue(start.left + dx, 0, right - minSize);
  if (handle.includes("e")) right = clampValue(right + dx, left + minSize, dimensions.width);
  if (handle.includes("n")) top = clampValue(start.top + dy, 0, bottom - minSize);
  if (handle.includes("s")) bottom = clampValue(bottom + dy, top + minSize, dimensions.height);

  return clampCrop(
    { left, top, width: right - left, height: bottom - top },
    dimensions.width,
    dimensions.height,
  );
}

export function CropImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [crop, setCrop] = useState<CropRect>({ left: 0, top: 0, width: 1, height: 1 });
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<ImageResult | null>(null);
  const [activeHandle, setActiveHandle] = useState<Handle | null>(null);
  const dragRef = useRef<{ handle: Handle; startX: number; startY: number; crop: CropRect } | null>(
    null,
  );

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    let active = true;
    if (!file) return;

    getImageDimensions(file)
      .then((size) => {
        if (!active) return;
        setDimensions(size);
        setCrop(fullCrop(size));
        setStatus("empty");
        setStatusMessage(undefined);
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

  const previewScale = dimensions
    ? Math.min(1, 480 / dimensions.width, 288 / dimensions.height)
    : 1;
  const previewWidth = dimensions ? Math.max(1, Math.round(dimensions.width * previewScale)) : 0;
  const previewHeight = dimensions ? Math.max(1, Math.round(dimensions.height * previewScale)) : 0;

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  function resetCrop() {
    setCrop(dimensions ? fullCrop(dimensions) : { left: 0, top: 0, width: 1, height: 1 });
    reset();
  }

  function setCropValue(key: keyof CropRect, value: number) {
    if (!dimensions) return;
    const fallback = key === "width" || key === "height" ? 1 : 0;
    const safeValue = Number.isFinite(value) ? value : fallback;
    setCrop((current) => clampCrop({ ...current, [key]: safeValue }, dimensions.width, dimensions.height));
    reset();
  }

  function startDrag(handle: Handle, event: ReactPointerEvent<HTMLElement>) {
    if (!dimensions) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      handle,
      startX: event.clientX,
      startY: event.clientY,
      crop,
    };
    setActiveHandle(handle);
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || !dimensions || previewWidth === 0 || previewHeight === 0) return;

    const dx = ((event.clientX - drag.startX) / previewWidth) * dimensions.width;
    const dy = ((event.clientY - drag.startY) / previewHeight) * dimensions.height;
    setCrop(resizeFromDrag(drag.handle, drag.crop, dx, dy, dimensions));
  }

  function endDrag() {
    dragRef.current = null;
    setActiveHandle(null);
  }

  async function handleApply() {
    if (!file || !dimensions || !isRasterImage(file)) {
      setStatus("error");
      setStatusMessage(t("tool.error"));
      return;
    }

    const validCrop = clampCrop(crop, dimensions.width, dimensions.height);
    setCrop(validCrop);
    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const next = await cropImageFile(file, validCrop);
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
              const next = selected[0] ?? null;
              if (next && !isRasterImage(next)) {
                setFile(null);
                setDimensions(null);
                setCrop({ left: 0, top: 0, width: 1, height: 1 });
                reset();
                setStatus("error");
                setStatusMessage(t("toolUi.compressImage.unsupported"));
                return;
              }
              setFile(next);
              setDimensions(null);
              setCrop({ left: 0, top: 0, width: 1, height: 1 });
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={t("toolUi.cropImage.left")}>
              <input
                type="number"
                min={0}
                max={dimensions?.width}
                value={Math.round(crop.left)}
                disabled={!dimensions}
                onChange={(event) => setCropValue("left", Number(event.target.value))}
                className={inputClass}
              />
            </Field>
            <Field label={t("toolUi.cropImage.top")}>
              <input
                type="number"
                min={0}
                max={dimensions?.height}
                value={Math.round(crop.top)}
                disabled={!dimensions}
                onChange={(event) => setCropValue("top", Number(event.target.value))}
                className={inputClass}
              />
            </Field>
            <Field label={t("toolUi.cropImage.width")}>
              <input
                type="number"
                min={1}
                max={dimensions?.width}
                value={Math.round(crop.width)}
                disabled={!dimensions}
                onChange={(event) => setCropValue("width", Number(event.target.value))}
                className={inputClass}
              />
            </Field>
            <Field label={t("toolUi.cropImage.height")}>
              <input
                type="number"
                min={1}
                max={dimensions?.height}
                value={Math.round(crop.height)}
                disabled={!dimensions}
                onChange={(event) => setCropValue("height", Number(event.target.value))}
                className={inputClass}
              />
            </Field>
          </div>
          {dimensions && previewUrl && previewWidth > 0 && previewHeight > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted">{t("toolUi.cropImage.preview")}</p>
              <div
                className="relative mt-2 touch-none select-none"
                style={{ width: previewWidth, height: previewHeight }}
                onPointerDown={(event) => startDrag("move", event)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <Image
                  unoptimized
                  src={previewUrl}
                  alt={t("toolUi.cropImage.preview")}
                  width={previewWidth}
                  height={previewHeight}
                  draggable={false}
                  className="rounded-lg border border-border object-contain"
                />
                <div
                  className="absolute border-2 border-primary bg-primary/10"
                  style={{
                    left: `${(crop.left / dimensions.width) * 100}%`,
                    top: `${(crop.top / dimensions.height) * 100}%`,
                    width: `${(crop.width / dimensions.width) * 100}%`,
                    height: `${(crop.height / dimensions.height) * 100}%`,
                  }}
                  onPointerDown={(event) => startDrag("move", event)}
                >
                  {handles.map((handle) => (
                    <span
                      key={handle.name}
                      className={`absolute size-3 rounded-full border border-primary ${handle.className} ${
                        activeHandle === handle.name ? "bg-primary" : "bg-surface"
                      }`}
                      onPointerDown={(event) => startDrag(handle.name, event)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
              {t("toolUi.cropImage.apply")}
            </Button>
            <Button type="button" variant="secondary" onClick={resetCrop}>
              {t("toolUi.cropImage.reset")}
            </Button>
          </div>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name, result.mime)}
    />
  );
}
