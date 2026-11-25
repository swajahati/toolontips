import "server-only";

import * as processor from "@/lib/pdfProcessor";
import { protectPdf, unlockPdf } from "@/lib/pdfSecurity";
import type { PdfJob } from "@/types/pdf";

export async function runPdfJobServer(job: PdfJob): Promise<Uint8Array> {
  switch (job.type) {
    case "merge":
      return processor.mergePdfs(job.files);
    case "split":
      return processor.splitPdf(job.file, job.spec);
    case "images":
      return processor.imagesToPdf(job.images, job.pageSize, job.fit);
    case "compress":
      return processor.compressPdfStructure(job.file);
    case "watermark":
      return processor.addWatermark(job.file, job.options);
    case "page-numbers":
      return processor.addPageNumbers(job.file, job.options);
    case "rotate":
      return processor.rotatePdf(job.file, job.options);
    case "remove-watermark":
      return processor.removeWatermark(job.file, job.options);
    case "organize":
      return processor.organizePdf(job.file, job.options);
    case "sign":
      return processor.signPdf(job.file, job.options);
    case "unlock":
      return unlockPdf(job.file, job.password);
    case "protect":
      return protectPdf(job.file, job.options);
  }
}
