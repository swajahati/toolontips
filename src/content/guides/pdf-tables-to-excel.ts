import type { GuideContent } from "./types";

export const pdfTablesToExcelGuide: GuideContent = {
  slug: "pdf-tables-to-excel",
  title: "How to Move PDF Tables Into Excel",
  description: "Move tables from a PDF into a spreadsheet, keep the columns aligned, and know which layouts need extra cleanup.",
  intro: "A PDF is built for display, while a spreadsheet is built for calculations. That is why a neat-looking table in a PDF can turn into a jumble when you paste it into Excel: numbers land in the wrong columns, headings repeat, and merged cells break apart. A PDF-to-spreadsheet tool tries to rebuild the table structure by reading the text positions on the page. It works well on simple, digital tables and needs more care with scans or unusual layouts. This guide walks through a reliable workflow and shows where to check the output before you trust any totals.",
  sections: [
    {
      heading: "Decide whether the table is digital or scanned",
      paragraphs: [
        "Click a number inside the table. If you can highlight it, the PDF contains real text and extraction has a good starting point. If nothing is selected, the table is a picture, and OCR must read it first."
      ],
      bullets: [
        "Digital text: better column detection and fewer typing errors.",
        "Scanned table: run OCR before conversion and check every number.",
        "Mixed pages: process the scanned pages separately if results are poor."
      ]
    },
    {
      heading: "Prepare the PDF",
      paragraphs: [
        "Use the clearest copy you have. A PDF exported from a spreadsheet or accounting program is usually easier to read than a printed and rescanned version. Remove decorative borders and heavy shading if you control the source file, because they can confuse table detection."
      ]
    },
    {
      heading: "Convert the table step by step",
      paragraphs: [
        "Open a browser-based PDF-to-spreadsheet tool and choose the file. The conversion runs on your device, so the table does not need to be uploaded. After processing, open the downloaded spreadsheet and look at the raw data before applying any formatting."
      ],
      bullets: [
        "Select the pages or page range that contain the table.",
        "Download the spreadsheet and open it in Excel or a compatible app.",
        "Check the first row, last row, and any totals row first.",
        "Keep the original PDF open for comparison while you clean up."
      ]
    },
    {
      heading: "Common problems and quick fixes",
      paragraphs: [
        "Merged headings often split across columns, and long descriptions may wrap into several rows. Blank lines can appear where the PDF had a thick rule. A column of currency values may arrive as text, so format it as numbers before using formulas."
      ],
      bullets: [
        "Combine wrapped cells manually when one record spans lines.",
        "Delete empty rows created by borders or spacing.",
        "Convert text-formatted numbers before summing a column."
      ]
    },
    {
      heading: "Validate the spreadsheet before using it",
      paragraphs: [
        "Compare a few rows and totals against the PDF, especially amounts, dates, and identifiers. A converted table is a working draft, not proof that the numbers are correct. Once the data checks out, save a clean copy with a new name so the raw conversion remains available."
      ]
    }
  ],
  faqs: [
    {
      question: "Can I convert a table from a scanned PDF?",
      answer: "Only after OCR adds a text layer. Even then, accuracy varies, so verify amounts, dates, and identifiers against the original image before using the data."
    },
    {
      question: "Why are my columns shifted?",
      answer: "The PDF may use spacing or drawn lines instead of true table cells. The converter has to guess column boundaries, which can fail on merged cells or irregular layouts."
    },
    {
      question: "Will formulas and formatting carry over?",
      answer: "No. A PDF stores the finished page, not the spreadsheet formulas behind it. You will get values and labels, then you can add your own formulas in Excel."
    },
    {
      question: "Is my file uploaded during conversion?",
      answer: "A browser-based converter processes the PDF on your device. Confirm this in the tool's privacy note if the table contains sensitive information."
    },
    {
      question: "What about tables spread over many pages?",
      answer: "Repeated headings and page footers often appear as extra rows. Remove them and check that rows are not split across a page break before sorting the data."
    },
    {
      question: "Can I convert an image of a table?",
      answer: "An image needs OCR before extraction. If the image is low resolution or skewed, recreating the table manually may be faster and more accurate."
    }
  ],
  relatedTools: [
    "pdf-to-excel",
    "ocr-pdf",
    "compare-pdf",
    "pdf-to-jpg",
    "protect-pdf"
  ],
  updated: "2026-11-24"
};
