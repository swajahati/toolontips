import { ToolCard } from "@/components/related/ToolCard";
import type { GuideContent } from "@/content/guides/types";
import { formatDate } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { getToolBySlug } from "@/lib/registry";

export function GuideContent({ content }: { content: GuideContent }) {
  const relatedTools = content.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  return (
    <article className="mx-auto mt-12 max-w-3xl">
      <p className="text-lg leading-8 text-muted">{content.intro}</p>
      <p className="mt-3 text-xs text-muted">
        {t("guides.updated")}: {formatDate(content.updated, "en-US")}
      </p>

      <div className="mt-10 space-y-10">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
            <div className="mt-3 space-y-4 text-sm leading-7 text-muted sm:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-2 ps-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-xl font-bold tracking-tight">{t("toolFaq.title")}</h2>
          <div className="mt-4 space-y-3">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-border bg-surface p-4">
                <summary className="cursor-pointer text-sm font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{t("guides.relatedTools")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
