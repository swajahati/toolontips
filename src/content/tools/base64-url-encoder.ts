import type { ToolContent } from "./types";

export const base64UrlEncoderContent: ToolContent = {
  slug: "base64-url-encoder",
  title: "Base64 & URL Encoder",
  description: "Encode text to Base64 or URL format and decode it again, entirely in your browser.",
  intro:
    "Base64 & URL Encoder handles two common ways of making text safe to move between systems. Convert text into Base64 when a binary-safe representation is needed, or into a URL-encoded string when it will travel inside a web address. Both directions, encode and decode, work on the text you paste, and nothing is uploaded.",
  sections: [
    {
      heading: "What encoding actually does",
      paragraphs: [
        "Encoding translates text into another representation so it can pass through a system that handles a limited set of characters. It is a change of format, not encryption. Anyone can reverse Base64 or URL encoding without a key, so never use it to hide a secret.",
        "Base64 takes data and rewrites it using sixty-four safe characters. It is often used to place small pieces of data inside JSON, configuration files or email-friendly text. URL encoding, also called percent encoding, replaces characters that a web address cannot carry directly. A space becomes %20, for example, and an ampersand becomes %26.",
      ],
    },
    {
      heading: "Base64 or URL encoding",
      paragraphs: [
        "Choose based on where the result will go. If you are building a web address or filling in a query parameter, URL encoding is the right tool. It keeps the address readable and prevents characters such as ? and & from being mistaken for parts of the address itself.",
        "If you need to place text in a field that expects only plain ASCII characters, Base64 is usually the better choice. It is compact enough for small values and survives a trip through systems that might otherwise alter spaces or line breaks. A URL-safe variant replaces the plus and slash characters with alternatives that behave better inside addresses.",
      ],
    },
    {
      heading: "How to use the tool",
      paragraphs: [
        "Paste your text into the input box, select Base64 or URL as the format, then choose Encode. The result appears in the output area and can be copied in one step. To reverse the process, paste the encoded string, choose the same format, and select Decode.",
        "If decoding fails, check that the format matches the one used to encode and that no characters were lost when the string was copied. Line breaks added by an email client or a word processor are a frequent cause of trouble, so remove any that were not in the original.",
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        "Do not encode the same text twice by accident. A double-encoded string decodes once into something that still looks encoded, which can send you chasing a problem that is not there. Keep the original text nearby so you can compare.",
        "Also remember that encoding is not validation or compression. Encoded output is usually longer than the input, and a successful decode only proves the characters formed a valid sequence. It does not prove the text is safe or suitable for the system that will receive it.",
      ],
      bullets: [
        "Use URL encoding for addresses and query parameters.",
        "Use Base64 for fields that must contain only plain text characters.",
        "Remove stray line breaks before decoding a Base64 string.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Your text is processed in this browser tab. It is not uploaded, logged or stored by our site, and a refresh clears the input. Copy the result before you close the page.",
        "This tool works with text, not files. Large inputs may be slow in the browser, and characters outside the usual text range may not survive every format unchanged.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is Base64 encoding a way to secure data?",
      answer:
        "No. Base64 only changes the representation of text. It can be reversed by anyone, so use proper encryption when confidentiality matters.",
    },
    {
      question: "When should I use URL encoding instead?",
      answer:
        "Use URL encoding when text will be placed in a web address or query parameter. It replaces characters that have a special meaning in addresses.",
    },
    {
      question: "Why does my encoded text end with equal signs?",
      answer:
        "Base64 uses equal signs as padding so the output length fits its grouping rules. They are normal and should be kept when you decode.",
    },
    {
      question: "Why does decoding fail?",
      answer:
        "Check that you selected the same format used for encoding, and remove any extra spaces or line breaks introduced while copying the text.",
    },
    {
      question: "Does encoding make text shorter?",
      answer:
        "No. Encoded text is usually longer than the original. URL encoding expands special characters, and Base64 adds roughly a third to the length.",
    },
    {
      question: "Is my text uploaded to your servers?",
      answer:
        "No. Encoding and decoding happen in your browser tab. Nothing is sent to a server, and refreshing the page clears the text.",
    },
  ],
  privacyNote:
    "Your text is processed in this browser tab. It is not uploaded or stored by our site.",
  related: ["json-formatter", "case-converter", "qr-code-generator"],
  updated: "2026-11-24",
};
