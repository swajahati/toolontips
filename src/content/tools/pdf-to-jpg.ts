import type { ToolContent } from "./types";

export const pdfToJpgContent: ToolContent = {
  slug: "pdf-to-jpg",
  title: "PDF to JPG",
  description: "Render a PDF page as a crisp JPG image that you can save to your device.",
  intro:
    "PDF to JPG turns one page of a PDF into an image file. Pick the page, choose JPG or PNG and a resolution, then save the result.",
  sections: [
    {
      heading: "What this tool does",
      paragraphs: [
        "Some tasks need a picture rather than a document. You might want a page as a presentation slide, an image for a forum post, or a snapshot to include in another file. This tool opens the PDF in your browser, draws the page you choose onto a virtual canvas, and lets you download the result as JPG or PNG.",
        "The page is rendered, not simply copied. Layout, colours and images are reproduced as they appear in the PDF. Form field values and hidden layers may not be included, and interactive elements become part of a flat picture. The download gets a simple name such as page-2.jpg, so it is easy to find in your downloads folder.",
      ],
    },
    {
      heading: "How to convert a PDF page",
      paragraphs: [
        "Add a PDF file. If the page count is available, it appears next to the Page field. Enter the page number you want, starting at 1. Choose JPG for photographs and general sharing, or PNG when you need sharp lines and flat colours.",
        "Select a resolution. Normal is suitable for screen use and keeps the file small. High is better when the picture will be enlarged, and Sharp is the best choice for print or when you plan to read small text in the image. Then choose Render page and download the file once the preview appears.",
      ],
    },
    {
      heading: "JPG or PNG?",
      paragraphs: [
        "JPG stores photographs efficiently and produces smaller files. It uses lossy compression, which means very fine detail can soften slightly, especially at lower quality. PNG stores images without that kind of loss, so it is a good fit for charts, logos, screenshots and pages made mostly of text.",
        "If you are unsure, start with JPG at High resolution. Switch to PNG if edges look fuzzy or if the page contains crisp line art that must stay exact.",
      ],
    },
    {
      heading: "Practical tips and limits",
      paragraphs: [
        "This tool renders one page at a time. That keeps the controls simple and avoids a burst of downloads from your browser. If you need several pages, change the page number and download each one after it renders.",
        "Higher resolution creates larger pixel dimensions, which can make the download bigger and take longer on a slow device. Increase resolution only as far as you need. A page intended for a website rarely needs print-level detail.",
        "Password-protected PDFs usually cannot be opened here. Unlock the file first. If a page renders blank, check that the PDF is not encrypted and try a low page number to confirm the file can be read.",
        "A PDF page can contain unusual fonts or transparent layers. The image shows how the page appears on screen, which is what most people need. If a character looks different from the original, try the sharper setting before assuming the file is damaged. Different PDF readers can also render rare fonts slightly differently.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "Rendering takes place in your browser tab. Your PDF is not uploaded to our servers, and the temporary image preview disappears when the page is refreshed or closed.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I convert a whole PDF at once?",
      answer:
        "This tool handles one page at a time. Choose a page, download the image, then select the next page.",
    },
    {
      question: "Which format should I use?",
      answer:
        "Use JPG for photos and general sharing. Use PNG for charts, logos or pages where sharp edges matter.",
    },
    {
      question: "What resolution should I pick?",
      answer:
        "Normal is fine for screens. High is better for larger displays, and Sharp suits printing or reading small text in the image.",
    },
    {
      question: "Why does my image look soft?",
      answer:
        "Try a higher resolution or PNG. JPG at low settings can soften fine lines and small letters.",
    },
    {
      question: "Will form fields and links be included?",
      answer:
        "No. The page becomes a flat image, so interactive parts are rendered as they appear rather than remaining clickable.",
    },
    {
      question: "Is my PDF uploaded?",
      answer:
        "No. The page is rendered in your browser. Nothing is sent to our servers.",
    },
  ],
  privacyNote:
    "Your PDF is processed in this browser tab. It is not uploaded to our servers.",
  related: ["jpg-to-pdf", "compress-pdf", "merge-pdf", "split-pdf"],
  updated: "2026-11-23",
};
