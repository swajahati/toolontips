import type { ToolContent } from "./types";

export const resizeImageContent: ToolContent = {
  slug: "resize-image",
  title: "Resize Image",
  description: "Change a picture's pixel dimensions in your browser while keeping its proportions.",
  intro:
    "Resize Image gives you a picture with different width and height. Use it when a form demands an exact size, when a photo is too large to upload, or when you want a lighter copy without cutting anything out of the frame.",
  sections: [
    {
      heading: "Pixels are the measurement that matters",
      paragraphs: [
        "A digital picture is measured in pixels, not centimetres or inches. A screen places pixels side by side, so a picture that is 1200 pixels wide occupies 1200 positions whether it is shown on a phone, a laptop or a large monitor. What changes is how big each pixel looks.",
        "Print settings such as dots per inch can be stored in a file, but they are instructions for a printer. They do not add detail. When someone asks for a picture that is a certain width in pixels, that is the number to work from.",
      ],
    },
    {
      heading: "Keeping the shape of the picture",
      paragraphs: [
        "Width and height are linked by the picture's aspect ratio. If you change one without the other, people and buildings look stretched or squeezed. Keeping the proportions locked lets you set just one side and have the other follow.",
        "Sometimes a service requires a fixed shape, such as a square profile picture. In that case you have two choices: crop away the extra edges, or add blank space around the picture. Resizing alone cannot turn a wide photo into a square one without distortion.",
      ],
    },
    {
      heading: "How to resize an image",
      paragraphs: [
        "Add your image, set the width and height you need, and run the tool. If you want the same shape as the original, keep the proportions locked and change only one dimension. Check the preview before you download.",
        "Open the downloaded file to confirm the result looks right. If you are sending it to a website or a government form, compare its dimensions with the instructions on that site. Keep the original image so you can start again if the first attempt is not accepted.",
      ],
    },
    {
      heading: "Making a smaller picture look good",
      paragraphs: [
        "Reducing dimensions is usually safe. The tool blends groups of pixels into fewer pixels, and the result often looks nearly identical at normal viewing size. Text and fine lines are the first things to suffer, so check them closely if they matter.",
        "Increasing dimensions is a different story. A tool can create more pixels, but it cannot invent detail that was never captured. A heavily enlarged photo looks soft, and the effect is more obvious the further you push it. When possible, go back to the original file from the camera instead of enlarging a small copy.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Resizing happens in your browser tab. Your image is not uploaded, and it is cleared when you refresh or close the page. This tool changes dimensions; it does not remove people, objects or text from inside the picture, and it cannot turn a poor photograph into a sharp one.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will resizing make the file smaller?",
      answer:
        "Usually, when you make the picture smaller. The exact saving also depends on the format and the quality used when the file is saved.",
    },
    {
      question: "Can I make a small image larger?",
      answer:
        "You can increase the pixel dimensions, but no new detail is created. The result often looks soft, so start from the original camera file whenever you can.",
    },
    {
      question: "What is DPI, and do I need to change it?",
      answer:
        "DPI is a print instruction, not a measure of how much detail a picture contains. For websites, apps and forms, the pixel dimensions are the numbers that matter.",
    },
    {
      question: "How do I avoid stretching a photo?",
      answer:
        "Keep the proportions locked and change only one side. If you need a different shape, crop the picture rather than pulling it out of proportion.",
    },
    {
      question: "Does resizing change the file format?",
      answer:
        "No. Resizing changes the pixel grid. If you need a different format, use Convert Image after you have settled on the dimensions.",
    },
    {
      question: "Is my image sent to a server?",
      answer:
        "No. The resizing work runs in your browser, and nothing is uploaded. Refreshing the page clears the image from the tool.",
    },
  ],
  privacyNote:
    "Images are processed in your browser. They are not uploaded to our servers.",
  related: ["compress-image", "convert-image", "crop-image", "passport-photo-maker", "jpg-to-pdf"],
  updated: "2026-11-24",
};
