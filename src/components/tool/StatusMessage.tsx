import { AlertCircle, CheckCircle2, LoaderCircle, type LucideIcon } from "lucide-react";
import { t } from "@/i18n/translations";
import type { ToolStatus } from "@/types";

const states: Record<Exclude<ToolStatus, "empty">, { message: string; icon: LucideIcon; className: string }> = {
  loading: {
    message: t("tool.loading"),
    icon: LoaderCircle,
    className: "border-border bg-surface-muted text-muted",
  },
  success: {
    message: t("tool.success"),
    icon: CheckCircle2,
    className: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
  },
  error: {
    message: t("tool.error"),
    icon: AlertCircle,
    className: "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200",
  },
};

export function StatusMessage({ status, message }: { status: ToolStatus; message?: string }) {
  if (status === "empty") return null;

  const state = states[status];
  const Icon = state.icon;

  return (
    <div
      role={status === "error" ? "alert" : "status"}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${state.className}`}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span>{message ?? state.message}</span>
    </div>
  );
}
