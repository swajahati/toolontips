import type { ReactNode } from "react";
import { formatNumber } from "@/i18n/format";
import { t } from "@/i18n/translations";

export const inputClass =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${formatNumber(kb, "en-US", { maximumFractionDigits: 1 })} KB`;
  const mb = kb / 1024;
  return `${formatNumber(mb, "en-US", { maximumFractionDigits: 2 })} MB`;
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      <span>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function FileList({
  files,
  onRemove,
}: {
  files: File[];
  onRemove?: (index: number) => void;
}) {
  if (files.length === 0) return null;

  return (
    <ul className="mt-3 space-y-1">
      {files.map((file, index) => (
        <li
          key={`${file.name}-${index}`}
          className="flex items-center justify-between gap-3 rounded-lg bg-surface-muted px-3 py-2 text-xs"
        >
          <span className="min-w-0 truncate">{file.name}</span>
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="shrink-0 font-semibold text-primary hover:underline"
            >
              {t("toolPdf.remove")}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ResultSummary({
  name,
  bytes,
  pages,
}: {
  name: string;
  bytes: number;
  pages?: number;
}) {
  return (
    <div className="w-full text-left text-sm">
      <p className="font-semibold">{name}</p>
      <p className="mt-1 text-xs text-muted">
        {t("toolPdf.resultSize")}: {formatBytes(bytes)}
      </p>
      {pages !== undefined && (
        <p className="mt-1 text-xs text-muted">
          {t("toolPdf.resultPages")}: {pages}
        </p>
      )}
    </div>
  );
}
