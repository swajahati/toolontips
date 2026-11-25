export type Plan = "free" | "pro";

export interface Entitlements {
  plan: Plan;
  adsEnabled: boolean;
  unlimitedUsage: boolean;
  maxPagesPerJob: number | null;
}

export const freeEntitlements: Entitlements = {
  plan: "free",
  adsEnabled: true,
  unlimitedUsage: false,
  maxPagesPerJob: 100,
};

export const proEntitlements: Entitlements = {
  plan: "pro",
  adsEnabled: false,
  unlimitedUsage: true,
  maxPagesPerJob: null,
};

export function getEntitlements(): Entitlements {
  return freeEntitlements;
}

export function isPro(entitlements: Entitlements = getEntitlements()): boolean {
  return entitlements.plan === "pro";
}
