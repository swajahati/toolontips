import type { ToolContent } from "./types";

export const ocrPdfContent: ToolContent = {
  slug: "ocr-pdf",
  title: "OCR PDF",
  description:
    "Add an invisible text layer to scanned PDF pages so the words can be searched and copied.",
  intro:
    "OCR PDF turns scanned pages into a searchable document. It reads each page image, recognises the words, and places an invisible text layer over the picture. You get a PDF that still looks like the scan but lets you search, select and copy text.",
  sections: [
    {
      heading: "What OCR adds",
      paragraphs: [
        "A scanned PDF is usually just a picture of paper. You can see the words, but a computer cannot search them. Optical character recognition, or OCR, looks at the picture and guesses the characters. This tool puts those recognised words under the image as invisible text.",
        "The output keeps each scanned page as an image, so signatures, stamps and handwriting still look the same. The hidden text is what makes the document searchable in many PDF readers.",
      ],
    },
    {
      heading: "Getting a good result",
      paragraphs: [
        "Use the clearest scan you have. Flat pages, strong contrast and upright text work best. The 300 dpi setting reads small print more accurately but takes longer; 200 dpi is faster for large, clear documents.",
        "After download, search for a distinctive word in the PDF reader. If it is not found, try a cleaner scan or a smaller page range. OCR accuracy depends heavily on the source image.",
      ],
    },
    {
      heading: "Which pages to process",
      paragraphs: [
        "You can process every page, odd or even pages, or a custom range. A twenty-page limit keeps the browser responsive because recognition uses a lot of processing power. For longer documents, run a few ranges and merge the results with our Merge PDF tool.",
        "If a PDF already contains real selectable text, OCR is usually unnecessary. It will replace the page with an image and can introduce recognition mistakes. Check first by trying to select a word in the original.",
      ],
    },
    {
      heading: "Language and accuracy",
      paragraphs: [
        "This launch version recognises English only. Other languages need different language data and are not included yet. Short words, unusual fonts, low-resolution faxes and noisy photographs are more likely to be misread.",
        "Always check important numbers, names and dates against the original page. OCR is helpful, but it is not a perfect transcription and should not be treated as legal proof of the source document.",
      ],
    },
    {
      heading: "Privacy and loading",
      paragraphs: [
        "Your PDF is processed inside this browser tab. The OCR engine and English language data are downloaded from this website when the tool runs, but the document itself is never uploaded. The finished searchable PDF is created locally and only saved when you download it.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will the output look different from my scan?",
      answer:
        "No. The page image is kept. The recognised text is added invisibly underneath so the visual page stays the same.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "English only at launch. Other languages need separate OCR language data.",
    },
    {
      question: "Why did OCR misread a word?",
      answer:
        "Blur, low contrast, small type and unusual fonts reduce accuracy. Try a clearer scan or the 300 dpi setting.",
    },
    {
      question: "Can I OCR more than 20 pages?",
      answer:
        "Process several ranges, then merge the searchable PDFs with the Merge PDF tool.",
    },
    {
      question: "Does OCR preserve handwriting exactly?",
      answer:
        "No. Handwriting can be recognised poorly. The image remains unchanged, but hidden text may be wrong.",
    },
    {
      question: "Should I OCR a PDF that already has selectable text?",
      answer:
        "Usually no. OCR will turn the page into an image and may introduce errors. Use the original text instead.",
    },
    {
      question: "Is my scanned PDF uploaded?",
      answer:
        "No. The scan and recognised text stay in your browser tab.",
    },
  ],
  privacyNote:
    "Your PDF is processed in this browser tab. OCR assets load from this site, and your file is not uploaded.",
  related: ["pdf-to-excel", "merge-pdf", "compress-pdf", "split-pdf", "compare-pdf"],
  updated: "2026-11-24",
};
