import { siteConfig } from "@/config/site";
import type { PageContent } from "./types";

export const contactContent: PageContent = {
  title: "Contact Toolontips",
  description:
    "Get in touch about a broken tool, a confusing instruction or a tool you would like to see next.",
  updated: "2026-11-24",
  intro:
    "This site is built to be simple, so there is no contact form to fill in and no account to sign in to. Use the details below if something is broken or if you have a suggestion.",
  sections: [
    {
      heading: "How to reach us",
      paragraphs: [
        "You can write to the owner using the details below. Plain email is fine; there is no preferred format and you do not need to include a subject code.",
      ],
      bullets: [
        `Owner: ${siteConfig.owner.name}`,
        `Email: ${siteConfig.owner.email}`,
        `Postal address: ${siteConfig.owner.address}`,
      ],
    },
    {
      heading: "What to include in a message",
      paragraphs: [
        "A little context makes a problem much easier to understand. If you can, include the details below. Please do not send personal or confidential documents just to show an issue.",
      ],
      bullets: [
        "The tool or page you were using",
        "What you expected to happen and what actually happened",
        "Your browser and device, if the problem only happens there",
        "A small sample file only if it is safe to share",
      ],
    },
    {
      heading: "What we can help with",
      paragraphs: [
        "We can help with broken tools, confusing instructions, accessibility problems and suggestions for a useful new tool. We read every message, but we cannot promise a reply to every one, and we cannot give personal finance, tax or health advice by email.",
        "If a published figure looks wrong, put the country, the rate and the date in your subject line. That makes it much quicker to find the source and check it.",
      ],
    },
    {
      heading: "Response times",
      paragraphs: [
        "Toolontips is maintained in spare time. We answer messages when we can, but there is no guaranteed support window and no support contract. For anything urgent or important, please rely on a qualified professional rather than waiting for a reply from us.",
      ],
    },
  ],
};
