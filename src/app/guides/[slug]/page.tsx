import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { GuideContent } from "@/components/content/GuideContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGuideBySlug, getOtherGuides, guides } from "@/content/guides";
import { t } from "@/i18n/translations";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return pageMetadata({
      title: t("notFound.title"),
      description: t("notFound.body"),
      path: `/guides/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const breadcrumbs = [
    { name: t("breadcrumb.home"), path: "/" },
    { name: t("nav.guides"), path: "/guides" },
    { name: guide.title, path },
  ];
  const otherGuides = getOtherGuides(guide.slug);

  return (
    <Container className="py-10">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd
        data={[
          articleJsonLd(guide, path),
          faqJsonLd(guide.faqs),
          breadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{guide.title}</h1>
      </div>
      <GuideContent content={guide} />
      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-xl font-bold tracking-tight">{t("guides.relatedGuides")}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {otherGuides.map((item) => (
            <Link
              key={item.slug}
              href={`/guides/${item.slug}`}
              className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
      <div className="mx-auto mt-14 max-w-3xl">
        <AdSlot />
      </div>
    </Container>
  );
}
