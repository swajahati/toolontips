import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { t } from "@/i18n/translations";

export function DownloadButton({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button type="button" onClick={onClick} disabled={disabled} className="w-full">
      <Download className="size-4" aria-hidden="true" />
      {t("tool.download")}
    </Button>
  );
}
