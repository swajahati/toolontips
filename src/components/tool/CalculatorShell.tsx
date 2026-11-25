import type { ReactNode } from "react";
import { StatusMessage } from "@/components/tool/StatusMessage";
import { t } from "@/i18n/translations";
import type { Tool, ToolStatus } from "@/types";

interface CalculatorShellProps {
  tool: Tool;
  inputs: ReactNode;
  results: ReactNode;
  note?: string;
  privacyNote: string;
  status?: ToolStatus;
  statusMessage?: string;
}

export function CalculatorShell({
  tool,
  inputs,
  results,
  note,
  privacyNote,
  status = "empty",
  statusMessage,
}: CalculatorShellProps) {
  return (
    <section aria-labelledby="tool-title">
      <h1 id="tool-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {tool.name}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{tool.description}</p>
      <div className="mt-6">
        <StatusMessage status={status} message={statusMessage} />
      </div>
      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-lg font-bold">{t("calculator.inputs")}</h2>
          {inputs}
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-lg font-bold">{t("calculator.results")}</h2>
          {results}
        </div>
      </div>
      {note && <p className="mt-4 text-sm leading-7 text-muted">{note}</p>}
      <p className="mt-4 text-xs leading-6 text-muted">{privacyNote}</p>
    </section>
  );
}
