import type { ToolContent } from "./types";

export const unlockPdfContent: ToolContent = {
  slug: "unlock-pdf",
  title: "Unlock PDF",
  description:
    "Remove password protection from a PDF you own when you know the current password, in your browser.",
  intro:
    "Unlock PDF removes encryption from a document you are allowed to open. If you know the password, the tool creates a clean copy that opens without a prompt and keeps the pages, text and layout of the original. The file and password stay in your browser.",
  sections: [
    {
      heading: "What unlocking actually does",
      paragraphs: [
        "A protected PDF can use two kinds of password. A user password is needed to open the file. An owner password controls what a viewer allows, such as printing or copying. Some documents open freely but still carry editing restrictions; others ask for a password before the first page appears.",
        "This tool decrypts the document with the password you supplied and writes a new, unprotected PDF. It does not guess passwords, try word lists or break encryption. If you do not know the password, there is nothing this tool can do, and you should ask the person who created the file for an unlocked copy.",
      ],
    },
    {
      heading: "When you might need it",
      paragraphs: [
        "You may have an old export from an accounting system that you now need to merge with another report. You may have a form that opens but blocks printing. Or you may have a file you protected yourself years ago and no longer need the restriction. In each case, unlocking produces a normal PDF you can work with again.",
        "Only unlock documents you own or documents you have clear permission to change. Removing protection can change the terms under which a document was shared, so check that you have the right to do it first.",
      ],
    },
    {
      heading: "How to unlock a PDF",
      paragraphs: [
        "Choose the protected PDF, type the current password in the password box and select Unlock PDF. If the password is correct, a download button appears. Save the new file under a different name so the original stays untouched.",
        "If you see a password error, check capital letters, spaces and similar-looking characters such as the number zero and the letter O. Passwords are case-sensitive. If the file opens without a prompt but still blocks editing, leave the password box empty and try again; some files only have an owner restriction.",
      ],
    },
    {
      heading: "What stays the same",
      paragraphs: [
        "Unlocking changes the encryption, not the page content. Text remains selectable, images keep their resolution, links and bookmarks normally remain in place, and page order is unchanged. This makes the result suitable for later tools such as merge, organize, compress or add page numbers.",
        "Very old or unusually damaged PDFs may not process cleanly. If the result looks wrong, keep the original and try a fresh copy from its source.",
      ],
    },
    {
      heading: "Limits and responsible use",
      paragraphs: [
        "Removing encryption also removes the permissions that came with it. Once you download the unlocked copy, anyone who has that copy can print, copy or edit it. Store it carefully and share it only with people who should receive it.",
        "This tool does not remove visible watermarks, digital signatures or copyright notices. Those are part of the document content or a separate trust system, not the same thing as password encryption.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "Your PDF and password are processed inside this browser tab. They are not uploaded to our servers, and the password is not written to storage. The unlocked copy is created locally and is only saved when you choose to download it.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can this tool unlock a PDF without the password?",
      answer:
        "No. You must know the current password. We do not provide password guessing or encryption-breaking tools.",
    },
    {
      question: "My PDF opens but will not let me print. What password should I enter?",
      answer:
        "If the file opens without a prompt, try unlocking with the password box empty. Some PDFs only have owner restrictions, not an open password.",
    },
    {
      question: "Will unlocking keep the text and images?",
      answer:
        "Yes. Unlocking removes encryption rather than changing the page content, so text, images, page order and layout are preserved.",
    },
    {
      question: "Is it legal to unlock any PDF?",
      answer:
        "Only unlock files you own or have clear permission to modify. Removing protection from someone else's document may breach its terms.",
    },
    {
      question: "Does this remove a watermark or digital signature?",
      answer:
        "No. Visible watermarks and digital signatures are different from password encryption and remain part of the document.",
    },
    {
      question: "Why did my password fail?",
      answer:
        "Check capital letters, spaces and similar characters. If you still cannot open the file, ask the document owner for the correct password or an unlocked copy.",
    },
    {
      question: "Are my file and password uploaded?",
      answer:
        "No. Both stay in your browser tab. Nothing is sent to our servers.",
    },
  ],
  privacyNote:
    "Your PDF and password stay in this browser tab. They are not uploaded to our servers, and the unlocked copy is created locally.",
  related: ["protect-pdf", "merge-pdf", "organize-pdf", "compress-pdf", "remove-watermark-pdf"],
  updated: "2026-11-24",
};
