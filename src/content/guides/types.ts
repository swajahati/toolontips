export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideContent {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedTools: string[];
  updated: string;
}
