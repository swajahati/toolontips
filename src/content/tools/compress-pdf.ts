import type { ToolContent } from "./types";

export const compressPdfContent: ToolContent = {
  slug: "compress-pdf",
  title: "Compress PDF",
  description: "Reduce a PDF file size in your browser, with a text-safe or stronger image mode.",
  intro:
    "Compress PDF gives you two honest choices: a gentle pass that keeps text selectable, or a stronger pass that redraws pages as images. Pick the mode that matches how you plan to use the result.",
  sections: [
    {
      heading: "What PDF compression really means",
      paragraphs: [
        "A PDF is a container. It can hold text, vector shapes, fonts and images, and each of those parts is stored in its own way. Compressing a PDF means storing those parts more efficiently or replacing the heaviest parts with lighter versions. There is no single setting that is best for every document.",
        "A scanned invoice is mostly one large picture, so reducing image detail makes a big difference. A report made of text is the opposite: the words take very little space, and shrinking the page images can actually make the file larger while making the text harder to use. That is why this tool offers two modes instead of one slider that claims to solve everything.",
      ],
    },
    {
      heading: "The two modes explained",
      paragraphs: [
        "Standard mode rebuilds the PDF with tighter internal structures and removes document metadata such as the old title, author and subject fields. It keeps your text, links and selectable words exactly as they were. The saving is often modest, but the document behaves the same as the original.",
        "Strong mode renders each page as a JPEG picture at the resolution and quality you choose, then places those pictures into a new PDF. This can shrink photo-heavy files a lot. The trade-off is clear: text becomes part of a picture, so it can no longer be selected, searched or copied, and very small print may soften. If you need the words to stay usable, choose Standard mode.",
      ],
    },
    {
      heading: "How to compress a PDF",
      paragraphs: [
        "Add one PDF file, then choose a mode. Start with Standard. Run the tool, download the result, and compare the size shown on screen with your original. If the saving is too small and you do not need searchable text, switch to Strong mode.",
        "In Strong mode, Resolution controls how sharp each rendered page is. Normal is fine for on-screen reading, while the sharper settings are better when you may print the file. Image quality controls how much detail is kept in the JPEG. Move it towards Smaller file for scans and towards Better quality when faint lines or small text matter.",
        "When the result is ready, open it and read a page or two before you share it. Compression is a trade-off, and a quick visual check is the simplest way to confirm that the result is still good enough for your purpose.",
      ],
    },
    {
      heading: "Useful tips and limits",
      paragraphs: [
        "If a PDF is already small, further compression may add little. Very small files are often already well optimised, and rebuilding them can even produce a slightly larger result. In that case, the original is the better file to keep.",
        "Password protection is not removed by compression. Unlock the file in the software that protects it before adding it here. This tool also cannot repair a damaged PDF or restore detail that was lost when the document was first scanned.",
        "For email, smaller is not always better. Many mail systems accept a few megabytes without complaint, so aim for a file that is readable rather than chasing the smallest possible number.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: [
        "Compression happens in your browser tab. Your PDF is not uploaded to our servers, and no copy is kept after the tab is closed. Keep the original file until you have checked the compressed download.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which mode should I choose first?",
      answer:
        "Choose Standard. It keeps text selectable and is the safest option. Use Strong mode only when the file is still too large and you can accept pages becoming images.",
    },
    {
      question: "How much smaller will my PDF get?",
      answer:
        "It depends on the document. Photo-heavy scans often shrink a lot; text-only reports usually shrink only a little. The tool shows the result size so you can compare.",
    },
    {
      question: "Will my text still be searchable?",
      answer:
        "In Standard mode, yes. In Strong mode, no. The page is a picture at that point, so words cannot be searched or copied.",
    },
    {
      question: "Can this remove a password from a PDF?",
      answer:
        "No. Unlock the document in the application that set the password, then compress the unlocked copy.",
    },
    {
      question: "Why did my file get bigger?",
      answer:
        "Some PDFs are already efficient. Rebuilding them can add a little overhead. If that happens, keep the original file; compression is optional.",
    },
    {
      question: "Is my PDF sent to a server?",
      answer:
        "No. Both compression modes run in your browser. Nothing is uploaded, and the tool clears when you refresh the page.",
    },
  ],
  privacyNote:
    "Your PDF is processed in this browser tab. It is not uploaded to our servers.",
  related: ["merge-pdf", "split-pdf", "pdf-to-jpg", "jpg-to-pdf"],
  updated: "2026-11-23",
};
