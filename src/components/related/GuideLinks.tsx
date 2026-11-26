import Link from "next/link";
import type { GuideContent } from "@/content/guides/types";
import { t } from "@/i18n/translations";

interface GuideLinksProps {
  guides: GuideContent[];
}

export function GuideLinks({ guides }: GuideLinksProps) {
  const visibleGuides = guides.slice(0, 3);

  if (visibleGuides.length === 0) return null;

  return (
    <section className="mx-auto mt-14 max-w-3xl">
      <h2 className="text-xl font-bold tracking-tight">{t("guides.relatedGuides")}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {visibleGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold hover:text-primary"
          >
            {guide.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
