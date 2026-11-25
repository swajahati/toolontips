import type { ToolContent } from "./types";

export const comparePdfContent: ToolContent = {
  slug: "compare-pdf",
  title: "Compare PDF",
  description: "Compare two PDFs side by side, page by page, with a quick selectable-text check.",
  intro:
    "Compare PDF puts two documents next to each other, one page at a time. Use it to spot changes between file versions, check a revised form or confirm that a saved copy matches the original. Both files stay in your browser.",
  sections: [
    {
      heading: "What the comparison shows",
      paragraphs: [
        "This tool renders the chosen page from each PDF and shows the two images side by side. That is the clearest way to notice layout shifts, changed numbers, added paragraphs and removed lines. Move between pages with the previous and next buttons; both documents move together so you are always looking at the same page number.",
        "Under the controls, a short text note tells you whether the selectable text on the two pages is identical. This is a quick signal, not a full difference report. A page made from a scan has no selectable text, so the note may say the text differs even when the pictures look the same.",
      ],
    },
    {
      heading: "When side-by-side comparison helps",
      paragraphs: [
        "A side-by-side view is useful when a colleague sends a revised quote, when a contract has a new clause, or when you want to know whether a downloaded invoice changed after you saved it twice. Human eyes are good at noticing visual changes that a simple text comparison can miss, such as a moved logo or a corrected table width.",
        "The tool is also handy for checking file versions before you merge or organize them. If the two documents are the same, you can keep one copy and avoid extra pages in your final file.",
      ],
    },
    {
      heading: "How to compare carefully",
      paragraphs: [
        "Choose two PDFs, then start at page one. Look at the whole page, then focus on headings, totals, dates and names. If the selectable-text note says the pages differ, check the images to see whether the change is real. If it says the text is identical, still check layouts that contain images, signatures or tables.",
        "The page counter uses the smaller page count of the two documents. If one file has more pages, compare the shared pages here, then open the longer file separately for its extra pages.",
      ],
    },
    {
      heading: "Limits of this tool",
      paragraphs: [
        "This is a visual comparison aid, not a legal proof of identity or a complete redline editor. It does not create a merged report, highlight every changed word or compare comments and form fields. For a formal audit trail, use specialist document comparison software.",
        "Password-protected PDFs cannot be opened. Very large pages may take a moment to render. If a page is rotated differently in the two files, the images will look different even if the text is the same; rotate a copy first if you need a fair comparison.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "Neither PDF is uploaded. Both files are opened and rendered inside your browser tab, and the page images you see are created locally. When you leave the page, the browser clears the working copies.",
        "Because nothing is stored, keep your own copy of each document. The tool does not keep a history of comparisons and cannot send results to another person.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does the tool highlight changed words?",
      answer:
        "No. It shows pages side by side and reports whether the selectable text is the same. You decide which visual changes matter.",
    },
    {
      question: "Can it compare scanned PDFs?",
      answer:
        "It can show scanned pages side by side. The text note is only useful when the PDF contains real selectable text, not pictures of words.",
    },
    {
      question: "What if the two PDFs have different page counts?",
      answer:
        "The page controls stop at the shorter document. Compare those pages here, then review any extra pages in the longer file on its own.",
    },
    {
      question: "Is a text match a guarantee that pages are identical?",
      answer:
        "No. Images, signatures, colours and layout can change while the text stays the same. Always look at the two page images.",
    },
    {
      question: "Can I download a comparison report?",
      answer:
        "No. This tool is for quick visual checking only. It does not produce a report file.",
    },
    {
      question: "Does it compare annotations and comments?",
      answer:
        "No. Only the rendered page and its selectable text are checked. Comments and form field values are not included.",
    },
    {
      question: "Are my documents uploaded?",
      answer:
        "No. Both PDFs are processed in your browser tab. Nothing is sent to our servers.",
    },
  ],
  privacyNote:
    "Both PDFs are opened and compared in this browser tab. They are not uploaded to our servers.",
  related: ["merge-pdf", "split-pdf", "organize-pdf", "pdf-to-jpg", "rotate-pdf"],
  updated: "2026-11-24",
};
