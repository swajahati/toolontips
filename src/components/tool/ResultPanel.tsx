import type { ReactNode } from "react";
import { t } from "@/i18n/translations";
import type { ToolStatus } from "@/types";

export function ResultPanel({
  status,
  children,
}: {
  status: ToolStatus;
  children?: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{t("tool.result")}</h2>
      <div className="mt-3 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted p-4 text-center text-sm text-muted">
        {status === "empty" ? t("tool.empty") : children}
      </div>
    </section>
  );
}
