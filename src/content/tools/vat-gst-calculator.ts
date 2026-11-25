import type { ToolContent } from "./types";

export const vatGstCalculatorContent: ToolContent = {
  slug: "vat-gst-calculator",
  title: "VAT & GST Calculator",
  description: "Add or remove VAT or GST from a price, and see the tax amount and total with clear rounding.",
  intro:
    "VAT & GST Calculator helps you move between prices with tax included and prices before tax. Enter a rate and an amount to check a quote, an invoice line, or the tax portion of a receipt in seconds.",
  sections: [
    {
      heading: "What VAT and GST actually do",
      paragraphs: [
        "VAT and GST are consumption taxes added to many goods and services. A seller collects the tax at the point of sale and usually passes it to the tax authority through regular reports. From a shopper's point of view, the effect is simple: the amount on the shelf or quote may be shown before tax or with tax already included, depending on local practice.",
        "VAT is common in Europe and elsewhere; GST is used in places such as Canada, Australia, and India. Rates, exemptions, and invoice rules differ. This tool does arithmetic for the rate you enter; it does not decide which rate applies.",
      ],
    },
    {
      heading: "The formulas for adding and removing tax",
      paragraphs: [
        "To add tax to a price before tax, use gross = net x (1 + rate). The tax amount is gross - net. For example, a rate of 20% is written as 0.20 in the formula. To remove tax from a price that already includes it, use net = gross / (1 + rate), then tax = gross - net.",
        "A common mistake is to take 20% off a gross price to find the net amount. That gives the wrong answer, because the tax was calculated on the lower net price. Dividing by 1.20 reverses the original multiplication correctly. Always ask whether your starting figure is before or after tax before you choose the formula.",
      ],
    },
    {
      heading: "Worked example: adding tax to a net price",
      paragraphs: [
        "Imagine a service quoted at 200 before tax, and use an illustrative rate of 20%. The gross total is 200 x 1.20 = 240. The tax is 240 - 200 = 40. If the quote also has five identical hours of work, you can calculate one line and multiply it, or enter the full 1,000 net amount and get 1,200 gross with 200 tax. The rate is an example only, not a statement of the current rate in any country.",
      ],
    },
    {
      heading: "Worked example: finding tax inside a gross price",
      paragraphs: [
        "Now suppose a receipt shows 120 including tax, again using an illustrative 20% rate. The net amount is 120 / 1.20 = 100, so the tax included is 120 - 100 = 20. This is the calculation to use when you know the total paid and need to separate the tax portion for your records. Rounding can change the last cent when many lines are involved, so check the final total on the original receipt.",
      ],
    },
    {
      heading: "Limits, records, and local rules",
      paragraphs: [
        "Rules change with the tax year and depend on the product, customer location, and seller registration. Some sales are zero-rated or exempt, and special rules may apply to imports or digital services. Check the current rate with the official tax authority before you issue or file anything.",
        "This is a calculation aid, not tax, legal, or accounting advice. Keep invoices and the rate you used so you can explain a figure later. Entries stay in this browser tab and are not uploaded; refreshing clears them.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this tax advice?",
      answer:
        "No. It only performs arithmetic with the rate you enter. Which rate applies, and whether tax applies at all, depends on local rules and your circumstances. Ask a qualified professional if you are unsure.",
    },
    {
      question: "How do I work backwards from a total that includes tax?",
      answer:
        "Divide the gross amount by 1 plus the rate as a decimal. For a 20% rate, divide by 1.20. The difference between the gross amount and the result is the tax included.",
    },
    {
      question: "What is the difference between VAT and GST?",
      answer:
        "Both are consumption taxes added to sales, but the names, rates, and administrative rules differ by country. Always check the local rules rather than assuming the two work identically.",
    },
    {
      question: "Do all businesses charge VAT or GST?",
      answer:
        "No. Registration thresholds and exemptions vary. A business may make zero-rated or exempt sales, so one invoice rate is not proof of another.",
    },
    {
      question: "Why does my calculated tax differ from an invoice by a few cents?",
      answer:
        "Rounding is usually the cause, especially when tax is calculated per line. Check whether the invoice rounds each line or the final total.",
    },
    {
      question: "Are my prices uploaded or stored?",
      answer:
        "No. The calculation runs in this browser tab. Your figures are not sent to our servers and are cleared when you refresh or close the page.",
    },
  ],
  privacyNote:
    "All tax calculations run in this browser tab. Your prices and rates are not uploaded or stored on our servers.",
  related: ["invoice-generator", "profit-margin-calculator", "salary-calculator", "loan-calculator"],
  updated: "2026-11-24",
};
