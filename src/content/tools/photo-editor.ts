import type { ToolContent } from "./types";

export const photoEditorContent: ToolContent = {
  slug: "photo-editor",
  title: "Photo Studio",
  description:
    "Edit photos with layers, text, selections, PSD interchange, local export, and browser-side tools on Toolontips.",
  intro:
    "Toolontips Photo Studio is a full browser workspace for image editing. You can open a photo, work with layers, add text, make selections, open and save layered PSD files, and export common image formats without creating an account or sending your picture to Toolontips.",
  sections: [
    {
      heading: "What this studio can do",
      paragraphs: [
        "This is more than a one-effect photo tool. It gives you a canvas, a layer stack, selection tools, text, drawing tools, filters, and export options in one place. That makes it useful for social graphics, product pictures, simple posters, classroom images, and quick clean-ups when a full desktop editor would be overkill.",
        "Layer support is the biggest difference from a basic crop or resize tool. Your original image can stay on its own layer while captions, shapes, and paint marks sit above it. You can turn layers on and off, reorder them, and keep a working file that you can reopen later. PSD interchange means many layered Photoshop files can be opened here, and edited work can be exported back as PSD for use elsewhere.",
      ],
      bullets: [
        "Open common image formats including JPG, PNG, WebP, GIF, SVG, PDF, and several camera RAW formats where browser support allows.",
        "Work with layers, selections, text, brushes, shapes, masks, and filters in one browser tab.",
        "Export PNG, JPEG, WebP, SVG, PDF, PSD, and OpenRaster files from the same workspace.",
        "Optional AI features need extra model files and may take longer on slower devices.",
      ],
    },
    {
      heading: "How to start editing",
      paragraphs: [
        "Open the tool and wait for the studio to load. On the welcome screen, choose New canvas or Open Image. You can also drag a supported file onto the page. Once the image is on the canvas, use the toolbar on the left to pick a tool and the panels on the right to adjust the selected object, layer, or setting.",
        "Use Select to move and resize objects. Use the text tool to add a caption, then double-click it to change the wording. Use the brush and shape tools for simple marks. The layers panel lets you rename, hide, lock, and reorder layers. Undo and redo are available from the Edit menu.",
        "When you are done, open File, choose Export As, and pick the format you need. PNG is best when you need transparency. JPEG is usually smaller for ordinary photos. PSD keeps more editing information if you plan to continue in Photoshop or another layered editor. Download the finished file and keep your original image as a backup.",
      ],
    },
    {
      heading: "Privacy and downloads",
      paragraphs: [
        "Your image editing happens in the browser. Toolontips does not upload the photos you open here. The studio itself loads JavaScript libraries from jsDelivr, and optional AI models are fetched from Hugging Face when those features are used. Those providers may see ordinary network requests such as your IP address, but they do not receive the image content from this tool.",
        "Because some libraries are downloaded on first use, the very first load can be slower than a normal Toolontips page. After that, your browser may cache the files. If you are offline, basic editing may still work if the required files are already cached, but a fresh browser or a new device needs an internet connection the first time.",
      ],
    },
    {
      heading: "Quality and practical limits",
      paragraphs: [
        "Browser editors are powerful, but very large images can use a lot of memory. If a file is thousands of pixels wide, editing may feel slow, and some formats may fail on low-memory devices. If that happens, resize a copy first, then bring it back into the studio for final touches.",
        "PSD support is useful but not perfect Photoshop compatibility. Complex features such as advanced adjustment layers, smart filters, unusual fonts, or newer Photoshop-only effects may not survive a round trip exactly. For important work, keep the original PSD and export a copy before making major changes.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is my photo uploaded to a server?",
      answer:
        "No. The canvas and normal editing tools run in your browser. The editor downloads its libraries and optional AI models from external providers, but your image is not uploaded to Toolontips.",
    },
    {
      question: "Can I open a PSD file?",
      answer:
        "Yes. The studio can open many layered PSD files and export layered PSD files. Very complex Photoshop features may not appear exactly the same after a round trip.",
    },
    {
      question: "Why does the editor take longer to load than other tools?",
      answer:
        "It is a complete image workspace. On first use it downloads several pinned libraries from jsDelivr. Optional AI features download model files from Hugging Face when selected.",
    },
    {
      question: "Can I use it without signing in?",
      answer:
        "Yes. There is no account, no signup step, and no upload step. You can open a local file and download your result directly.",
    },
    {
      question: "Which export format should I choose?",
      answer:
        "Choose PNG for transparency or crisp graphics, JPEG for smaller photos, WebP for a good balance, and PSD or OpenRaster if you want to preserve layers for later editing.",
    },
    {
      question: "Does it work offline?",
      answer:
        "It depends on what is already cached. The first visit needs internet access to load the editor libraries. Optional AI features also need their model files before they can run offline.",
    },
  ],
  privacyNote:
    "Images are edited in your browser and are not uploaded to Toolontips. The editor loads libraries from jsDelivr and optional AI models from Hugging Face when needed.",
  related: ["crop-image", "resize-image", "compress-image", "convert-image", "passport-photo-maker"],
  updated: "2026-11-24",
};
