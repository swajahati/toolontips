import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { siteConfig } from "@/config/site";
import { getAllTools, getPublishedCategories } from "@/lib/registry";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/guides",
    ...guides.map((guide) => `/guides/${guide.slug}`),
    ...getPublishedCategories().map((category) => `/category/${category.slug}`),
    ...getAllTools().map((tool) => `/${tool.slug}`),
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: siteConfig.lastUpdated,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
    alternates: { languages: { en: absoluteUrl(path) } },
  }));
}
