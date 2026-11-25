import type { ToolContent } from "./types";

export const jsonFormatterContent: ToolContent = {
  slug: "json-formatter",
  title: "JSON Formatter",
  description: "Paste JSON to pretty-print it with clean indentation, check it for errors, or minify it into one compact line.",
  intro:
    "JSON Formatter turns tangled JSON into text you can actually read. Paste your data, choose an indentation style, and the tidy version appears right away. The same tool can compress JSON into a single line when you need something small to paste into a form. Everything happens in your browser, so your text stays on your device.",
  sections: [
    {
      heading: "What JSON formatting does",
      paragraphs: [
        "JSON is built from objects and arrays written with braces, brackets, quotes and colons. A formatter adds line breaks and indentation so that structure is easy to follow. A short object that arrived on one line becomes a clear tree, with each nested level moved further to the right and each key sitting beside its value. The meaning never changes; only the whitespace around the data is adjusted.",
        "That readability matters when you are checking an API response, editing a configuration file, or learning how a data structure is built. A missing comma or an extra bracket is far easier to spot when every item has its own line.",
      ],
    },
    {
      heading: "How to use the tool",
      paragraphs: [
        "Paste or type your JSON into the input box, pick two spaces, four spaces or a tab, then select Format. The output panel shows the tidied version, ready to copy. If the text is not valid JSON, an error message points to the position where parsing stopped so you can return to that part of your input.",
        "For compact output, choose Minify instead. This removes optional spaces and line breaks while keeping every key and value intact. Minified JSON helps when a field has a character limit or when you are storing a small data blob in a URL. Keep a formatted copy too, because a single line is hard to review later.",
      ],
    },
    {
      heading: "Errors the formatter can catch",
      paragraphs: [
        "Most formatting failures come from a small syntax slip. These are the ones worth checking first:",
      ],
      bullets: [
        "A trailing comma after the last item in an object or array. JSON does not allow one, though JavaScript objects often do.",
        "Unquoted property names. Every key must be wrapped in double quotes.",
        "Single-quoted strings. JSON uses double quotes; an apostrophe inside a string is fine.",
        "An unclosed brace or bracket, usually caused by deleting one half of a pair.",
        "Extra text before or after the data, such as a log line pasted along with an API response.",
      ],
    },
    {
      heading: "Practical habits that save time",
      paragraphs: [
        "Work on a copy when editing a large configuration file. Paste the original, format it, and copy the result somewhere new so you can compare versions and roll back if a value changes by accident.",
        "Be careful with big numbers. JSON readers can lose precision beyond roughly fifteen digits, so identifiers that look like numbers are often safer as strings. Dates are another trap: JSON has no date type, so a date is plain text and its format depends on whoever produced it.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "The text you paste is processed in this browser tab. It is not uploaded or stored by our site. Closing or refreshing the page clears it, so copy your result before you leave.",
        "This tool checks syntax and changes whitespace. It does not validate values against a schema, sort keys, or merge duplicate entries. For those jobs, use a validator in your own project.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will formatting change my data?",
      answer:
        "No. Formatting only adds or removes whitespace. Keys, values, numbers and their order stay exactly as you supplied them.",
    },
    {
      question: "Why does my JSON fail when it looks correct?",
      answer:
        "Check for trailing commas, single quotes, unquoted keys and stray text before or after the data. Those are the most common causes.",
    },
    {
      question: "What is the difference between Format and Minify?",
      answer:
        "Format adds indentation and line breaks for reading. Minify removes them to make the text smaller. Both keep the same data.",
    },
    {
      question: "Can I format JSON with comments in it?",
      answer:
        "No. Comments are not part of standard JSON. Remove them first, or use a tool designed for JSON with comments.",
    },
    {
      question: "Is there a size limit?",
      answer:
        "Very large documents can slow down the browser tab. For huge files, work with a section at a time or use a local command line tool.",
    },
    {
      question: "Is my JSON uploaded anywhere?",
      answer:
        "No. Parsing and formatting happen in your browser. Nothing is sent to a server, and a refresh clears the text.",
    },
  ],
  privacyNote:
    "Your JSON text is processed in this browser tab. It is not uploaded or stored by our site.",
  related: ["case-converter", "base64-url-encoder", "word-counter"],
  updated: "2026-11-24",
};
