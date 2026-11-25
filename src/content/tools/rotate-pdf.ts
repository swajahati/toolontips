import type { ToolContent } from "./types";

export const rotatePdfContent: ToolContent = {
  slug: "rotate-pdf",
  title: "Rotate PDF",
  description: "Rotate all pages or selected pages by 90, 180 or 270 degrees, with page thumbnails.",
  intro:
    "Rotate PDF fixes pages that opened the wrong way. Turn every page at once, or use the thumbnails to turn only the pages that need it.",
  sections: [
    {
      heading: "What rotating changes",
      paragraphs: [
        "Rotating a page changes its orientation, not its contents. A sideways scan becomes upright; an upside-down letter becomes readable. The text, images and links stay on the same page, and no information is lost. The change is stored in the PDF, so it appears in other readers too.",
        "This is different from turning the picture inside a page. Here the whole page is turned, just as if you rotated a sheet of paper. If a page already has a rotation set by its creator, this tool adds your chosen turn to that existing orientation.",
      ],
    },
    {
      heading: "Rotating every page",
      paragraphs: [
        "Choose Rotate all pages when the whole document came out sideways. Pick 90 or 270 degrees to switch between portrait and landscape, or 180 degrees when pages are upside down. The thumbnails tilt as you choose an angle, giving you a quick idea of the result before you run the tool.",
        "After rotating, download the file and open it. If the pages still look wrong, repeat the tool on the downloaded copy with a different angle. Two turns usually cover the cases where a scan was inserted in an unexpected direction.",
      ],
    },
    {
      heading: "Using the page thumbnails",
      paragraphs: [
        "When only a few pages need attention, switch to Rotate selected pages. The tool shows a small image of each page. Tick the pages you want, choose an angle, and the selected thumbnails tilt to match. Select all and Clear selection are there for quick changes.",
        "Thumbnails are limited to the first sixty pages so the tool stays responsive on a phone or older laptop. The full PDF is still processed; you simply see a smaller set of previews. If your document has more pages, work from the page numbers shown beside each thumbnail.",
      ],
    },
    {
      heading: "When page rotation matters",
      paragraphs: [
        "Mixed scans are the most common reason to use this tool. A document might combine portrait letters with landscape forms, and only the forms need a quarter turn. Rotating selected pages keeps the rest of the file untouched.",
        "Printing is another good reason. A correctly rotated PDF avoids wasted paper and makes double-sided printing easier. It also helps people reading on a phone, where sideways pages are annoying to scroll through.",
        "Before you choose an angle, think about how the file will be read. Reports usually feel natural in portrait, while wide tables and diagrams often need landscape. Picking the orientation for the reader, rather than the way a scanner happened to feed the page, saves people from turning the document again and again.",
      ],
    },
    {
      heading: "Limits and privacy",
      paragraphs: [
        "Rotation cannot correct a scan that was captured at a strange angle, such as a page photographed from the side. For that, you need image correction rather than page rotation. Password-protected PDFs must be unlocked first.",
        "Very large documents may take a little longer to open and preview. The file stays in your browser tab from start to finish. Nothing is uploaded, and the tool clears when the page is refreshed.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which angle should I pick?",
      answer:
        "Use 90 or 270 degrees to change between portrait and landscape. Use 180 degrees when the page is upright but upside down.",
    },
    {
      question: "Can I rotate only page 4 and page 9?",
      answer:
        "Yes. Choose Rotate selected pages, tick those thumbnails, pick an angle, then run the tool.",
    },
    {
      question: "Will rotating change the text or images?",
      answer:
        "No. The page itself is turned. The content stays exactly as it was, and the change is saved in the PDF.",
    },
    {
      question: "Why do I only see sixty thumbnails?",
      answer:
        "The preview is limited to keep the tool fast on everyday devices. The full document is still rotated, including pages beyond the preview.",
    },
    {
      question: "Can this straighten a crooked photo of a page?",
      answer:
        "No. It turns whole pages by fixed angles. A page photographed at a slant needs image correction before it becomes a PDF.",
    },
    {
      question: "Can I rotate a password-protected PDF?",
      answer:
        "No. Unlock it in the application that set the password, then use the unlocked copy here.",
    },
    {
      question: "Is my PDF uploaded?",
      answer:
        "No. Rotation and thumbnails are produced in your browser tab. Nothing is sent to a server.",
    },
  ],
  privacyNote:
    "Your PDF is processed in this browser tab. It is not uploaded to our servers.",
  related: ["watermark-pdf", "page-numbers-pdf", "split-pdf", "compress-pdf"],
  updated: "2026-11-24",
};
