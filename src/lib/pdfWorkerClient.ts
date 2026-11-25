"use client";

import type { PdfJob, PdfWorkerResponse } from "@/types/pdf";

const DEFAULT_WORKER_TIMEOUT_MS = 120_000;

function transferablesFor(job: PdfJob): Transferable[] {
  const buffers: ArrayBuffer[] = [];

  if (job.type === "merge") buffers.push(...job.files);
  if (
    job.type === "split" ||
    job.type === "compress" ||
    job.type === "watermark" ||
    job.type === "page-numbers" ||
    job.type === "rotate" ||
    job.type === "remove-watermark" ||
    job.type === "organize" ||
    job.type === "sign" ||
    job.type === "unlock" ||
    job.type === "protect"
  ) {
    buffers.push(job.file);
  }
  if (job.type === "images") buffers.push(...job.images.map((image) => image.bytes));
  if (job.type === "watermark" && job.options.mode === "image") {
    buffers.push(job.options.image.bytes);
  }
  if (job.type === "organize" && job.options.insert) {
    buffers.push(job.options.insert.file);
  }
  if (job.type === "sign") {
    buffers.push(job.options.signature.bytes);
  }

  return buffers;
}

async function runLocally(job: PdfJob): Promise<Uint8Array> {
  const processor = await import("@/lib/pdfProcessor");

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
    case "unlock": {
      const security = await import("@/lib/pdfSecurity");
      return security.unlockPdf(job.file, job.password);
    }
    case "protect": {
      const security = await import("@/lib/pdfSecurity");
      return security.protectPdf(job.file, job.options);
    }
  }
}

export async function runPdfJob(
  job: PdfJob,
  timeoutMs: number = DEFAULT_WORKER_TIMEOUT_MS,
): Promise<Uint8Array> {
  let instance: Worker;

  try {
    instance = new Worker(new URL("../workers/pdfWorker.ts", import.meta.url), {
      type: "module",
    });
  } catch {
    return runLocally(job);
  }

  return new Promise<Uint8Array>((resolve, reject) => {
    const timeout = setTimeout(() => {
      instance.terminate();
      reject(new Error("TIMEOUT"));
    }, timeoutMs);

    instance.onmessage = (event: MessageEvent<PdfWorkerResponse>) => {
      clearTimeout(timeout);
      instance.terminate();
      if (event.data.ok) {
        resolve(event.data.bytes);
      } else {
        reject(new Error(event.data.message));
      }
    };

    instance.onerror = () => {
      clearTimeout(timeout);
      instance.terminate();
      reject(new Error("WORKER_ERROR"));
    };

    instance.postMessage(job, transferablesFor(job));
  });
}
