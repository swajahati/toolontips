import type { ToolContent } from "./types";

export const mortgageCalculatorContent: ToolContent = {
  slug: "mortgage-calculator",
  title: "Mortgage Calculator",
  description: "Estimate a monthly mortgage payment from the loan amount, interest rate, and term, then see the total interest.",
  intro:
    "Mortgage Calculator gives you a quick estimate of what a home loan could cost each month. Enter the amount you plan to borrow, the annual rate, and the length of the loan to see a figure you can compare with your budget.",
  sections: [
    {
      heading: "What this estimate shows",
      paragraphs: [
        "A mortgage payment usually covers principal and interest. Principal is the amount you borrow. Interest is the cost of borrowing it. This tool uses a standard fixed-payment formula, so it works best when the rate and payment stay the same for the whole term. The result is an estimate, not an offer of finance and not financial advice.",
        "Many lenders also collect money for property tax, insurance, or mortgage protection. Those amounts are not part of the basic calculation unless you add them yourself. A true monthly outgoing can be higher than the number shown here, especially in places where tax and insurance are paid through the lender.",
      ],
    },
    {
      heading: "The formula behind the monthly payment",
      paragraphs: [
        "The monthly principal and interest payment is worked out with the standard annuity formula: P = L x r / (1 - (1 + r)^-n). In that formula, L is the loan amount, r is the monthly interest rate, and n is the number of monthly payments. To get r, divide the annual rate by 12. To get n, multiply the term in years by 12. Total interest is the monthly payment multiplied by n, minus the original loan amount.",
        "Because the payment is fixed, early payments contain more interest and later payments contain more principal. That is normal. It does not mean the lender has changed the rate.",
      ],
    },
    {
      heading: "Worked example: a 25-year loan",
      paragraphs: [
        "Imagine a loan of 240,000 with a fixed annual rate of 5% over 25 years. The monthly rate is 0.05 / 12, which is about 0.004167. There are 25 x 12 = 300 payments. Putting those numbers into the formula gives a principal and interest payment of about 1,403. Across 300 payments you would pay roughly 420,900 in total, so the interest would be about 180,900. Actual figures vary with rounding and lender practice.",
      ],
    },
    {
      heading: "Worked example: a shorter term",
      paragraphs: [
        "Now compare the same 240,000 loan at the same 5% rate over 15 years. The number of payments falls to 180, while the monthly rate stays the same. The estimated payment rises to about 1,898, but total interest falls to roughly 101,600. This shows the trade-off clearly: a shorter term usually means a larger monthly bill and less interest overall, provided you can afford the payments.",
      ],
    },
    {
      heading: "Limits, local rules, and next steps",
      paragraphs: [
        "Interest rates and mortgage customs differ by country. Some loans use variable rates, offset accounts, annual recalculations, or fees that are rolled into the balance. Tax relief, stamp duty, and early repayment rules also vary. Check the figure against a written illustration from a lender before you make a decision, and speak to a qualified adviser if you need guidance about your situation. This page is for general estimates only.",
        "Compare the result with your take-home pay, other debts, and savings for repairs. If it leaves little room, a smaller loan may be safer than stretching your budget. All calculations run in your browser, and your numbers are not uploaded.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does this include property tax and insurance?",
      answer:
        "No. The basic result covers principal and interest only. Add your own estimates for tax, insurance, and other charges when you compare it with a lender's full payment figure.",
    },
    {
      question: "Can I use it for a variable-rate mortgage?",
      answer:
        "You can enter the current rate to see a snapshot, but the tool assumes a fixed rate for the whole term. A future rate change would change the real payment.",
    },
    {
      question: "Why is so much of the first payment interest?",
      answer:
        "Interest is charged on the balance still owed. At the start that balance is large, so more of the fixed payment goes to interest. As the balance falls, more goes to principal.",
    },
    {
      question: "How does a larger deposit change the result?",
      answer:
        "A larger deposit reduces the amount you borrow. That lowers the monthly payment and the total interest, although fees and local rules still matter.",
    },
    {
      question: "Are the results exact?",
      answer:
        "No. Rounding, payment dates, fees, and lender methods all cause small differences. Treat the number as an estimate and ask a lender for a written illustration before committing.",
    },
    {
      question: "Can I show the effect of extra payments?",
      answer:
        "The standard calculation shows scheduled payments only. Extra payments can reduce interest and shorten the loan, but you would need a separate amortisation schedule to model them.",
    },
  ],
  privacyNote:
    "All mortgage figures are calculated in this browser tab. Your amounts are not uploaded or stored on our servers.",
  related: ["loan-calculator", "compound-interest-calculator", "salary-calculator", "invoice-generator"],
  updated: "2026-11-24",
};
