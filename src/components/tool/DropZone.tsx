"use client";

import { useId, useState } from "react";
import { UploadCloud } from "lucide-react";
import { t } from "@/i18n/translations";
import { cn } from "@/lib/cn";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
}

export function DropZone({ onFiles, accept, multiple = false, maxSizeMb = 50 }: DropZoneProps) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const selected = Array.from(list);
    const tooLarge = selected.find((file) => file.size > maxSizeMb * 1024 * 1024);
    if (tooLarge) {
      setError(t("tool.fileTooLarge", { size: maxSizeMb }));
      return;
    }
    setError(null);
    onFiles(multiple ? selected : selected.slice(0, 1));
  }

  return (
    <div>
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "rounded-xl border-2 border-dashed transition-colors",
          dragging ? "border-primary bg-accent-soft" : "border-border bg-surface-muted",
        )}
      >
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-10 text-center"
        >
          <UploadCloud className="size-8 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold">
            {dragging ? t("tool.dropActive") : t("tool.dropTitle")}
          </span>
          <span className="text-xs text-muted">{t("tool.dropHint")}</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
