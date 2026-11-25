import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ToolCard } from "@/components/related/ToolCard";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { ButtonLink } from "@/components/ui/Button";
import { t } from "@/i18n/translations";
import { getPopularTools } from "@/lib/registry";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Page not found",
  description: "The page you asked for could not be found on Toolontips.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  const popular = getPopularTools();

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">{t("notFound.body")}</p>
        <div className="mt-6">
          <ButtonLink href="/" variant="secondary">
            {t("common.backHome")}
          </ButtonLink>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <h2 className="text-lg font-bold">{t("notFound.searchTitle")}</h2>
        <div className="mt-3">
          <GlobalSearch large />
        </div>
      </div>

      {popular.length > 0 && (
        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-lg font-bold">{t("notFound.popular")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-12 text-center text-sm">
        <Link href="/about" className="text-primary hover:underline">
          {t("nav.about")}
        </Link>
      </p>
    </Container>
  );
}
