import type { NextRequest } from "next/server";

const EU_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE",
]);

function cleanCode(value: string | null): string {
  if (!value) return "";
  const parts = value.toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function normalizeCountry(value: string | null): string {
  const code = cleanCode(value);
  if (code === "UK") return "GB";
  if (["US", "GB", "CA", "AU", "IN", "PK"].includes(code)) return code;
  if (EU_CODES.has(code) || code === "EU") return "EU";
  return "US";
}

function normalizeRegion(value: string | null, countryCode: string): string {
  const raw = (value ?? "").trim().toUpperCase();
  const aliases: Record<string, string> = {
    SCOTLAND: "SCT",
    ENGLAND: "ENG",
    WALES: "WLS",
    "NORTHERN IRELAND": "NIR",
    PUNJAB: countryCode === "PK" ? "PB" : "",
    SINDH: "SD",
    "KHYBER PAKHTUNKHWA": "KP",
    BALOCHISTAN: "BA",
    "ISLAMABAD CAPITAL TERRITORY": "ICT",
    "GILGIT-BALTISTAN": "GB",
    "AZAD JAMMU AND KASHMIR": "AJ",
  };

  if (aliases[raw]) return aliases[raw];
  const code = cleanCode(value);
  if ((code.length === 2 || code.length === 3) && !/^\d+$/.test(code)) return code;
  return "";
}

export async function GET(request: NextRequest) {
  const headers = request.headers;
  const countryFromCloudflare = headers.get("cf-ipcountry");
  const regionFromCloudflare = headers.get("cf-region") ?? headers.get("cf-region-code");
  const countryFromVercel = headers.get("x-vercel-ip-country");
  const regionFromVercel =
    headers.get("x-vercel-ip-country-region") ?? headers.get("x-vercel-ip-subdivision");

  const country = normalizeCountry(countryFromCloudflare || countryFromVercel);
  const region = normalizeRegion(regionFromCloudflare || regionFromVercel, country);

  const source = countryFromCloudflare
    ? "cloudflare"
    : countryFromVercel
      ? "vercel"
      : "default";

  return Response.json({ country, region, source });
}
