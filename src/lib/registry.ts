import { categories } from "@/config/categories";
import { tools } from "@/config/tools";
import type { Category, Tool } from "@/types";

export const MIN_TOOLS_PER_CATEGORY = 5;

export function getToolsForCategory(slug: string): Tool[] {
  return tools.filter((tool) => tool.categorySlug === slug);
}

export function isCategoryPublished(slug: string): boolean {
  return getToolsForCategory(slug).length >= MIN_TOOLS_PER_CATEGORY;
}

export function getPublishedCategories(): Category[] {
  return categories.filter((category) => isCategoryPublished(category.slug));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getPopularTools(limit = 6): Tool[] {
  return tools.slice(0, limit);
}

export function searchTools(query: string, limit = 8): Tool[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return tools
    .filter((tool) =>
      [tool.name, tool.description, tool.categorySlug, ...tool.keywords]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    )
    .slice(0, limit);
}
