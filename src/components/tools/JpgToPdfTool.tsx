"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import {
  Field,
  FileList,
  ResultSummary,
  inputClass,
} from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { FitOption, PageSizeOption } from "@/lib/pdfProcessor";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function JpgToPdfTool({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState<PageSizeOption>("fit");
  const [fit, setFit] = useState<FitOption>("contain");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleCreate() {
    if (files.length === 0) {
      setStatus("error");
      setStatusMessage(t("toolPdf.noImages"));
      return;
    }

    const unsupported = files.find((file) => !["image/jpeg", "image/png"].includes(file.type));
    if (unsupported) {
      setStatus("error");
      setStatusMessage(t("toolPdf.unsupportedImage"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const images = await Promise.all(
        files.map(async (file) => ({ bytes: await file.arrayBuffer(), type: file.type })),
      );
      const bytes = await runPdfJob({ type: "images", images, pageSize, fit });
      setResult({ bytes, name: "images.pdf" });
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
            multiple
            accept="image/jpeg,image/png,.jpg,.jpeg,.png"
            onFiles={(selected) => {
              setFiles(selected);
              reset();
            }}
          />
          <FileList
            files={files}
            onRemove={(index) => {
              setFiles((current) => current.filter((_, position) => position !== index));
              reset();
            }}
          />
        </>
      }
      options={
        <div className="space-y-4">
          <Field label={t("toolPdf.pageSize")}>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(event.target.value as PageSizeOption);
                reset();
              }}
              className={inputClass}
            >
              <option value="fit">{t("toolPdf.pageSizeFit")}</option>
              <option value="a4">{t("toolPdf.pageSizeA4")}</option>
              <option value="letter">{t("toolPdf.pageSizeLetter")}</option>
            </select>
          </Field>
          {pageSize !== "fit" && (
            <Field label={t("toolPdf.fit")}>
              <select
                value={fit}
                onChange={(event) => {
                  setFit(event.target.value as FitOption);
                  reset();
                }}
                className={inputClass}
              >
                <option value="contain">{t("toolPdf.fitContain")}</option>
                <option value="cover">{t("toolPdf.fitCover")}</option>
              </select>
            </Field>
          )}
          <Button type="button" onClick={handleCreate} disabled={files.length === 0 || status === "loading"}>
            {t("toolPdf.imagesAction")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
