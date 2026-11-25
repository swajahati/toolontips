import type { ToolContent } from "./types";

export const invoiceGeneratorContent: ToolContent = {
  slug: "invoice-generator",
  title: "Invoice Generator",
  description: "Create a clear invoice with your details, line items, totals, and payment terms.",
  intro:
    "Invoice Generator turns a list of work and prices into a document you can send. Check the total, then download a PDF copy.",
  sections: [
    {
      heading: "What this tool does",
      paragraphs: [
        "A good invoice answers four questions: who did the work, what was supplied, what it cost, and when payment is due. Enter your details, your client's details, an invoice number and date, then add line items with quantities and rates. The tool adds the lines and shows the amount due before you download.",
        "The layout is plain and easy to read on screen or in print. Send the PDF by email, attach it to a project handover, or keep it in your files. There is no account to create.",
      ],
    },
    {
      heading: "How to create an invoice",
      paragraphs: [
        "Start with your name or business name, contact details, and any registration number you must show. Add the client's name and contact details, then choose a unique invoice number, issue date, and due date.",
        "Describe each line in plain language with a quantity and unit price. Use wording such as Website design, home page or Consulting, 3 hours so the client can match the charge to approved work. Check the total, download the PDF, and read it once as if you were the client.",
      ],
    },
    {
      heading: "What makes an invoice easy to pay",
      paragraphs: [
        "Clear invoices get fewer questions. A client should understand the charge without opening a contract. A few habits help:",
      ],
      bullets: [
        "Use a unique number for every invoice, even for the same client.",
        "Match descriptions to the work, not internal task codes.",
        "Show a real due date, not only a term like net 14.",
        "Include the payment method and any reference needed.",
        "Check names, addresses, and amounts before sending.",
      ],
    },
    {
      heading: "Payment terms, tax, and late fees",
      paragraphs: [
        "Payment terms say when and how a client should pay. Many businesses use 7, 14, or 30 days, but your agreement comes first. A clear due date makes polite follow-up easier.",
        "Enter tax fields that truly apply. This tool does arithmetic for the numbers you enter; it does not decide what you owe or give tax or accounting advice. Rules vary by country and over time. Add late fees only when your agreement and local rules allow them.",
      ],
    },
    {
      heading: "Privacy, limits, and records",
      paragraphs: [
        "Your details stay in this browser tab and are not uploaded. Refreshing or closing the page clears them, so download a copy before you leave.",
        "The tool creates a document; it does not send invoices or track payments. Keep a simple log of invoice numbers and dates for repeat work, and store each invoice with the agreement or timesheets that support it.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I use this in any country?",
      answer:
        "The layout is neutral. Enter the details and tax labels required where you do business. The tool does not decide local legal requirements or offer legal or tax advice.",
    },
    {
      question: "Can I add several line items?",
      answer:
        "Yes. Add each product or service as its own line with a quantity and rate. Check the descriptions before downloading.",
    },
    {
      question: "Does the tool send invoices?",
      answer:
        "No. You download a PDF and send it yourself, so you control the recipient, message, and timing.",
    },
    {
      question: "How should I number invoices?",
      answer:
        "Use a consistent, unique sequence such as 2026-001. It makes past invoices easier to find and reduces duplicates.",
    },
    {
      question: "Can I include VAT or GST?",
      answer:
        "Enter the rate and amount that applies. The arithmetic happens here, but deciding whether tax applies is outside this tool and is not tax advice.",
    },
    {
      question: "Are my client details stored?",
      answer:
        "No. Entries stay in the browser tab and are not uploaded. Refreshing or closing the page clears them.",
    },
  ],
  privacyNote:
    "Invoice details are processed in this browser tab. Your entries are not uploaded to our servers.",
  related: ["vat-gst-calculator", "profit-margin-calculator", "sign-pdf", "word-to-pdf"],
  updated: "2026-11-24",
};
