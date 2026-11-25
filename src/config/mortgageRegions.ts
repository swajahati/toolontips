export interface MortgageSubRegion {
  code: string;
  name: string;
  propertyTaxPercent: number;
  typicalHomePrice?: number;
}

export interface MortgageSource {
  label: string;
  url?: string;
  checked: string;
}

export interface MortgageRegion {
  code: string;
  name: string;
  currency: string;
  locale: string;
  ratePercent: number;
  rateNote: string;
  rateSource: MortgageSource;
  typicalHomePrice: number;
  standardYears: number;
  downPaymentPercent: number;
  propertyTaxPercent: number;
  propertyTaxSource: MortgageSource;
  insuranceAnnual: number;
  feesAnnual: number;
  mortgageInsuranceRate: number;
  regions: MortgageSubRegion[];
}

const usPropertyTaxSource: MortgageSource = {
  label: "Statewide estimates from Tax Foundation property tax data; local rates vary by city, county and school district.",
  url: "https://taxfoundation.org/data/all/state/property-taxes-by-state-data/",
  checked: "2024 data, checked 2026-11-24",
};

const canadaPropertyTaxSource: MortgageSource = {
  label: "Provincial estimates from municipal property tax surveys; your municipality sets the actual rate.",
  checked: "Checked 2026-11-24",
};

const genericPropertyTaxSource: MortgageSource = {
  label: "Broad estimate only. Local council, municipal or state taxes can be very different.",
  checked: "Checked 2026-11-24",
};

const pakistanPropertyTaxSource: MortgageSource = {
  label: "Pakistan has no single national property tax rate used for mortgages. Enter your local municipal or board rate before relying on the result.",
  checked: "Checked 2026-11-24",
};

