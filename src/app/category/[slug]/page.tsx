import { getPublishedCategories } from "@/lib/registry";

export { default, generateMetadata } from "@/templates/CategoryPage";

export const instant = false;

export function generateStaticParams() {
  return getPublishedCategories().map((category) => ({ slug: category.slug }));
}
