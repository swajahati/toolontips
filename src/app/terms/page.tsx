import type { Metadata } from "next";
import { ProsePage } from "@/components/content/ProsePage";
import { termsContent } from "@/content/pages/terms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: termsContent.title,
  description: termsContent.description,
  path: "/terms",
});

export default function TermsPage() {
  return <ProsePage content={termsContent} path="/terms" />;
}
