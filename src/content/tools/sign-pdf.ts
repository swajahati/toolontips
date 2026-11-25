import type { ToolContent } from "./types";

export const signPdfContent: ToolContent = {
  slug: "sign-pdf",
  title: "Sign PDF",
  description: "Type, draw or upload your signature and place it on a PDF in your browser.",
  intro:
    "Sign PDF lets you sign a document yourself without uploading it. Type a name in a script style, draw your mark with a mouse or finger, or add a signature image, then place it on the pages you choose.",
  sections: [
    {
      heading: "What signing means here",
      paragraphs: [
        "This tool adds a visible signature image to a PDF. It is the digital equivalent of writing your name on a printed page and scanning it back in. The result is useful for forms, permission slips, simple approvals and documents where a visible mark is enough.",
        "It is not a cryptographic digital signature and it does not prove your identity. There is no certificate, no audit trail and no request workflow. If a company or government body requires a legally verified electronic signature, use a dedicated e-sign service instead.",
      ],
    },
    {
      heading: "Three ways to create a signature",
      paragraphs: [
        "Type mode turns the name you enter into a cursive-style image. It is quick and neat, and it works well on a laptop. Draw mode gives you a blank pad: use a mouse, trackpad or touch screen to write your signature by hand. Clear the pad and try again if the first attempt looks untidy.",
        "Upload mode accepts a PNG or JPG of a signature you already have. A PNG with a transparent background usually looks best because the page behind the marks stays visible. Keep the image simple and crop out extra white space before uploading.",
      ],
    },
    {
      heading: "Place the signature where it belongs",
      paragraphs: [
        "After choosing a signature, set its left and top position as percentages of the page, then set its width. Using percentages means the same settings work on A4, Letter and unusual page sizes. A width around one third of the page is often a good starting point.",
        "You can sign every page, odd or even pages, or a custom range such as 2, 4-5. Most documents only need one page signed, so choose a narrow range unless you have a reason to mark more pages. The preview after applying shows page one so you can check the result before downloading.",
      ],
    },
    {
      heading: "Tips for a clean result",
      paragraphs: [
        "Draw on a large pad if you can, then reduce the width in the tool. A signature drawn with too few points can look jagged when stretched. If you type your name, keep it short; a very long phrase becomes thin and hard to read when fitted to the page.",
        "If the signature covers document text, move it down or reduce its width. There is no automatic signature line detection, so placing it correctly is your responsibility. Open the downloaded PDF once before sending it to anyone.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Your PDF and signature stay in the browser tab. Nothing is uploaded, saved or emailed by this tool. That makes it a good choice for documents you would rather keep on your own device.",
        "Password-protected PDFs cannot be opened. Very large files may take longer to render for the preview. This tool signs pages you already have; it cannot request signatures from other people.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this a legally binding digital signature?",
      answer:
        "This tool adds a visible signature image only. It does not provide identity verification, a certificate or an audit trail, so it is not a cryptographic digital signature.",
    },
    {
      question: "Can I request someone else to sign?",
      answer:
        "No. This tool is for signing a PDF yourself. Sending a document to other people for signatures would need a server and email system, which this site does not use for this tool.",
    },
    {
      question: "Which signature method looks best?",
      answer:
        "A drawn signature or a cropped PNG usually looks most natural. Typed names are neat and quick, but they look less like handwriting.",
    },
    {
      question: "Can I change the signature after placing it?",
      answer:
        "Start again with the original PDF and enter new position or size values. The existing result cannot be edited inside this tool.",
    },
    {
      question: "Can I sign only the last page?",
      answer:
        "Yes. Choose Custom range and enter that page number. Page numbers start at 1.",
    },
    {
      question: "Why does my signature look faint?",
      answer:
        "Lower the opacity only when you want a background-style mark. For a normal signature, keep opacity high and place it over empty space.",
    },
    {
      question: "Is my signature uploaded?",
      answer:
        "No. The PDF and signature image are processed entirely in your browser tab. Nothing is sent to a server.",
    },
  ],
  privacyNote:
    "Your PDF and signature are processed in this browser tab. They are not uploaded to our servers.",
  related: ["watermark-pdf", "organize-pdf", "page-numbers-pdf", "compress-pdf", "merge-pdf"],
  updated: "2026-11-24",
};
