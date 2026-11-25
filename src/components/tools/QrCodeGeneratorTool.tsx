"use client";

import { useState } from "react";
import Image from "next/image";
import { CalculatorShell } from "@/components/tool/CalculatorShell";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ResultRow } from "@/components/tool/ResultRow";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import {
  buildQrPayload,
  dataUrlBytes,
  generateQrCode,
  type QrCodeFields,
  type QrCodeMode,
  type QrCodeResult,
  type QrEncryption,
  type QrErrorCorrection,
} from "@/lib/qrCode";
import type { Tool, ToolStatus } from "@/types";

const initialFields: QrCodeFields = {
  mode: "text",
  text: "",
  url: "",
  ssid: "",
  wifiPassword: "",
  encryption: "WPA",
  name: "",
  phone: "",
  email: "",
  organisation: "",
};

const modeLabels: Record<QrCodeMode, string> = {
  text: t("toolUi.qrCode.text"),
  url: t("toolUi.qrCode.link"),
  wifi: t("toolUi.qrCode.wifi"),
  vcard: t("toolUi.qrCode.vcard"),
};

export function QrCodeGeneratorTool({ tool }: { tool: Tool }) {
  const [fields, setFields] = useState<QrCodeFields>(initialFields);
  const [size, setSize] = useState(512);
  const [errorCorrection, setErrorCorrection] = useState<QrErrorCorrection>("M");
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<QrCodeResult | null>(null);

  function resetResult() {
    setStatus("empty");
    setStatusMessage(undefined);
    setResult(null);
  }

  function updateField<K extends keyof QrCodeFields>(key: K, value: QrCodeFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    resetResult();
  }

  function clear() {
    setFields(initialFields);
    setSize(512);
    setErrorCorrection("M");
    resetResult();
  }

  async function generate() {
    setStatus("loading");
    setStatusMessage(`${t("toolUi.qrCode.generate")}…`);
    setResult(null);

    try {
      const payload = buildQrPayload(fields);
      const generated = await generateQrCode(payload, { size, errorCorrection });
      setResult(generated);
      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(t("toolUi.qrCode.invalid"));
    }
  }

  function downloadPng() {
    if (!result) return;
    downloadBytes(dataUrlBytes(result.pngDataUrl), "qr-code.png", "image/png");
  }

  function downloadSvg() {
    if (!result) return;
    downloadBytes(new TextEncoder().encode(result.svg), "qr-code.svg", "image/svg+xml");
  }

  return (
    <CalculatorShell
      tool={tool}
      status={status}
      statusMessage={statusMessage}
      privacyNote={t("home.privacyText")}
      inputs={
        <div className="space-y-4">
          <Field label={t("toolUi.qrCode.mode")}>
            <select
              value={fields.mode}
              onChange={(event) => updateField("mode", event.target.value as QrCodeMode)}
              className={inputClass}
            >
              <option value="text">{modeLabels.text}</option>
              <option value="url">{modeLabels.url}</option>
              <option value="wifi">{modeLabels.wifi}</option>
              <option value="vcard">{modeLabels.vcard}</option>
            </select>
          </Field>

          {fields.mode === "text" && (
            <Field label={t("toolUi.qrCode.textValue")}>
              <textarea
                rows={4}
                value={fields.text}
                onChange={(event) => updateField("text", event.target.value)}
                className={inputClass}
              />
            </Field>
          )}

          {fields.mode === "url" && (
            <Field label={t("toolUi.qrCode.urlValue")}>
              <input
                type="url"
                value={fields.url}
                onChange={(event) => updateField("url", event.target.value)}
                className={inputClass}
              />
            </Field>
          )}

          {fields.mode === "wifi" && (
            <>
              <Field label={t("toolUi.qrCode.ssid")}>
                <input
                  type="text"
                  value={fields.ssid}
                  onChange={(event) => updateField("ssid", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={t("toolUi.qrCode.encryption")}>
                <select
                  value={fields.encryption}
                  onChange={(event) =>
                    updateField("encryption", event.target.value as QrEncryption)
                  }
                  className={inputClass}
                >
                  <option value="WPA">WPA</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">nopass</option>
                </select>
              </Field>
              {fields.encryption !== "nopass" && (
                <Field label={t("toolUi.qrCode.wifiPassword")}>
                  <input
                    type="password"
                    autoComplete="off"
                    value={fields.wifiPassword}
                    onChange={(event) => updateField("wifiPassword", event.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}
            </>
          )}

          {fields.mode === "vcard" && (
            <>
              <Field label={t("toolUi.qrCode.name")}>
                <input
                  type="text"
                  value={fields.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={t("toolUi.qrCode.phone")}>
                <input
                  type="tel"
                  value={fields.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={t("toolUi.qrCode.email")}>
                <input
                  type="email"
                  value={fields.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label={t("toolUi.qrCode.organisation")}>
                <input
                  type="text"
                  value={fields.organisation}
                  onChange={(event) => updateField("organisation", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </>
          )}

          <Field label={t("toolUi.qrCode.size")}>
            <select
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value));
                resetResult();
              }}
              className={inputClass}
            >
              <option value="256">256</option>
              <option value="512">512</option>
              <option value="1024">1024</option>
              <option value="2048">2048</option>
            </select>
          </Field>

          <Field label={t("toolUi.qrCode.errorCorrection")}>
            <select
              value={errorCorrection}
              onChange={(event) => {
                setErrorCorrection(event.target.value as QrErrorCorrection);
                resetResult();
              }}
              className={inputClass}
            >
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="Q">Q</option>
              <option value="H">H</option>
            </select>
          </Field>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              onClick={() => void generate()}
              disabled={status === "loading"}
            >
              {t("toolUi.qrCode.generate")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={clear}
              disabled={status === "loading"}
            >
              {t("common.clear")}
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          <div className="flex min-h-56 items-center justify-center rounded-lg border border-border bg-surface-muted p-4">
            {result && (
              <Image
                unoptimized
                src={result.pngDataUrl}
                alt={t("toolUi.qrCode.preview")}
                width={size}
                height={size}
                className="h-auto max-h-80 w-auto rounded-lg object-contain"
              />
            )}
          </div>
          {result && (
            <>
              <ResultRow label={t("toolUi.qrCode.mode")} value={modeLabels[fields.mode]} />
              <ResultRow
                label={t("toolUi.qrCode.errorCorrection")}
                value={errorCorrection}
                emphasis
              />
              <DownloadButton onClick={downloadPng} />
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={downloadSvg}
              >
                {t("tool.download")} SVG
              </Button>
              <CopyButton value={result.payload} />
            </>
          )}
        </div>
      }
    />
  );
}
