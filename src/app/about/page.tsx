import type { Metadata } from "next";
import { ProsePage } from "@/components/content/ProsePage";
import { aboutContent } from "@/content/pages/about";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: aboutContent.title,
  description: aboutContent.description,
  path: "/about",
});

export default function AboutPage() {
  return <ProsePage content={aboutContent} path="/about" />;
}
