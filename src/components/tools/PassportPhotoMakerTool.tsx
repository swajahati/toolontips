"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { PreviewImage } from "@/components/tools/PreviewImage";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  createPassportSheet,
  isRasterImage,
  type ImageResult,
  type PassportBackground,
} from "@/lib/imageTools";
import type { Tool, ToolStatus } from "@/types";

const backgrounds: Array<{ value: PassportBackground; label: string }> = [
  { value: "#ffffff", label: t("toolUi.passportPhoto.white") },
  { value: "#2f5fb2", label: t("toolUi.passportPhoto.blue") },
  { value: "#c62828", label: t("toolUi.passportPhoto.red") },
];

export function PassportPhotoMakerTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [background, setBackground] = useState<PassportBackground>("#ffffff");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<ImageResult | null>(null);

  function reset() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  async function handleCreate() {
    if (!file || !isRasterImage(file)) {
      setStatus("error");
      setStatusMessage(t("toolUi.compressImage.unsupported"));
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);

    try {
      const next = await createPassportSheet(file, background);
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
              setFile(selected[0] ?? null);
              reset();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-4">
          <Field label={t("toolUi.passportPhoto.background")}>
            <select
              value={background}
              onChange={(event) => {
                setBackground(event.target.value as PassportBackground);
                reset();
              }}
              className={inputClass}
            >
              {backgrounds.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <p className="text-xs leading-5 text-muted">{t("toolUi.passportPhoto.size")}</p>
          <Button type="button" onClick={handleCreate} disabled={!file || status === "loading"}>
            {t("toolUi.passportPhoto.create")}
          </Button>
        </div>
      }
      result={
        result && (
          <div className="w-full space-y-3 text-left text-sm">
            <ResultSummary name={t("toolUi.passportPhoto.sheet")} bytes={result.bytes.byteLength} />
            <PreviewImage
              bytes={result.bytes}
              mime="image/png"
              alt={t("toolUi.passportPhoto.sheet")}
              width={320}
              height={213}
            />
          </div>
        )
      }
      onDownload={() => result && downloadBytes(result.bytes, result.name, result.mime)}
    />
  );
}
