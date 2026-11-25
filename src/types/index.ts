export interface Category {
  slug: string;
  name: string;
  shortDescription: string;
  intro: string[];
  icon: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  keywords: string[];
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  locale: string;
  kind: "country" | "region";
}

export type ToolStatus = "empty" | "loading" | "success" | "error";
