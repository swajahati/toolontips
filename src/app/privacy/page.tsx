import type { Metadata } from "next";
import { ProsePage } from "@/components/content/ProsePage";
import { privacyContent } from "@/content/pages/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacyContent.title,
  description: privacyContent.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <ProsePage content={privacyContent} path="/privacy" />;
}
