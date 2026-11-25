"use client";

import { Field, inputClass } from "@/components/tools/Fields";
import { t } from "@/i18n/translations";
import type { PageScope } from "@/lib/pdfProcessor";

export function PageScopeControl({
  scope,
  spec,
  pageCount,
  onScopeChange,
  onSpecChange,
}: {
  scope: PageScope;
  spec: string;
  pageCount: number | null;
  onScopeChange: (scope: PageScope) => void;
  onSpecChange: (spec: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Field label={t("toolExtra.applyTo")}>
        <select
          value={scope}
          onChange={(event) => onScopeChange(event.target.value as PageScope)}
          className={inputClass}
        >
          <option value="all">{t("toolExtra.scopeAll")}</option>
          <option value="odd">{t("toolExtra.scopeOdd")}</option>
          <option value="even">{t("toolExtra.scopeEven")}</option>
          <option value="custom">{t("toolExtra.scopeCustom")}</option>
        </select>
      </Field>
      {scope === "custom" && (
        <Field
          label={t("toolPdf.pages")}
          hint={pageCount ? `${t("toolPdf.resultPages")}: ${pageCount}` : t("toolPdf.pagesHint")}
        >
          <input
            type="text"
            value={spec}
            onChange={(event) => onSpecChange(event.target.value)}
            placeholder="1, 3-5"
            className={inputClass}
          />
        </Field>
      )}
    </div>
  );
}
