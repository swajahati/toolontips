import type { GuideContent } from "./types";

export const makeScannedPdfSearchableGuide: GuideContent = {
  slug: "make-scanned-pdf-searchable",
  title: "How to Make a Scanned PDF Searchable",
  description: "Add a searchable text layer to scanned PDF pages with OCR, and learn what OCR can and cannot do for your documents.",
  intro: "A scanner does not create text. It takes a picture of each page and places that picture inside a PDF, which is why you cannot search for a name or copy a sentence from a scanned contract. Optical character recognition, usually called OCR, reads the shapes of letters and adds an invisible text layer behind the image. The page still looks the same, but search and copy now work. With a browser OCR tool, this happens on your device rather than on a remote server. The result is useful, though not perfect, so it pays to know where OCR is reliable and where you should double-check the output.",
  sections: [
    {
      heading: "What searchable actually means",
      paragraphs: [
        "OCR does not turn a scan into a clean Word document. It adds hidden text that lines up roughly with the printed words. You can search for a term and often select a sentence, but the page is still an image underneath. Editing that text usually requires a different tool."
      ],
      bullets: [
        "Searchable: you can find and often copy words.",
        "Still an image: the original scan quality remains visible.",
        "Not automatically editable like a document created in a word processor."
      ]
    },
    {
      heading: "Prepare a clean scan",
      paragraphs: [
        "OCR accuracy depends far more on the scan than on the button you press. Straight pages, sharp letters, and good contrast give the best results. If a page is tilted, cropped, or shadowed, fix the scan before adding text."
      ],
      bullets: [
        "Use at least 300 dpi for normal document pages.",
        "Keep pages straight and include all four corners.",
        "Avoid heavy compression before OCR; it can blur small letters."
      ]
    },
    {
      heading: "Run OCR in the browser",
      paragraphs: [
        "Open an OCR tool, choose the scanned PDF, and select the language that matches the document. Browser processing keeps the file on your device while the text layer is created. For a long document, let the tool finish every page before you download or share the result."
      ],
      bullets: [
        "Add the scanned PDF and confirm the page range.",
        "Choose the main language of the text.",
        "Download the OCR PDF only after all pages are processed.",
        "Search for a known word to confirm the text layer exists."
      ]
    },
    {
      heading: "Check accuracy where it matters",
      paragraphs: [
        "No OCR engine is right every time. Similar characters such as 0 and O, or 1 and l, are common mistakes. Names, account numbers, dates, and legal wording deserve a manual read against the scan. Low-quality faxes, handwriting, and very small footnotes are especially prone to errors."
      ]
    },
    {
      heading: "Know the limits",
      paragraphs: [
        "OCR works best on clear printed text in a supported language. It will not reliably read handwriting, severe blur, photos taken at an angle, or pages with heavy stamps over the words. A searchable PDF is also not the same as an accessible document: headings, reading order, and image descriptions may still need attention."
      ]
    }
  ],
  faqs: [
    {
      question: "Will OCR change how the scan looks?",
      answer: "Usually no. The invisible text sits behind or over the page image, so the visual appearance stays close to the original scan."
    },
    {
      question: "Can I edit the words after OCR?",
      answer: "Not directly in most cases. The searchable layer is not the same as editable document text, so you would need to copy the wording into a text file or use a dedicated conversion tool."
    },
    {
      question: "Which scan quality works best?",
      answer: "A clean 300 dpi scan with straight edges and strong contrast works well. Blurry, skewed, or heavily compressed pages produce more recognition errors."
    },
    {
      question: "Does OCR understand handwritten notes?",
      answer: "Handwriting is unreliable and often not supported. Treat any handwritten result as a guess and verify it against the original image."
    },
    {
      question: "Is my document uploaded for OCR?",
      answer: "With a browser-based OCR tool, recognition runs on your device. Check the privacy note before processing confidential material."
    },
    {
      question: "Why can I not find one particular word?",
      answer: "The word may have been misread, hidden by a stamp, or printed in a language you did not select. Search a nearby word, then compare that line with the scan."
    }
  ],
  relatedTools: [
    "ocr-pdf",
    "pdf-to-jpg",
    "jpg-to-pdf",
    "compress-pdf",
    "protect-pdf"
  ],
  updated: "2026-11-24"
};
