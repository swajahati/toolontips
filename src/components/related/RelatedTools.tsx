import { ToolCard } from "@/components/related/ToolCard";
import { t } from "@/i18n/translations";
import { getToolBySlug } from "@/lib/registry";

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold tracking-tight">{t("related.title")}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
