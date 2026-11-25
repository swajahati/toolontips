import type { ToolContent } from "./types";

export const compoundInterestCalculatorContent: ToolContent = {
  slug: "compound-interest-calculator",
  title: "Compound Interest Calculator",
  description: "See how a balance grows when interest earns interest, and compare different rates and compounding periods.",
  intro:
    "Compound Interest Calculator shows what can happen when a balance earns interest and that interest stays invested. Try a few rates and time periods to see how much of the final figure comes from growth rather than your original amount.",
  sections: [
    {
      heading: "What compound interest means",
      paragraphs: [
        "Simple interest pays a fixed amount based on the original sum. Compound interest pays interest on the original sum and on interest already added. The first few periods look similar, but the gap grows over time because each new calculation starts from a larger balance. That is why time is often more powerful than a small change in rate.",
        "The same idea applies to savings, investments, and some debts. For debt, compounding can work against you when interest is added to the balance. This tool performs the arithmetic only. It does not predict investment returns, and it is not financial, tax, or legal advice.",
      ],
    },
    {
      heading: "The formula used",
      paragraphs: [
        "For a lump sum, the common formula is A = P x (1 + r/n)^(n x t). A is the final amount, P is the starting amount, r is the annual rate written as a decimal, n is the number of compounding periods per year, and t is the number of years. Interest earned is A - P. If interest is compounded yearly, n is 1. Monthly compounding uses 12, and daily compounding uses 365.",
        "Rates in the real world are rarely steady. Inflation reduces what a future amount can buy, taxes may take a share, and fees can reduce the balance. The result here is a mathematical estimate under the assumptions you enter, not a guaranteed outcome.",
      ],
    },
    {
      heading: "Worked example: ten years of monthly compounding",
      paragraphs: [
        "Start with 5,000 at a 6% annual rate, compounded monthly for 10 years. Put those numbers into the formula: A = 5,000 x (1 + 0.06/12)^(12 x 10). The exponent is 120, and the monthly rate is 0.005. The ending balance is about 9,097, meaning roughly 4,097 of that is interest. If the same 6% were paid as simple interest, the interest would be 3,000, so compounding adds about 1,097 over the period.",
      ],
    },
    {
      heading: "Worked example: how often interest is added",
      paragraphs: [
        "Now compare compounding frequency with 10,000 at 5% for 20 years. With yearly compounding, the formula gives about 26,533. With monthly compounding, it gives about 27,126. The monthly result is roughly 593 higher, even though the stated rate has not changed. A higher frequency helps a saver, but it can increase the cost of a debt that compounds in the same way.",
      ],
    },
    {
      heading: "Using the result without overtrusting it",
      paragraphs: [
        "Try a range of rates rather than one optimistic number. A lower rate or a shorter term changes the picture quickly. You can see which assumption has the biggest effect before making a plan.",
        "Remember that an estimate is not a promise. Market investments can fall as well as rise, bank rates change, and tax treatment depends on the account and the country. Check current rules with official sources or a qualified professional when a real decision depends on the answer. Your inputs stay in the browser and are not uploaded.",
      ],
    },
  ],
  faqs: [
    {
      question: "What does compounding frequency mean?",
      answer:
        "It is how often interest is added to the balance. Monthly compounding adds interest twelve times a year; yearly compounding adds it once. More frequent compounding gives more chances for interest to earn interest.",
    },
    {
      question: "Why did my bank pay a different amount?",
      answer:
        "Banks may use different day counts, rounding, rate changes, fees, or tax withholding. The calculator assumes a steady rate and a clean formula, so a real statement can differ.",
    },
    {
      question: "Can this calculator include monthly deposits?",
      answer:
        "This explanation focuses on a starting amount. If you make regular deposits, each deposit has its own growth period, so the final figure will be higher than the lump-sum result alone.",
    },
    {
      question: "Is compound interest guaranteed?",
      answer:
        "No. The math is reliable, but the rate you enter is an assumption. Savings rates change and investments can lose value. Treat the output as an illustration, not a promise of future gains.",
    },
    {
      question: "How does inflation affect the answer?",
      answer:
        "Inflation raises prices over time, so a larger future balance may buy less than it seems. The calculator does not adjust for inflation unless you use a rate that reflects your own assumption.",
    },
    {
      question: "Is this tax or investment advice?",
      answer:
        "No. It is a general calculation tool. Tax rules and investment risks vary by country and person, so ask a qualified professional before making decisions based on the result.",
    },
  ],
  privacyNote:
    "All compound interest calculations run in this browser tab. Your amounts are not uploaded or stored on our servers.",
  related: ["loan-calculator", "mortgage-calculator", "salary-calculator", "profit-margin-calculator"],
  updated: "2026-11-24",
};
