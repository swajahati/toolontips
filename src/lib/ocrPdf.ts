import { renderPdfPageCanvas } from "@/lib/pdfRender";

export interface OcrPdfOptions {
  pageNumbers: number[];
  dpi: 200 | 300;
  onProgress?: (value: number) => void;
}

export async function ocrPdf(file: ArrayBuffer, options: OcrPdfOptions): Promise<Uint8Array> {
  if (options.pageNumbers.length === 0) throw new Error("NO_PAGES");
  if (options.pageNumbers.length > 20) throw new Error("TOO_MANY_OCR_PAGES");

  const { createWorker } = await import("tesseract.js");
  const { PDFDocument } = await import("pdf-lib");

  const worker = await createWorker("eng", 1, {
    workerPath: "/tesseract/worker.min.js",
    corePath: "/tesseract/core",
    langPath: "/tesseract/lang",
    cacheMethod: "none",
    workerBlobURL: false,
    gzip: true,
    logger: (message) => {
      if (message.status === "recognizing text") options.onProgress?.(message.progress);
    },
  });

  try {
    const result = await PDFDocument.create();

    for (const pageNumber of options.pageNumbers) {
      const canvas = await renderPdfPageCanvas(file, pageNumber, options.dpi / 72);
      const recognition = await worker.recognize(
        canvas,
        { pdfTitle: `Page ${pageNumber}` },
        { pdf: true },
      );
      if (!recognition.data.pdf) throw new Error("OCR_FAILED");
      const pagePdf = await PDFDocument.load(Uint8Array.from(recognition.data.pdf));
      const [copiedPage] = await result.copyPages(pagePdf, [0]);
      result.addPage(copiedPage);
    }

    return new Uint8Array(await result.save());
  } finally {
    await worker.terminate();
  }
}
