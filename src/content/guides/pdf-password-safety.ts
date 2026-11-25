import type { GuideContent } from "./types";

export const pdfPasswordSafetyGuide: GuideContent = {
  slug: "pdf-password-safety",
  title: "How to Protect and Share PDFs Safely",
  description: "A practical guide to PDF passwords, permissions, safe sharing, and the privacy limits of browser-based protection.",
  intro:
    "A PDF can feel private just because it arrives as an attachment, but an attachment is only as private as the way you send it. Password protection adds a real barrier: a viewer must enter the right password before the pages appear. It will not make a document vanish from someone else's computer, and it will not prove who signed it. This guide explains what encryption does, which settings are worth using, and how to share a protected file without handing over the key in the same message.",
  sections: [
    {
      heading: "What encryption changes",
      paragraphs: [
        "Encryption scrambles the contents of a PDF so a reader needs a password to display the pages. Carrying an encrypted file on a laptop or leaving it in an inbox is not the same as exposing the pages. The protection travels with the document, which is useful when you cannot control every device it will touch.",
        "A PDF may have a user password, needed to open it, and an owner password that controls permission settings. If no separate owner password is set, the open password usually fills both roles. The tool creates a new protected copy, so the original file stays unchanged on your device.",
      ],
    },
    {
      heading: "Choose a password you can keep",
      paragraphs: [
        "A long phrase made from ordinary words is easier to remember and harder to guess than a short string of symbols. Use something unique for the document, not a password you reuse for email or banking. Avoid names, birthdays and obvious substitutions that other people could work out from public information.",
        "Write the password down in a safe place before you send the file. Browser-based tools do not keep a recovery copy, and there is no secret back door inside the PDF. If the password is lost, the protected file may be impossible to open again, so keep an unprotected backup while you still can.",
      ],
    },
    {
      heading: "Permissions are not a force field",
      paragraphs: [
        "Permission settings can say that printing, copying or editing is not allowed. Many PDF readers follow those choices, which helps prevent casual changes. They are useful for setting expectations, especially when a document should be read but not altered.",
        "They are not a guarantee once someone can open the file. A person can take a screenshot, photograph a screen or use software that ignores the restrictions. Treat the open password as the real control, and only give it to people who should see the document.",
      ],
    },
    {
      heading: "A calmer way to share",
      paragraphs: [
        "Protect a finished copy rather than working on the encrypted file every time. Download it, open it once, and confirm that the password prompt appears. If the recipient uses older software, test the file there if you can, because very old PDF readers may not support modern encryption.",
        "Send the document and the password through different channels. A message with the file and a separate call, text or password manager note works better than one email containing both. Tell the recipient what to do if the prompt appears, so they do not assume the file is broken.",
      ],
    },
    {
      heading: "What browser tools can and cannot do",
      paragraphs: [
        "When protection runs in the browser, the PDF and the password stay in the browser tab. Nothing is uploaded, and the new encrypted copy is built on your device. Closing or refreshing the tab clears the work, so download the finished file before you move on.",
        "A browser cannot recover a forgotten password, remove a visible watermark, or turn a drawn mark into a verified digital signature. Other tools may also refuse encrypted files, so unlock a copy first when you need to merge, compress or reorder pages. Protection is one layer, not a complete security plan.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between a user and owner password?",
      answer:
        "The user password opens the document. The owner password controls permission settings and full access. If you leave the owner password empty, the open password is used for both roles.",
    },
    {
      question: "Can permissions stop someone from copying text?",
      answer:
        "They can in many PDF readers, but they are not a hard lock. Once a person can view the pages, other methods may still capture the content.",
    },
    {
      question: "Should I send the password in the same email?",
      answer:
        "No. Send the PDF and the password by different channels so one intercepted message does not give someone both the file and the key.",
    },
    {
      question: "Can a lost password be recovered from the PDF?",
      answer:
        "No recovery copy is kept. Save the password somewhere safe before sharing, and retain an unlocked backup until you are sure it is no longer needed.",
    },
    {
      question: "Does password protection add a digital signature?",
      answer:
        "No. Encryption restricts access; a digital signature uses a certificate to verify identity and detect changes. They are separate systems.",
    },
    {
      question: "Are my PDF and password uploaded?",
      answer:
        "No. Browser-based protection processes both locally. The file is only saved when your browser downloads the protected copy.",
    },
  ],
  relatedTools: ["protect-pdf", "unlock-pdf", "sign-pdf", "watermark-pdf", "merge-pdf"],
  updated: "2026-11-24",
};
