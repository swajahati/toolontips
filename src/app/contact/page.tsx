import type { Metadata } from "next";
import { ProsePage } from "@/components/content/ProsePage";
import { contactContent } from "@/content/pages/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: contactContent.title,
  description: contactContent.description,
  path: "/contact",
});

export default function ContactPage() {
  return <ProsePage content={contactContent} path="/contact" />;
}
