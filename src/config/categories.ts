import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "pdf-documents",
    name: "PDF & Documents",
    shortDescription: "Combine, compress, split and convert PDF files without uploading them.",
    icon: "FileText",
    intro: [
      "PDF files are the default way to share documents that must look the same on every screen. They are also surprisingly awkward to edit. The PDF and documents area of Toolontips is being built for the small, practical jobs that come up every day: joining several files into one, making a large PDF small enough to email, pulling out a single page, and turning pictures into a PDF or PDF pages back into images.",
      "Each tool is designed to do one thing and do it clearly. You choose a file, see the settings that matter, and get a download you can check immediately. There is no account to create and no waiting room. Work is intended to happen in your browser, which means a document you open here does not need to travel to our servers for the common operations in this category.",
      "We are adding these tools one at a time, and we publish a tool only once it works. If a document contains sensitive information, read the privacy note on the individual tool before you use it, and keep a backup of the original file.",
    ],
  },
  {
    slug: "image",
    name: "Image",
    shortDescription: "Reduce, resize and convert images with clear, predictable settings.",
    icon: "Image",
    intro: [
      "Images are often the heaviest part of a page or an email. A photo taken on a phone can be several megabytes, even when it will only appear a few hundred pixels wide on screen. The image area of Toolontips is being built around the everyday fixes: reducing file size without obvious quality loss, changing pixel dimensions, and converting between the formats you actually use.",
      "Size, dimensions and format are three different things. A smaller file may look identical; a resized image may still be a large file; a converted image may keep the same dimensions. Our tools show the settings that affect the result so you can choose based on what you need, whether that is a page that loads quickly, an attachment under an email limit, or a picture that fits a form.",
      "Image work is well suited to the browser. The files you select can be read and processed on your device, with the finished download created there too. We will state this plainly on every tool where it is true. Keep the original photo somewhere safe before you compress or resize, because a smaller file cannot recover detail that was removed.",
    ],
  },
  {
    slug: "finance-business",
    name: "Finance & Business",
    shortDescription: "Loan and salary estimates, percentages and simple invoices with clear assumptions.",
    icon: "Calculator",
    intro: [
      "Money questions usually arrive with a deadline: a monthly payment to estimate, an invoice to send, or a percentage to work out before a meeting. The finance and business area of Toolontips is being built for those moments. It will bring together calculators and simple business documents that give you a clear answer without asking you to sign up.",
      "Numbers here are estimates, not instructions. A mortgage calculation depends on the interest rate, the term and which costs you include. A salary estimate depends on tax rules where you live. A tax or VAT result depends on a country's current legislation. That is why country-based tools will show the country, the source of the figures and how recent that source is, and why a visible disclaimer will sit beside every result.",
      "The invoice generator is intended for straightforward freelance and small-business use: your details, your client, the line items and the total. It is not accounting software and it will not file anything for you. If a decision affects your tax position, your mortgage or your health, take the estimate as a starting point and confirm it with a qualified professional.",
    ],
  },
  {
    slug: "text-dev-utilities",
    name: "Text, Dev & Utilities",
    shortDescription: "Format, count, encode and generate small everyday utilities that run locally.",
    icon: "Code2",
    intro: [
      "Not every useful tool needs a complicated interface. The text, developer and utilities area of Toolontips is being built for the small jobs you do between other tasks: checking a piece of JSON, counting words and characters, changing letter case, encoding text for a URL, making a password, or turning a link into a QR code.",
      "These tools are deliberately focused. You paste or type your input, choose the options you need, and copy or download the result. Settings are kept visible rather than hidden in menus, and we avoid clever defaults that produce surprising output. Where a tool has more than one mode, each mode is explained in plain language before you use it.",
      "Text and code often contain information you would rather not share. Utilities in this category are designed to run locally in your browser, so your input does not need to be posted to a server. Passwords generated here are made on your device. As always, the privacy note on each tool will tell you exactly what happens to your data.",
    ],
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    shortDescription: "Educational health screening estimates with clear limits and a doctor-first warning.",
    icon: "Calculator",
    intro: [
      "The health and fitness area of Toolontips is for simple screening questions that can help you prepare for a conversation with a healthcare professional. These tools do not diagnose, treat or monitor a condition. They take answers you already know and show where those answers sit in a published scoring system.",
      "A score is not a verdict. Two people with the same result can have very different medical histories, medicines and test results. Country, age range and source population all matter. Every health tool here shows the source it follows, the date that source was checked, and the reasons the estimate may not apply to you.",
      "Talk to a qualified healthcare professional before changing medicine, diet or exercise because of a result. If you have severe symptoms or think you may be having a medical emergency, call your local emergency number. Your answers are calculated in this browser tab and are not sent to our servers.",
    ],
  },
];
