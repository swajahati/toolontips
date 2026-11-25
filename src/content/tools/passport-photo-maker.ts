import type { ToolContent } from "./types";

export const passportPhotoMakerContent: ToolContent = {
  slug: "passport-photo-maker",
  title: "Passport Photo Maker",
  description: "Crop a suitable portrait and arrange it for printing, with the official rules left in your hands.",
  intro:
    "Passport Photo Maker turns a suitable portrait into a neatly cropped photo and lays it out for printing. The issuing authority decides what is accepted, so treat the result as a careful draft and check it against the official requirements for your document.",
  sections: [
    {
      heading: "What this tool can and cannot decide",
      paragraphs: [
        "This tool handles the practical parts: positioning the face inside a frame, keeping the proportions tidy, and arranging copies on a page. It cannot tell you whether a particular government office will accept the photo. Rules differ by country, by document and over time, including the permitted background, the size of the head, and how recent the picture must be.",
        "Before you print anything, find the photo requirements on the official website for the authority handling your application. Use those instructions as the final word. A neatly printed photo is not the same thing as an acceptable one.",
      ],
    },
    {
      heading: "Start with a photo that can work",
      paragraphs: [
        "Stand facing the camera in even light, with your whole head and shoulders visible. Use a plain, uncluttered background and avoid strong shadows across the face. A neutral expression with eyes open is the safest starting point, and a recent photo is more likely to resemble you at the appointment.",
        "Hats usually cause problems unless they are worn for religious or medical reasons and the rules allow them. Glasses can create glare, so consider taking the photo without them if your situation permits. Skip beauty filters and heavy retouching: an edited face can be rejected even when the file looks polished.",
      ],
    },
    {
      heading: "How to use the tool",
      paragraphs: [
        "Add your picture and line up the face guide with the head and shoulders. Choose the layout that matches the size you need from the options shown, then look at the preview on screen. Download the finished file when the framing looks right.",
        "Compare the downloaded photo with the official instructions one more time. If the head is too large, too small or off centre, go back to the original picture and adjust the crop rather than hoping the difference will be ignored.",
      ],
    },
    {
      heading: "Printing and cutting",
      paragraphs: [
        "Common passport sizes include 35 by 45 millimetres and 2 by 2 inches, but the correct size depends on where you are applying. Check the requirement before printing. When you print at home, choose the actual size or one hundred percent scale, not fit to page, then measure the result with a ruler.",
        "Use a clean printer and plain paper unless the rules specify otherwise. Cut carefully along the edges and keep a spare copy in case one is damaged. For online applications, follow the file size and format limits on the submission site rather than printing at all.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Your photo is processed in your browser and is not uploaded. The tool cannot create a compliant photo from a poor original, remove deep shadows, or guarantee approval. Keep the original image so you can try again after checking the official rules.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is my photo guaranteed to be accepted?",
      answer:
        "No. Acceptance is decided by the authority handling your application. Use the official photo rules as your checklist and submit a fresh photo if anything is uncertain.",
    },
    {
      question: "What background colour should I use?",
      answer:
        "It depends on the country and document. Follow the official guidance; in most cases the background needs to be plain and evenly lit, without patterns or other people.",
    },
    {
      question: "Can I use a selfie taken on my phone?",
      answer:
        "Yes, if it meets the requirements. Watch for wide-angle distortion, uneven light and shadows, which are common problems with selfies.",
    },
    {
      question: "Can you remove shadows or glasses from the photo?",
      answer:
        "No. Retake the picture in softer, even light. If glasses are not allowed or cause glare, take a clear photo without them.",
    },
    {
      question: "How many photos should I print?",
      answer:
        "Check the number requested in your application and print a spare or two. The layout you choose determines how many copies fit on a sheet.",
    },
    {
      question: "Is my photo uploaded anywhere?",
      answer:
        "No. Cropping and layout happen in your browser, and the photo is cleared when you refresh or close the page.",
    },
  ],
  privacyNote:
    "Images are processed in your browser. They are not uploaded to our servers.",
  related: ["crop-image", "resize-image", "compress-image", "jpg-to-pdf", "convert-image"],
  updated: "2026-11-24",
};
