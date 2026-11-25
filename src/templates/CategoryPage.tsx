import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ToolCard } from "@/components/related/ToolCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { t } from "@/i18n/translations";
import { getCategoryBySlug, getToolsForCategory, isCategoryPublished } from "@/lib/registry";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category || !isCategoryPublished(slug)) {
    return pageMetadata({
      title: t("category.notFoundTitle"),
      description: t("category.notFoundDescription"),
      path: `/category/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: category.name,
    description: category.shortDescription,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category || !isCategoryPublished(slug)) notFound();

  const tools = getToolsForCategory(slug);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: t("category.breadcrumb"), path: "/#tool-areas" },
          { name: category.name },
        ]}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("category.breadcrumb"), path: "/" },
          { name: category.name, path: `/category/${slug}` },
        ])}
      />
      <header className="mt-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
        <div className="mt-5 space-y-4 text-sm leading-7 text-muted sm:text-base">
          {category.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight">{t("category.toolsTitle")}</h2>
          <span className="text-xs text-muted">{t("category.count", { count: tools.length })}</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </Container>
  );
}
