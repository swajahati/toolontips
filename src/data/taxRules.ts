export interface IncomeBracket {
  upTo: number | null;
  rate: number;
  base: number;
}

export interface IncomeTaxRule {
  code: string;
  name: string;
  currency: string;
  locale: string;
  taxYear: string;
  lastUpdated: string;
  sourceName: string;
  sourceUrl: string;
  standardDeduction: number;
  brackets: IncomeBracket[];
  notes: string[];
}

export const incomeTaxRules: IncomeTaxRule[] = [
  {
    code: "US",
    name: "United States (federal, single filer)",
    currency: "USD",
    locale: "en-US",
    taxYear: "2026",
    lastUpdated: "2026-11-24",
    sourceName: "Internal Revenue Service, Rev. Proc. 2025-32",
    sourceUrl: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
    standardDeduction: 16100,
    brackets: [
      { upTo: 12400, rate: 0.1, base: 0 },
      { upTo: 50400, rate: 0.12, base: 1240 },
      { upTo: 105700, rate: 0.22, base: 5800 },
      { upTo: 201775, rate: 0.24, base: 18094 },
      { upTo: 256225, rate: 0.32, base: 39226 },
      { upTo: 640600, rate: 0.35, base: 56226 },
      { upTo: null, rate: 0.37, base: 199086 },
    ],
    notes: [
      "Federal only; state and local income taxes are not included.",
      "Uses the 2026 standard deduction for a single filer.",
      "FICA, Medicare, credits and itemised deductions are not included.",
    ],
  },
  {
    code: "GB",
    name: "United Kingdom (England, Wales and Northern Ireland)",
    currency: "GBP",
    locale: "en-GB",
    taxYear: "2026/27",
    lastUpdated: "2026-11-24",
    sourceName: "HM Revenue & Customs, Income Tax rates and Personal Allowances",
    sourceUrl: "https://www.gov.uk/income-tax-rates",
    standardDeduction: 12570,
    brackets: [
      { upTo: 12570, rate: 0, base: 0 },
      { upTo: 50270, rate: 0.2, base: 0 },
      { upTo: 125140, rate: 0.4, base: 7540 },
      { upTo: null, rate: 0.45, base: 37500 },
    ],
    notes: [
      "Excludes Scotland, where income tax bands differ.",
      "The personal allowance is reduced by £1 for every £2 over £100,000 and disappears at £125,140.",
      "National Insurance, pension contributions and benefits are not included.",
    ],
  },
  {
    code: "GB-SCT",
    name: "Scotland (Scottish Income Tax)",
    currency: "GBP",
    locale: "en-GB",
    taxYear: "2026/27",
    lastUpdated: "2026-11-24",
    sourceName: "Scottish Government, Scottish Income Tax rates and bands 2026 to 2027",
    sourceUrl: "https://www.gov.scot/publications/scottish-income-tax-rates-and-bands/pages/2026-to-2027",
    standardDeduction: 12570,
    brackets: [
      { upTo: 12570, rate: 0, base: 0 },
      { upTo: 16537, rate: 0.19, base: 0 },
      { upTo: 29526, rate: 0.2, base: 753.73 },
      { upTo: 43662, rate: 0.21, base: 3351.53 },
      { upTo: 75000, rate: 0.42, base: 6320.09 },
      { upTo: 125140, rate: 0.45, base: 19482.05 },
      { upTo: null, rate: 0.48, base: 47701.55 },
    ],
    notes: [
      "Uses Scottish rates for non-savings, non-dividend income.",
      "The UK personal allowance is reduced by £1 for every £2 over £100,000 and disappears at £125,140.",
      "National Insurance, pension contributions, savings income, dividends and reliefs are not included.",
    ],
  },
  {
    code: "CA",
    name: "Canada (federal only)",
    currency: "CAD",
    locale: "en-CA",
    taxYear: "2026",
    lastUpdated: "2026-11-24",
    sourceName: "Canada Revenue Agency, 2026 federal income tax brackets",
    sourceUrl:
      "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
    standardDeduction: 0,
    brackets: [
      { upTo: 58523, rate: 0.14, base: 0 },
      { upTo: 117045, rate: 0.205, base: 8193.22 },
      { upTo: 181440, rate: 0.26, base: 19968.89 },
      { upTo: 258482, rate: 0.29, base: 37573.35 },
      { upTo: null, rate: 0.33, base: 59909.47 },
    ],
    notes: [
      "Federal tax only; provincial and territorial tax is not included.",
      "Uses the basic personal amount as zero in this estimate.",
      "CPP, EI, credits and deductions are not included.",
    ],
  },
  {
    code: "AU",
    name: "Australia (resident rates)",
    currency: "AUD",
    locale: "en-AU",
    taxYear: "2026/27",
    lastUpdated: "2026-11-24",
    sourceName: "Australian Taxation Office, Resident tax rates",
    sourceUrl: "https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents",
    standardDeduction: 0,
    brackets: [
      { upTo: 18200, rate: 0, base: 0 },
      { upTo: 45000, rate: 0.15, base: 0 },
      { upTo: 135000, rate: 0.3, base: 4020 },
      { upTo: 190000, rate: 0.37, base: 31020 },
      { upTo: null, rate: 0.45, base: 51370 },
    ],
    notes: [
      "Uses Australian resident rates.",
      "Medicare levy, surcharge, offsets and deductions are not included.",
    ],
  },
  {
    code: "IN",
    name: "India (new regime, salaried)",
    currency: "INR",
    locale: "en-IN",
    taxYear: "2026/27",
    lastUpdated: "2026-11-24",
    sourceName: "Income Tax Department and Ministry of Finance, Budget 2026-27",
    sourceUrl: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2221416&lang=1&reg=3",
    standardDeduction: 75000,
    brackets: [
      { upTo: 400000, rate: 0, base: 0 },
      { upTo: 800000, rate: 0.05, base: 0 },
      { upTo: 1200000, rate: 0.1, base: 20000 },
      { upTo: 1600000, rate: 0.15, base: 60000 },
      { upTo: 2000000, rate: 0.2, base: 120000 },
      { upTo: 2400000, rate: 0.25, base: 200000 },
      { upTo: null, rate: 0.3, base: 320000 },
    ],
    notes: [
      "Uses the new tax regime with the ₹75,000 salaried standard deduction.",
      "Includes a rebate of up to ₹60,000 where taxable income is ₹12,00,000 or less.",
      "Health and education cess, surcharge, other deductions and regime choice are not included.",
    ],
  },
  {
    code: "PK",
    name: "Pakistan (salaried individual, Finance Act 2026)",
    currency: "PKR",
    locale: "en-PK",
    taxYear: "2026/27",
    lastUpdated: "2026-11-24",
    sourceName: "Federal Board of Revenue, Circular No. 02 of 2026-27",
    sourceUrl: "https://download1.fbr.gov.pk/Docs/202698139527880CircularNo.2of2026-27.pdf",
    standardDeduction: 0,
    brackets: [
      { upTo: 600000, rate: 0, base: 0 },
      { upTo: 1200000, rate: 0.01, base: 0 },
      { upTo: 2200000, rate: 0.11, base: 6000 },
      { upTo: 3200000, rate: 0.2, base: 116000 },
      { upTo: 4100000, rate: 0.25, base: 316000 },
      { upTo: 5600000, rate: 0.29, base: 541000 },
      { upTo: 7000000, rate: 0.32, base: 976000 },
      { upTo: null, rate: 0.35, base: 1424000 },
    ],
    notes: [
      "Uses the reduced salary-income slabs introduced by the Finance Act 2026.",
      "Assumes resident salaried income with no other deductions, credits, super tax or withholding tax.",
      "Provincial taxes on services and local levies are not included.",
    ],
  },
];

