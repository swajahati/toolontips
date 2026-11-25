import type { GuideContent } from "./types";

export const docxToPdfGuide: GuideContent = {
  slug: "docx-to-pdf-guide",
  title: "How to Convert DOCX to PDF",
  description: "Convert a Word DOCX file to PDF in the browser and check layout, fonts, links, and accessibility before sharing.",
  intro: "Sending a DOCX file does not guarantee that the recipient sees the layout you designed. Their version of Word, installed fonts, and page setup can all change the result. A PDF freezes the pages so the document looks the same on most devices. Browser conversion is convenient because it happens on your machine: you choose the DOCX, the tool builds the PDF locally, and you download the finished file. The tricky part is fidelity. Styles, embedded fonts, tables, and headers may shift when another renderer rebuilds the page, so a quick review before sharing saves embarrassing surprises.",
  sections: [
    {
      heading: "Get the DOCX ready",
      paragraphs: [
        "Start with the document you intend to share, not an old draft. Save it, close it in Word if possible, and check that tracked changes are accepted or hidden as you prefer. Remove personal comments and metadata if the file will go to people outside your team."
      ],
      bullets: [
        "Use common fonts when the document must look identical everywhere.",
        "Resolve tracked changes before converting.",
        "Check that images are embedded rather than linked to a local path."
      ]
    },
    {
      heading: "Convert the file",
      paragraphs: [
        "Open a browser-based DOCX-to-PDF tool and select the file. Conversion runs on your device, so the document does not need to be uploaded for processing. Wait for the progress indicator to finish, then download the PDF and keep the original DOCX unchanged."
      ],
      bullets: [
        "Choose the correct DOCX if several similar files exist.",
        "Let the tool finish before closing the browser tab.",
        "Save the PDF with a clear, final name."
      ]
    },
    {
      heading: "Check the pages that are most likely to break",
      paragraphs: [
        "Do not read every line again, but inspect the first page, a page with a table, a page with images, and the last page. These are the places where page breaks, widows, and floated objects usually cause trouble."
      ],
      bullets: [
        "Confirm headings and page numbers appear where expected.",
        "Look for cut-off text, overflowing tables, and missing pictures.",
        "Click a few links to confirm they remain active."
      ]
    },
    {
      heading: "Understand conversion limits",
      paragraphs: [
        "A converter rebuilds the document from the DOCX file; it does not run Microsoft Word. Rare fonts, complex shapes, text boxes, and advanced fields may render differently. Macros and editing features have no role in a PDF, and password protection from the original document is not a conversion setting."
      ],
      bullets: [
        "Uncommon fonts may be substituted.",
        "Tracked comments might appear or disappear depending on the source file.",
        "A PDF is for viewing, not for continuing to edit in Word."
      ]
    },
    {
      heading: "Share the right version",
      paragraphs: [
        "If the PDF will be printed, check the page size and margins against the paper you plan to use. If it will be read on screen, confirm the file size is reasonable. Browser conversion creates a visual PDF, so the text is not selectable; if you need searchable text, export from Word directly instead. Keep the DOCX for edits and send only the PDF to readers."
      ]
    }
  ],
  faqs: [
    {
      question: "Will the PDF look exactly like my Word document?",
      answer: "It should be close, but not guaranteed. Browser conversion uses its own renderer, so uncommon fonts, text boxes, and complex tables can shift. Review key pages before sharing."
    },
    {
      question: "Is my DOCX uploaded to a server?",
      answer: "With a browser-based converter, the file is processed on your device. Check the tool's privacy note before converting confidential documents."
    },
    {
      question: "Can I edit the PDF afterwards?",
      answer: "Not in the same way as a Word file. You can make limited changes with PDF tools, but the best practice is to edit the DOCX and convert again."
    },
    {
      question: "Do hyperlinks survive conversion?",
      answer: "Most ordinary links are preserved. Check a few of them in the finished PDF, especially links inside tables or custom-styled text."
    },
    {
      question: "What happens to tracked changes and comments?",
      answer: "It depends on how they are stored in the DOCX. Accept or reject changes and remove comments before conversion if you want a clean, predictable result."
    },
    {
      question: "Why is the PDF larger than the DOCX?",
      answer: "PDFs may embed font data and image information for each page. Large photos and embedded fonts are the most common reasons for a bigger file."
    }
  ],
  relatedTools: [
    "word-to-pdf",
    "merge-pdf",
    "organize-pdf",
    "page-numbers-pdf",
    "watermark-pdf",
    "sign-pdf"
  ],
  updated: "2026-11-24"
};
