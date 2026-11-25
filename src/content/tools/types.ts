export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ToolContent {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: ToolSection[];
  faqs: ToolFaq[];
  privacyNote: string;
  related: string[];
  updated: string;
}
