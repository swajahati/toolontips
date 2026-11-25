import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { guides } from "@/content/guides";
import { formatDate } from "@/i18n/format";
import { t } from "@/i18n/translations";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const instant = false;

const breadcrumbs = [
  { name: t("breadcrumb.home"), path: "/" },
  { name: t("nav.guides"), path: "/guides" },
];

export const metadata: Metadata = pageMetadata({
  title: t("guides.title"),
  description: t("guides.description"),
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <div className="mt-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("guides.title")}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{t("guides.description")}</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-lg font-bold tracking-tight">{guide.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-muted">{guide.description}</p>
            <p className="mt-4 text-xs text-muted">
              {t("guides.updated")}: {formatDate(guide.updated, "en-US")}
            </p>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-5 inline-flex w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              {t("guides.readGuide")}
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
