"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { t } from "@/i18n/translations";

export function CopyButton({
  value,
  disabled = false,
}: {
  value: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      disabled={disabled || !value}
      onClick={() => {
        void navigator.clipboard.writeText(value);
      }}
      className="w-full"
    >
      <Copy className="size-4" aria-hidden="true" />
      {t("common.copy")}
    </Button>
  );
}
