import type { ToolContent } from "./types";

export const convertImageContent: ToolContent = {
  slug: "convert-image",
  title: "Convert Image",
  description: "Save a picture in another format in your browser, with the trade-offs explained.",
  intro:
    "Convert Image saves a picture in a different format. The subject stays the same; what changes is the way the pixels are stored, which affects file size, transparency and the programs that can open the result.",
  sections: [
    {
      heading: "What conversion changes",
      paragraphs: [
        "A format is a set of rules for writing image data. Some formats keep every pixel exactly as it was, while others discard small differences to save space. Converting from one to the other rewrites the file using the new rules. It does not add detail, and converting back afterwards cannot bring back anything that was discarded along the way.",
        "This matters most with lossy formats such as JPG. Each save can soften fine lines slightly, so avoid converting the same photo back and forth many times. Work from the original file and keep one good copy as your master.",
      ],
    },
    {
      heading: "Choosing an output format",
      paragraphs: [
        "JPG is a common choice for photographs. It keeps small files and is understood almost everywhere, but it cannot store transparency. PNG is better for logos, diagrams and screenshots with sharp edges, and it does support transparent areas, though files can be larger.",
        "WebP is designed for the web and often produces smaller files than JPG at a similar look. HEIC is the format many phones use for photos; converting it to JPG or PNG makes those pictures easier to open on other devices. SVG is a different kind of file built from shapes rather than pixels. Wrapping a photograph in an SVG file does not turn it into a real vector drawing.",
      ],
    },
    {
      heading: "How to convert an image",
      paragraphs: [
        "Add one image, choose the format you want from the available options, and run the tool. Look at the preview before you download, especially if the original had a transparent background or very fine detail.",
        "Save the new file with a name that reminds you what it is, and keep the original beside it. If the result will be uploaded somewhere, check that the site accepts the format you chose. A conversion is only useful if the receiving system can read the file.",
      ],
    },
    {
      heading: "Common surprises",
      paragraphs: [
        "Transparency is the usual cause of confusion. If you convert a picture with a transparent background into a format that does not support transparency, the empty area is filled in. That can look fine on a white page and wrong on a coloured one.",
        "Colour can also shift a little between formats, and an animated image saved as a still format keeps only one frame. Metadata such as camera settings may not survive a conversion, so do not rely on a converted copy to keep that information.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Conversion runs in your browser tab. Your image is not uploaded to a server, and the tool clears when you refresh or close the page. The tool cannot recover detail from a low-quality original, repair a damaged file, or make a picture legal to reuse if you do not own it.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which format is best for photographs?",
      answer:
        "JPG is the safest all-round option and opens almost everywhere. WebP is a good alternative when you want a smaller file for a website and the destination accepts it.",
    },
    {
      question: "Which format keeps a transparent background?",
      answer:
        "PNG keeps transparency and is a good choice for logos and cut-outs. WebP can also handle it. JPG cannot, so avoid that format when transparency matters.",
    },
    {
      question: "Will converting make my photo sharper?",
      answer:
        "No. Conversion changes how the file is written, not what was captured. A sharper result needs a better original or careful editing, not a different format.",
    },
    {
      question: "Why should I convert a HEIC photo?",
      answer:
        "Some computers and websites do not open HEIC files. Saving the photo as JPG or PNG makes it much easier to share with people using other devices.",
    },
    {
      question: "Will the converted file always be smaller?",
      answer:
        "No. A lossless format can make a photo larger than the original, especially a busy one. Compare the sizes shown in the tool before you decide which copy to keep.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer:
        "No. Conversion happens in your browser. Nothing is sent to us, and refreshing the page clears the image from the tool.",
    },
  ],
  privacyNote:
    "Images are processed in your browser. They are not uploaded to our servers.",
  related: ["compress-image", "resize-image", "crop-image", "pdf-to-jpg", "jpg-to-pdf"],
  updated: "2026-11-24",
};
