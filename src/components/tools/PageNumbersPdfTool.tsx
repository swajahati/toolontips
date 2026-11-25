"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PageScopeControl } from "@/components/tools/PageScopeControl";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import {
  parsePageSpec,
  type PageNumberFormat,
  type PageNumberPosition,
  type PageScope,
} from "@/lib/pdfProcessor";
import { getPdfPageCount } from "@/lib/pdfRender";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

export function PageNumbersPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [position, setPosition] = useState<PageNumberPosition>("bottom-center");
  const [startNumber, setStartNumber] = useState(1);
  const [format, setFormat] = useState<PageNumberFormat>("page-x-of-y");
  const [fontSize, setFontSize] = useState(12);
  const [scope, setScope] = useState<PageScope>("all");
  const [spec, setSpec] = useState("");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

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

  function resetOutput() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleApply() {
    if (!file) return;

    try {
      if (scope === "custom" && pageCount !== null) parsePageSpec(spec, pageCount);
    } catch {
      setStatus("error");
      setStatusMessage(t("toolPdf.invalidPages"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const source = await file.arrayBuffer();
      const bytes = await runPdfJob(
        {
          type: "page-numbers",
          file: source,
          options: { position, startNumber, format, fontSize, scope, spec },
        },
        240_000,
      );
      setResult({ bytes, name: "numbered.pdf" });
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
          <Field label={t("toolExtra.numberPosition")}>
            <select
              value={position}
              onChange={(event) => {
                setPosition(event.target.value as PageNumberPosition);
                resetOutput();
              }}
              className={inputClass}
            >
              <option value="bottom-center">{t("toolExtra.positionBottomCenter")}</option>
              <option value="bottom-left">{t("toolExtra.positionBottomLeft")}</option>
              <option value="bottom-right">{t("toolExtra.positionBottomRight")}</option>
              <option value="top-center">{t("toolExtra.positionTopCenter")}</option>
              <option value="top-left">{t("toolExtra.positionTopLeft")}</option>
              <option value="top-right">{t("toolExtra.positionTopRight")}</option>
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label={t("toolExtra.startNumber")}>
              <input
                type="number"
                min={0}
                value={startNumber}
                onChange={(event) => {
                  setStartNumber(Number(event.target.value) || 0);
                  resetOutput();
                }}
                className={inputClass}
              />
            </Field>
            <Field label={t("toolExtra.fontSize")}>
              <input
                type="number"
                min={6}
                max={72}
                value={fontSize}
                onChange={(event) => {
                  setFontSize(Number(event.target.value) || 6);
                  resetOutput();
                }}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label={t("toolExtra.numberFormat")}>
            <select
              value={format}
              onChange={(event) => {
                setFormat(event.target.value as PageNumberFormat);
                resetOutput();
              }}
              className={inputClass}
            >
              <option value="number">{t("toolExtra.formatNumber")}</option>
              <option value="page-x">{t("toolExtra.formatPageX")}</option>
              <option value="page-x-of-y">{t("toolExtra.formatPageXOfY")}</option>
              <option value="x-slash-y">{t("toolExtra.formatXSlashY")}</option>
            </select>
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

          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolExtra.addNumbers")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
