import type { ReactNode } from "react";
import { t } from "@/i18n/translations";

export function OptionsPanel({ children }: { children: ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{t("tool.options")}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
