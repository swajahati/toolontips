import type { PageContent } from "./types";

export const disclaimerContent: PageContent = {
  title: "Disclaimer",
  description:
    "Why finance, tax and health results on Toolontips are informational estimates and never a substitute for professional advice.",
  updated: "2026-11-23",
  intro:
    "Some tools on this site deal with subjects where a wrong number can matter a great deal. This page explains how to treat their results and where our responsibility ends.",
  sections: [
    {
      heading: "General information only",
      paragraphs: [
        "Everything on Toolontips is provided for general information and everyday convenience. It is not legal, accounting, tax, mortgage, insurance or medical advice. Reading a page or using a tool does not create a professional relationship between you and the site owner.",
      ],
    },
    {
      heading: "Finance and tax tools",
      paragraphs: [
        "Mortgage, salary, loan, percentage and VAT or GST tools work from the numbers you enter and the assumptions shown on the page. Small changes in inputs can change a result noticeably. Tax thresholds, rates and allowances vary by country and change over time.",
        "Where a figure depends on a country, the tool will name that country, identify the source of the figure, show the tax year it applies to and give a last-updated date. Even then, the result is an estimate. It cannot account for every personal circumstance, and it is not a filing or a formal quotation.",
      ],
      bullets: [
        "Check the country, source, tax year and last-updated date before trusting a figure",
        "Compare an important result with an official calculator or a qualified professional",
        "Do not use an estimate as the sole basis for a contract, filing or investment",
      ],
    },
    {
      heading: "Health and fitness tools",
      paragraphs: [
        "Health-related tools on this site are for general education only. They do not diagnose, treat or monitor a medical condition, and they do not replace advice from a doctor or another registered clinician. Talk to a professional before changing medication, diet or training because of something you read here. If you have severe symptoms or think you may be having a medical emergency, call your local emergency number.",
      ],
    },
    {
      heading: "No guarantees",
      paragraphs: [
        "We do not guarantee that any result is complete, accurate or suitable for your situation. We do not publish testimonials, success stories or user counts to imply a result is better than it is. If a tool has a known limitation, we say so on the tool page.",
      ],
    },
    {
      heading: "Using an estimate responsibly",
      paragraphs: [
        "Treat a tool as a quick first pass. Confirm anything important before you act on it, and keep a record of the inputs and assumptions you used so you can explain the number later.",
      ],
    },
  ],
};
