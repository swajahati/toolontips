const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-XXXXXXXXXXXXXXXX";
const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "0000000000";

export const adConfig = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
  publisherId,
  slotId,
  configured: !publisherId.includes("XXXXXXXXXXXXXXXX") && slotId !== "0000000000",
  width: 300,
  height: 250,
};

export const ADSENSE_LOADED_EVENT = "toolontips:adsense-loaded";
