import type { GuideContent } from "./types";

export const mergeAndSplitPdfsGuide: GuideContent = {
  slug: "merge-and-split-pdfs",
  title: "When to Merge or Split a PDF",
  description: "Understand when one combined PDF helps, when extracting pages is better, and what survives each browser-based operation.",
  intro:
    "A long PDF is not always a better PDF, and a pile of separate files is not always easier to manage. Merging puts related pages into one container. Splitting copies a chosen section into a new file. Both sound simple, but the right choice depends on who will read the result and what they need to do with it. This guide focuses on practical decisions, not just button order.",
  sections: [
    {
      heading: "Merge when the pages belong together",
      paragraphs: [
        "Combine documents when they tell one continuous story. A cover note, agreement and appendix often make more sense as one file, especially if a reader should not have to hunt through an inbox. Merging keeps the pages in the order you choose and preserves their original layout, fonts and images.",
        "Check the file list before you run the merge. Remove a file and add it again if it sits in the wrong place. Clearly named files make the list easier to read, and a single spreadsheet or note recording the final structure can save time when you return to the project months later.",
      ],
    },
    {
      heading: "Split when only one part needs to travel",
      paragraphs: [
        "Extract pages when a recipient needs a specific section. Sending one invoice from a long statement, one chapter from a report or one certificate from a bundle reduces clutter and avoids sharing information that is not relevant. Splitting creates a new PDF from the pages you select; the original document stays on your device.",
        "Page numbering starts at 1 and matches most readers. Use commas for separate pages and a hyphen for a range, such as 2, 5-8. The output follows the order of the original document, not the order you typed. Open the downloaded file and check the first and last page before sending it.",
      ],
    },
    {
      heading: "Prepare files before you combine them",
      paragraphs: [
        "Make sure every source file opens on its own. A damaged PDF can stop a merge, and an encrypted one usually must be unlocked first by someone who knows the password and has permission. Work in smaller batches if a job feels heavy; you can merge the batch results again afterwards.",
        "Decide whether the final document needs a single page size, page numbers or a smaller file. Merging alone does not improve quality or reduce size. If those details matter, apply the right tool before or after the merge, then keep the source files so the combined PDF can be rebuilt in a different order later.",
      ],
    },
    {
      heading: "Keep the structure you really need",
      paragraphs: [
        "Page content usually survives these operations well. Links on a page often remain, but bookmarks, form entries and document-level settings can behave differently after a merge or extraction. If your workflow depends on them, test the result in the reader your recipient uses and keep the originals available.",
        "Splitting is not a repair tool. It cannot rewrite a confusing section or fix a missing page; it only copies what is already there. Likewise, merging many files will not turn them into a consistent report. Do the editorial work first, then use these tools for the final packaging.",
      ],
    },
    {
      heading: "Browser processing and practical limits",
      paragraphs: [
        "These operations happen inside the browser tab. Files are read locally and are not uploaded, so closing or refreshing the tab clears the work. Download the result before you leave, and give the new file a useful name on your device.",
        "Very large jobs may take longer, especially when many files are combined in one pass. Password protection and badly damaged files are the most common causes of failure. When a merge or extraction does not look right, keep the sources and try again with a smaller group or a narrower page range.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does splitting delete pages from my original PDF?",
      answer:
        "No. It copies the selected pages into a new file. The source PDF stays unchanged on your device.",
    },
    {
      question: "Should I merge before or after compressing?",
      answer:
        "Merge first if the file set may still change, then compress the final version. If each source is already huge, compress the sources you are allowed to change and keep the originals.",
    },
    {
      question: "Will links and bookmarks survive?",
      answer:
        "Page links often remain, but bookmarks and other document-level features may change. Test the result and keep originals when those features matter.",
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer:
        "Usually not. Unlock a copy with the current password in software you are permitted to use, then add the unlocked file.",
    },
    {
      question: "How do I pull out scattered pages?",
      answer:
        "Enter each page or range separated by commas. The result follows the original page order, so there is no need to sort the numbers yourself.",
    },
    {
      question: "Will merging make a large file smaller?",
      answer:
        "No. Merging changes the container, not the amount of content. Use compression separately if the combined file is too large.",
    },
    {
      question: "Are my documents sent to a server?",
      answer:
        "No. Merge and split run in the browser tab. Nothing is uploaded, and the tool clears when the page is refreshed.",
    },
  ],
  relatedTools: ["merge-pdf", "split-pdf", "organize-pdf", "compress-pdf", "page-numbers-pdf"],
  updated: "2026-11-24",
};
