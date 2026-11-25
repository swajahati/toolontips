import type { ToolContent } from "./types";

export const loanCalculatorContent: ToolContent = {
  slug: "loan-calculator",
  title: "Loan Calculator",
  description: "Estimate monthly repayments and total interest for a personal loan with a fixed rate.",
  intro:
    "Loan Calculator helps you see what borrowing costs before you sign. Enter the amount, annual rate, and term to get an estimated repayment and a clear view of the interest you may pay.",
  sections: [
    {
      heading: "What this calculator shows",
      paragraphs: [
        "A loan has three numbers that shape almost everything: how much you borrow, how much the lender charges for the privilege, and how long you take to repay. This tool brings those numbers together. It shows a monthly repayment figure and the total interest across the life of the loan, so you can compare options side by side.",
        "The result is an estimate based on a fixed rate and regular monthly payments. It is not a loan offer, a credit check, or financial advice. A lender may use different rounding, add fees, or charge a different rate after assessing your application.",
      ],
    },
    {
      heading: "The formula and how to read it",
      paragraphs: [
        "For a fixed-rate loan, the monthly repayment uses this formula: M = P x r / (1 - (1 + r)^-n). P is the amount borrowed, r is the monthly interest rate, and n is the number of payments. Divide the yearly rate by 12 to get r. Multiply the number of years by 12 to get n. Total interest is approximately M x n - P.",
        "Each payment covers interest first, then reduces the balance. Early in the loan, most of the payment goes to interest because the balance is high. Later, more of the same payment goes to the balance. That pattern is built into the formula and is not an error.",
      ],
    },
    {
      heading: "Example: a 24-month repair loan",
      paragraphs: [
        "Say you borrow 3,000 at a 12% annual rate for two years. The monthly rate is 0.12 / 12 = 0.01, and there are 24 payments. The formula gives a repayment of about 141 per month. Over 24 months you pay roughly 3,389 in total, so the interest is about 389. This is a simple illustration; a real offer might include an arrangement fee or a different rate.",
      ],
    },
    {
      heading: "Example: the same loan over 12 months",
      paragraphs: [
        "Now keep the same 3,000 and 12% rate but repay over one year instead. There are 12 payments, and the estimated monthly amount rises to about 267. Total repayments fall to roughly 3,199, with about 199 in interest. The shorter term costs less overall, but only works if the larger monthly amount fits comfortably in your budget.",
      ],
    },
    {
      heading: "Before you borrow",
      paragraphs: [
        "Look beyond the monthly figure. Two loans with the same repayment can have different fees, early repayment charges, and protections. An APR or equivalent annual figure often includes some fees and may be more useful than the headline interest rate. Rules for disclosing costs vary by country, so check the official documents for your market.",
        "Be honest about what you can afford. A smaller payment over a longer term can still be the better choice if it leaves room for food, bills, and savings. The calculator runs entirely in your browser and does not upload your numbers. Use it for planning, then read the lender's full terms before agreeing to anything.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does the calculator include arrangement or service fees?",
      answer:
        "Not unless you build them into the amount or rate you enter. A lender's total cost may include fees that this basic repayment estimate does not show.",
    },
    {
      question: "What is APR, and is it the same as the interest rate?",
      answer:
        "APR is a wider measure that can include certain fees as well as interest. The exact definition differs by country, so compare the official disclosure rather than assuming two labels mean the same thing.",
    },
    {
      question: "Can I use this for a credit card balance?",
      answer:
        "Only as a rough guide. Card interest may compound daily, and minimum payments can change. Check the card agreement for the real method and timing.",
    },
    {
      question: "Is a longer term always more expensive?",
      answer:
        "Usually it means more interest in total, because the balance stays outstanding longer. It also lowers the monthly payment, which may matter more if cash is tight.",
    },
    {
      question: "What happens if I repay early?",
      answer:
        "Some lenders allow it freely; others charge a fee or limit how much you can repay. Ask the lender and read the agreement before making extra payments.",
    },
    {
      question: "Is this financial advice?",
      answer:
        "No. It is a calculation aid for comparing scenarios. Borrowing rules, costs, and risks vary by country and over time, so seek qualified guidance if you need a decision made for your circumstances.",
    },
  ],
  privacyNote:
    "All loan calculations run in this browser tab. Your amounts are not uploaded or stored on our servers.",
  related: ["mortgage-calculator", "compound-interest-calculator", "salary-calculator", "invoice-generator"],
  updated: "2026-11-24",
};
