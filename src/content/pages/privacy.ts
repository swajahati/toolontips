import type { PageContent } from "./types";

export const privacyContent: PageContent = {
  title: "Privacy Policy",
  description:
    "How Toolontips handles cookies, consent, browser-based processing and third-party advertising partners.",
  updated: "2026-11-23",
  intro:
    "This policy explains what happens to information when you use Toolontips. It is written for ordinary readers, and it describes the site as it is built rather than features we plan to add later.",
  sections: [
    {
      heading: "The short version",
      paragraphs: [
        "You do not need an account to use this site. Tools that work in your browser are designed to read your file or text on your device and to create the download there. We do not ask you to upload those inputs to us. We do not sell personal information, and we do not show advertising before you have made a choice where a choice is required.",
        "Advertising is currently switched off. When it is switched on, third parties such as Google may set cookies as described below. The footer link called Change cookie choices reopens your decision at any time.",
      ],
    },
    {
      heading: "Information we do not collect",
      paragraphs: [
        "For tools that process data in the browser, we do not receive a copy of what you put in. The items below describe what that means in practice.",
      ],
      bullets: [
        "No account details, passwords or profile information",
        "No upload of files you choose for browser-based tools",
        "No copy of text you paste into text utilities",
        "No payment information, because there is no paid plan today",
      ],
    },
    {
      heading: "Information handled by other parties",
      paragraphs: [
        "A website cannot be served without ordinary technical information passing between your browser and the company that hosts it. That normally includes your IP address, browser type and the address of the page you requested. Hosting and security providers handle this as part of keeping the site available.",
        "When advertising is enabled, Google AdSense and its partners may use cookies or similar technologies to decide which advert to show and to measure performance. Google's own consent and advertising infrastructure may also be involved. These parties act under their own privacy terms, not ours.",
      ],
      bullets: [
        "Google AdSense and Google advertising products",
        "Google consent and cookie infrastructure",
        "Hosting and security providers serving the site",
      ],
    },
    {
      heading: "Cookies and consent",
      paragraphs: [
        "Strictly necessary storage keeps your theme, region and consent decision working. Your consent choice is stored in your browser's local storage so we can remember it on your next visit. It is not used to identify you to advertisers.",
        "Before advertising is enabled on the live site, a Google-certified consent management platform will be connected so regional rules are applied automatically. The banner shown during development records your choice locally and loads no advertising or tracking scripts at all. Non-essential technologies are not used before you choose where consent is required.",
      ],
    },
    {
      heading: "Legal bases and your rights",
      paragraphs: [
        "If you are in the European Economic Area, the United Kingdom or Switzerland, we rely on consent for non-essential cookies and on legitimate interests for keeping the site secure and working. You may have the right to access, correct, delete, restrict or object to processing, and to receive data you provided in a portable form.",
        "If you are in California, you may have rights to know, delete and correct personal information, and to opt out of sale or sharing. Toolontips does not sell personal information. To exercise a right, use the Contact page and tell us which right you want to use.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "Toolontips is not directed at children under 13, and we do not knowingly collect personal information from them. If you believe a child has sent us personal information, contact us so we can remove it.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We update the date at the top of this page when the policy changes. Material changes will be described in plain language. The owner details on the Contact page identify who to ask if anything here is unclear.",
      ],
    },
  ],
};
