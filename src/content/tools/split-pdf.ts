import type { ToolContent } from "./types";

export const splitPdfContent: ToolContent = {
  slug: "split-pdf",
  title: "Split PDF",
  description: "Extract selected pages or page ranges into a new PDF file.",
  intro:
    "Split PDF lets you choose the pages you want and place them in a new document. Enter single page numbers, a range, or a mix of both.",
  sections: [
    {
      heading: "What this tool does",
      paragraphs: [
        "Splitting a PDF does not cut the original file into pieces. It reads the pages you ask for and copies them into a new PDF. The document you started with stays untouched on your device, and the download contains only the pages you selected.",
        "This is useful when one file contains several unrelated sections. You might need to send just the invoice page from a long statement, share one chapter from a report, or remove a draft cover before sending a finished document. Instead of editing the original, you make a clean copy of the part you need.",
      ],
    },
    {
      heading: "How to choose pages",
      paragraphs: [
        "Add a PDF, then type the page numbers into the Pages to keep field. Page numbering starts at 1, matching the numbers you see in most PDF readers. Separate individual pages with commas and use a hyphen for a continuous range. For example, 2 keeps the second page, 4-6 keeps pages four, five and six, and 1, 4-6 keeps all four of those pages.",
        "Spaces around commas and hyphens are fine. The order in the final PDF always follows the order in the original document, even if you type the numbers in a different sequence. Repeated page numbers are kept only once, so you do not need to worry about typing the same page twice.",
        "If the tool can read the page count, it shows the total next to the field. Use that number as a quick check before you run the extraction.",
      ],
    },
    {
      heading: "Step-by-step",
      paragraphs: [
        "First, open the PDF on your device and note which pages you need. Next, add the file here and enter the page selection. Select Extract pages and wait for the status message to confirm that the new document is ready. Then choose Download and give the file a clearer name on your device if you plan to send it.",
        "Finally, open the downloaded PDF and confirm that the first and last pages are the ones you expected. Page numbering mistakes are easy to make when documents have an unnumbered cover, and a ten-second check prevents sending the wrong section.",
      ],
    },
    {
      heading: "Tips and limitations",
      paragraphs: [
        "Keep the original file until you are happy with the result. Extraction copies pages, but it does not rebuild the whole document, so some document-level features such as bookmarks or form data may not appear in the extracted copy.",
        "If you need many separate files, run the tool once for each group of pages. Each run produces one PDF containing the pages you choose. This also makes it easier to name each result for its purpose.",
        "Password-protected PDFs usually cannot be read by this tool. Remove the protection in the program that created the file first. Encrypted files and badly damaged files are the most common reasons an extraction fails.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "The extraction happens inside your browser tab. Your PDF is not uploaded, and no copy is kept by the site. Closing or refreshing the tab clears the tool, so download the result before you move on.",
      ],
    },
  ],
  faqs: [
    {
      question: "What page numbers should I enter?",
      answer:
        "Use the numbers shown by your PDF reader, starting at 1. Examples: 3 for one page, 3-7 for a range, and 1, 3-7 for a mix.",
    },
    {
      question: "Can I pull out non-facing or scattered pages?",
      answer:
        "Yes. Enter each page or range separated by commas. The result follows the original page order, not the order you typed.",
    },
    {
      question: "Does this change my original PDF?",
      answer:
        "No. The original file stays on your device. Only the downloaded file contains the selected pages.",
    },
    {
      question: "Will bookmarks and form fields come along?",
      answer:
        "Page content is copied, but document-wide features may not survive in the same way. Keep the original if you rely on bookmarks or filled forms.",
    },
    {
      question: "Can I split a protected PDF?",
      answer:
        "Usually not. Unlock it first in the software that set the password, then use the unlocked copy here.",
    },
    {
      question: "Is the file uploaded anywhere?",
      answer:
        "No. Splitting runs in your browser tab. Nothing is sent to a server.",
    },
  ],
  privacyNote:
    "Your PDF is processed in this browser tab. It is not uploaded to our servers.",
  related: ["merge-pdf", "compress-pdf", "jpg-to-pdf", "pdf-to-jpg"],
  updated: "2026-11-23",
};
