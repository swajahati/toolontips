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
import { parsePageSpec, type PageScope } from "@/lib/pdfProcessor";
import { pdfToExcel } from "@/lib/pdfToExcel";
import { getPdfPageCount } from "@/lib/pdfRender";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

function selectedPages(scope: PageScope, spec: string, pageCount: number | null): number[] {
  if (!pageCount) return [];
  const indexes = Array.from({ length: pageCount }, (_, index) => index);
  if (scope === "custom") {
    try {
      return parsePageSpec(spec, pageCount).map((index) => index + 1);
    } catch {
      return [];
    }
  }
  return indexes
    .filter((index) => (scope === "odd" ? index % 2 === 0 : scope === "even" ? index % 2 === 1 : true))
    .map((index) => index + 1);
}

function excelName(name: string): string {
  return `${name.replace(/\.pdf$/i, "")}.xlsx`;
}

export function PdfToExcelTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [scope, setScope] = useState<PageScope>("all");
  const [spec, setSpec] = useState("");
  const [rowTolerance, setRowTolerance] = useState(4);
  const [columnGap, setColumnGap] = useState(12);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

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
  }

  async function handleApply() {
    if (!file) return;

    setStatus("loading");
    setStatusMessage(undefined);
    setResult(null);

    try {
      const bytes = await pdfToExcel(await file.arrayBuffer(), {
        pageNumbers: selectedPages(scope, spec, pageCount),
        rowTolerance,
        columnGap,
      });
      setResult({ bytes, name: excelName(file.name) });
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
      privacyNote={t("toolExcel.privacy")}
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
          <Field label={t("toolExcel.rowTolerance")} hint={t("toolExcel.rowToleranceHint")}>
            <input
              type="number"
              min={1}
              max={20}
              value={rowTolerance}
              onChange={(event) => {
                setRowTolerance(Number(event.target.value) || 1);
                resetOutput();
              }}
              className={inputClass}
            />
          </Field>
          <Field label={t("toolExcel.columnGap")} hint={t("toolExcel.columnGapHint")}>
            <input
              type="number"
              min={2}
              max={80}
              value={columnGap}
              onChange={(event) => {
                setColumnGap(Number(event.target.value) || 2);
                resetOutput();
              }}
              className={inputClass}
            />
          </Field>
          <p className="text-xs text-muted">{t("toolExcel.limit")}</p>
          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolExcel.action")}
          </Button>
        </div>
      }
      result={result ? <ResultSummary name={result.name} bytes={result.bytes.byteLength} /> : undefined}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
