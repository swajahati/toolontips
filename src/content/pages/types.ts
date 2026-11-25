export interface PageSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PageContent {
  title: string;
  description: string;
  intro: string;
  sections: PageSection[];
  notice?: string;
  updated: string;
}
