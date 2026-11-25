"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PreviewImage } from "@/components/tools/PreviewImage";
import { t } from "@/i18n/translations";
import { toArrayBuffer } from "@/lib/buffer";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { parsePageSpec } from "@/lib/pdfProcessor";
import { getPdfPageCount, renderPdfPage, renderPdfThumbnails, type RenderedPage } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function OrganizePdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [thumbnails, setThumbnails] = useState<{ pageNumber: number; page: RenderedPage }[]>([]);
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [insertCount, setInsertCount] = useState(0);
  const [insertSpec, setInsertSpec] = useState("");
  const [insertWhere, setInsertWhere] = useState<"start" | "end" | "after">("end");
  const [afterPage, setAfterPage] = useState(1);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [preview, setPreview] = useState<RenderedPage | null>(null);

  useEffect(() => {
    let active = true;
    if (!file) return;

    (async () => {
      try {
        const source = await file.arrayBuffer();
        const [count, pages] = await Promise.all([getPdfPageCount(source), renderPdfThumbnails(source, 60)]);
        if (!active) return;
        setOrder(Array.from({ length: count }, (_, index) => index + 1));
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

  useEffect(() => {
    let active = true;
    if (!insertFile) return;

    (async () => {
      try {
        const count = await getPdfPageCount(await insertFile.arrayBuffer());
        if (active) setInsertCount(count);
      } catch (error) {
        if (!active) return;
        setStatus("error");
        setStatusMessage(describePdfError(error));
      }
    })();

    return () => {
      active = false;
    };
  }, [insertFile]);

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
    setPreview(null);
  }

  function movePage(position: number, direction: -1 | 1) {
    setOrder((current) => {
      const target = position + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[position], next[target]] = [next[target], next[position]];
      return next;
    });
    resetOutput();
  }

  function deletePage(position: number) {
    setOrder((current) => current.filter((_, index) => index !== position));
    resetOutput();
  }

  function insertPages(strict = false): number[] {
    if (!insertFile || insertCount === 0) return [];
    const trimmed = insertSpec.trim();
    try {
      return trimmed
        ? parsePageSpec(trimmed, insertCount)
        : Array.from({ length: insertCount }, (_, index) => index);
    } catch (error) {
      if (strict) throw error;
      return [];
    }
  }

  function insertionPosition(): number {
    if (insertWhere === "start") return 0;
    if (insertWhere === "end") return order.length;
    return Math.max(0, Math.min(afterPage - 1, order.length));
  }

  async function handleApply() {
    if (!file || order.length === 0) {
      setStatus("error");
      setStatusMessage(t("toolExtra.noPages"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);
    setResult(null);
    setPreview(null);

    try {
      const source = await file.arrayBuffer();
      const pages = insertPages(true);
      const options = {
        order: order.map((pageNumber) => pageNumber - 1),
        ...(insertFile && pages.length > 0
          ? {
              insert: {
                file: await insertFile.arrayBuffer(),
                pages,
                position: insertionPosition(),
              },
            }
          : {}),
      };
      const bytes = await runPdfJob({ type: "organize", file: source, options }, 240_000);
      setResult({ bytes, name: "organized.pdf" });

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
              setOrder([]);
              setThumbnails([]);
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          {thumbnails.length > 0 && (
            <div>
              <h2 className="text-sm font-bold">{t("toolExtra.organizePagesTitle")}</h2>
              <p className="mt-1 text-xs text-muted">{t("toolExtra.organizeHint")}</p>
              <div className="mt-3 grid max-h-96 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
                {order.map((pageNumber, position) => {
                  const thumbnail = thumbnails.find((item) => item.pageNumber === pageNumber);
                  return (
                    <div
                      key={pageNumber}
                      className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface-muted p-2"
                    >
                      {thumbnail && (
                        <PreviewImage
                          bytes={thumbnail.page.bytes}
                          mime={thumbnail.page.mime}
                          alt={t("toolExtra.thumbnailAlt", { page: pageNumber })}
                          width={thumbnail.page.width}
                          height={thumbnail.page.height}
                        />
                      )}
                      <span className="text-xs font-semibold">
                        {t("toolExtra.organizedPage", { page: position + 1 })}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => movePage(position, -1)}
                          disabled={position === 0}
                          aria-label={t("toolExtra.moveEarlier")}
                          className="rounded-md border border-border p-1 disabled:opacity-40"
                        >
                          <ArrowLeft className="size-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => movePage(position, 1)}
                          disabled={position === order.length - 1}
                          aria-label={t("toolExtra.moveLater")}
                          className="rounded-md border border-border p-1 disabled:opacity-40"
                        >
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePage(position)}
                          aria-label={t("toolExtra.deletePage")}
                          className="rounded-md border border-border p-1 text-red-700 dark:text-red-300"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-3 rounded-xl border border-border p-4">
            <h2 className="text-sm font-bold">{t("toolExtra.addPagesTitle")}</h2>
            <DropZone
              accept="application/pdf,.pdf"
              maxSizeMb={100}
              onFiles={(selected) => {
                setInsertFile(selected[0] ?? null);
                setInsertCount(0);
                setInsertSpec("");
                resetOutput();
              }}
            />
            {insertFile && <FileList files={[insertFile]} />}
            {insertCount > 0 && (
              <>
                <Field
                  label={t("toolExtra.pagesToAdd")}
                  hint={insertSpec.trim() ? t("toolPdf.pagesHint") : t("toolExtra.addAllPages")}
                >
                  <input
                    type="text"
                    value={insertSpec}
                    onChange={(event) => {
                      setInsertSpec(event.target.value);
                      resetOutput();
                    }}
                    placeholder="1, 3-5"
                    className={inputClass}
                  />
                </Field>
                <Field label={t("toolExtra.insertWhere")}>
                  <select
                    value={insertWhere}
                    onChange={(event) => {
                      setInsertWhere(event.target.value as "start" | "end" | "after");
                      resetOutput();
                    }}
                    className={inputClass}
                  >
                    <option value="start">{t("toolExtra.insertStart")}</option>
                    <option value="end">{t("toolExtra.insertEnd")}</option>
                    <option value="after">{t("toolExtra.insertAfter")}</option>
                  </select>
                </Field>
                {insertWhere === "after" && (
                  <Field label={t("toolExtra.afterPageLabel")}>
                    <input
                      type="number"
                      min={1}
                      max={Math.max(1, order.length)}
                      value={afterPage}
                      onChange={(event) => {
                        setAfterPage(Number(event.target.value) || 1);
                        resetOutput();
                      }}
                      className={inputClass}
                    />
                  </Field>
                )}
              </>
            )}
          </div>

          <Button
            type="button"
            onClick={handleApply}
            disabled={!file || order.length === 0 || status === "loading"}
          >
            {t("toolExtra.organizeAction")}
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
            {result && (
              <ResultSummary
                name={result.name}
                bytes={result.bytes.byteLength}
                pages={order.length + insertPages().length}
              />
            )}
          </div>
        ) : undefined
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
