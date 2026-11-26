import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolContent } from "@/components/content/ToolContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { GuideLinks } from "@/components/related/GuideLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolComponents } from "@/components/tools/registry";
import { guides } from "@/content/guides";
import { getToolContent } from "@/content/tools";
import { t } from "@/i18n/translations";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/jsonld";
import {
  getAllTools,
  getCategoryBySlug,
  getToolBySlug,
  isCategoryPublished,
} from "@/lib/registry";
import { pageMetadata } from "@/lib/seo";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return pageMetadata({
      title: t("notFound.title"),
      description: t("notFound.body"),
      path: `/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: tool.name,
    description: tool.description,
    path: `/${slug}`,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const content = getToolContent(slug);
  const ToolComponent = toolComponents[slug];

  if (!tool || !content || !ToolComponent) notFound();

  const category = getCategoryBySlug(tool.categorySlug);
  const relatedGuides = guides.filter((guide) => guide.relatedTools.includes(slug));
  const breadcrumbs = [
    { name: t("breadcrumb.home"), path: "/" },
    ...(category && isCategoryPublished(category.slug)
      ? [{ name: category.name, path: `/category/${category.slug}` }]
      : []),
    { name: tool.name, path: `/${tool.slug}` },
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd
        data={[
          webApplicationJsonLd(tool),
          faqJsonLd(content.faqs),
          breadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <div className="mt-8">
        <ToolComponent tool={tool} />
      </div>
      <ToolContent content={content} />
      <GuideLinks guides={relatedGuides} />
      <div className="mx-auto mt-14 max-w-3xl">
        <AdSlot />
      </div>
    </Container>
  );
}
