import { AlertTriangle } from "lucide-react";
import { t } from "@/i18n/translations";

export function HealthRiskNotice() {
  return (
    <div role="note" className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-800 dark:text-amber-200" aria-hidden="true" />
        <div>
          <p className="text-sm font-bold text-amber-950 dark:text-amber-100">
            {t("toolUi.health.warningTitle")}
          </p>
          <p className="mt-1 text-xs leading-6 text-amber-900 dark:text-amber-200">
            {t("toolUi.health.warningBody")}
          </p>
        </div>
      </div>
    </div>
  );
}
