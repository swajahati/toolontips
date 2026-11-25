import type { GuideContent } from "./types";

export const organizePdfPagesGuide: GuideContent = {
  slug: "organize-pdf-pages",
  title: "How to Organize PDF Pages",
  description: "A step-by-step guide to reordering, removing and adding PDF pages with a clear thumbnail view and no upload.",
  intro:
    "Most page-order problems are small and strangely stubborn. A cover page sits after the contents, a scan faces the wrong way in the sequence, or an appendix belongs with the main report. Organizing pages fixes the structure without rewriting the document. This guide shows how to plan the order, use page ranges for extra material, and check the download so the file you send reads the way you intended.",
  sections: [
    {
      heading: "Start with a map of the document",
      paragraphs: [
        "Before moving anything, open the PDF and note the pages that must stay together. Write down a few anchors such as the cover, the first main section and the final appendix. A short map is faster than guessing from thumbnails when a document has dozens of similar-looking pages.",
        "The page organizer shows each page as a small picture. That matters because page labels inside the document may not match the file order. A printed page marked 1 can be the third page of the PDF if there was an unnumbered cover, so rely on the thumbnail sequence.",
      ],
    },
    {
      heading: "Move, delete, then add",
      paragraphs: [
        "Use the arrow controls to shift a page one place earlier or later, repeating until the order is right. The number beside each thumbnail shows its new position. Removing a page affects only the working copy in the browser; the file on your computer stays exactly where it was.",
        "Work deliberately, because there is no undo button inside the tool. If you move the wrong page or delete too much, choose the same PDF again to rebuild the original sequence, then make your changes once more. The final document must contain at least one page.",
      ],
    },
    {
      heading: "Add pages with ranges carefully",
      paragraphs: [
        "A second PDF can supply missing pages. Type single numbers or ranges such as 1, 4-6, counting from page one of that second file, not from the document you are arranging. Decide whether the new pages go at the beginning, at the end, or after a chosen position in the current thumbnail order.",
        "Adding pages is not the same as merging whole files in every situation. This tool is best for a small insert: a corrected signature page, a missing receipt or a replacement cover. If you are combining several complete documents, a dedicated merge is a cleaner starting point.",
      ],
    },
    {
      heading: "Check the result before you share it",
      paragraphs: [
        "After applying the changes, the tool creates a preview of the first page. Use it as a quick sign that the file opens and that the opening page is correct, then download the PDF and scroll through the parts you moved. Pay special attention to the boundaries where new pages were inserted.",
        "This is a page-level organizer, not a full editor. It does not rotate a crooked page, change words inside a scan, crop margins or restyle headings. If a page itself is wrong, fix that at the source or use a separate tool before arranging the final order.",
      ],
    },
    {
      heading: "Privacy and practical limits",
      paragraphs: [
        "Both PDFs are read and changed inside the browser tab. Nothing is uploaded, and no arranged copy is stored by the site. Very large files can take longer because each page must be rendered as a thumbnail, so be patient and keep the tab open until the download is ready.",
        "Encrypted PDFs usually cannot be opened by this tool. Ask for an unlocked copy from the person who controls the file, and only make changes you are allowed to make. If the result looks wrong, keep the original and rebuild the order from scratch.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I undo a deleted page?",
      answer:
        "There is no undo button. Choose the source PDF again to restore its original page order, then repeat the changes more carefully.",
    },
    {
      question: "How do I number pages in the second PDF?",
      answer:
        "Start at 1 for that file. For example, 2, 5-7 adds its second, fifth, sixth and seventh pages.",
    },
    {
      question: "Will the thumbnail order match the download?",
      answer:
        "Yes. The grid is the working order used to build the new file, and the position labels update after each move.",
    },
    {
      question: "Can I add pages from several documents at once?",
      answer:
        "Not in one pass here. Apply one insert, download the result, then use the tool again with another source file if needed.",
    },
    {
      question: "Does organizing change text or images?",
      answer:
        "No. It changes which pages are kept and where they appear. Page contents, sizes and links stay as they were.",
    },
    {
      question: "Why can I not delete every page?",
      answer:
        "A PDF with no pages is not useful and may not open correctly. The tool stops before producing an empty document.",
    },
    {
      question: "Are my PDFs uploaded?",
      answer:
        "No. Reading, arranging and previewing happen in your browser tab. Nothing is sent to a server.",
    },
  ],
  relatedTools: ["organize-pdf", "rotate-pdf", "split-pdf", "merge-pdf", "page-numbers-pdf"],
  updated: "2026-11-24",
};