export interface VatRate {
  label: string;
  rate: number;
}

export interface VatRule {
  code: string;
  name: string;
  currency: string;
  locale: string;
  taxYear: string;
  lastUpdated: string;
  sourceName: string;
  sourceUrl: string;
  rates: VatRate[];
  notes: string[];
}

export const vatRules: VatRule[] = [
  {
    code: "US",
    name: "United States (no federal VAT)",
    currency: "USD",
    locale: "en-US",
    taxYear: "2026",
    lastUpdated: "2026-11-24",
    sourceName: "No federal VAT or GST; state and local rates vary",
    sourceUrl: "",
    rates: [{ label: "Custom rate", rate: 0 }],
    notes: [
      "The United States has no federal VAT or GST.",
      "Enter your own state and local sales tax rate if you need an estimate.",
    ],
  },
  {
    code: "GB",
    name: "United Kingdom VAT",
    currency: "GBP",
    locale: "en-GB",
    taxYear: "current",
    lastUpdated: "2026-11-24",
    sourceName: "HM Revenue & Customs, VAT rates",
    sourceUrl: "https://www.gov.uk/vat-rates",
    rates: [
      { label: "Standard", rate: 0.2 },
      { label: "Reduced", rate: 0.05 },
      { label: "Zero-rated", rate: 0 },
    ],
    notes: ["Item eligibility rules are not checked by this tool."],
  },
  {
    code: "PK",
    name: "Pakistan sales tax on goods",
    currency: "PKR",
    locale: "en-PK",
    taxYear: "current to 2026-06-30",
    lastUpdated: "2026-11-24",
    sourceName: "Federal Board of Revenue, Sales Tax Act 1990 updated to 30 June 2026",
    sourceUrl: "https://download1.fbr.gov.pk/Docs/20267171373418951SalesTaxAct1990updatedupto30.06.2026.pdf",
    rates: [
      { label: "Standard goods", rate: 0.18 },
      { label: "Zero-rated", rate: 0 },
    ],
    notes: [
      "The federal standard rate applies to taxable goods; item schedules and exemptions can change the rate.",
      "Sales tax on services is set by federal and provincial authorities and is not looked up here.",
      "A 4% further tax can apply to unregistered or non-active taxpayers under the Sales Tax Act.",
    ],
  },
  {
    code: "CA",
    name: "Canada GST/HST",
    currency: "CAD",
    locale: "en-CA",
    taxYear: "current",
    lastUpdated: "2026-11-24",
    sourceName: "Canada Revenue Agency, GST/HST rates",
    sourceUrl:
      "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-place-supply.html",
    rates: [
      { label: "GST (non-participating province)", rate: 0.05 },
      { label: "Ontario HST", rate: 0.13 },
      { label: "Nova Scotia HST", rate: 0.14 },
      { label: "Other participating provinces HST", rate: 0.15 },
      { label: "Zero-rated", rate: 0 },
    ],
    notes: ["Provincial PST and Quebec QST are separate and are not included."],
  },
  {
    code: "AU",
    name: "Australia GST",
    currency: "AUD",
    locale: "en-AU",
    taxYear: "current",
    lastUpdated: "2026-11-24",
    sourceName: "Australian Taxation Office, How GST works",
    sourceUrl:
      "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/how-gst-works",
    rates: [
      { label: "Standard GST", rate: 0.1 },
      { label: "GST-free", rate: 0 },
    ],
    notes: ["If a price already includes GST, divide by 11 to find the GST amount."],
  },
  {
    code: "IN",
    name: "India GST",
    currency: "INR",
    locale: "en-IN",
    taxYear: "current from 2025-09-22",
    lastUpdated: "2026-11-24",
    sourceName: "CBIC Notification No. 09/2025-Integrated Tax (Rate)",
    sourceUrl:
      "https://courier.cbic.gov.in/ECCS/advisory/2025/NOTIFICATION%20NO.%209_2025-INTEGRATED%20TAX%20%28RATE%29%20-1759486719.pdf",
    rates: [
      { label: "Main reduced", rate: 0.05 },
      { label: "Main standard", rate: 0.18 },
      { label: "Special select items", rate: 0.4 },
      { label: "Custom rate", rate: 0 },
    ],
    notes: [
      "India GST is item, HSN and SAC specific.",
      "This tool does not look up the correct rate for a product; check the official schedule.",
    ],
  },
  {
    code: "EU-VAT",
    name: "European Union VAT",
    currency: "EUR",
    locale: "en-IE",
    taxYear: "current framework",
    lastUpdated: "2026-11-24",
    sourceName: "European Commission, VAT rates",
    sourceUrl: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/vat-rates_en",
    rates: [{ label: "Custom member-state rate", rate: 0 }],
    notes: [
      "There is no single EU VAT rate.",
      "Choose the rate used in the relevant member state and check its official schedule.",
    ],
  },
];

