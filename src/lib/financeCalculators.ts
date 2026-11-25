import type { IncomeTaxRule, VatRule } from "@/data/taxRules";

export interface SalaryInput {
  gross: number;
  period: "annual" | "monthly" | "weekly" | "hourly";
  hoursPerWeek: number;
}

export interface SalaryResult {
  grossAnnual: number;
  taxableIncome: number;
  annualTax: number;
  takeHomeAnnual: number;
  takeHomeMonthly: number;
  takeHomeWeekly: number;
  takeHomeHourly: number;
  effectiveRate: number;
  allowance: number;
}

export interface MortgageInput {
  principal: number;
  annualRate: number;
  years: number;
  frequency: "monthly" | "fortnightly" | "weekly";
  propertyTax: number;
  insurance: number;
  pmi: number;
  extra: number;
}

export interface MortgageResult {
  periodicPayment: number;
  allInPayment: number;
  totalInterest: number;
  totalPaid: number;
  payoffYears: number;
  periods: number;
  schedule: Array<{
    period: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export interface LoanInput {
  principal: number;
  annualRate: number;
  years: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface CompoundInput {
  initial: number;
  monthly: number;
  annualRate: number;
  years: number;
  frequency: "monthly" | "quarterly" | "yearly";
}

export interface CompoundResult {
  finalBalance: number;
  contributions: number;
  interest: number;
}

export interface ProfitMarginInput {
  mode: "margin" | "markup" | "sellingPrice";
  cost: number;
  value: number;
}

export interface ProfitMarginResult {
  sellingPrice: number;
  grossProfit: number;
  margin: number;
  markup: number;
}

export interface VatInput {
  amount: number;
  rate: number;
  mode: "add" | "remove";
}

export interface VatResult {
  netAmount: number;
  taxAmount: number;
  grossAmount: number;
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, value);
}

export function grossToAnnual(input: SalaryInput): number {
  const gross = clampNonNegative(input.gross);
  const hours = Math.max(1, clampNonNegative(input.hoursPerWeek) || 40);
  switch (input.period) {
    case "annual":
      return gross;
    case "monthly":
      return gross * 12;
    case "weekly":
      return gross * 52;
    case "hourly":
      return gross * hours * 52;
  }
}

function progressiveTax(taxable: number, brackets: IncomeTaxRule["brackets"]): number {
  const amount = clampNonNegative(taxable);
  for (let i = brackets.length - 1; i >= 0; i -= 1) {
    const bracket = brackets[i];
    const lower = i === 0 ? 0 : (brackets[i - 1].upTo ?? 0);
    if (amount > lower) {
      return bracket.base + (amount - lower) * bracket.rate;
    }
  }
  return 0;
}

function ukAllowance(grossAnnual: number, standardDeduction: number): number {
  if (grossAnnual <= 100000) return standardDeduction;
  const reduced = standardDeduction - (grossAnnual - 100000) / 2;
  return Math.max(0, reduced);
}

function ukTax(grossAnnual: number, rule: IncomeTaxRule): { tax: number; allowance: number; taxable: number } {
  const allowance = ukAllowance(grossAnnual, rule.standardDeduction);
  const taxable = Math.max(0, grossAnnual - allowance);
  const adjusted = rule.brackets.map((bracket, index) => {
    if (index === 0) {
      return { ...bracket, upTo: allowance };
    }
    if (index === 1) {
      const upper = bracket.upTo ?? 0;
      const base = Math.max(0, (upper - allowance) * bracket.rate);
      return { ...bracket, base };
    }
    return bracket;
  });
  const tax = progressiveTax(grossAnnual, adjusted);
  return { tax, allowance, taxable };
}

function scotlandTax(grossAnnual: number, rule: IncomeTaxRule): { tax: number; allowance: number; taxable: number } {
  const allowance = ukAllowance(grossAnnual, rule.standardDeduction);
  const taxable = Math.max(0, grossAnnual - allowance);
  const tax = progressiveTax(taxable, [
    { upTo: 3967, rate: 0.19, base: 0 },
    { upTo: 16956, rate: 0.2, base: 753.73 },
    { upTo: 31092, rate: 0.21, base: 3351.53 },
    { upTo: 62430, rate: 0.42, base: 6320.09 },
    { upTo: 125140, rate: 0.45, base: 19482.05 },
    { upTo: null, rate: 0.48, base: 47701.55 },
  ]);
  return { tax, allowance, taxable };
}

export function calculateSalary(input: SalaryInput, rule: IncomeTaxRule): SalaryResult {
  const grossAnnual = grossToAnnual(input);
  let annualTax = 0;
  let allowance = rule.standardDeduction;
  let taxableIncome = Math.max(0, grossAnnual - rule.standardDeduction);

  if (rule.code === "GB-SCT") {
    const scotland = scotlandTax(grossAnnual, rule);
    annualTax = scotland.tax;
    allowance = scotland.allowance;
    taxableIncome = scotland.taxable;
  } else if (rule.code === "GB") {
    const uk = ukTax(grossAnnual, rule);
    annualTax = uk.tax;
    allowance = uk.allowance;
    taxableIncome = uk.taxable;
  } else {
    annualTax = progressiveTax(taxableIncome, rule.brackets);
    if (rule.code === "IN" && taxableIncome <= 1200000) {
      annualTax = Math.min(annualTax, 60000);
    }
  }

  annualTax = Math.min(grossAnnual, Math.max(0, annualTax));
  const takeHomeAnnual = Math.max(0, grossAnnual - annualTax);
  const hours = Math.max(1, clampNonNegative(input.hoursPerWeek) || 40);

  return {
    grossAnnual,
    taxableIncome,
    annualTax,
    takeHomeAnnual,
    takeHomeMonthly: takeHomeAnnual / 12,
    takeHomeWeekly: takeHomeAnnual / 52,
    takeHomeHourly: takeHomeAnnual / (52 * hours),
    effectiveRate: grossAnnual > 0 ? annualTax / grossAnnual : 0,
    allowance,
  };
}

function periodsPerYear(frequency: MortgageInput["frequency"]): number {
  if (frequency === "weekly") return 52;
  if (frequency === "fortnightly") return 26;
  return 12;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const principal = clampNonNegative(input.principal);
  const annualRate = clampNonNegative(input.annualRate) / 100;
  const years = Math.max(0, clampNonNegative(input.years));
  const ppy = periodsPerYear(input.frequency);
  const totalPeriods = Math.max(1, Math.round(years * ppy));
  const periodicRate = annualRate / ppy;
  const extra = clampNonNegative(input.extra);
  const recurring = clampNonNegative(input.propertyTax) + clampNonNegative(input.insurance) + clampNonNegative(input.pmi);

  let periodicPayment = 0;
  if (principal > 0) {
    if (periodicRate === 0) {
      periodicPayment = principal / totalPeriods;
    } else {
      const factor = Math.pow(1 + periodicRate, totalPeriods);
      periodicPayment = (principal * periodicRate * factor) / (factor - 1);
    }
  }

  let balance = principal;
  let totalInterest = 0;
  let periods = 0;
  const schedule: MortgageResult["schedule"] = [];
  const maxPeriods = totalPeriods + 1200;

  while (balance > 0.01 && periods < maxPeriods) {
    periods += 1;
    const interest = balance * periodicRate;
    let payment = Math.min(balance + interest, periodicPayment + extra);
    if (payment <= interest && balance > 0) {
      payment = balance + interest;
    }
    const principalPaid = Math.max(0, payment - interest);
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    schedule.push({ period: periods, payment, principal: principalPaid, interest, balance });
  }

  return {
    periodicPayment,
    allInPayment: periodicPayment + recurring + extra,
    totalInterest,
    totalPaid: principal + totalInterest,
    payoffYears: periods / ppy,
    periods,
    schedule,
  };
}

export function calculateLoan(input: LoanInput): LoanResult {
  const principal = clampNonNegative(input.principal);
  const annualRate = clampNonNegative(input.annualRate) / 100;
  const years = Math.max(0, clampNonNegative(input.years));
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRate / 12;

  let monthlyPayment = 0;
  if (principal > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
    }
  }
  const totalRepayment = monthlyPayment * months;
  return {
    monthlyPayment,
    totalInterest: Math.max(0, totalRepayment - principal),
    totalRepayment,
  };
}

function compoundsPerYear(frequency: CompoundInput["frequency"]): number {
  if (frequency === "yearly") return 1;
  if (frequency === "quarterly") return 4;
  return 12;
}

export function calculateCompound(input: CompoundInput): CompoundResult {
  const initial = clampNonNegative(input.initial);
  const monthly = clampNonNegative(input.monthly);
  const annualRate = clampNonNegative(input.annualRate) / 100;
  const years = Math.max(0, clampNonNegative(input.years));
  const cpy = compoundsPerYear(input.frequency);
  const months = Math.round(years * 12);
  const periodicRate = annualRate / cpy;
  let balance = initial;
  let contributions = initial;

  for (let month = 1; month <= months; month += 1) {
    if (monthly > 0) {
      balance += monthly;
      contributions += monthly;
    }
    const compoundsThisMonth = cpy / 12;
    if (compoundsThisMonth > 0) {
      balance *= Math.pow(1 + periodicRate, compoundsThisMonth);
    }
  }

  return {
    finalBalance: balance,
    contributions,
    interest: Math.max(0, balance - contributions),
  };
}

export function calculateProfitMargin(input: ProfitMarginInput): ProfitMarginResult {
  const cost = clampNonNegative(input.cost);
  const value = clampNonNegative(input.value);
  let sellingPrice = 0;
  let grossProfit = 0;
  let margin = 0;
  let markup = 0;

  if (input.mode === "margin") {
    const marginRate = Math.min(value, 99.9999) / 100;
    sellingPrice = marginRate >= 1 ? 0 : cost / (1 - marginRate);
    grossProfit = sellingPrice - cost;
    margin = sellingPrice > 0 ? grossProfit / sellingPrice : 0;
    markup = cost > 0 ? grossProfit / cost : 0;
  } else if (input.mode === "markup") {
    const markupRate = value / 100;
    sellingPrice = cost * (1 + markupRate);
    grossProfit = sellingPrice - cost;
    markup = cost > 0 ? grossProfit / cost : 0;
    margin = sellingPrice > 0 ? grossProfit / sellingPrice : 0;
  } else {
    sellingPrice = value;
    grossProfit = sellingPrice - cost;
    margin = sellingPrice > 0 ? grossProfit / sellingPrice : 0;
    markup = cost > 0 ? grossProfit / cost : 0;
  }

  return { sellingPrice, grossProfit, margin, markup };
}

export function calculateVat(input: VatInput): VatResult {
  const amount = clampNonNegative(input.amount);
  const rate = clampNonNegative(input.rate) / 100;
  if (input.mode === "add") {
    const taxAmount = amount * rate;
    return { netAmount: amount, taxAmount, grossAmount: amount + taxAmount };
  }
  const grossAmount = amount;
  const netAmount = rate > 0 ? grossAmount / (1 + rate) : grossAmount;
  const taxAmount = grossAmount - netAmount;
  return { netAmount, taxAmount, grossAmount };
}

export function vatRateNeedsCustom(rate: VatRule): boolean {
  return rate.code === "US" || rate.code === "IN" || rate.code === "EU-VAT";
}
