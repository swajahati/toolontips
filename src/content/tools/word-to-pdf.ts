import type { ToolContent } from "./types";

export const wordToPdfContent: ToolContent = {
  slug: "word-to-pdf",
  title: "Word to PDF",
  description: "Convert a DOCX Word document to PDF in your browser, without uploading it.",
  intro:
    "Word to PDF turns a .docx document into a PDF file you can download and share. It reads the Word file in your browser, draws each page and saves a PDF copy. Nothing is uploaded, which makes it useful for drafts, letters and simple documents you would rather keep private.",
  sections: [
    {
      heading: "What kind of document works best",
      paragraphs: [
        "This tool works with modern .docx Word files. Short documents with ordinary paragraphs, headings, lists and pictures usually convert well. The more a document relies on unusual fonts, complex tables, tracked changes or special Word features, the more likely it is that the PDF will look different from Word.",
        "Old .doc files are not supported. If you only have an old file, open it in Word or LibreOffice and save a .docx copy first.",
      ],
    },
    {
      heading: "How to convert",
      paragraphs: [
        "Choose your .docx file, then select Convert to PDF. When the work is finished, download the PDF and open it before sending it to anyone. Check the first page, page breaks, images and the final page.",
        "If something looks wrong, simplify the source document: use common fonts, avoid floating text boxes and keep tables within the page width. Saving a fresh copy from Word often fixes hidden layout problems.",
      ],
    },
    {
      heading: "Why the layout may change",
      paragraphs: [
        "Word and browsers measure pages in different ways. A browser cannot run Word itself, so it interprets the document structure and redraws it. Fonts that are not installed on your device may be replaced, and page breaks can move by a few lines.",
        "The PDF is created from a high-quality picture of each rendered page. This keeps the visual layout close to what you see, but the text inside the PDF is not selectable or searchable. If you need searchable text, a PDF created by Word's own Save as PDF command is a better choice.",
      ],
    },
    {
      heading: "When to use another route",
      paragraphs: [
        "For legal filings, print-ready brochures or documents with precise brand typography, use Word or LibreOffice to export the PDF directly. Those applications know their own layout rules and can embed the exact fonts you used.",
        "This tool is best for quick, private conversions where a readable visual copy is enough: a form to email, a draft to review or a document to archive.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "The Word document is opened and drawn inside this browser tab. No file is sent to our servers. The PDF is built locally and only appears as a download after the work is complete.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I convert old .doc files?",
      answer:
        "No. Use a .docx file. Open an old document in Word or LibreOffice and save it as .docx first.",
    },
    {
      question: "Will the PDF text be selectable?",
      answer:
        "No. The PDF is made from rendered page images, so the words cannot be selected or searched.",
    },
    {
      question: "Why did my page breaks move?",
      answer:
        "Browsers and Word measure layout differently. Use common fonts and simple page breaks to reduce changes.",
    },
    {
      question: "Are images and logos included?",
      answer:
        "Yes, images stored inside the .docx file are drawn into the PDF. Very large images may make the PDF bigger.",
    },
    {
      question: "Is this suitable for print-ready files?",
      answer:
        "For precise printing or brand colours, export from Word or LibreOffice instead. This tool is for quick visual conversion.",
    },
    {
      question: "What size file can I use?",
      answer:
        "The tool accepts files up to 50 MB. Very large documents may take longer to render.",
    },
    {
      question: "Is my document uploaded?",
      answer:
        "No. It is converted in your browser and is not sent to our servers.",
    },
  ],
  privacyNote:
    "Your Word file is converted in this browser tab. It is not uploaded to our servers, and the PDF is created locally.",
  related: ["merge-pdf", "compress-pdf", "organize-pdf", "sign-pdf", "pdf-to-excel"],
  updated: "2026-11-24",
};
