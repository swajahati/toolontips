import type { ComponentType } from "react";
import { Base64UrlEncoderTool } from "./Base64UrlEncoderTool";
import { BmiCalculatorTool } from "./BmiCalculatorTool";
import { BmrTdeeCalculatorTool } from "./BmrTdeeCalculatorTool";
import { CaseConverterTool } from "./CaseConverterTool";
import { ComparePdfTool } from "./ComparePdfTool";
import { CompressImageTool } from "./CompressImageTool";
import { CompressPdfTool } from "./CompressPdfTool";
import { CompoundInterestCalculatorTool } from "./CompoundInterestCalculatorTool";
import { ConvertImageTool } from "./ConvertImageTool";
import { CropImageTool } from "./CropImageTool";
import { InvoiceGeneratorTool } from "./InvoiceGeneratorTool";
import { JpgToPdfTool } from "./JpgToPdfTool";
import { JsonFormatterTool } from "./JsonFormatterTool";
import { LoanCalculatorTool } from "./LoanCalculatorTool";
import { MergePdfTool } from "./MergePdfTool";
import { MortgageCalculatorTool } from "./MortgageCalculatorTool";
import { OcrPdfTool } from "./OcrPdfTool";
import { OrganizePdfTool } from "./OrganizePdfTool";
import { PageNumbersPdfTool } from "./PageNumbersPdfTool";
import { PasswordGeneratorTool } from "./PasswordGeneratorTool";
import { PassportPhotoMakerTool } from "./PassportPhotoMakerTool";
import { PdfToExcelTool } from "./PdfToExcelTool";
import { PdfToJpgTool } from "./PdfToJpgTool";
import { ProfitMarginCalculatorTool } from "./ProfitMarginCalculatorTool";
import { ProtectPdfTool } from "./ProtectPdfTool";
import { QrCodeGeneratorTool } from "./QrCodeGeneratorTool";
import { RemoveWatermarkPdfTool } from "./RemoveWatermarkPdfTool";
import { ResizeImageTool } from "./ResizeImageTool";
import { RotatePdfTool } from "./RotatePdfTool";
import { SalaryCalculatorTool } from "./SalaryCalculatorTool";
import { SignPdfTool } from "./SignPdfTool";
import { SplitPdfTool } from "./SplitPdfTool";
import { UnlockPdfTool } from "./UnlockPdfTool";
import { VatGstCalculatorTool } from "./VatGstCalculatorTool";
import { WatermarkPdfTool } from "./WatermarkPdfTool";
import { WordCounterTool } from "./WordCounterTool";
import { WordToPdfTool } from "./WordToPdfTool";
import { AscvdRiskEstimatorTool } from "./AscvdRiskEstimatorTool";
import { FindriscTool } from "./FindriscTool";
import { Type2DiabetesRiskTestTool } from "./Type2DiabetesRiskTestTool";
import type { Tool } from "@/types";

export const toolComponents: Record<string, ComponentType<{ tool: Tool }>> = {
  "merge-pdf": MergePdfTool,
  "compress-pdf": CompressPdfTool,
  "split-pdf": SplitPdfTool,
  "jpg-to-pdf": JpgToPdfTool,
  "pdf-to-jpg": PdfToJpgTool,
  "watermark-pdf": WatermarkPdfTool,
  "remove-watermark-pdf": RemoveWatermarkPdfTool,
  "organize-pdf": OrganizePdfTool,
  "sign-pdf": SignPdfTool,
  "compare-pdf": ComparePdfTool,
  "pdf-to-excel": PdfToExcelTool,
  "ocr-pdf": OcrPdfTool,
  "unlock-pdf": UnlockPdfTool,
  "protect-pdf": ProtectPdfTool,
  "page-numbers-pdf": PageNumbersPdfTool,
  "rotate-pdf": RotatePdfTool,
  "word-to-pdf": WordToPdfTool,
  "compress-image": CompressImageTool,
  "resize-image": ResizeImageTool,
  "convert-image": ConvertImageTool,
  "crop-image": CropImageTool,
  "passport-photo-maker": PassportPhotoMakerTool,
  "qr-code-generator": QrCodeGeneratorTool,
  "invoice-generator": InvoiceGeneratorTool,
  "mortgage-calculator": MortgageCalculatorTool,
  "salary-calculator": SalaryCalculatorTool,
  "loan-calculator": LoanCalculatorTool,
  "compound-interest-calculator": CompoundInterestCalculatorTool,
  "profit-margin-calculator": ProfitMarginCalculatorTool,
  "vat-gst-calculator": VatGstCalculatorTool,
  "json-formatter": JsonFormatterTool,
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "password-generator": PasswordGeneratorTool,
  "base64-url-encoder": Base64UrlEncoderTool,
  "type-2-diabetes-risk-test": Type2DiabetesRiskTestTool,
  "findrisc-diabetes-risk": FindriscTool,
  "ascvd-risk-estimator": AscvdRiskEstimatorTool,
  "bmi-calculator": BmiCalculatorTool,
  "bmr-tdee-calculator": BmrTdeeCalculatorTool,
};
