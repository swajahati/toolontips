import type { ToolContent } from "./types";

export const caseConverterContent: ToolContent = {
  slug: "case-converter",
  title: "Case Converter",
  description: "Change text between sentence case, title case, uppercase, lowercase, camelCase, snake_case and more.",
  intro:
    "Case Converter changes how your text is capitalised or joined without rewriting what it says. Paste a headline, a variable name or a whole paragraph, pick a style, and copy the result. It is a small tool for a surprisingly common job, and it runs entirely in your browser.",
  sections: [
    {
      heading: "What a case converter does",
      paragraphs: [
        "Case is the pattern of capital and small letters in a piece of text. A converter keeps the words themselves and changes the pattern. It can turn a shouty paragraph into calm sentence case, make every word start with a capital for a heading, or join words into a single identifier that a programming language accepts.",
        "Some styles also change the separators between words. snake_case uses underscores, kebab-case uses hyphens, and camelCase joins words with capitals and no spaces. Choosing the right style depends on where the text will be used, not on which one looks nicest in the tool.",
      ],
    },
    {
      heading: "Picking the right style",
      paragraphs: [
        "Use sentence case for most prose: the first word starts with a capital, and the rest stay lowercase unless they are proper nouns. Title case suits headings and article titles, though style guides disagree about small words such as and or the. Uppercase is best for short labels and warnings, since long blocks of capitals are hard to read.",
        "For code and data, follow the convention of the language or team. JavaScript often uses camelCase for variables, while Python commonly uses snake_case. Configuration keys may prefer kebab-case. Mixing styles inside one project creates confusion, so check a nearby file before you convert.",
      ],
    },
    {
      heading: "How to convert your text",
      paragraphs: [
        "Paste or type your text into the input box, choose a style from the options, and the converted version appears in the output area. Copy it with one click and paste it wherever you need it. If you want to try another style, select it without clearing the input; the original text stays in place.",
        "Work from the original each time. Converting an already converted string can produce odd results, especially when the first pass removed spaces or changed capitals that carried meaning.",
      ],
    },
    {
      heading: "Things to watch for",
      paragraphs: [
        "Automatic conversion is literal. It cannot know that McDonald or iPhone has an unusual capital letter, and it may alter names, acronyms and brand spellings. Check proper nouns before you publish anything converted from prose.",
        "Separators can also cause surprises. A dash inside a compound word may be read as a word break, and punctuation attached to a word may stay attached after conversion. A quick read of the result is usually enough to catch these cases.",
      ],
      bullets: [
        "Keep a copy of the original text so you can compare or try a different style.",
        "Check names, acronyms and technical terms after converting.",
        "For identifiers, confirm the result does not start with a number or contain spaces.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Your text is processed in this browser tab. It is not uploaded or saved by our site. Refreshing the page clears the input, so copy the result before you leave.",
        "This tool changes capitalisation and separators only. It does not correct spelling, translate language or enforce a particular style guide.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which style should I use for a heading?",
      answer:
        "Title case is common for headings and article titles. Sentence case is also widely used and usually feels more relaxed. Follow your style guide if you have one.",
    },
    {
      question: "What is the difference between camelCase and snake_case?",
      answer:
        "camelCase joins words with capital letters and no spaces. snake_case uses lowercase words joined by underscores. Each belongs to different programming conventions.",
    },
    {
      question: "Will it fix proper names and acronyms?",
      answer:
        "No. Conversion follows a pattern, so unusual spellings and acronyms may change. Check those words after converting.",
    },
    {
      question: "Can I convert a whole paragraph?",
      answer:
        "Yes. The tool handles long text as well as short labels. Read the result afterwards, since automatic capitalisation is not the same as editing.",
    },
    {
      question: "Does it change the words themselves?",
      answer:
        "No. Only capital letters, separators and spacing change. Your wording and punctuation otherwise stay as supplied.",
    },
    {
      question: "Is my text uploaded?",
      answer:
        "No. Conversion happens in your browser tab. Nothing is sent to a server, and refreshing clears the text.",
    },
  ],
  privacyNote:
    "Your text is processed in this browser tab. It is not uploaded or stored by our site.",
  related: ["word-counter", "json-formatter", "base64-url-encoder"],
  updated: "2026-11-24",
};
