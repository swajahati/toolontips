import type { ReactNode } from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { StatusMessage } from "@/components/tool/StatusMessage";
import { t } from "@/i18n/translations";
import type { Tool, ToolStatus } from "@/types";

interface TextToolShellProps {
  tool: Tool;
  input: string;
  onInputChange: (value: string) => void;
  output: string;
  outputLabel?: string;
  placeholder?: string;
  status?: ToolStatus;
  statusMessage?: string;
  actions?: ReactNode;
  privacyNote: string;
}

export function TextToolShell({
  tool,
  input,
  onInputChange,
  output,
  outputLabel,
  placeholder,
  status = "empty",
  statusMessage,
  actions,
  privacyNote,
}: TextToolShellProps) {
  return (
    <section aria-labelledby="tool-title">
      <h1 id="tool-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {tool.name}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{tool.description}</p>
      <div className="mt-6">
        <StatusMessage status={status} message={statusMessage} />
      </div>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <label className="block text-sm font-bold" htmlFor="text-tool-input">
            {t("common.input")}
          </label>
          <textarea
            id="text-tool-input"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder={placeholder}
            className="min-h-64 w-full rounded-lg border border-border bg-surface-muted p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {actions}
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-bold">{outputLabel ?? t("common.output")}</h2>
          <pre className="min-h-64 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface-muted p-3 text-sm">
            {output}
          </pre>
          <CopyButton value={output} />
        </div>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted">{privacyNote}</p>
    </section>
  );
}
