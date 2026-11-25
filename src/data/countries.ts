import type { Country } from "@/types";

export const countries: Country[] = [
  { code: "US", name: "United States", currency: "USD", locale: "en-US", kind: "country" },
  { code: "GB", name: "United Kingdom", currency: "GBP", locale: "en-GB", kind: "country" },
  { code: "CA", name: "Canada", currency: "CAD", locale: "en-CA", kind: "country" },
  { code: "AU", name: "Australia", currency: "AUD", locale: "en-AU", kind: "country" },
  { code: "IN", name: "India", currency: "INR", locale: "en-IN", kind: "country" },
  { code: "PK", name: "Pakistan", currency: "PKR", locale: "en-PK", kind: "country" },
  {
    code: "EU-VAT",
    name: "European Union (VAT)",
    currency: "EUR",
    locale: "en-IE",
    kind: "region",
  },
];

export function getCountry(code: string): Country {
  return countries.find((country) => country.code === code) ?? countries[0];
}
