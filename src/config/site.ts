export const siteConfig = {
  name: "Toolontips",
  domain: "toolsontip.com",
  url: "https://toolsontip.com",
  description:
    "Free online tools for PDFs, images, finance, text and everyday tasks. Open a tool, use it in your browser and download the result without signing up.",
  locale: "en",
  direction: "ltr" as const,
  defaultCountry: "US",
  lastUpdated: "2026-11-24",
  copyrightYear: 2026,
  adsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-7213784644451419",
  owner: {
    name: process.env.NEXT_PUBLIC_OWNER_NAME ?? "Toolontips team",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@toolsontip.com",
    address: process.env.NEXT_PUBLIC_OWNER_ADDRESS ?? "Available by email request",
  },
};
