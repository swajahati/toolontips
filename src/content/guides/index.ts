import { docxToPdfGuide } from "./docx-to-pdf-guide";
import { compareTwoPdfVersionsGuide } from "./compare-two-pdf-versions";
import { compressPdfWithoutLosingTextGuide } from "./compress-pdf-without-losing-text";
import { makeScannedPdfSearchableGuide } from "./make-scanned-pdf-searchable";
import { mergeAndSplitPdfsGuide } from "./merge-and-split-pdfs";
import { organizePdfPagesGuide } from "./organize-pdf-pages";
import { pdfPasswordSafetyGuide } from "./pdf-password-safety";
import { pdfTablesToExcelGuide } from "./pdf-tables-to-excel";
import { removeSimpleTextWatermarkGuide } from "./remove-simple-text-watermark";
import { signPdfInBrowserGuide } from "./sign-a-pdf-in-your-browser";
import type { GuideContent } from "./types";

export const guides: GuideContent[] = [
  pdfPasswordSafetyGuide,
  compressPdfWithoutLosingTextGuide,
  organizePdfPagesGuide,
  mergeAndSplitPdfsGuide,
  signPdfInBrowserGuide,
  removeSimpleTextWatermarkGuide,
  compareTwoPdfVersionsGuide,
  makeScannedPdfSearchableGuide,
  pdfTablesToExcelGuide,
  docxToPdfGuide,
];

export function getGuideBySlug(slug: string): GuideContent | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getOtherGuides(slug: string, limit = 3): GuideContent[] {
  return guides.filter((guide) => guide.slug !== slug).slice(0, limit);
}
