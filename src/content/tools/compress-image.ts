import type { ToolContent } from "./types";

export const compressImageContent: ToolContent = {
  slug: "compress-image",
  title: "Compress Image",
  description: "Make a photo or screenshot lighter to send by lowering the detail stored in the file.",
  intro:
    "Compress Image makes a picture smaller on disk without changing what is in the frame. You choose how much detail to keep, the tool rebuilds the file in your browser, and you compare the new size with the original before you download.",
  sections: [
    {
      heading: "Why image files get so large",
      paragraphs: [
        "An image is a grid of pixels. A phone photo can contain more than ten million of them, and each one carries colour information. A busy scene with grass and hair needs more space than a flat screenshot.",
        "Two things control the size: dimensions and encoding. Dimensions are the width and height in pixels; encoding is how the picture is saved. Compression here changes the encoding, not the dimensions. If you need fewer pixels, use Resize Image.",
      ],
    },
    {
      heading: "What the quality setting really does",
      paragraphs: [
        "Lowering quality removes detail that is hard to notice at first, such as tiny differences in a sky or the texture of a wall. At gentle settings the change is nearly invisible. Push it too far and you will see soft edges, blocky patches around text, and specks near strong lines.",
        "There is no single correct setting. A photo that will be viewed small on a phone can lose a lot of detail without anyone noticing. A scanned page with fine print needs a lighter touch. The safest approach is to try a middle setting, look at the result at the size you plan to use it, and adjust only if the file is still too big.",
      ],
    },
    {
      heading: "How to compress an image",
      paragraphs: [
        "Add one image from your device and wait for the preview to appear. Choose a quality level, then run the tool. The screen shows the starting size and the new size so you can see exactly what changed.",
        "Download the result and open it at normal viewing size. Zoom in once if the image contains text or thin lines. If it looks good, you are done. If it looks soft, go back and keep more detail. Hold on to the original until you are happy with the compressed copy.",
      ],
    },
    {
      heading: "Choosing a sensible target",
      paragraphs: [
        "For email and messaging, aim for a file that looks clear rather than the smallest number you can reach. Most mail systems accept several megabytes, and a slightly larger photo often survives better.",
        "For a website, smaller files help pages load faster, especially on mobile data. That is a good reason to compress, but not a reason to add visible artefacts. For printing, be conservative: detail that looks fine on a screen can look rough on paper.",
        "If you need a specific limit, treat it as a range. Re-encoding does not land on an exact number of kilobytes every time, so check the result instead of assuming the first attempt will match your target.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "The work happens in your browser tab. Your image is not sent to a server, and it is gone when you refresh or close the page. Compression cannot rescue a blurry photo, and it will not remove information you can still see in the picture, such as a name badge or a street sign.",
      ],
    },
  ],
  faqs: [
    {
      question: "How much smaller will my image get?",
      answer:
        "It depends on the picture. A simple screenshot may shrink a lot, while a noisy photo may shrink only a little. The tool shows both sizes so you can judge the result.",
    },
    {
      question: "Does compression change the width and height?",
      answer:
        "No. This tool lowers the detail stored at each pixel, so the dimensions stay the same. Use Resize Image when you need different pixel dimensions.",
    },
    {
      question: "Will my photo look blurry?",
      answer:
        "At a gentle setting, usually not. If edges look soft or text looks fuzzy, reuse the original with a higher quality setting rather than trying to sharpen the damaged copy.",
    },
    {
      question: "Can I compress a PNG with transparency?",
      answer:
        "Yes, if you keep a format that supports transparency. A JPG cannot store transparent areas, so those areas become solid when saved that way.",
    },
    {
      question: "Can I hit an exact size in kilobytes?",
      answer:
        "Not reliably. Re-encoding changes data in steps, so use the reported size as a guide and try a different setting if you need to get under a limit.",
    },
    {
      question: "Is my image uploaded anywhere?",
      answer:
        "No. Compression runs in your browser. Nothing is sent to our servers, and refreshing the page clears the image.",
    },
  ],
  privacyNote:
    "Images are processed in your browser. They are not uploaded to our servers.",
  related: ["resize-image", "convert-image", "crop-image", "jpg-to-pdf", "pdf-to-jpg"],
  updated: "2026-11-24",
};