export const mortgageRegions: MortgageRegion[] = [
  {
    code: "US",
    name: "United States",
    currency: "USD",
    locale: "en-US",
    ratePercent: 7.28,
    rateNote: "Freddie Mac 30-year fixed-rate national average.",
    rateSource: {
      label: "Freddie Mac Primary Mortgage Market Survey",
      url: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-average-728-0",
      checked: "2026-11-19",
    },
    typicalHomePrice: 350000,
    standardYears: 30,
    downPaymentPercent: 20,
    propertyTaxPercent: 1.1,
    propertyTaxSource: usPropertyTaxSource,
    insuranceAnnual: 1800,
    feesAnnual: 0,
    mortgageInsuranceRate: 0.5,
    regions: [
      { code: "AL", name: "Alabama", propertyTaxPercent: 0.47 },
      { code: "AK", name: "Alaska", propertyTaxPercent: 1.09 },
      { code: "AZ", name: "Arizona", propertyTaxPercent: 0.72 },
      { code: "AR", name: "Arkansas", propertyTaxPercent: 0.63 },
      { code: "CA", name: "California", propertyTaxPercent: 0.76, typicalHomePrice: 800000 },
      { code: "CO", name: "Colorado", propertyTaxPercent: 0.7 },
      { code: "CT", name: "Connecticut", propertyTaxPercent: 1.75 },
      { code: "DE", name: "Delaware", propertyTaxPercent: 0.5 },
      { code: "FL", name: "Florida", propertyTaxPercent: 0.98 },
      { code: "GA", name: "Georgia", propertyTaxPercent: 0.91 },
      { code: "HI", name: "Hawaii", propertyTaxPercent: 0.32, typicalHomePrice: 850000 },
      { code: "ID", name: "Idaho", propertyTaxPercent: 0.69 },
      { code: "IL", name: "Illinois", propertyTaxPercent: 1.8 },
      { code: "IN", name: "Indiana", propertyTaxPercent: 0.84 },
      { code: "IA", name: "Iowa", propertyTaxPercent: 1.16 },
      { code: "KS", name: "Kansas", propertyTaxPercent: 1.16 },
      { code: "KY", name: "Kentucky", propertyTaxPercent: 0.87 },
      { code: "LA", name: "Louisiana", propertyTaxPercent: 0.51 },
      { code: "ME", name: "Maine", propertyTaxPercent: 1.11 },
      { code: "MD", name: "Maryland", propertyTaxPercent: 1.08 },
      { code: "MA", name: "Massachusetts", propertyTaxPercent: 1.06, typicalHomePrice: 650000 },
      { code: "MI", name: "Michigan", propertyTaxPercent: 1.32 },
      { code: "MN", name: "Minnesota", propertyTaxPercent: 1.1 },
      { code: "MS", name: "Mississippi", propertyTaxPercent: 0.55 },
      { code: "MO", name: "Missouri", propertyTaxPercent: 0.93 },
      { code: "MT", name: "Montana", propertyTaxPercent: 0.84 },
      { code: "NE", name: "Nebraska", propertyTaxPercent: 1.16 },
      { code: "NV", name: "Nevada", propertyTaxPercent: 0.79 },
      { code: "NH", name: "New Hampshire", propertyTaxPercent: 1.96 },
      { code: "NJ", name: "New Jersey", propertyTaxPercent: 2.27, typicalHomePrice: 600000 },
      { code: "NM", name: "New Mexico", propertyTaxPercent: 0.77 },
      { code: "NY", name: "New York", propertyTaxPercent: 1.39, typicalHomePrice: 550000 },
      { code: "NC", name: "North Carolina", propertyTaxPercent: 0.83 },
      { code: "ND", name: "North Dakota", propertyTaxPercent: 0.97 },
      { code: "OH", name: "Ohio", propertyTaxPercent: 1.55 },
      { code: "OK", name: "Oklahoma", propertyTaxPercent: 0.85 },
      { code: "OR", name: "Oregon", propertyTaxPercent: 0.93 },
      { code: "PA", name: "Pennsylvania", propertyTaxPercent: 1.52 },
      { code: "RI", name: "Rhode Island", propertyTaxPercent: 1.35 },
      { code: "SC", name: "South Carolina", propertyTaxPercent: 0.65 },
      { code: "SD", name: "South Dakota", propertyTaxPercent: 1.14 },
      { code: "TN", name: "Tennessee", propertyTaxPercent: 0.7 },
      { code: "TX", name: "Texas", propertyTaxPercent: 1.77 },
      { code: "UT", name: "Utah", propertyTaxPercent: 0.63 },
      { code: "VT", name: "Vermont", propertyTaxPercent: 1.79 },
      { code: "VA", name: "Virginia", propertyTaxPercent: 0.84 },
      { code: "WA", name: "Washington", propertyTaxPercent: 0.92 },
      { code: "WV", name: "West Virginia", propertyTaxPercent: 0.8 },
      { code: "WI", name: "Wisconsin", propertyTaxPercent: 1.34 },
      { code: "WY", name: "Wyoming", propertyTaxPercent: 0.77 },
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    locale: "en-GB",
    ratePercent: 5.95,
    rateNote: "Typical UK fixed mortgage rate from Moneyfacts / HomeOwners Alliance.",
    rateSource: {
      label: "Moneyfacts average mortgage rates reported by HomeOwners Alliance",
      url: "https://hoa.org.uk/advice/guides-for-homeowners/for-owners/mortgage-rate-forecast/",
      checked: "2026-11-20",
    },
    typicalHomePrice: 300000,
    standardYears: 25,
    downPaymentPercent: 15,
    propertyTaxPercent: 0.6,
    propertyTaxSource: genericPropertyTaxSource,
    insuranceAnnual: 600,
    feesAnnual: 300,
    mortgageInsuranceRate: 0.3,
    regions: [
      { code: "ENG", name: "England", propertyTaxPercent: 0.6 },
      { code: "SCT", name: "Scotland", propertyTaxPercent: 0.6 },
      { code: "WLS", name: "Wales", propertyTaxPercent: 0.6 },
      { code: "NIR", name: "Northern Ireland", propertyTaxPercent: 0.6 },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    locale: "en-CA",
    ratePercent: 4.66,
    rateNote: "Bank of Canada average five-year fixed mortgage rate reported by HousingPortal.ca.",
    rateSource: {
      label: "Bank of Canada average mortgage rates via HousingPortal.ca",
      url: "https://housingportal.ca/mortgage-rates",
      checked: "September 2026 data, checked 2026-11-24",
    },
    typicalHomePrice: 500000,
    standardYears: 25,
    downPaymentPercent: 20,
    propertyTaxPercent: 0.75,
    propertyTaxSource: canadaPropertyTaxSource,
    insuranceAnnual: 900,
    feesAnnual: 250,
    mortgageInsuranceRate: 0.6,
    regions: [
      { code: "AB", name: "Alberta", propertyTaxPercent: 0.6 },
      { code: "BC", name: "British Columbia", propertyTaxPercent: 0.7, typicalHomePrice: 900000 },
      { code: "MB", name: "Manitoba", propertyTaxPercent: 0.85 },
      { code: "NB", name: "New Brunswick", propertyTaxPercent: 0.8 },
      { code: "NL", name: "Newfoundland and Labrador", propertyTaxPercent: 0.6 },
      { code: "NS", name: "Nova Scotia", propertyTaxPercent: 0.75 },
      { code: "NT", name: "Northwest Territories", propertyTaxPercent: 0.5 },
      { code: "NU", name: "Nunavut", propertyTaxPercent: 0.3 },
      { code: "ON", name: "Ontario", propertyTaxPercent: 0.8, typicalHomePrice: 650000 },
      { code: "PE", name: "Prince Edward Island", propertyTaxPercent: 0.8 },
      { code: "QC", name: "Quebec", propertyTaxPercent: 0.85 },
      { code: "SK", name: "Saskatchewan", propertyTaxPercent: 0.95 },
      { code: "YT", name: "Yukon", propertyTaxPercent: 0.5 },
    ],
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    locale: "en-AU",
    ratePercent: 6.16,
    rateNote: "Reserve Bank of Australia average owner-occupier principal and interest rate.",
    rateSource: {
      label: "Reserve Bank of Australia housing interest rate tables",
      url: "https://www.rba.gov.au/statistics/tables/interest-rates/",
      checked: "August 2026 data, checked 2026-11-24",
    },
    typicalHomePrice: 650000,
    standardYears: 30,
    downPaymentPercent: 20,
    propertyTaxPercent: 0.6,
    propertyTaxSource: genericPropertyTaxSource,
    insuranceAnnual: 1200,
    feesAnnual: 400,
    mortgageInsuranceRate: 0.5,
    regions: [
      { code: "NSW", name: "New South Wales", propertyTaxPercent: 0.6, typicalHomePrice: 900000 },
      { code: "VIC", name: "Victoria", propertyTaxPercent: 0.6, typicalHomePrice: 750000 },
      { code: "QLD", name: "Queensland", propertyTaxPercent: 0.55 },
      { code: "WA", name: "Western Australia", propertyTaxPercent: 0.55 },
      { code: "SA", name: "South Australia", propertyTaxPercent: 0.55 },
      { code: "TAS", name: "Tasmania", propertyTaxPercent: 0.5 },
      { code: "ACT", name: "Australian Capital Territory", propertyTaxPercent: 0.65 },
      { code: "NT", name: "Northern Territory", propertyTaxPercent: 0.5 },
    ],
  },
  {
    code: "IN",
    name: "India",
    currency: "INR",
    locale: "en-IN",
    ratePercent: 7.5,
    rateNote: "Indicative home loan rate only. Indian lenders price loans individually.",
    rateSource: {
      label: "Paisabazaar published home loan rate comparison",
      url: "https://www.paisabazaar.com/home-loan/interest-rates",
      checked: "November 2026, checked 2026-11-24",
    },
    typicalHomePrice: 8000000,
    standardYears: 20,
    downPaymentPercent: 20,
    propertyTaxPercent: 0.5,
    propertyTaxSource: genericPropertyTaxSource,
    insuranceAnnual: 5000,
    feesAnnual: 10000,
    mortgageInsuranceRate: 0,
    regions: [
      { code: "MH", name: "Maharashtra", propertyTaxPercent: 0.5, typicalHomePrice: 12000000 },
      { code: "DL", name: "Delhi", propertyTaxPercent: 0.5, typicalHomePrice: 11000000 },
      { code: "KA", name: "Karnataka", propertyTaxPercent: 0.5 },
      { code: "TN", name: "Tamil Nadu", propertyTaxPercent: 0.5 },
      { code: "UP", name: "Uttar Pradesh", propertyTaxPercent: 0.45 },
    ],
  },
  {
    code: "PK",
    name: "Pakistan",
    currency: "PKR",
    locale: "en-PK",
    ratePercent: 13.03,
    rateNote: "State Bank of Pakistan one-year KIBOR offer rate as an indicative lending benchmark.",
    rateSource: {
      label: "State Bank of Pakistan KIBOR rates",
      url: "https://www.sbp.org.pk/assets/document/kibor-rates-2-november-2026.pdf",
      checked: "2026-11-02",
    },
    typicalHomePrice: 10000000,
    standardYears: 20,
    downPaymentPercent: 20,
    propertyTaxPercent: 0,
    propertyTaxSource: pakistanPropertyTaxSource,
    insuranceAnnual: 25000,
    feesAnnual: 0,
    mortgageInsuranceRate: 0,
    regions: [
      { code: "PB", name: "Punjab", propertyTaxPercent: 0 },
      { code: "SD", name: "Sindh", propertyTaxPercent: 0 },
      { code: "KP", name: "Khyber Pakhtunkhwa", propertyTaxPercent: 0 },
      { code: "BA", name: "Balochistan", propertyTaxPercent: 0 },
      { code: "ICT", name: "Islamabad Capital Territory", propertyTaxPercent: 0 },
      { code: "GB", name: "Gilgit-Baltistan", propertyTaxPercent: 0 },
      { code: "AJ", name: "Azad Jammu and Kashmir", propertyTaxPercent: 0 },
    ],
  },
  {
    code: "EU",
    name: "European Union",
    currency: "EUR",
    locale: "en-IE",
    ratePercent: 3.5,
    rateNote: "Illustrative euro-area rate only. Rates vary by country, lender and fixed period.",
    rateSource: {
      label: "No single EU mortgage rate exists; replace this with your national lender rate.",
      checked: "Checked 2026-11-24",
    },
    typicalHomePrice: 300000,
    standardYears: 25,
    downPaymentPercent: 20,
    propertyTaxPercent: 0.5,
    propertyTaxSource: genericPropertyTaxSource,
    insuranceAnnual: 500,
    feesAnnual: 500,
    mortgageInsuranceRate: 0.3,
    regions: [
      { code: "DE", name: "Germany", propertyTaxPercent: 0.5 },
      { code: "FR", name: "France", propertyTaxPercent: 0.6 },
      { code: "ES", name: "Spain", propertyTaxPercent: 0.5 },
      { code: "IT", name: "Italy", propertyTaxPercent: 0.5 },
      { code: "IE", name: "Ireland", propertyTaxPercent: 0.3 },
      { code: "NL", name: "Netherlands", propertyTaxPercent: 0.4 },
    ],
  },
];

export function getMortgageRegion(code: string): MortgageRegion {
  return mortgageRegions.find((region) => region.code === code) ?? mortgageRegions[0];
}

export function getMortgageSubRegion(countryCode: string, code: string): MortgageSubRegion | null {
  const country = getMortgageRegion(countryCode);
  return country.regions.find((region) => region.code === code) ?? null;
}
