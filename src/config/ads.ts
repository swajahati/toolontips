const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-7213784644451419";
const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "0000000000";

const publisherConfigured = !publisherId.includes("XXXXXXXXXXXXXXXX");
const slotConfigured = slotId !== "0000000000";

export const adConfig = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
  publisherId,
  slotId,
  publisherConfigured,
  slotConfigured,
  configured: publisherConfigured && slotConfigured,
  width: 300,
  height: 250,
};

export const ADSENSE_LOADED_EVENT = "toolontips:adsense-loaded";
