import type { GuideContent } from "./types";

export const signPdfInBrowserGuide: GuideContent = {
  slug: "sign-a-pdf-in-your-browser",
  title: "How to Sign a PDF in Your Browser",
  description: "How to add a visible signature to a PDF locally, place it neatly, and understand what a browser signature does not prove.",
  intro:
    "Signing a PDF in a browser is usually about adding your mark to a page you already have. It is quick, private and useful when a form or approval simply needs a visible name. It is not the same as a verified electronic signature service. Knowing that difference before you send the file will save confusion later, especially when another office has strict rules about identity, certificates or audit records.",
  sections: [
    {
      heading: "What kind of signature this is",
      paragraphs: [
        "The tool places a signature image on the PDF, much like signing a printed page and scanning it back in. The result is appropriate for simple forms, permission slips, internal approvals and documents where a visible mark is what the recipient expects.",
        "It is not a cryptographic digital signature. There is no certificate, identity check, timestamp record or audit trail. If a bank, government office or legal process requires a verified e-signature, use a dedicated service instead of assuming that a visible name will satisfy the requirement.",
      ],
    },
    {
      heading: "Choose type, draw or image",
      paragraphs: [
        "Typed signatures turn your name into a script-style image. They are neat and fast, especially on a laptop, though they look less like handwriting. Draw mode gives you a blank pad for a mouse, trackpad or touch screen. Write slowly, clear the pad and try again if the first attempt looks shaky.",
        "Upload mode accepts a signature image you already have, such as a PNG or JPG. A PNG with a transparent background usually looks cleanest because the page behind the marks stays visible. Crop away extra white space first, or the signature may appear smaller than you expect when it is placed on the page.",
      ],
    },
    {
      heading: "Place the mark where it belongs",
      paragraphs: [
        "Position is set as a percentage of the page, which helps the same settings work on A4, Letter and unusual page sizes. A width around one third of the page is a reasonable starting point. If the signature covers printed words, move it down or make it narrower before downloading.",
        "Choose the pages carefully. You can sign every page, odd or even pages, or a custom range such as 4, 7-8. Page numbers start at 1. Most documents only need one signed page, so avoid marking every page unless someone has asked for it. Keep opacity high for a normal signature; lower settings are better suited to a faint background mark.",
      ],
    },
    {
      heading: "Before you send the signed copy",
      paragraphs: [
        "The preview after applying shows page one, which is useful for a quick check. Download the PDF and open it in your normal reader as well. Zoom in, confirm that the signature is legible, and make sure it sits in the intended space rather than over important text.",
        "There is no automatic signature line detection and no editing tool for a signature already placed. If the position is wrong, start again with the original PDF and enter new values. Keep the unsigned original so you can make a fresh copy without rebuilding the document.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "The PDF and the signature stay in the browser tab. Nothing is uploaded, saved or emailed by the tool, which makes it suitable for documents you would rather keep on your own device. Refreshing the tab clears the work, so download the result before closing it.",
        "Password-protected PDFs cannot be opened here. Very large files may take longer to render, and the tool cannot ask other people to sign. It adds a visible image to pages you already have; it does not manage a signing workflow or verify anyone's identity.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this a legally binding digital signature?",
      answer:
        "This tool adds a visible image only. It does not provide identity verification, a certificate or an audit trail, so it is not a cryptographic digital signature.",
    },
    {
      question: "Can I request someone else to sign?",
      answer:
        "No. This is for signing a PDF yourself. Requesting signatures from other people needs a separate workflow that this browser tool does not provide.",
    },
    {
      question: "Which method looks most natural?",
      answer:
        "A hand-drawn signature or a clean cropped PNG usually looks most like handwriting. A typed name is tidier but more obviously generated.",
    },
    {
      question: "Can I sign only one page?",
      answer:
        "Yes. Choose a custom page range and enter that page number, counting from 1. Check the first and last page of the download.",
    },
    {
      question: "Why does my signature look jagged or faint?",
      answer:
        "A small drawing stretched too wide can look jagged. Draw larger, then reduce the width. For a normal signature, keep opacity high instead of using a see-through setting.",
    },
    {
      question: "Can I move the signature after applying it?",
      answer:
        "No. Start again with the unsigned PDF and enter new position or size values before downloading another copy.",
    },
    {
      question: "Is my signature uploaded?",
      answer:
        "No. The PDF and signature are processed in the browser tab. Nothing is sent to a server or stored by the site.",
    },
  ],
  relatedTools: ["sign-pdf", "watermark-pdf", "page-numbers-pdf", "organize-pdf", "protect-pdf"],
  updated: "2026-11-24",
};
