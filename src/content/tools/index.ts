import { ascvdRiskEstimatorContent } from "./ascvd-risk-estimator";
import { base64UrlEncoderContent } from "./base64-url-encoder";
import { bmiCalculatorContent } from "./bmi-calculator";
import { bmrTdeeCalculatorContent } from "./bmr-tdee-calculator";
import { caseConverterContent } from "./case-converter";
import { findriscDiabetesRiskContent } from "./findrisc-diabetes-risk";
import { comparePdfContent } from "./compare-pdf";
import { compressImageContent } from "./compress-image";
import { compressPdfContent } from "./compress-pdf";
import { compoundInterestCalculatorContent } from "./compound-interest-calculator";
import { convertImageContent } from "./convert-image";
import { cropImageContent } from "./crop-image";
import { invoiceGeneratorContent } from "./invoice-generator";
import { jpgToPdfContent } from "./jpg-to-pdf";
import { jsonFormatterContent } from "./json-formatter";
import { loanCalculatorContent } from "./loan-calculator";
import { mergePdfContent } from "./merge-pdf";
import { mortgageCalculatorContent } from "./mortgage-calculator";
import { ocrPdfContent } from "./ocr-pdf";
import { organizePdfContent } from "./organize-pdf";
import { pageNumbersPdfContent } from "./page-numbers-pdf";
import { passwordGeneratorContent } from "./password-generator";
import { passportPhotoMakerContent } from "./passport-photo-maker";
import { photoEditorContent } from "./photo-editor";
import { pdfToExcelContent } from "./pdf-to-excel";
import { pdfToJpgContent } from "./pdf-to-jpg";
import { profitMarginCalculatorContent } from "./profit-margin-calculator";
import { protectPdfContent } from "./protect-pdf";
import { qrCodeGeneratorContent } from "./qr-code-generator";
import { removeWatermarkPdfContent } from "./remove-watermark-pdf";
import { resizeImageContent } from "./resize-image";
import { rotatePdfContent } from "./rotate-pdf";
import { salaryCalculatorContent } from "./salary-calculator";
import { signPdfContent } from "./sign-pdf";
import { splitPdfContent } from "./split-pdf";
import { type2DiabetesRiskTestContent } from "./type-2-diabetes-risk-test";
import { unlockPdfContent } from "./unlock-pdf";
import { vatGstCalculatorContent } from "./vat-gst-calculator";
import { watermarkPdfContent } from "./watermark-pdf";
import { wordCounterContent } from "./word-counter";
import { wordToPdfContent } from "./word-to-pdf";
import type { ToolContent } from "./types";

const contents: Record<string, ToolContent> = {
  [mergePdfContent.slug]: mergePdfContent,
  [compressPdfContent.slug]: compressPdfContent,
  [ocrPdfContent.slug]: ocrPdfContent,
  [splitPdfContent.slug]: splitPdfContent,
  [jpgToPdfContent.slug]: jpgToPdfContent,
  [pdfToJpgContent.slug]: pdfToJpgContent,
  [watermarkPdfContent.slug]: watermarkPdfContent,
  [removeWatermarkPdfContent.slug]: removeWatermarkPdfContent,
  [organizePdfContent.slug]: organizePdfContent,
  [signPdfContent.slug]: signPdfContent,
  [comparePdfContent.slug]: comparePdfContent,
  [pdfToExcelContent.slug]: pdfToExcelContent,
  [unlockPdfContent.slug]: unlockPdfContent,
  [protectPdfContent.slug]: protectPdfContent,
  [pageNumbersPdfContent.slug]: pageNumbersPdfContent,
  [rotatePdfContent.slug]: rotatePdfContent,
  [wordToPdfContent.slug]: wordToPdfContent,
  [compressImageContent.slug]: compressImageContent,
  [resizeImageContent.slug]: resizeImageContent,
  [convertImageContent.slug]: convertImageContent,
  [cropImageContent.slug]: cropImageContent,
  [passportPhotoMakerContent.slug]: passportPhotoMakerContent,
  [photoEditorContent.slug]: photoEditorContent,
  [qrCodeGeneratorContent.slug]: qrCodeGeneratorContent,
  [invoiceGeneratorContent.slug]: invoiceGeneratorContent,
  [mortgageCalculatorContent.slug]: mortgageCalculatorContent,
  [salaryCalculatorContent.slug]: salaryCalculatorContent,
  [loanCalculatorContent.slug]: loanCalculatorContent,
  [compoundInterestCalculatorContent.slug]: compoundInterestCalculatorContent,
  [profitMarginCalculatorContent.slug]: profitMarginCalculatorContent,
  [vatGstCalculatorContent.slug]: vatGstCalculatorContent,
  [jsonFormatterContent.slug]: jsonFormatterContent,
  [wordCounterContent.slug]: wordCounterContent,
  [caseConverterContent.slug]: caseConverterContent,
  [passwordGeneratorContent.slug]: passwordGeneratorContent,
  [base64UrlEncoderContent.slug]: base64UrlEncoderContent,
  [type2DiabetesRiskTestContent.slug]: type2DiabetesRiskTestContent,
  [findriscDiabetesRiskContent.slug]: findriscDiabetesRiskContent,
  [ascvdRiskEstimatorContent.slug]: ascvdRiskEstimatorContent,
  [bmiCalculatorContent.slug]: bmiCalculatorContent,
  [bmrTdeeCalculatorContent.slug]: bmrTdeeCalculatorContent,
};

export function getToolContent(slug: string): ToolContent | undefined {
  return contents[slug];
}
