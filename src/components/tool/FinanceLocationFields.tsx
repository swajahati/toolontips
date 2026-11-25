import { Field, inputClass } from "@/components/tools/Fields";
import { financeRegions, getFinanceRegion } from "@/config/financeRegions";
import { t } from "@/i18n/translations";

const tr = (key: string) => t(key as never);

interface FinanceLocationFieldsProps {
  countryCode: string;
  regionCode: string;
  source: string;
  ready: boolean;
  onCountryChange: (code: string) => void;
  onRegionChange: (code: string) => void;
}

export function FinanceLocationFields({
  countryCode,
  regionCode,
  source,
  ready,
  onCountryChange,
  onRegionChange,
}: FinanceLocationFieldsProps) {
  const country = getFinanceRegion(countryCode);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={tr("toolUi.finance.country")}>
          <select className={inputClass} value={countryCode} onChange={(event) => onCountryChange(event.target.value)}>
            {financeRegions.map((item) => (
              <option key={item.code} value={item.code}>{item.name}</option>
            ))}
          </select>
        </Field>
        <Field label={tr("toolUi.finance.region")}>
          <select className={inputClass} value={regionCode} onChange={(event) => onRegionChange(event.target.value)}>
            <option value="">{tr("toolUi.finance.regionOptional")}</option>
            {country.regions.map((item) => (
              <option key={item.code} value={item.code}>{item.name}</option>
            ))}
          </select>
        </Field>
      </div>
      {ready && (
        <p className="rounded-lg bg-surface-muted p-3 text-xs leading-5 text-muted">
          {source === "default" ? tr("toolUi.finance.detectionDefault") : tr("toolUi.finance.detected")}
        </p>
      )}
    </div>
  );
}
