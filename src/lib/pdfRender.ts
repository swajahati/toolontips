export interface PdfTextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RenderedPage {
  bytes: Uint8Array;
  width: number;
  height: number;
  mime: "image/jpeg" | "image/png";
}

async function loadPdf(bytes: ArrayBuffer) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes) });

  try {
    const pdfDocument = await task.promise;
    return { document: pdfDocument, task };
  } catch (error) {
    await task.destroy();
    if (error && typeof error === "object" && "name" in error && error.name === "PasswordException") {
      throw new Error("PASSWORD_PROTECTED");
    }
    throw error;
  }
}

type LoadedDocument = Awaited<ReturnType<typeof loadPdf>>["document"];

async function renderPageImage(
  pdfDocument: LoadedDocument,
  pageNumber: number,
  format: "jpeg" | "png",
  scale: number,
  quality: number,
): Promise<RenderedPage> {
  if (pageNumber < 1 || pageNumber > pdfDocument.numPages) throw new Error("INVALID_PAGE");

  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));

  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_ERROR");

  await page.render({ canvas, canvasContext: context, viewport }).promise;

  const mime = format === "png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("CANVAS_ERROR"))),
      mime,
      format === "jpeg" ? quality : undefined,
    );
  });

  return {
    bytes: new Uint8Array(await blob.arrayBuffer()),
    width: canvas.width,
    height: canvas.height,
    mime,
  };
}

export async function getPdfPageCount(bytes: ArrayBuffer): Promise<number> {
  const { document, task } = await loadPdf(bytes);
  try {
    return document.numPages;
  } finally {
    await task.destroy();
  }
}

export async function renderPdfPage(
  bytes: ArrayBuffer,
  pageNumber: number,
  format: "jpeg" | "png",
  scale: number,
  quality: number,
): Promise<RenderedPage> {
  const { document, task } = await loadPdf(bytes);
  try {
    return await renderPageImage(document, pageNumber, format, scale, quality);
  } finally {
    await task.destroy();
  }
}

export async function renderPdfPageCanvas(
  bytes: ArrayBuffer,
  pageNumber: number,
  scale: number,
): Promise<HTMLCanvasElement> {
  const { document: pdfDocument, task } = await loadPdf(bytes);
  try {
    if (pageNumber < 1 || pageNumber > pdfDocument.numPages) throw new Error("INVALID_PAGE");
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = window.document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("CANVAS_ERROR");
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    return canvas;
  } finally {
    await task.destroy();
  }
}

export async function getPdfPageText(bytes: ArrayBuffer, pageNumber: number): Promise<string> {
  const { document, task } = await loadPdf(bytes);
  try {
    if (pageNumber < 1 || pageNumber > document.numPages) throw new Error("INVALID_PAGE");
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return text;
  } finally {
    await task.destroy();
  }
}

export async function getPdfTextItems(
  bytes: ArrayBuffer,
  pageNumber: number,
): Promise<PdfTextItem[]> {
  const { document, task } = await loadPdf(bytes);
  try {
    if (pageNumber < 1 || pageNumber > document.numPages) throw new Error("INVALID_PAGE");
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    return content.items
      .filter((item) => "str" in item && item.str.trim())
      .map((item) => {
        const textItem = item as {
          str: string;
          transform: number[];
          width: number;
          height?: number;
        };
        return {
          text: textItem.str.trim(),
          x: textItem.transform[4],
          y: textItem.transform[5],
          width: textItem.width,
          height: textItem.height || Math.abs(textItem.transform[3]) || 10,
        };
      });
  } finally {
    await task.destroy();
  }
}

export async function renderPdfThumbnails(
  bytes: ArrayBuffer,
  maxPages = 60,
): Promise<{ pageNumber: number; page: RenderedPage }[]> {
  const { document, task } = await loadPdf(bytes);
  const results: { pageNumber: number; page: RenderedPage }[] = [];

  try {
    const total = Math.min(document.numPages, maxPages);
    for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
      const page = await renderPageImage(document, pageNumber, "jpeg", 0.45, 0.7);
      results.push({ pageNumber, page });
    }
    return results;
  } finally {
    await task.destroy();
  }
}
