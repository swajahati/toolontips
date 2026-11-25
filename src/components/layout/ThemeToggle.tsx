"use client";

import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { t } from "@/i18n/translations";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-foreground"
    >
      <Moon className="size-4" aria-hidden="true" />
    </button>
  );
}
