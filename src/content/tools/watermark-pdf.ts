import type { ToolContent } from "./types";

export const watermarkPdfContent: ToolContent = {
  slug: "watermark-pdf",
  title: "Add Watermark to PDF",
  description: "Add a text watermark or logo to PDF pages, with position, size and opacity controls.",
  intro:
    "Add Watermark to PDF places a word, phrase or logo over your pages without uploading the document. Set the text, colour, angle and position, then check a preview before you download.",
  sections: [
    {
      heading: "What a watermark is for",
      paragraphs: [
        "A watermark is a faint mark placed over a page. It can say who produced a document, warn that a file is a draft, or carry a small logo. It sits on top of the existing content, so the original words and pictures stay where they were. Because it is usually light and partly transparent, the page remains readable.",
        "This tool gives you two choices. Text mode is best for short labels such as DRAFT, SAMPLE or CONFIDENTIAL. Image mode is best when you have a PNG or JPG logo. Both modes use the same page controls, so you can mark every page, only odd or even pages, or a custom range such as 1, 4-6.",
      ],
    },
    {
      heading: "Adding a text watermark",
      paragraphs: [
        "Type the words you want, then set the font size and colour. A larger size is easier to notice, while a softer colour keeps the mark from competing with the document. Opacity controls how see-through the text is: a low value gives a quiet background mark, and a higher value makes the words more obvious.",
        "Rotation lets you lay the text straight across the page or at a diagonal. Diagonal text is a familiar choice for draft stamps because it crosses the page without hiding one line of writing. Position can be the centre, any corner, or tiled. Tiled repeats the mark across the sheet, which is useful when you want every part of a page covered.",
      ],
    },
    {
      heading: "Adding a logo watermark",
      paragraphs: [
        "Switch to image mode and add a PNG or JPG logo. PNG is a good choice when your logo has sharp edges or a transparent background; JPG is fine for photographic marks. The width setting sizes the logo as a share of the page width, so the same setting works on small and large pages.",
        "The logo keeps its original shape. A very wide logo will therefore be short, and a tall logo will be narrow. If it looks awkward, use a simpler version of the mark. The opacity, rotation and position controls work exactly as they do for text.",
      ],
    },
    {
      heading: "Marking confidential drafts",
      paragraphs: [
        "A confidential watermark is a clear signal that a file is not meant for general release. Use a short word such as CONFIDENTIAL, choose a noticeable colour, and place it either diagonally across the centre or tiled over the page. Keep opacity moderate so the document underneath can still be read.",
        "Remember that a watermark is a visual notice, not security. It does not encrypt the PDF or stop someone from copying the file. For genuinely sensitive material, use password protection as well and share the document through a trusted channel.",
      ],
    },
    {
      heading: "Preview, limits and privacy",
      paragraphs: [
        "A preview of page one updates as you change the settings, so you can judge the result before downloading. The preview shows page one even if your page selection excludes it. Download the full file to check other pages.",
        "Password-protected PDFs cannot be opened by this tool. Unlock them first. Very large files may take longer, and the preview is skipped if the browser runs out of time. The document stays in your browser tab throughout; nothing is uploaded or stored on our servers.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I add both text and a logo in one pass?",
      answer:
        "This tool applies one watermark type at a time. If you need both, add the text, download the result, then add the logo to that file in a second pass.",
    },
    {
      question: "What does tiled position do?",
      answer:
        "It repeats the text or logo across the whole page instead of placing one copy. Lower opacity usually looks better with tiled marks.",
    },
    {
      question: "Will the watermark hide my document text?",
      answer:
        "It sits over the page, so a dark, opaque mark can make text harder to read. Start with low opacity and increase it only as much as you need.",
    },
    {
      question: "Can I watermark only some pages?",
      answer:
        "Yes. Choose all pages, odd pages, even pages, or enter a custom range such as 2, 5-7.",
    },
    {
      question: "Does a confidential watermark protect the file?",
      answer:
        "No. It is a visible label only. It does not encrypt the PDF or prevent copying. Use password protection for sensitive files.",
    },
    {
      question: "Why is my logo distorted?",
      answer:
        "It is not distorted; the width setting keeps the original shape. If it looks unusual, try a simpler logo with less empty space around it.",
    },
    {
      question: "Is my PDF uploaded?",
      answer:
        "No. The watermark and preview are produced in your browser tab. Nothing is sent to a server.",
    },
  ],
  privacyNote:
    "Your PDF and logo are processed in this browser tab. They are not uploaded to our servers.",
  related: ["remove-watermark-pdf", "page-numbers-pdf", "rotate-pdf", "compress-pdf", "split-pdf"],
  updated: "2026-11-24",
};
