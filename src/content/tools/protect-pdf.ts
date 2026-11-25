import type { ToolContent } from "./types";

export const protectPdfContent: ToolContent = {
  slug: "protect-pdf",
  title: "Protect PDF",
  description:
    "Add AES-256 password protection and printing, editing and copying permissions to a PDF in your browser.",
  intro:
    "Protect PDF encrypts a document with a password before you share it. The tool uses AES-256, asks for the password when the file is opened, and lets you choose what a reader should be allowed to print, change or copy. Your file and password stay in your browser.",
  sections: [
    {
      heading: "What password protection does",
      paragraphs: [
        "PDF encryption scrambles the document data so a viewer needs the right password before it can show the pages. This is useful for contracts, invoices, reports or any file that should not be readable by whoever happens to receive the link or attachment.",
        "The tool creates a new protected copy. Your original file is not changed. Choose a password you can remember, because there is no recovery key hidden in the PDF and we do not store your password.",
      ],
    },
    {
      heading: "User and owner passwords",
      paragraphs: [
        "The open password, also called the user password, is what someone types to view the document. The owner password is an optional second password that gives full access. If you leave the owner password blank, the open password is used for both roles.",
        "Using a separate owner password can be helpful when a recipient needs to read the file but should not change the permission settings. Treat both passwords as secrets and send them through a different channel from the PDF itself.",
      ],
    },
    {
      heading: "Choosing permissions",
      paragraphs: [
        "You can allow full printing, low-quality printing or no printing. You can allow all changes, comments and form fields, form fields only, page assembly only or no changes. You can also decide whether copying text and images is allowed.",
        "These settings are respected by many PDF viewers, but they are not a physical lock. A viewer that ignores them may still print or copy after the file is opened. Keep the open password private; that is the protection that really controls access.",
      ],
    },
    {
      heading: "How to protect a PDF",
      paragraphs: [
        "Choose an unprotected PDF, enter the open password twice, then adjust the permission choices. Select Protect PDF and download the encrypted copy. Before sending it, open the downloaded file once and confirm that it asks for the password you chose.",
        "If you plan to share the file with people using older software, test it in that software first. AES-256 is widely supported in current PDF readers, but very old viewers may refuse to open it.",
      ],
    },
    {
      heading: "Password advice",
      paragraphs: [
        "Use at least eight characters, and prefer a longer phrase made from words you can remember. Avoid names, birthdays and common substitutions. A long, unique password is much harder to guess than a short complicated one that you reuse elsewhere.",
        "Do not place the password in the same email as the PDF. Share it by a separate message or in person, and store it in a password manager if you need to keep it for a long time.",
      ],
    },
    {
      heading: "Limits of protection",
      paragraphs: [
        "Password protection controls access to the file, not what a trusted reader can do after opening it. It does not stop screenshots, forwarding, printing by a camera or edits made by a tool that ignores permissions. It also does not add a legally recognised digital signature.",
        "If you lose the password, the protected file cannot be opened again from this tool. Keep an unprotected backup in a safe place before you discard the original.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "The PDF and both passwords remain inside your browser tab. No document or password is uploaded, and no protected copy is kept by us. The browser downloads the small WebAssembly engine needed for encryption, then does the work locally.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which encryption does this tool use?",
      answer:
        "It uses AES-256, the modern PDF encryption method supported by current PDF readers.",
    },
    {
      question: "Can I recover a lost password from the protected PDF?",
      answer:
        "No. We do not store passwords and this tool does not guess them. Keep a safe record of the password before you share the file.",
    },
    {
      question: "What is the owner password for?",
      answer:
        "It gives full access to the document settings. If you leave it blank, the open password is used as the owner password too.",
    },
    {
      question: "Can I stop someone from printing or copying?",
      answer:
        "You can set those permissions, and many PDF viewers follow them. They are not a guarantee once a person can open the document.",
    },
    {
      question: "Will protection change my pages?",
      answer:
        "No. It encrypts the existing document. Page content, layout and page order stay the same.",
    },
    {
      question: "Does this add a digital signature?",
      answer:
        "No. Password encryption and digital signatures are different systems. This tool only adds password protection.",
    },
    {
      question: "Are my PDF and password uploaded?",
      answer:
        "No. Both stay in your browser tab, and the encrypted copy is created locally.",
    },
  ],
  privacyNote:
    "Your PDF and passwords stay in this browser tab. They are not uploaded to our servers, and the protected copy is created locally.",
  related: ["unlock-pdf", "merge-pdf", "compress-pdf", "watermark-pdf", "sign-pdf"],
  updated: "2026-11-24",
};
