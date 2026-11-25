import type { ToolContent } from "./types";

export const profitMarginCalculatorContent: ToolContent = {
  slug: "profit-margin-calculator",
  title: "Profit Margin Calculator",
  description: "Work out gross or net profit margin from revenue and costs, and see the difference between margin and markup.",
  intro:
    "Profit Margin Calculator shows how much of each sale is left after costs. Enter revenue and the costs you want to include, then use the result to price work, compare products, or check whether a discount still makes sense.",
  sections: [
    {
      heading: "What profit margin tells you",
      paragraphs: [
        "Profit margin is a percentage. It says how much money remains from every unit of revenue after certain costs are removed. A 30% margin means 30 of each 100 in sales remains after the costs you included. The remaining 70 covers those costs. Because it is a percentage, margin makes it easier to compare a small business with a large one, or one product with another.",
        "The number is only as useful as the costs behind it. If you leave out delivery, platform fees, or unpaid admin time, the margin will look better than the reality. The calculation is a planning aid, not accounting, tax, or legal advice.",
      ],
    },
    {
      heading: "The formulas, without the jargon",
      paragraphs: [
        "Gross margin = (revenue - direct cost) / revenue x 100. Direct cost means the cost tied to making the sale, such as materials or the wholesale price of a product. Net margin = (revenue - all costs) / revenue x 100. All costs includes direct costs plus overhead such as rent, software, and admin time. Markup is different again: markup = (price - cost) / cost x 100. Margin compares profit with the selling price; markup compares it with the cost.",
        "Mixing these words up can lead to a pricing mistake. A 50% markup does not produce a 50% margin. It produces a margin of about 33%, because the selling price is the denominator for margin, not the cost.",
      ],
    },
    {
      heading: "Worked example: selling one product",
      paragraphs: [
        "You sell an item for 80 and it costs you 50 to buy or make. Gross profit is 80 - 50 = 30. Gross margin is 30 / 80 x 100 = 37.5%. The markup on cost is 30 / 50 x 100 = 60%. If you also spend 15 on packaging, fees, and delivery for that item, net profit is 15 and net margin is 15 / 80 x 100 = 18.75%.",
      ],
    },
    {
      heading: "Worked example: a month of service work",
      paragraphs: [
        "A small studio bills 20,000 in one month. Direct costs for contractors and materials are 6,000, so gross profit is 14,000 and gross margin is 70%. Rent, software, and office costs add another 8,000. Net profit is 6,000, giving a net margin of 30%. If the studio offers a 10% discount, revenue falls and the same costs take a larger share, so both margins drop. The tool makes that effect visible before you agree to the discount.",
      ],
    },
    {
      heading: "Using the result sensibly",
      paragraphs: [
        "Compare like with like. Product and service margins can both be correct while meaning different things. Check whether shipping, returns, fees, and your own time are included. A slightly lower margin with repeat sales may beat a high margin that rarely converts.",
        "Treat the result as an estimate. Prices, costs, and tax rules change, and shared costs involve judgement. Keep your source numbers so you can repeat the calculation. Entries stay in the browser and are not uploaded.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between margin and markup?",
      answer:
        "Margin is profit divided by the selling price. Markup is profit divided by the cost. Margin answers what share of sales you keep; markup answers how much you added to the cost.",
    },
    {
      question: "Which costs should I enter for gross margin?",
      answer:
        "Use costs that rise directly with the sale, such as materials, stock, or paid labour for the job. Keep rent and general admin out of gross margin and put them in the net calculation.",
    },
    {
      question: "What counts as a good profit margin?",
      answer:
        "It depends on the industry, business model, and how you value your time. Compare with similar businesses and your own past figures.",
    },
    {
      question: "Can revenue grow while margin falls?",
      answer:
        "Yes. Bigger discounts, higher material costs, or extra fees can push costs up faster than sales. Watching margin alongside revenue helps catch that problem early.",
    },
    {
      question: "Does this tool include income tax or VAT?",
      answer:
        "Only if you include those amounts in the revenue or costs you enter. Deciding how taxes apply is a separate matter, and this tool does not provide tax or accounting advice.",
    },
    {
      question: "Is the result accounting advice?",
      answer:
        "No. It is a simple calculation for planning and comparison. For formal accounts, audits, or tax filings, use a qualified professional and the rules that apply where you operate.",
    },
  ],
  privacyNote:
    "All margin calculations run in this browser tab. Your revenue and cost figures are not uploaded or stored on our servers.",
  related: ["invoice-generator", "vat-gst-calculator", "salary-calculator", "compound-interest-calculator"],
  updated: "2026-11-24",
};
