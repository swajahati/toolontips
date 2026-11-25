"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PreviewImage } from "@/components/tools/PreviewImage";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import type { RotationAngle } from "@/lib/pdfProcessor";
import {
  getPdfPageCount,
  renderPdfThumbnails,
  type RenderedPage,
} from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

const MAX_THUMBNAILS = 60;

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function RotatePdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"all" | "pages">("all");
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [thumbnails, setThumbnails] = useState<{ pageNumber: number; page: RenderedPage }[]>([]);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    (async () => {
      try {
        const source = await file.arrayBuffer();
        const [count, pages] = await Promise.all([
          getPdfPageCount(source),
          renderPdfThumbnails(source, MAX_THUMBNAILS),
        ]);
        if (!active) return;
        setPageCount(count);
        setThumbnails(pages);
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
  }

  function togglePage(pageNumber: number) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(pageNumber)) next.delete(pageNumber);
      else next.add(pageNumber);
      return next;
    });
    resetOutput();
  }

  async function handleRotate() {
    if (!file) return;
    if (mode === "pages" && selected.size === 0) {
      setStatus("error");
      setStatusMessage(t("toolExtra.noSelection"));
      return;
    }

    const perPage =
      mode === "pages"
        ? Object.fromEntries(Array.from(selected).map((page) => [page, angle])) as Record<
            number,
            RotationAngle
          >
        : {};

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const source = await file.arrayBuffer();
      const bytes = await runPdfJob(
        { type: "rotate", file: source, options: { mode, angle, perPage } },
        240_000,
      );
      setResult({ bytes, name: "rotated.pdf" });
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
            onFiles={(chosen) => {
              setFile(chosen[0] ?? null);
              setPageCount(null);
              setSelected(new Set());
              setThumbnails([]);
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("toolExtra.applyTo")}>
              <select
                value={mode}
                onChange={(event) => {
                  setMode(event.target.value as "all" | "pages");
                  resetOutput();
                }}
                className={inputClass}
              >
                <option value="all">{t("toolExtra.rotateAll")}</option>
                <option value="pages">{t("toolExtra.rotateSelected")}</option>
              </select>
            </Field>
            <Field label={t("toolExtra.rotation")}>
              <select
                value={angle}
                onChange={(event) => {
                  setAngle(Number(event.target.value) as RotationAngle);
                  resetOutput();
                }}
                className={inputClass}
              >
                <option value={90}>{t("toolExtra.rotationQuarter")}</option>
                <option value={180}>{t("toolExtra.rotationHalf")}</option>
                <option value={270}>{t("toolExtra.rotationThreeQuarters")}</option>
              </select>
            </Field>
          </div>

          {thumbnails.length > 0 && (
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold">{t("toolExtra.pagesTitle")}</h2>
                <div className="flex gap-3 text-xs font-semibold text-primary">
                  <button type="button" onClick={() => setSelected(new Set())}>
                    {t("toolExtra.clearSelection")}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelected(new Set(thumbnails.map((item) => item.pageNumber)))
                    }
                  >
                    {t("toolExtra.selectAll")}
                  </button>
                </div>
              </div>
              {mode === "pages" && (
                <p className="mt-1 text-xs text-muted">
                  {t("toolExtra.selectedCount", { count: selected.size })}
                </p>
              )}
              {pageCount !== null && pageCount > thumbnails.length && (
                <p className="mt-2 text-xs text-muted">
                  {t("toolExtra.tooManyThumbnails", { count: thumbnails.length })}
                </p>
              )}
              <div className="mt-3 grid max-h-80 grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
                {thumbnails.map(({ pageNumber, page }) => {
                  const isSelected = selected.has(pageNumber);
                  const shownAngle = mode === "all" || isSelected ? angle : 0;
                  return (
                    <label
                      key={pageNumber}
                      className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-border bg-surface-muted p-2 text-xs"
                    >
                      <span
                        style={{ transform: `rotate(${shownAngle}deg)` }}
                        className="flex h-24 w-full items-center justify-center transition-transform"
                      >
                        <PreviewImage
                          bytes={page.bytes}
                          mime={page.mime}
                          alt={t("toolExtra.thumbnailAlt", { page: pageNumber })}
                          width={page.width}
                          height={page.height}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => togglePage(pageNumber)}
                          className="size-3.5 accent-[var(--color-primary)]"
                        />
                        {pageNumber}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <Button type="button" onClick={handleRotate} disabled={!file || status === "loading"}>
            {mode === "all" ? t("toolExtra.rotateAll") : t("toolExtra.rotateSelected")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
