import type { ToolContent } from "./types";

export const jpgToPdfContent: ToolContent = {
  slug: "jpg-to-pdf",
  title: "JPG to PDF",
  description: "Turn JPG or PNG pictures into a single PDF with your chosen page size.",
  intro:
    "JPG to PDF places your pictures into one PDF, one image per page. Choose whether each page should match the picture or use a standard A4 or Letter sheet.",
  sections: [
    {
      heading: "What this tool does",
      paragraphs: [
        "Photos and scans are usually saved as image files. A PDF is often a better format for sharing because it behaves the same on most devices and keeps a fixed page layout. This tool takes JPG and PNG images and writes them into a new PDF without changing the pixels in your pictures.",
        "Each image becomes one page. The order in the file list is the order in the PDF, so you can build a small photo report, a set of scanned receipts, or a portfolio in just a few steps. The finished document is named images.pdf, and you can rename it after downloading.",
      ],
    },
    {
      heading: "Choosing a page size",
      paragraphs: [
        "Match image makes each PDF page exactly the same size as the picture. This is the best choice when the image already has the shape you want, such as a scanned form or a full-page screenshot. Nothing is cropped or added.",
        "A4 and Letter create standard document pages. Use Fit inside when the whole picture should be visible with a margin around it; use Fill the page when you prefer no empty space and are happy for the outer edges to be cropped. Landscape pictures on portrait paper will leave space above and below in Fit inside mode, which is normal.",
      ],
    },
    {
      heading: "How to convert images to a PDF",
      paragraphs: [
        "Add one or more JPG or PNG images by dragging them into the dashed area or clicking to browse. Check the list and remove anything that does not belong. Pick a page size, and choose a fit option if you selected A4 or Letter.",
        "Select Create PDF. The tool builds the document in your browser and shows the result when it is ready. Download the file, then open it once to confirm the page order and orientation before you share it.",
      ],
    },
    {
      heading: "Tips for better results",
      paragraphs: [
        "Name your pictures in the order you want them to appear, such as 01-front.jpg and 02-back.jpg. The file list follows the order you add them, but clear names make it much easier to spot a mistake.",
        "Very large photos can produce a large PDF. If size matters, resize or compress the images before adding them here. This tool keeps the image data it receives and does not quietly reduce quality.",
        "PNG is useful for screenshots, logos and images with sharp edges. JPG is usually better for photographs. Mixing the two is fine; each page is handled according to its own file type.",
        "The file list is worth a second look before you start. If a picture appears twice, remove the extra copy rather than trying to fix it after downloading. Rebuilding the PDF takes only a moment, so a careful check first is the faster route.",
      ],
    },
    {
      heading: "Limits and privacy",
      paragraphs: [
        "Only JPG and PNG images are supported. Other formats should be converted to one of those first. Images that are already rotated on your device may appear with that rotation applied, so check the preview in your photo app if orientation looks wrong.",
        "Conversion happens in your browser tab. Your images are not uploaded to our servers, and nothing is stored after the tab is closed.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which image formats can I use?",
      answer:
        "JPG and PNG files are supported. Convert other formats to one of these before adding them.",
    },
    {
      question: "Can I put several photos in one PDF?",
      answer:
        "Yes. Add them all at once. Each picture becomes one page, in the order shown in the file list.",
    },
    {
      question: "What does Match image mean?",
      answer:
        "The PDF page is created at exactly the image size, so nothing is stretched, cropped or padded.",
    },
    {
      question: "Will my photos lose quality?",
      answer:
        "No. The image data is placed into the PDF as supplied. For smaller files, compress the images before converting.",
    },
    {
      question: "Why is there blank space around my picture?",
      answer:
        "That happens with Fit inside when the picture and page have different shapes. Choose Fill the page if you prefer no margins.",
    },
    {
      question: "Are my images uploaded?",
      answer:
        "No. The PDF is created in your browser tab. Nothing is sent to a server.",
    },
  ],
  privacyNote:
    "Your images are processed in this browser tab. They are not uploaded to our servers.",
  related: ["pdf-to-jpg", "merge-pdf", "compress-pdf", "split-pdf"],
  updated: "2026-11-23",
};
