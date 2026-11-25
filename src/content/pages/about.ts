import type { PageContent } from "./types";

export const aboutContent: PageContent = {
  title: "About Toolontips",
  description:
    "Learn why Toolontips exists, how the tools are designed and what you can expect from this free site.",
  updated: "2026-11-23",
  intro:
    "Toolontips is a place to get small jobs done without creating an account or learning a new piece of software. This page explains what we are building, how we think about privacy and where the limits are.",
  sections: [
    {
      heading: "Why this site exists",
      paragraphs: [
        "You need to make a PDF smaller before sending it, count the words in a draft, or check what a monthly payment might look like. Those tasks should not require a sign-up, a download or a detour through somebody else's website. They should open, work and get out of your way.",
        "We are building the site one category at a time. The first areas are PDF and documents, images, finance and business, and text, developer and utility tools. Later domains will be added only when there is a real set of working tools behind them. A category does not appear in the main navigation until it has at least five finished tools.",
      ],
    },
    {
      heading: "How the tools are designed",
      paragraphs: [
        "Every tool gets one clear job. You see a place to add your input, a short options panel, a result area and a download button. The same layout is used across the site, so once you have used one tool you know where to look in the next. Empty, working, finished and error states are written out rather than left to guesswork.",
        "Where the work can be done in your browser, we do it there. That is a natural fit for PDFs, images, text and QR codes. Each tool will state what happens to your input in its own privacy note. We will not say a file stays on your device unless that is actually true.",
      ],
    },
    {
      heading: "How the site is funded",
      paragraphs: [
        "Toolontips is free to use. The plan is to fund it with Google AdSense advertising placed beside substantial written content, never inside a tool's working area and never on error pages. Ads are switched off during development and will stay off until the site is ready. A paid Pro option with no limits and no ads may come later; it is not available today.",
        "Advertising does not change how the tools work. A tool will never ask you to watch an ad before it runs, and there are no fake download buttons. Where consent rules apply, you will be asked before non-essential cookies are used, and you can change that choice from the footer.",
      ],
    },
    {
      heading: "What we do not claim",
      paragraphs: [
        "We are not a law firm, an accounting practice or a medical service. Calculators on this site are estimates. They explain their assumptions and show the country and the date behind any figure they use. Rules change, so you should check important numbers with a qualified professional in your own country.",
        "We also do not promise that a tool can do everything a full desktop application can. The aim is a fast, honest answer for the common case, with the limits written down where you can see them.",
      ],
    },
  ],
};
