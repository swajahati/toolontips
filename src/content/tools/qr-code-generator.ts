import type { ToolContent } from "./types";

export const qrCodeGeneratorContent: ToolContent = {
  slug: "qr-code-generator",
  title: "QR Code Generator",
  description: "Create a scannable QR code from text, links or Wi-Fi details in your browser.",
  intro:
    "QR Code Generator turns text into a black-and-white pattern that phones can read. Enter a link, a message or connection details, choose a size, and download an image you can print or share.",
  sections: [
    {
      heading: "What a QR code actually holds",
      paragraphs: [
        "A QR code is a picture of text. The small squares follow a pattern that a camera can read from an angle, even when part of the code is dusty or scratched. Nothing is fetched while the code is being made, and a plain code does not contact anyone when it is scanned.",
        "The code itself is static: the text is fixed the moment it is created. A code holding a web address will keep pointing to that address. If the address later stops working, the code stops being useful, even though it still scans perfectly.",
      ],
    },
    {
      heading: "How to make a code",
      paragraphs: [
        "Choose what kind of information you want to store and enter it carefully. A link should include the full address, including the https part. For Wi-Fi, the network name and password must be typed exactly as they appear on your router or device. Check for stray spaces before you generate the code.",
        "Pick a size that suits where the code will appear, then download the image. Test it with your own phone before printing or sending it to anyone else. A test takes a few seconds and catches most typing mistakes.",
      ],
    },
    {
      heading: "Making a code that scans reliably",
      paragraphs: [
        "Use dark squares on a light background. Low contrast, such as grey on white, makes reading harder. Keep the plain border around the pattern; that empty margin helps a scanner find where the code begins. Do not stretch the image after downloading it, because the squares need to stay square.",
        "Size matters at the point of use. A code on a screen can be small, while one on a poster needs to be large enough to be read from a distance. Avoid placing a logo over the middle of the pattern, and check that glare from a glossy print is not hiding part of it.",
      ],
    },
    {
      heading: "Uses and cautions",
      paragraphs: [
        "Wi-Fi codes are convenient, but the network password is written inside the pattern. Anyone who can photograph the code can read that password, so do not treat it as a secret. The same applies to any personal details you choose to encode.",
        "A plain code has no tracking built in. If it contains a link, whoever controls that link may be able to count visits, so use a service you trust when that matters. Because the code cannot be edited later, print a fresh one if the underlying information changes.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Your text is processed in your browser and is not uploaded to our servers. The tool makes an image, not a managed code with analytics or editing features. Scanners vary, so testing on a real phone is the best check that your code works.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I change the link after printing the code?",
      answer:
        "No. This code stores the text you entered and cannot be edited later. Generate a new code if the destination changes.",
    },
    {
      question: "Does a QR code work without internet?",
      answer:
        "The code itself is just an image and needs no connection to be read. Opening a web link from it does need internet, while a Wi-Fi code can help a device join a network.",
    },
    {
      question: "How large should I print it?",
      answer:
        "It depends on the scanning distance. Print a sample and test it from the place people will actually stand; increase the size if the phone struggles.",
    },
    {
      question: "Why will my phone not scan it?",
      answer:
        "Common causes are low contrast, a missing border, a very small print, glare, or a typo in the text. Make a larger, high-contrast copy and test again.",
    },
    {
      question: "Can a QR code track where I was?",
      answer:
        "A plain code cannot record scans. A link inside it can be tracked by the owner of that link, so only scan codes from sources you trust.",
    },
    {
      question: "Is my text uploaded anywhere?",
      answer:
        "No. The code is generated in your browser. Refreshing or closing the page clears the text and the code from the tool.",
    },
  ],
  privacyNote:
    "Text is processed in your browser. It is not uploaded to our servers.",
  related: ["password-generator", "base64-url-encoder", "convert-image", "compress-image", "json-formatter"],
  updated: "2026-11-24",
};
