import type { ToolContent } from "./types";

export const pdfToExcelContent: ToolContent = {
  slug: "pdf-to-excel",
  title: "PDF to Excel",
  description: "Turn selectable PDF text and tables into an XLSX spreadsheet in your browser.",
  intro:
    "PDF to Excel takes the selectable text on each chosen page and places it into spreadsheet rows and columns. It is useful for reports, invoices and simple tables that were created as real text rather than scanned pictures. Your PDF is read locally and the XLSX file is built in your browser.",
  sections: [
    {
      heading: "What this converter can read",
      paragraphs: [
        "A PDF does not store tables the way a spreadsheet does. It stores text fragments at positions on a page. This tool reads those positions, groups fragments that sit on the same line, and splits the line into cells where the horizontal gap is large enough. Each selected PDF page becomes its own worksheet.",
        "The result works best on clean reports with clear spacing: invoices, price lists, bank statement exports and simple data tables. Text stays as text, so you can sort it, copy it and use spreadsheet formulas after download.",
      ],
    },
    {
      heading: "How to get a useful spreadsheet",
      paragraphs: [
        "Choose a PDF, select the pages you need, then adjust the two position controls. Row height tolerance decides how close two text fragments must be to count as the same row. Column gap decides how much empty space starts a new cell. If columns are merging, increase the column gap. If one row is being split in two, increase the row tolerance.",
        "Select Create XLSX, download the file and open it in Excel, LibreOffice or Google Sheets. Check a few rows against the original PDF before you rely on the data. Small adjustments to the settings often produce a much cleaner sheet.",
      ],
    },
    {
      heading: "When the result will be imperfect",
      paragraphs: [
        "PDF pages may contain multi-line cells, rotated labels, merged headings, lines drawn as graphics or text placed in unusual orders. Those details can become extra rows or columns. Very dense tables may need manual cleanup after conversion.",
        "A scanned PDF has no selectable text at all. In that case the tool reports that no text was found. Run OCR first, then convert the OCR result if you need a spreadsheet.",
      ],
    },
    {
      heading: "Choosing pages",
      paragraphs: [
        "You can convert every page, odd or even pages, or a custom range such as 1, 4-8. Custom ranges use printed page numbers starting at 1. For a long report, convert only the pages that contain tables; this keeps the spreadsheet easier to read and reduces processing time.",
        "The tool limits one run to 100 pages so your browser stays responsive. Split very large documents first if you need more pages in total.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "Your PDF is not uploaded. The text positions are read inside this browser tab, and the XLSX workbook is assembled locally. Nothing is stored after you leave the page, so keep your own copy of the source document.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why are my columns in the wrong cells?",
      answer:
        "Increase the column gap so wider spaces become column breaks. Check the first few rows and adjust again if needed.",
    },
    {
      question: "Why did one row become two rows?",
      answer:
        "Increase the row height tolerance. Text fragments on the same visual line can sit at slightly different vertical positions.",
    },
    {
      question: "Can it convert scanned tables?",
      answer:
        "No. Scanned pages contain pictures of text. Use an OCR tool first, then convert the searchable result.",
    },
    {
      question: "Does every PDF page become a worksheet?",
      answer:
        "Yes. Each selected page gets a worksheet named Page 1, Page 2 and so on.",
    },
    {
      question: "Will formulas and borders be preserved?",
      answer:
        "No. Only text and its position are used. You may need to add formulas, borders and number formats in your spreadsheet app.",
    },
    {
      question: "How many pages can I convert at once?",
      answer:
        "Up to 100 pages. This keeps the browser responsive and the workbook manageable.",
    },
    {
      question: "Is my PDF uploaded?",
      answer:
        "No. The PDF and the generated spreadsheet stay in your browser.",
    },
  ],
  privacyNote:
    "Your PDF is read in this browser tab. The XLSX file is created locally and nothing is uploaded to our servers.",
  related: ["ocr-pdf", "merge-pdf", "split-pdf", "compress-pdf", "compare-pdf"],
  updated: "2026-11-24",
};
