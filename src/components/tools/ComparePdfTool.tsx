"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { FileList } from "@/components/tools/Fields";
import { PreviewImage } from "@/components/tools/PreviewImage";
import { t } from "@/i18n/translations";
import { describePdfError } from "@/lib/pdfErrors";
import { getPdfPageCount, getPdfPageText, renderPdfPage, type RenderedPage } from "@/lib/pdfRender";
import type { Tool, ToolStatus } from "@/types";

export function ComparePdfTool({ tool }: { tool: Tool }) {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [page, setPage] = useState(1);
  const [renderedA, setRenderedA] = useState<RenderedPage | null>(null);
  const [renderedB, setRenderedB] = useState<RenderedPage | null>(null);
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();

  useEffect(() => {
    let active = true;
    if (!fileA) return;

    (async () => {
      try {
        const count = await getPdfPageCount(await fileA.arrayBuffer());
        if (!active) return;
        setCountA(count);
        setPage((current) => Math.min(current, Math.max(1, count)));
      } catch (error) {
        if (active) {
          setStatus("error");
          setStatusMessage(describePdfError(error));
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [fileA]);

  useEffect(() => {
    let active = true;
    if (!fileB) return;

    (async () => {
      try {
        const count = await getPdfPageCount(await fileB.arrayBuffer());
        if (!active) return;
        setCountB(count);
        setPage((current) => Math.min(current, Math.max(1, count)));
      } catch (error) {
        if (active) {
          setStatus("error");
          setStatusMessage(describePdfError(error));
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [fileB]);

  useEffect(() => {
    let active = true;
    if (!fileA || !fileB || countA === 0 || countB === 0) return;

    (async () => {
      try {
        const [sourceA, sourceB] = await Promise.all([fileA.arrayBuffer(), fileB.arrayBuffer()]);
        const [imageA, imageB, wordsA, wordsB] = await Promise.all([
          renderPdfPage(sourceA.slice(0), page, "png", 1, 0.9),
          renderPdfPage(sourceB.slice(0), page, "png", 1, 0.9),
          getPdfPageText(sourceA.slice(0), page),
          getPdfPageText(sourceB.slice(0), page),
        ]);
        if (!active) return;
        setRenderedA(imageA);
        setRenderedB(imageB);
        setTextA(wordsA);
        setTextB(wordsB);
        setStatus("success");
        setStatusMessage(undefined);
      } catch (error) {
        if (active) {
          setStatus("error");
          setStatusMessage(describePdfError(error));
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [fileA, fileB, countA, countB, page]);

  const maxPage = Math.max(1, Math.min(countA || 1, countB || 1));
  const ready = status === "success" && renderedA && renderedB;

  return (
    <ToolShell
      title={tool.name}
      description={tool.description}
      status={status}
      statusMessage={statusMessage}
      privacyNote={t("toolPdf.privacy")}
      showDownload={false}
      dropzone={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted">{t("toolCompare.documentA")}</p>
            <DropZone
              accept="application/pdf,.pdf"
              maxSizeMb={100}
              onFiles={(selected) => {
                setFileA(selected[0] ?? null);
                setCountA(0);
                setPage(1);
                setStatus(fileB ? "loading" : "empty");
              }}
            />
            {fileA && <FileList files={[fileA]} />}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted">{t("toolCompare.documentB")}</p>
            <DropZone
              accept="application/pdf,.pdf"
              maxSizeMb={100}
              onFiles={(selected) => {
                setFileB(selected[0] ?? null);
                setCountB(0);
                setPage(1);
                setStatus(fileA ? "loading" : "empty");
              }}
            />
            {fileB && <FileList files={[fileB]} />}
          </div>
        </div>
      }
      options={
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <button
              type="button"
              onClick={() => {
                setPage((current) => Math.max(1, current - 1));
                setStatus("loading");
              }}
              disabled={page <= 1 || !fileA || !fileB}
              aria-label={t("toolCompare.previousPage")}
              className="rounded-md border border-border p-2 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <p className="text-sm font-semibold">
              {t("toolCompare.page")} {page} / {maxPage}
            </p>
            <button
              type="button"
              onClick={() => {
                setPage((current) => Math.min(maxPage, current + 1));
                setStatus("loading");
              }}
              disabled={page >= maxPage || !fileA || !fileB}
              aria-label={t("toolCompare.nextPage")}
              className="rounded-md border border-border p-2 disabled:opacity-40"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
          {ready && (
            <p className="text-xs text-muted">
              {textA === textB ? t("toolCompare.textSame") : t("toolCompare.textDifferent")}
            </p>
          )}
        </div>
      }
      result={
        ready ? (
          <div className="w-full space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted">{t("toolCompare.documentA")}</p>
                <PreviewImage
                  bytes={renderedA!.bytes}
                  mime={renderedA!.mime}
                  alt={t("toolCompare.previewA")}
                  width={renderedA!.width}
                  height={renderedA!.height}
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted">{t("toolCompare.documentB")}</p>
                <PreviewImage
                  bytes={renderedB!.bytes}
                  mime={renderedB!.mime}
                  alt={t("toolCompare.previewB")}
                  width={renderedB!.width}
                  height={renderedB!.height}
                />
              </div>
            </div>
          </div>
        ) : undefined
      }
    />
  );
}
