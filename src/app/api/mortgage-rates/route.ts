import type { NextRequest } from "next/server";
import { getMortgageRegion, getMortgageSubRegion } from "@/config/mortgageRegions";

export async function GET(request: NextRequest) {
  const countryCode = request.nextUrl.searchParams.get("country") ?? "US";
  const regionCode = request.nextUrl.searchParams.get("region") ?? "";

  const country = getMortgageRegion(countryCode);
  const region = getMortgageSubRegion(country.code, regionCode);
  const propertyTaxPercent = region?.propertyTaxPercent ?? country.propertyTaxPercent;

  return Response.json({
    country: country.code,
    region: region?.code ?? "",
    currency: country.currency,
    locale: country.locale,
    ratePercent: country.ratePercent,
    rateNote: country.rateNote,
    rateSource: country.rateSource,
    standardYears: country.standardYears,
    downPaymentPercent: country.downPaymentPercent,
    propertyTaxPercent,
    propertyTaxSource: country.propertyTaxSource,
    typicalHomePrice: region?.typicalHomePrice ?? country.typicalHomePrice,
    insuranceAnnual: country.insuranceAnnual,
    feesAnnual: country.feesAnnual,
    mortgageInsuranceRate: country.mortgageInsuranceRate,
  });
}
