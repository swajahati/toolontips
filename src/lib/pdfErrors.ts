import { t, type TranslationKey } from "@/i18n/translations";

const errorKeys: Record<string, TranslationKey> = {
  INVALID_PAGE: "toolPdf.invalidPages",
  NO_FILES: "toolPdf.noFiles",
  NO_PAGES: "toolExtra.noPages",
  NO_IMAGES: "toolPdf.noImages",
  UNSUPPORTED_IMAGE: "toolPdf.unsupportedImage",
  PASSWORD_PROTECTED: "toolExtra.passwordProtected",
  NO_WATERMARK_TEXT: "toolExtra.noWatermarkText",
  NO_LOGO: "toolExtra.noLogo",
  NO_SELECTION: "toolExtra.noSelection",
  NO_MATCHING_WATERMARK: "toolExtra.noMatchingWatermark",
  NO_SIGNATURE: "toolExtra.noSignature",
  WRONG_PASSWORD: "toolSecurity.wrongPassword",
  PASSWORD_REQUIRED: "toolSecurity.passwordRequired",
  PASSWORDS_DONT_MATCH: "toolSecurity.passwordsDontMatch",
  PASSWORD_TOO_SHORT: "toolSecurity.passwordTooShort",
  NO_TEXT: "toolExcel.noText",
  TOO_MANY_PAGES: "toolExcel.tooManyPages",
  UNSUPPORTED_DOCX: "toolWord.unsupported",
  OCR_FAILED: "toolOcr.failed",
  TOO_MANY_OCR_PAGES: "toolOcr.tooManyPages",
  TIMEOUT: "toolExtra.processingLarge",
  WORKER_ERROR: "toolExtra.processingLarge",
  CANVAS_ERROR: "toolExtra.processingLarge",
};

export function describePdfError(error: unknown): string {
  const code = error instanceof Error ? error.message : "UNKNOWN_ERROR";
  return t(errorKeys[code] ?? "tool.error");
}
