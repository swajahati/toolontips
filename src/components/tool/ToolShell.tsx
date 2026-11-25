import type { ReactNode } from "react";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { OptionsPanel } from "@/components/tool/OptionsPanel";
import { ResultPanel } from "@/components/tool/ResultPanel";
import { StatusMessage } from "@/components/tool/StatusMessage";
import type { ToolStatus } from "@/types";

interface ToolShellProps {
  title: string;
  description: string;
  status: ToolStatus;
  statusMessage?: string;
  dropzone: ReactNode;
  options?: ReactNode;
  result?: ReactNode;
  privacyNote?: string;
  onDownload?: () => void;
  downloadDisabled?: boolean;
  showDownload?: boolean;
}

export function ToolShell({
  title,
  description,
  status,
  statusMessage,
  dropzone,
  options,
  result,
  privacyNote,
  onDownload,
  downloadDisabled,
  showDownload = true,
}: ToolShellProps) {
  return (
    <section aria-labelledby="tool-title">
      <h1 id="tool-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{description}</p>

      <div className="mt-6">
        <StatusMessage status={status} message={statusMessage} />
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          {dropzone}
          {options && <OptionsPanel>{options}</OptionsPanel>}
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <ResultPanel status={status}>{result}</ResultPanel>
          {showDownload && (
            <DownloadButton
              onClick={onDownload}
              disabled={downloadDisabled || status !== "success"}
            />
          )}
        </div>
      </div>

      {privacyNote && <p className="mt-4 text-xs text-muted">{privacyNote}</p>}
    </section>
  );
}
