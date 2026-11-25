"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  convertImageFile,
  isConvertibleImage,
  type ImageMime,
  type ImageResult,
} from "@/lib/imageTools";
import type { Tool, ToolStatus } from "@/types";

export function ConvertImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<ImageMime>("image/jpeg");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<ImageResult | null>(null);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleProcess() {
    if (!file || !isConvertibleImage(file)) {
      setStatus("error");
      setStatusMessage(t("tool.error"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const next = await convertImageFile(file, outputFormat);
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
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-4">
          <Field label={t("toolUi.convertImage.outputFormat")}>
            <select
              value={outputFormat}
              onChange={(event) => {
                setOutputFormat(event.target.value as ImageMime);
                reset();
              }}
              className={inputClass}
            >
              <option value="image/jpeg">{t("toolUi.convertImage.jpg")}</option>
              <option value="image/png">{t("toolUi.convertImage.png")}</option>
              <option value="image/webp">{t("toolUi.convertImage.webp")}</option>
            </select>
          </Field>
          <p className="text-xs leading-5 text-muted">{t("toolUi.convertImage.heicNote")}</p>
          <Button type="button" onClick={handleProcess} disabled={!file || status === "loading"}>
            {t("toolUi.convertImage.process")}
          </Button>
        </div>
      }
      result={result && <ResultSummary name={result.name} bytes={result.bytes.byteLength} />}
      onDownload={() => result && downloadBytes(result.bytes, result.name, result.mime)}
    />
  );
}
