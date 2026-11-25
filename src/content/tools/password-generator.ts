import type { ToolContent } from "./types";

export const passwordGeneratorContent: ToolContent = {
  slug: "password-generator",
  title: "Password Generator",
  description: "Create strong, random passwords locally with adjustable length and character options.",
  intro:
    "Password Generator makes long, random passwords that are difficult to guess. Choose a length, decide which character types to include, and generate a fresh result with one click. Every password is created locally in your browser tab, so the values you see are never sent to us or saved by our site.",
  sections: [
    {
      heading: "What the generator does",
      paragraphs: [
        "A generated password is a random sequence built from the character groups you allow. A strong result mixes lowercase letters, uppercase letters, numbers and symbols, and it is long enough that guessing every possibility is impractical. The tool builds each password from your current settings and shows it only on your screen.",
        "Length matters more than most people expect. Adding a few characters multiplies the number of possible combinations, which is why a longer password made from simple words can be stronger than a short one full of symbols. If a service allows it, choose at least sixteen characters for an important account.",
      ],
    },
    {
      heading: "How to use it",
      paragraphs: [
        "Set the length with the slider or input field, then tick the character groups you want. Select Generate and review the result. Use the copy control to place it on your clipboard, then paste it straight into the service that asked for it. Generate again if a character is hard to type on your keyboard or if the site rejects symbols.",
        "Some older systems reject long passwords or certain characters. In that case, shorten the length or switch off symbols rather than reusing a password from another account. Store the new value in a password manager so you do not need to remember it.",
      ],
    },
    {
      heading: "What makes a password strong",
      paragraphs: [
        "Strength comes from length and unpredictability, not from clever substitutions. Replacing a letter with a number follows a pattern that attackers already know. A random sequence has no pattern for a guesser to exploit.",
        "Uniqueness is just as important. When one website is breached, attackers try the leaked email and password on many other services. A different random password for every account stops one leak from opening several doors.",
      ],
      bullets: [
        "Use a different password for every account, especially email and banking.",
        "Prefer sixteen characters or more where the service accepts them.",
        "Turn on two-factor authentication when it is offered as an extra layer.",
      ],
    },
    {
      heading: "Handling and storing the result",
      paragraphs: [
        "A password manager is the simplest way to keep track of random passwords. It stores them in an encrypted vault and fills them in when needed, so you only have to remember one master password. Write down a recovery code and keep it somewhere safe.",
        "Avoid sending passwords through chat messages, email or notes that sync without protection. If you must share one, use a dedicated secure channel and change it afterwards. Be aware that copying to the clipboard can expose a value to other applications on your device until the clipboard changes.",
      ],
    },
    {
      heading: "Privacy and limits",
      paragraphs: [
        "Passwords are generated locally in this browser tab. Nothing is transmitted to a server, and our site does not record the values produced. Refreshing or closing the page removes the displayed password, so save it before you leave.",
        "No generated password can be remembered for you. If you close the tab without saving it, generate a new one rather than trying to reconstruct the old value.",
      ],
    },
  ],
  faqs: [
    {
      question: "Are my generated passwords sent anywhere?",
      answer:
        "No. Generation happens in your browser tab. We do not receive, log or store the passwords you create.",
    },
    {
      question: "How long should a password be?",
      answer:
        "Use at least sixteen characters for important accounts when the service allows it. Longer is generally better, provided the site accepts the characters.",
    },
    {
      question: "Why might a website reject my password?",
      answer:
        "Some services limit length or ban certain symbols. Turn off symbols or shorten the length slightly, then generate another value.",
    },
    {
      question: "Can the same password be generated twice?",
      answer:
        "In theory any random process can repeat, but with a long length and many character choices the chance is extremely small. You can generate again at any time.",
    },
    {
      question: "Should I reuse one strong password?",
      answer:
        "No. Reuse means a breach on one site puts every other account using that password at risk. Give each account its own value.",
    },
    {
      question: "What if I lose the password after closing the tab?",
      answer:
        "It cannot be recovered from this tool. Generate a new password and replace the old one on the account.",
    },
  ],
  privacyNote:
    "Passwords are generated locally in this browser tab. They are not sent to a server or stored by our site.",
  related: ["protect-pdf", "sign-pdf", "qr-code-generator"],
  updated: "2026-11-24",
};
