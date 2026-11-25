import {
  addPageNumbers,
  addWatermark,
  compressPdfStructure,
  imagesToPdf,
  mergePdfs,
  organizePdf,
  removeWatermark,
  rotatePdf,
  signPdf,
  splitPdf,
} from "@/lib/pdfProcessor";
import { protectPdf, unlockPdf } from "@/lib/pdfSecurity";
import type { PdfJob, PdfWorkerResponse } from "@/types/pdf";

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<PdfJob>) => void) | null;
  postMessage: (message: PdfWorkerResponse, transfer?: Transferable[]) => void;
};

scope.onmessage = async (event) => {
  try {
    let bytes: Uint8Array;

    switch (event.data.type) {
      case "merge":
        bytes = await mergePdfs(event.data.files);
        break;
      case "split":
        bytes = await splitPdf(event.data.file, event.data.spec);
        break;
      case "images":
        bytes = await imagesToPdf(event.data.images, event.data.pageSize, event.data.fit);
        break;
      case "compress":
        bytes = await compressPdfStructure(event.data.file);
        break;
      case "watermark":
        bytes = await addWatermark(event.data.file, event.data.options);
        break;
      case "page-numbers":
        bytes = await addPageNumbers(event.data.file, event.data.options);
        break;
      case "rotate":
        bytes = await rotatePdf(event.data.file, event.data.options);
        break;
      case "remove-watermark":
        bytes = await removeWatermark(event.data.file, event.data.options);
        break;
      case "organize":
        bytes = await organizePdf(event.data.file, event.data.options);
        break;
      case "sign":
        bytes = await signPdf(event.data.file, event.data.options);
        break;
      case "unlock":
        bytes = await unlockPdf(event.data.file, event.data.password);
        break;
      case "protect":
        bytes = await protectPdf(event.data.file, event.data.options);
        break;
      default:
        throw new Error("UNKNOWN_JOB");
    }

    scope.postMessage({ ok: true, bytes }, [bytes.buffer as ArrayBuffer]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    scope.postMessage({ ok: false, message });
  }
};
