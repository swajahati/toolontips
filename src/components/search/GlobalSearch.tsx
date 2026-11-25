"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { t } from "@/i18n/translations";
import { cn } from "@/lib/cn";
import { getAllTools, searchTools } from "@/lib/registry";

export function GlobalSearch({ large = false }: { large?: boolean }) {
  const id = useId();
  const listId = `${id}-results`;
  const initialQuery =
    typeof window === "undefined"
      ? ""
      : (new URLSearchParams(window.location.search).get("q") ?? "");
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(initialQuery.length > 0);
  const results = useMemo(() => searchTools(query), [query]);
  const hasTools = getAllTools().length > 0;

  return (
    <div
      className={cn("relative", large ? "w-full" : "w-36 sm:w-60")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <label className="sr-only" htmlFor={id}>
        {t("search.label")}
      </label>
      <Search
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        value={query}
        suppressHydrationWarning
        autoComplete="off"
        placeholder={t("search.placeholder")}
        aria-expanded={open}
        aria-controls={listId}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className={cn(
          "w-full rounded-lg border border-border bg-surface py-2 ps-9 pe-3 text-sm text-foreground placeholder:text-muted",
          large && "py-3 text-base",
        )}
      />
      {query && (
        <button
          type="button"
          aria-label={t("search.close")}
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          className="absolute end-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("search.resultsLabel")}
          className="absolute start-0 top-full z-40 mt-2 w-full min-w-64 rounded-xl border border-border bg-surface p-2 shadow-lg"
        >
          {!hasTools ? (
            <li className="px-3 py-3 text-sm">
              <p className="font-semibold">{t("search.empty")}</p>
              <p className="mt-1 text-muted">{t("search.emptyHint")}</p>
            </li>
          ) : results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">{t("search.noResults")}</li>
          ) : (
            results.map((tool) => (
              <li key={tool.slug} role="option" aria-selected={false}>
                <Link
                  href={`/${tool.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-surface-muted"
                >
                  <span className="block text-sm font-semibold">{tool.name}</span>
                  <span className="block text-xs text-muted">{tool.description}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
