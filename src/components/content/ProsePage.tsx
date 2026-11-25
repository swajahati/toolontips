import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import type { PageContent } from "@/content/pages/types";
import { formatDate } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export function ProsePage({ content, path }: { content: PageContent; path: string }) {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: content.title }]} />
      <JsonLd data={breadcrumbJsonLd([{ name: content.title, path }])} />
      <article className="mx-auto mt-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{content.intro}</p>
        <p className="mt-3 text-xs text-muted">
          {t("pages.lastUpdated")}: {formatDate(content.updated, "en-US")}
        </p>
        {content.notice && (
          <p className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {content.notice}
          </p>
        )}
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
        </div>
      </article>
    </Container>
  );
}
