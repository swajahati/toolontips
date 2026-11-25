"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DropZone } from "@/components/tool/DropZone";
import { ToolShell } from "@/components/tool/ToolShell";
import { Field, FileList, ResultSummary, inputClass } from "@/components/tools/Fields";
import { t, type TranslationKey } from "@/i18n/translations";
import { downloadBytes } from "@/lib/download";
import { describePdfError } from "@/lib/pdfErrors";
import { runPdfJob } from "@/lib/pdfWorkerClient";
import type { ProtectPdfOptions } from "@/lib/pdfSecurity";
import type { Tool, ToolStatus } from "@/types";

interface Result {
  bytes: Uint8Array;
  name: string;
}

const printLabels: Record<ProtectPdfOptions["print"], TranslationKey> = {
  full: "toolSecurity.printFull",
  low: "toolSecurity.printLow",
  none: "toolSecurity.printNone",
};

const modifyLabels: Record<ProtectPdfOptions["modify"], TranslationKey> = {
  all: "toolSecurity.modifyAll",
  annotate: "toolSecurity.modifyAnnotate",
  form: "toolSecurity.modifyForm",
  assembly: "toolSecurity.modifyAssembly",
  none: "toolSecurity.modifyNone",
};

function protectedName(name: string): string {
  return `${name.replace(/\.pdf$/i, "")}-protected.pdf`;
}

export function ProtectPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [print, setPrint] = useState<ProtectPdfOptions["print"]>("full");
  const [modify, setModify] = useState<ProtectPdfOptions["modify"]>("all");
  const [extract, setExtract] = useState(true);
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [result, setResult] = useState<Result | null>(null);

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
      if (!userPassword.trim()) throw new Error("PASSWORD_REQUIRED");
      if (userPassword.length < 8) throw new Error("PASSWORD_TOO_SHORT");
      if (userPassword !== confirmPassword) throw new Error("PASSWORDS_DONT_MATCH");

      const bytes = await runPdfJob(
        {
          type: "protect",
          file: await file.arrayBuffer(),
          options: { userPassword, ownerPassword, print, modify, extract },
        },
        300_000,
      );
      setResult({ bytes, name: protectedName(file.name) });
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
      privacyNote={t("toolSecurity.privacy")}
      dropzone={
        <>
          <DropZone
            accept="application/pdf,.pdf"
            maxSizeMb={100}
            onFiles={(selected) => {
              setFile(selected[0] ?? null);
              resetOutput();
            }}
          />
          {file && <FileList files={[file]} />}
        </>
      }
      options={
        <div className="space-y-5">
          <Field label={t("toolSecurity.newPassword")}>
            <input
              type="password"
              autoComplete="new-password"
              value={userPassword}
              onChange={(event) => {
                setUserPassword(event.target.value);
                resetOutput();
              }}
              className={inputClass}
            />
          </Field>

          <Field label={t("toolSecurity.confirmPassword")}>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                resetOutput();
              }}
              className={inputClass}
            />
          </Field>

          <Field
            label={t("toolSecurity.ownerPassword")}
            hint={t("toolSecurity.ownerPasswordHint")}
          >
            <input
              type="password"
              autoComplete="new-password"
              value={ownerPassword}
              onChange={(event) => {
                setOwnerPassword(event.target.value);
                resetOutput();
              }}
              className={inputClass}
            />
          </Field>

          <Field label={t("toolSecurity.printPermission")}>
            <select
              value={print}
              onChange={(event) => {
                setPrint(event.target.value as ProtectPdfOptions["print"]);
                resetOutput();
              }}
              className={inputClass}
            >
              {(Object.keys(printLabels) as ProtectPdfOptions["print"][]).map((value) => (
                <option key={value} value={value}>
                  {t(printLabels[value])}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t("toolSecurity.modifyPermission")}>
            <select
              value={modify}
              onChange={(event) => {
                setModify(event.target.value as ProtectPdfOptions["modify"]);
                resetOutput();
              }}
              className={inputClass}
            >
              {(Object.keys(modifyLabels) as ProtectPdfOptions["modify"][]).map((value) => (
                <option key={value} value={value}>
                  {t(modifyLabels[value])}
                </option>
              ))}
            </select>
          </Field>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={extract}
              onChange={(event) => {
                setExtract(event.target.checked);
                resetOutput();
              }}
              className="mt-1 size-4 accent-[var(--color-primary)]"
            />
            <span>{t("toolSecurity.allowExtract")}</span>
          </label>

          <p className="text-xs text-muted">{t("toolSecurity.passwordWarning")}</p>
          <p className="text-xs text-muted">{t("toolSecurity.permissionsWarning")}</p>

          <Button type="button" onClick={handleApply} disabled={!file || status === "loading"}>
            {t("toolSecurity.protectAction")}
          </Button>
        </div>
      }
      result={result ? <ResultSummary name={result.name} bytes={result.bytes.byteLength} /> : undefined}
      onDownload={() => result && downloadBytes(result.bytes, result.name)}
    />
  );
}
