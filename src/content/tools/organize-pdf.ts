import type { ToolContent } from "./types";

export const organizePdfContent: ToolContent = {
  slug: "organize-pdf",
  title: "Organize PDF",
  description: "Rearrange, delete and add PDF pages in your browser, with page thumbnails.",
  intro:
    "Organize PDF lets you sort pages of your PDF file however you like, remove pages you no longer need, and add pages from a second document. All changes are made in your browser before you download one clean file.",
  sections: [
    {
      heading: "Put pages in the right order",
      paragraphs: [
        "A PDF often needs a small fix: a scanned page is upside down in the sequence, a cover page sits in the wrong place, or an appendix belongs before the main text. This tool shows each page as a thumbnail so you can see what you are moving. Use the arrow buttons to shift a page one place earlier or later, and repeat until the document reads correctly.",
        "The position label under each thumbnail shows the new order, not the original page number. That makes it easier to check a long document after several moves. The page count stays the same until you delete or add pages.",
      ],
    },
    {
      heading: "Delete pages safely",
      paragraphs: [
        "The bin button removes a page from the working copy. Nothing is deleted from your computer, and the original uploaded file is untouched. If you remove a page by mistake, start again with the same file; the tool rebuilds the order from the source document each time you choose a PDF.",
        "You must keep at least one page in the final file. If you want an empty document, that is not useful and the tool will stop with a clear message. This guard prevents a blank download.",
      ],
    },
    {
      heading: "Add pages from another file",
      paragraphs: [
        "Choose a second PDF if you need to add pdf pages to your document. You can add every page, or type a range such as 2, 5-7. Page numbers for the second file start at 1, and the hint under the box reminds you of that.",
        "Next, decide where the new pages should go: at the beginning, at the end, or after a chosen position in the arranged document. The order shown in the thumbnail grid is the order used for this choice. After you apply the changes, the result contains the original pages you kept plus the new pages in one file.",
      ],
    },
    {
      heading: "Check before you download",
      paragraphs: [
        "A preview of page one is created after the changes are applied. It is a quick way to confirm that the file opens and that the first page is what you expect. Download the result and open it fully if you need to check every page, especially when you have added pages from another document.",
        "This is not a full PDF editor. It does not change page contents, rotate pages or merge text. For those jobs, use Rotate PDF, Merge PDF or Split PDF from the related links below.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "The source PDFs never leave your browser tab. Ordering, deletion and page insertion all happen on your device, so nothing is uploaded or stored on our servers. Very large files can take longer because each thumbnail must be rendered.",
        "Password-protected PDFs cannot be opened by this tool. Ask the document owner for an unlocked copy first. If a page is a scan, the thumbnail still shows it, but the tool cannot change any text inside the image.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I undo a move or deletion?",
      answer:
        "There is no undo button inside the tool. Choose the same PDF again to rebuild the original page order, then make your changes once more.",
    },
    {
      question: "Can I add pages from more than one second PDF?",
      answer:
        "Not in one pass. Apply the changes, download the result, then use the tool again with another file to add more pages.",
    },
    {
      question: "What page numbers should I type for the second PDF?",
      answer:
        "Use page numbers from that file, starting at 1. For example, 1, 3-5 adds the first, third, fourth and fifth pages.",
    },
    {
      question: "Will the page order I see be the order in the download?",
      answer:
        "Yes. The thumbnail grid is your working order. The position labels update as you move pages.",
    },
    {
      question: "Does this tool change anything inside a page?",
      answer:
        "No. It only changes which pages are kept and the order they appear in. Text, images and page sizes stay as they were.",
    },
    {
      question: "Why can't I delete every page?",
      answer:
        "A PDF with no pages is not useful and may not open correctly. The tool stops if your final document would be empty.",
    },
    {
      question: "Are my PDFs uploaded?",
      answer:
        "No. Both PDFs are handled inside your browser tab. Nothing is sent to a server.",
    },
  ],
  privacyNote:
    "Both PDFs are read and changed in this browser tab. They are not uploaded to our servers.",
  related: ["split-pdf", "merge-pdf", "rotate-pdf", "pdf-to-jpg", "sign-pdf"],
  updated: "2026-11-24",
};
