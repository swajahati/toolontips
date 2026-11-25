import type { ToolContent } from "./types";

export const salaryCalculatorContent: ToolContent = {
  slug: "salary-calculator",
  title: "Salary Calculator",
  description: "Estimate take-home pay from gross salary, tax, and deductions, and see what changes across pay periods.",
  intro:
    "Salary Calculator turns a gross pay figure into a clear estimate of what may reach your bank account. Add the rate, deductions, and pay frequency that match your situation, then compare the result with a payslip or a job offer.",
  sections: [
    {
      heading: "What this calculator estimates",
      paragraphs: [
        "Gross salary is the amount before deductions. Net pay, often called take-home pay, is what remains after tax, social contributions, and any other amounts taken from your pay. This tool shows the difference in a simple way so you can think about rent, savings, or a move before the first payslip arrives.",
        "The calculation is an estimate. It cannot know your full tax history, residency status, reliefs, or the exact rules that apply where you work. Use it to compare scenarios, not to replace a payslip, a tax notice, or advice from a qualified professional.",
      ],
    },
    {
      heading: "The formula in plain English",
      paragraphs: [
        "The basic formula is net pay = gross pay - income tax - social contributions - other deductions. Income tax is usually the largest piece. In many systems it is calculated in bands: only the income inside a higher band is taxed at that higher rate. Social contributions may be a percentage of pay, a fixed amount, or a mix of both. Other deductions can include pension payments, union dues, student loan repayments, or health premiums, depending on your country and employer.",
        "To compare pay periods, keep everything on the same basis. A monthly figure can be found by dividing an annual amount by 12. A weekly figure is usually the annual amount divided by 52. Small rounding differences are normal when a payroll system divides amounts across many pay dates.",
      ],
    },
    {
      heading: "Worked example: a monthly salary",
      paragraphs: [
        "Suppose your gross pay is 4,000 per month. If income tax is 20%, that is 800. If social contributions are 8%, that is 320. With no other deductions, the estimate is 4,000 - 800 - 320 = 2,880 per month. If the same figures apply all year, that is 34,560 in estimated net pay. Real payments can differ if a tax code changes partway through the year.",
      ],
    },
    {
      heading: "Worked example: comparing two job offers",
      paragraphs: [
        "Offer A pays 60,000 a year with an estimated 20% tax and 7% in contributions. That gives 12,000 in tax and 4,200 in contributions, leaving about 43,800 net, or 3,650 a month on average. Offer B pays 66,000 but falls into a higher band, so you should not simply assume the extra 6,000 arrives untouched. Enter the rates you expect for each offer and compare the net figures instead. This is a general estimate, not tax or financial advice.",
      ],
    },
    {
      heading: "Limits, local rules, and smart use",
      paragraphs: [
        "Tax rules vary by country and change over time. Rates, allowances, and contribution ceilings often depend on the tax year, where you live, and whether you are an employee or self-employed. Bonuses, equity, and overtime may be taxed differently from normal wages. Check any number that matters against official sources or a qualified professional before making a binding decision.",
        "Keep a buffer. If the estimate says you can afford a payment, leave room for a smaller first payslip while codes settle. Save the tax year and rates you used so you can repeat the comparison. Your figures stay in the browser and are not uploaded.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this my exact take-home pay?",
      answer:
        "No. It is an estimate based on the numbers you enter. Your employer, tax authority, and personal circumstances decide the final amount shown on a payslip.",
    },
    {
      question: "How do tax bands affect the result?",
      answer:
        "In a banded system, only income within a higher band is taxed at the higher rate. The calculator uses the rates you provide, so check the current bands for your country and tax year.",
    },
    {
      question: "Can I compare a salary with an hourly rate?",
      answer:
        "Convert both to the same period. Multiply an hourly rate by hours per week, then by 52, before comparing deductions.",
    },
    {
      question: "Does the tool work for every country?",
      answer:
        "The arithmetic is universal, but the rules are not. Enter the rates and allowances that apply where you work. Local tax, employment, and legal rules are outside this tool, and this is not tax advice.",
    },
    {
      question: "Why is my real payslip slightly different?",
      answer:
        "Payroll systems round amounts, apply tax codes, and may change deductions mid-year. A one-off payment or a correction can also make one month look unusual.",
    },
    {
      question: "Are my salary details uploaded?",
      answer:
        "No. All calculations run in this browser tab. Your pay figures are not sent to our servers or stored after you leave the page.",
    },
  ],
  privacyNote:
    "All salary calculations run in this browser tab. Your pay figures are not uploaded or stored on our servers.",
  related: ["mortgage-calculator", "loan-calculator", "profit-margin-calculator", "invoice-generator"],
  updated: "2026-11-24",
};
