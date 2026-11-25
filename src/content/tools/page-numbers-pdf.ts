import type { ToolContent } from "./types";

export const pageNumbersPdfContent: ToolContent = {
  slug: "page-numbers-pdf",
  title: "Add Page Numbers to PDF",
  description: "Number PDF pages with your choice of position, starting number and label format.",
  intro:
    "Add Page Numbers to PDF stamps a clear number on each page you choose. Pick a position, a starting value and a label style, then download the numbered copy.",
  sections: [
    {
      heading: "Why page numbers help",
      paragraphs: [
        "Page numbers turn a stack of pages into a document people can discuss. They make it easy to say “see page 7”, help readers keep their place in a printed copy, and give a final document a more finished feel. Adding them after the content is settled is usually best, because inserting or removing pages later can make the numbers wrong.",
        "This tool adds numbers as real text on the page. That means they stay sharp when the PDF is enlarged, and they can be copied or searched by most PDF readers. The original page content is not rewritten or moved.",
      ],
    },
    {
      heading: "Choosing a label format",
      paragraphs: [
        "A plain number is the simplest option and works well when the document already has a title page. “Page 3” is clearer when a page may be printed on its own. “Page 3 of 12” is useful for reports and contracts because it tells the reader how much remains. The “3 / 12” version gives the same information in a shorter form.",
        "The starting number controls the first numbered page. If a cover page should stay unnumbered, apply numbers only to pages 2 onward and start at 1. If you are continuing a section from another file, start at the next number instead.",
      ],
    },
    {
      heading: "Position and font size",
      paragraphs: [
        "Numbers can sit at the top or bottom, centred or in either corner. Bottom-centre is the common choice for reports. Bottom-right is easy to spot when pages are flicked through by hand, and top-right works well when the bottom of the page contains a footer or signature line.",
        "A font size between 10 and 14 suits most documents. Use a larger size only when the page will be printed small or viewed on a phone. Keep the number close enough to the edge to be noticeable, but not so close that a printer might cut it off.",
      ],
    },
    {
      heading: "Numbering only selected pages",
      paragraphs: [
        "The page controls let you number all pages, odd pages, even pages, or a custom range. A custom range uses the same simple format as the Split PDF tool: enter 2 for one page, 4-9 for a range, or 1, 4-9 for both. Numbering runs through the selected pages in their original order, starting with the value you set.",
        "If you choose odd or even pages, numbering follows only those pages. That is useful for double-sided documents where each physical sheet has two PDF pages, though you may prefer plain numbering across all pages for simplicity.",
      ],
    },
    {
      heading: "Tips, limits and privacy",
      paragraphs: [
        "Open the downloaded file and check the first and last numbered pages before sharing. It is easy to notice a wrong starting number at that point. If the PDF has a password, unlock it first; this tool cannot open protected files.",
        "Numbering happens in your browser tab. The document is not sent to a server, and no copy is kept. Very large files can take longer to process, and the browser may ask you to try a smaller file if it runs out of memory.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I skip the cover page?",
      answer:
        "Yes. Use a custom range beginning at page 2, and set the starting number to 1 if you want the first numbered page to read 1.",
    },
    {
      question: "What does “Page 1 of 10” use as the total?",
      answer:
        "It uses the total number of pages in the original PDF. If you numbered only a range, the total still refers to the whole document.",
    },
    {
      question: "Can I start numbering at zero?",
      answer:
        "Yes. Set the starting number to 0. The following selected pages then continue 1, 2 and so on.",
    },
    {
      question: "Will the numbers be searchable?",
      answer:
        "They are drawn as text, so most PDF readers can search and copy them. Very old readers may treat them as page artwork instead.",
    },
    {
      question: "Can I number odd pages only?",
      answer:
        "Yes. Choose Odd pages in the Apply to control. Numbering runs through the selected pages in order.",
    },
    {
      question: "Can I add numbers to a protected PDF?",
      answer:
        "No. Remove the password in the application that set it, then add the unlocked file here.",
    },
    {
      question: "Is my document uploaded?",
      answer:
        "No. The work happens in your browser tab. Nothing is sent to our servers.",
    },
  ],
  privacyNote:
    "Your PDF is processed in this browser tab. It is not uploaded to our servers.",
  related: ["watermark-pdf", "rotate-pdf", "split-pdf", "compress-pdf"],
  updated: "2026-11-24",
};