export function getIncomeTaxRule(code: string): IncomeTaxRule {
  return incomeTaxRules.find((rule) => rule.code === code) ?? incomeTaxRules[0];
}

export function getIncomeTaxRuleForLocation(countryCode: string, regionCode: string): IncomeTaxRule {
  if (countryCode === "GB-SCT" || (countryCode === "GB" && regionCode === "SCT")) {
    return getIncomeTaxRule("GB-SCT");
  }
  return getIncomeTaxRule(countryCode);
}

export function getVatRule(code: string): VatRule {
  return vatRules.find((rule) => rule.code === code) ?? vatRules[0];
}

export function getVatRuleForLocation(countryCode: string): VatRule {
  if (countryCode === "GB-SCT") return getVatRule("GB");
  if (countryCode === "EU") return getVatRule("EU-VAT");
  return getVatRule(countryCode);
}

export function getVatRateForRegion(rule: VatRule, regionCode: string): number | null {
  if (rule.code === "GB") return 0.2;
  if (rule.code === "PK") return 0.18;
  if (rule.code !== "CA") return null;

  const canadaRates: Record<string, number> = {
    AB: 0.05,
    BC: 0.05,
    MB: 0.05,
    NB: 0.15,
    NL: 0.15,
    NS: 0.14,
    NT: 0.05,
    NU: 0.05,
    ON: 0.13,
    PE: 0.15,
    QC: 0.15,
    SK: 0.05,
    YT: 0.05,
  };

  return canadaRates[regionCode] ?? 0.05;
}
