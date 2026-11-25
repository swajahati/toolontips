import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import { ToolCard } from "@/components/related/ToolCard";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n/translations";
import { getPopularTools, getToolsForCategory, isCategoryPublished } from "@/lib/registry";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free Online Tools for PDFs, Images, Finance and Text",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const popular = getPopularTools();

  return (
    <Container className="py-10 sm:py-14">
      <section className="rounded-3xl border border-border bg-accent-soft px-5 py-12 text-center sm:px-10">
        <Badge>{t("home.eyebrow")}</Badge>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {t("home.subtitle")}
        </p>
        <div className="mx-auto mt-7 max-w-xl">
          <GlobalSearch large />
        </div>
        <div className="mt-6">
          <ButtonLink href="#tool-areas" variant="secondary">
            {t("home.cta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <section id="tool-areas" className="mt-14 scroll-mt-8">
        <h2 className="text-2xl font-bold tracking-tight">{t("home.areasTitle")}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{t("home.areasSubtitle")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const count = getToolsForCategory(category.slug).length;
            const live = isCategoryPublished(category.slug);
            const cardContent = (
              <>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary">
                  <CategoryIcon name={category.icon} />
                </span>
                <div>
                  <h3 className="text-base font-bold">{category.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{category.shortDescription}</p>
                  <Badge className="mt-3">
                    {live ? t("home.toolsLive", { count }) : t("home.comingSoon")}
                  </Badge>
                </div>
              </>
            );

            return live ? (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="block rounded-2xl focus-visible:outline-offset-4"
              >
                <Card className="flex h-full gap-4 transition-colors hover:border-primary">
                  {cardContent}
                </Card>
              </Link>
            ) : (
              <Card key={category.slug} className="flex gap-4">
                {cardContent}
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <Card>
          <LockKeyhole className="size-6 text-primary" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-bold">{t("home.privacyTitle")}</h2>
          <p className="mt-2 text-sm leading-7 text-muted">{t("home.privacyText")}</p>
        </Card>
        <Card>
          <Sparkles className="size-6 text-primary" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-bold">{t("home.simpleTitle")}</h2>
          <p className="mt-2 text-sm leading-7 text-muted">{t("home.simpleText")}</p>
        </Card>
      </section>

      {popular.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">{t("home.popularTitle")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <Link href="/about" className="text-sm font-semibold text-primary hover:underline">
          {t("common.learnMore")}
        </Link>
      </section>
    </Container>
  );
}
