import type { ToolContent } from "./types";

export const wordCounterContent: ToolContent = {
  slug: "word-counter",
  title: "Word Counter",
  description: "Count words, characters, sentences and paragraphs in text you paste, with a simple reading-time estimate.",
  intro:
    "Word Counter gives you a quick, honest count of what you have written. Paste a draft, an essay, a product description or a caption, and you get word, character, sentence and paragraph totals without losing your place. The counting runs in your browser, so your draft never leaves your device.",
  sections: [
    {
      heading: "What the numbers mean",
      paragraphs: [
        "A word is a run of letters or numbers separated by spaces or punctuation. Hyphenated terms such as well-being are usually counted as one word, while a slash between two terms may be treated as a separator. Character counts include letters, numbers, spaces and punctuation, which is why a short sentence can have far more characters than words.",
        "Sentences are counted by looking for full stops, question marks and exclamation marks. Paragraphs are blocks of text separated by a blank line. These are practical definitions rather than perfect linguistic rules, so treat the figures as a close guide rather than a legal measurement.",
      ],
    },
    {
      heading: "How to use the counter",
      paragraphs: [
        "Paste your text into the box, or type directly into it. The totals update as you write, so you can watch a limit approach instead of discovering it at the end. To start again, clear the box and paste the next draft.",
        "The reading-time estimate uses an average adult reading pace. It is useful for deciding whether a page feels long or short, but it says nothing about how difficult the text is. A short page full of technical terms can take much longer to read than the estimate suggests.",
      ],
    },
    {
      heading: "When a word count really matters",
      paragraphs: [
        "Many writing briefs come with a fixed range. An assignment may ask for eight hundred words, a listing may allow only a handful of characters, and a social post may cut off at a hard limit. Checking before you submit avoids the awkward task of trimming a finished piece at the last minute.",
        "Counts also help you compare versions. If a rewrite cuts a third of the words while keeping the same meaning, it is probably clearer. If a summary is nearly as long as the original, it may need another pass.",
      ],
      bullets: [
        "Check the brief for the exact counting rule. Some publishers ignore bullet points or reference lists.",
        "Count the final draft, not an outline, since edits change totals quickly.",
        "Leave a small margin below a strict limit in case the receiving system counts slightly differently.",
      ],
    },
    {
      heading: "Edge cases worth knowing",
      paragraphs: [
        "Numbers separated by spaces count as words, while a long string of digits counts as one. Abbreviations with full stops can be mistaken for the end of a sentence. Text pasted from a document may carry hidden line breaks that split paragraphs in unexpected ways.",
        "If a count looks wrong, scan for double spaces, stray line breaks and copied formatting. Pasting as plain text first often removes the problem without changing what you wrote.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Your text is processed in this browser tab. It is not uploaded or saved by our site, and refreshing the page clears it. Copy anything you want to keep before closing the tab.",
        "The counter measures text only. It does not check spelling, grammar, tone or originality, and it cannot judge whether a piece meets the spirit of a brief.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does the counter include spaces in the character count?",
      answer:
        "Yes. The character total includes letters, numbers, punctuation and spaces, so it is usually much higher than the word count.",
    },
    {
      question: "How are hyphenated words counted?",
      answer:
        "A hyphenated term such as long-term is counted as one word. A slash or an em dash is usually treated as a separator.",
    },
    {
      question: "Can I use this for an essay word limit?",
      answer:
        "Yes, as a close guide. Check the rules of your school or publisher, because some exclude titles, bullets or reference lists.",
    },
    {
      question: "Is the reading time accurate?",
      answer:
        "It is an estimate based on an average reading pace. Technical text, lists and unfamiliar vocabulary can take longer.",
    },
    {
      question: "Why did my paragraph count change after pasting?",
      answer:
        "Pasted documents often include extra line breaks. Remove empty lines you do not want, and each block separated by a blank line counts as one paragraph.",
    },
    {
      question: "Is my text stored or uploaded?",
      answer:
        "No. Counting happens in your browser. Nothing is sent to a server, and a page refresh clears the text.",
    },
  ],
  privacyNote:
    "Your text is processed in this browser tab. It is not uploaded or stored by our site.",
  related: ["case-converter", "json-formatter", "base64-url-encoder"],
  updated: "2026-11-24",
};
