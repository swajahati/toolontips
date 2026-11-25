import type { ToolContent } from "./types";

export const cropImageContent: ToolContent = {
  slug: "crop-image",
  title: "Crop Image",
  description: "Trim the edges of a picture in your browser so the subject fills the frame.",
  intro:
    "Crop Image cuts away the parts of a picture you do not want. Nothing is stretched or redrawn: you decide what stays inside the frame, and the tool saves that portion as a new image.",
  sections: [
    {
      heading: "Cropping is not resizing",
      paragraphs: [
        "Cropping removes pixels from the edges. Resizing changes the number of pixels across the whole picture. They solve different problems. If a photo contains a distracting person at the side, crop. If a website asks for an image that is exactly 800 pixels wide, resize.",
        "The two often work together. Crop first to settle the composition, then resize to the dimensions you need. Doing it in that order means you do not waste detail on parts of the picture you are going to throw away.",
      ],
    },
    {
      heading: "How to crop an image",
      paragraphs: [
        "Add an image and drag the frame over the area you want to keep. Use the preview to check the edges, then run the tool and download the result. If the first attempt cuts too much, start again from the original rather than trying to add the removed area back.",
        "Look at the result at the size where it will actually be used. A crop that looks balanced in a large preview can feel cramped when it becomes a small profile picture, and a face can sit too close to the top edge once a site adds its own overlay.",
      ],
    },
    {
      heading: "Framing that feels natural",
      paragraphs: [
        "Put the subject slightly off centre and give it room to look into the frame. Keep horizons roughly level unless a tilted angle is the point of the photo. Check each corner before you commit; it is easy to clip a hand, a sign or a pet's ear without noticing.",
        "For pictures of people, leave a little space above the head and avoid cutting through joints such as elbows and knees. For documents and screenshots, include the whole line of text you need and leave a small margin so nothing looks squeezed against the edge.",
      ],
    },
    {
      heading: "Cropping for a particular place",
      paragraphs: [
        "Profile pictures are usually square, so start with a photo that has room around the face and crop to a square before uploading. Product photos benefit from the same shape across a whole catalogue, which makes a page look tidy and lets buyers compare items easily.",
        "Cover images are often wide and may be covered by text on the site. In that case keep the main subject away from the edges. If you are preparing an identity photo, use a dedicated tool instead: official rules about face size and background are stricter than a general crop can handle.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Cropping happens in your browser tab. Your image is not uploaded, and it is cleared when you refresh or close the page. Cropping only hides what lies outside the frame; anything still visible inside it remains in the downloaded file.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I undo a crop and get the edges back?",
      answer:
        "Not from the cropped file, because those pixels are no longer in it. Keep the original image and crop a fresh copy if you want to try a wider frame.",
    },
    {
      question: "Does cropping lower the quality?",
      answer:
        "The crop itself only selects pixels. Saving to a file can involve normal encoding changes, so avoid repeated save and crop cycles when the image matters.",
    },
    {
      question: "Should I crop before or after resizing?",
      answer:
        "Crop first, then resize. That way the tool works only on the part of the photo you intend to keep.",
    },
    {
      question: "How do I crop to a square?",
      answer:
        "Match the width and height in the crop frame, then check the preview. A square frame works well for avatars, provided the subject is not clipped.",
    },
    {
      question: "Will cropping straighten a tilted photo?",
      answer:
        "No. Cropping changes which pixels are kept, not their angle. If the photo is badly tilted, straighten it in an editor before cropping.",
    },
    {
      question: "Is my image sent to a server?",
      answer:
        "No. The crop runs in your browser, nothing is uploaded, and refreshing the page clears the image.",
    },
  ],
  privacyNote:
    "Images are processed in your browser. They are not uploaded to our servers.",
  related: ["resize-image", "compress-image", "convert-image", "passport-photo-maker", "pdf-to-jpg"],
  updated: "2026-11-24",
};
