import type { Metadata } from "next";
import { ProsePage } from "@/components/content/ProsePage";
import { disclaimerContent } from "@/content/pages/disclaimer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: disclaimerContent.title,
  description: disclaimerContent.description,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return <ProsePage content={disclaimerContent} path="/disclaimer" />;
}
