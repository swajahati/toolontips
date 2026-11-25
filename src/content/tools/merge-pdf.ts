import type { ToolContent } from "./types";

export const mergePdfContent: ToolContent = {
  slug: "merge-pdf",
  title: "Merge PDF",
  description: "Combine several PDF files into one document, in the order you choose.",
  intro:
    "Merge PDF puts several documents into a single file without sending them anywhere. Add your PDFs, check the order, and download one combined document when you are ready.",
  sections: [
    {
      heading: "What this tool does",
      paragraphs: [
        "A merge takes two or more PDF files and places their pages into one new PDF. The pages keep their original layout, fonts, images and links. Nothing is retyped or rebuilt. Think of it as putting separate chapters into one binder: the pages stay the same, only the container changes.",
        "The order you choose matters. If you add an introduction, then a contract, then an appendix, the finished file follows that order. You can remove a file from the list and add it again somewhere else before you run the merge. The downloaded file is named merged.pdf, and you can rename it on your device afterwards.",
      ],
    },
    {
      heading: "How to merge PDFs in a few steps",
      paragraphs: [
        "Start by adding your files. You can drag them into the dashed area or click it to browse your device. The tool accepts PDF files only, and each file should be no larger than 50 MB. After the files appear in the list, look at the order. Use Remove next to any file you want to take out, then add it back at the right point if needed.",
        "When the list looks right, select Merge PDFs. The tool builds the new document inside your browser tab. A short status message tells you when work is in progress and when it is finished. Finally, select Download. Your browser saves the combined PDF to its normal downloads folder.",
      ],
    },
    {
      heading: "Before you merge: a quick checklist",
      paragraphs: [
        "A few small checks prevent the most common disappointments:",
      ],
      bullets: [
        "Check that every file really opens on its own before adding it. A file that is already damaged can stop the merge.",
        "Watch for password-protected PDFs. This tool works with ordinary PDFs; encrypted files usually need to be unlocked in the app that created them first.",
        "Remember that bookmarks, form entries and digital signatures may not carry over in the same way as page content. If those matter, keep the originals as well as the merged copy.",
        "If the pages come from different sources, expect mixed page sizes. That is normal and most PDF readers handle it.",
      ],
    },
    {
      heading: "Tips for a cleaner result",
      paragraphs: [
        "Naming files clearly before you upload them makes the on-screen list easier to read, especially when you are combining many documents. Numbered names such as 01-cover.pdf and 02-terms.pdf save time when you are checking the sequence.",
        "For very large jobs, work in batches. Combining five moderate files is usually smoother than combining fifty heavy ones in a single pass. If a merge fails, split the job into two groups, merge each group, and then merge the two results.",
        "After downloading, open the new PDF once and scroll through it. It is much easier to fix an ordering mistake immediately than to discover it later when you are sharing the file.",
        "Keep a short note of what each merged file contained, especially when the pages came from different projects. A plain list saved beside the PDF helps when you return to it months later and need to explain where each section came from.",
      ],
    },
    {
      heading: "Limits and privacy",
      paragraphs: [
        "This tool runs on your device. Your files are read in the browser tab and are not uploaded to our servers. Closing the tab or refreshing the page clears the work in progress, so download the result before you leave.",
        "Merging changes the structure of a PDF but does not improve its quality. If your source pages are blurry or your file is too large, use Compress PDF or PDF to JPG before or after merging, depending on what you need. Keeping the originals makes it simple to rebuild the file in a different order later.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many PDFs can I merge at once?",
      answer:
        "Add as many files as you need, up to 50 MB each. For a very large batch, merging in smaller groups is often faster and easier to check.",
    },
    {
      question: "Can I change the page order after adding files?",
      answer:
        "Remove a file and add it again in the position you want. The finished PDF follows the order shown in the file list.",
    },
    {
      question: "Will links and bookmarks survive the merge?",
      answer:
        "Page links usually remain, but bookmarks and document-level features can behave differently across PDF readers. Keep your originals if those features are important.",
    },
    {
      question: "Does merging reduce the file size?",
      answer:
        "Not necessarily. A merge mainly combines existing content. Use the Compress PDF tool if the combined file is larger than you want.",
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer:
        "Usually not. Remove the password in the program that created the file first, then add the unlocked copy here.",
    },
    {
      question: "Are my documents uploaded or stored?",
      answer:
        "No. The merge happens in your browser tab. Nothing is sent to a server, and refreshing the page clears the tool.",
    },
  ],
  privacyNote:
    "Your PDFs are processed in this browser tab. They are not uploaded to our servers.",
  related: ["compress-pdf", "split-pdf", "jpg-to-pdf", "pdf-to-jpg"],
  updated: "2026-11-23",
};
