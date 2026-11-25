import {
  PDFArray,
  PDFContentStream,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFRawStream,
  PDFRef,
  PDFStream,
  PDFString,
  StandardFonts,
  decodePDFRawStream,
  degrees,
  rgb,
} from "pdf-lib";

export type ImageInput = { bytes: ArrayBuffer; type: string };

export type PageSizeOption = "fit" | "a4" | "letter";
export type FitOption = "contain" | "cover";
export type WatermarkPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "tiled";
export type PageScope = "all" | "odd" | "even" | "custom";
export type PageNumberPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";
export type PageNumberFormat = "number" | "page-x" | "page-x-of-y" | "x-slash-y";
export type RotationAngle = 90 | 180 | 270;

export interface TextWatermarkOptions {
  mode: "text";
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  rotation: number;
  position: WatermarkPosition;
  scope: PageScope;
  spec: string;
}

export interface ImageWatermarkOptions {
  mode: "image";
  image: ImageInput;
  widthPercent: number;
  opacity: number;
  rotation: number;
  position: WatermarkPosition;
  scope: PageScope;
  spec: string;
}

export type WatermarkOptions = TextWatermarkOptions | ImageWatermarkOptions;

export interface PageNumberOptions {
  position: PageNumberPosition;
  startNumber: number;
  format: PageNumberFormat;
  fontSize: number;
  scope: PageScope;
  spec: string;
}

export interface RotateOptions {
  mode: "all" | "pages";
  angle: RotationAngle;
  perPage: Record<number, RotationAngle>;
}

export interface RemoveWatermarkOptions {
  texts: string[];
  scope: PageScope;
  spec: string;
}

export interface OrganizeInsertOptions {
  file: ArrayBuffer;
  pages: number[];
  position: number;
}

export interface OrganizeOptions {
  order: number[];
  insert?: OrganizeInsertOptions;
}

export interface SignOptions {
  signature: ImageInput;
  scope: PageScope;
  spec: string;
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  opacity: number;
}

const WATERMARK_MARKER_KEY = PDFName.of("ToolontipsTextWatermark");

async function loadSourcePdf(bytes: ArrayBuffer): Promise<PDFDocument> {
  try {
    return await PDFDocument.load(bytes);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/encrypt|password/i.test(message)) throw new Error("PASSWORD_PROTECTED");
    throw error;
  }
}

function uniqueTexts(texts: string[]): string[] {
  return Array.from(
    new Set(texts.map((text) => text.trim()).filter((text) => text.length > 0)),
  );
}

function resolveObject(pdf: PDFDocument, object: unknown): unknown {
  return object instanceof PDFRef ? pdf.context.lookup(object) : object;
}

export function getWatermarkTextsFromPdf(pdf: PDFDocument): string[] {
  const marker = resolveObject(pdf, pdf.catalog.lookup(WATERMARK_MARKER_KEY));
  if (!(marker instanceof PDFDict)) return [];

  const texts = resolveObject(pdf, marker.lookup(PDFName.of("texts")));
  if (!(texts instanceof PDFArray)) return [];

  const values: string[] = [];
  for (let index = 0; index < texts.size(); index += 1) {
    const value = resolveObject(pdf, texts.get(index));
    if (value instanceof PDFString || value instanceof PDFHexString) {
      values.push(value.decodeText());
    }
  }

  return uniqueTexts(values);
}

function writeWatermarkMarker(pdf: PDFDocument, texts: string[]): void {
  const all = uniqueTexts([...getWatermarkTextsFromPdf(pdf), ...texts]);
  if (all.length === 0) return;

  pdf.catalog.set(
    WATERMARK_MARKER_KEY,
    pdf.context.obj({
      version: 1,
      texts: pdf.context.obj(all.map((text) => PDFString.of(text))),
    }),
  );
}

function bytesToString(bytes: Uint8Array): string {
  let value = "";
  for (let index = 0; index < bytes.length; index += 1) {
    value += String.fromCharCode(bytes[index]);
  }
  return value;
}

function stringToBytes(value: string): Uint8Array {
  const bytes = new Uint8Array(value.length);
  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }
  return bytes;
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function decodedStreamBytes(pdf: PDFDocument, object: unknown): Uint8Array {
  const stream = resolveObject(pdf, object);
  if (stream instanceof PDFRawStream) return decodePDFRawStream(stream).decode();
  if (stream instanceof PDFContentStream) return stream.getUnencodedContents();
  if (stream instanceof PDFStream) return stream.getContents();
  return new Uint8Array();
}

function pageContentBytes(pdf: PDFDocument, pageIndex: number): Uint8Array {
  const contents = pdf.getPages()[pageIndex]?.node.Contents();
  if (!contents) return new Uint8Array();

  if (contents instanceof PDFArray) {
    const parts: Uint8Array[] = [];
    for (let index = 0; index < contents.size(); index += 1) {
      parts.push(decodedStreamBytes(pdf, contents.get(index)));
      parts.push(new Uint8Array([10]));
    }
    return concatBytes(parts);
  }

  return decodedStreamBytes(pdf, contents);
}

function decodeHexContent(hex: string): string {
  const clean = hex.replace(/\s+/g, "");
  if (clean.length === 0 || clean.length % 2 !== 0) return "";

  const bytes = new Uint8Array(clean.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    const byte = Number.parseInt(clean.slice(index * 2, index * 2 + 2), 16);
    if (Number.isNaN(byte)) return "";
    bytes[index] = byte;
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff && bytes.length > 2) {
    let value = "";
    for (let index = 2; index + 1 < bytes.length; index += 2) {
      value += String.fromCharCode(bytes[index] * 256 + bytes[index + 1]);
    }
    return value;
  }

  return bytesToString(bytes);
}

function decodeLiteralContent(raw: string): string {
  const body = raw.slice(1, -1);
  let value = "";
  let index = 0;

  while (index < body.length) {
    const character = body[index];
    if (character !== "\\") {
      value += character;
      index += 1;
      continue;
    }

    const next = body[index + 1];
    index += 2;
    if (next === "n") value += "\n";
    else if (next === "r") value += "\r";
    else if (next === "t") value += "\t";
    else if (next === "b") value += "\b";
    else if (next === "f") value += "\f";
    else if (next && /[0-7]/.test(next)) {
      let octal = next;
      while (octal.length < 3 && index < body.length && /[0-7]/.test(body[index])) {
        octal += body[index];
        index += 1;
      }
      value += String.fromCharCode(Number.parseInt(octal, 8));
    } else if (next !== undefined) {
      value += next;
    }
  }

  return value;
}

function extractTextFromBlock(block: string): string {
  const values: string[] = [];

  for (const match of block.matchAll(/<([0-9a-fA-F\s]+)>/g)) {
    values.push(decodeHexContent(match[1]));
  }
  for (const match of block.matchAll(/\(((?:\\.|[^\\)])*)\)/g)) {
    values.push(decodeLiteralContent(match[0]));
  }

  return values.join("");
}

function removeTextBlocks(source: string, targets: string[]): { output: string; removed: number } {
  let output = "";
  let lastIndex = 0;
  let removed = 0;

  for (const match of source.matchAll(/BT\b[\s\S]*?\bET\b/g)) {
    const start = match.index ?? 0;
    const block = match[0];
    output += source.slice(lastIndex, start);

    const text = extractTextFromBlock(block);
    if (targets.includes(text)) {
      removed += 1;
    } else {
      output += block;
    }

    lastIndex = start + block.length;
  }

  output += source.slice(lastIndex);
  return { output, removed };
}

function selectedIndices(totalPages: number, scope: PageScope, spec: string): number[] {
  if (scope === "all") return Array.from({ length: totalPages }, (_, index) => index);
  if (scope === "odd") {
    return Array.from({ length: totalPages }, (_, index) => index).filter(
      (index) => (index + 1) % 2 === 1,
    );
  }
  if (scope === "even") {
    return Array.from({ length: totalPages }, (_, index) => index).filter(
      (index) => (index + 1) % 2 === 0,
    );
  }
  return parsePageSpec(spec, totalPages);
}

function colorFromHex(hex: string) {
  const value = /^#?([0-9a-f]{6})$/i.exec(hex.trim())?.[1] ?? "000000";
  return rgb(
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  );
}

function rotatedDimensions(width: number, height: number, rotation: number) {
  const radians = (rotation * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return {
    cosine,
    sine,
    width: Math.abs(width * cosine) + Math.abs(height * sine),
    height: Math.abs(width * sine) + Math.abs(height * cosine),
  };
}

function rotatedOrigin(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  cosine: number,
  sine: number,
) {
  return {
    x: centerX - (width / 2) * cosine + (height / 2) * sine,
    y: centerY - (width / 2) * sine - (height / 2) * cosine,
  };
}

function markCenters(
  pageWidth: number,
  pageHeight: number,
  width: number,
  height: number,
  rotation: number,
  position: WatermarkPosition,
) {
  const box = rotatedDimensions(width, height, rotation);
  const margin = 14;

  if (position === "tiled") {
    const stepX = Math.max(box.width + 48, 140);
    const stepY = Math.max(box.height + 48, 90);
    const centers: { x: number; y: number }[] = [];

    for (let x = stepX / 2; x < pageWidth + stepX / 2; x += stepX) {
      for (let y = stepY / 2; y < pageHeight + stepY / 2; y += stepY) {
        centers.push({ x, y });
      }
    }

    return centers;
  }

  const minX = margin + box.width / 2;
  const maxX = pageWidth - margin - box.width / 2;
  const minY = margin + box.height / 2;
  const maxY = pageHeight - margin - box.height / 2;

  switch (position) {
    case "top-left":
      return [{ x: minX, y: maxY }];
    case "top-right":
      return [{ x: maxX, y: maxY }];
    case "bottom-left":
      return [{ x: minX, y: minY }];
    case "bottom-right":
      return [{ x: maxX, y: minY }];
    default:
      return [{ x: pageWidth / 2, y: pageHeight / 2 }];
  }
}

export function parsePageSpec(spec: string, totalPages: number): number[] {
  const indices = new Set<number>();

  for (const rawPart of spec.split(",")) {
    const part = rawPart.trim();
    if (!part) continue;

    const single = /^(\d+)$/.exec(part);
    if (single) {
      const page = Number(single[1]);
      if (page < 1 || page > totalPages) throw new Error("INVALID_PAGE");
      indices.add(page - 1);
      continue;
    }

    const range = /^(\d+)\s*-\s*(\d+)$/.exec(part);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start < 1 || end > totalPages || start > end) throw new Error("INVALID_PAGE");
      for (let page = start; page <= end; page += 1) indices.add(page - 1);
      continue;
    }

    throw new Error("INVALID_PAGE");
  }

  if (indices.size === 0) throw new Error("INVALID_PAGE");
  return Array.from(indices).sort((a, b) => a - b);
}

export async function mergePdfs(files: ArrayBuffer[]): Promise<Uint8Array> {
  if (files.length < 2) throw new Error("NO_FILES");

  const merged = await PDFDocument.create();
  for (const bytes of files) {
    const source = await loadSourcePdf(bytes);
    const pages = await merged.copyPages(source, source.getPageIndices());
    for (const page of pages) merged.addPage(page);
  }

  return merged.save({ useObjectStreams: true });
}

export async function splitPdf(file: ArrayBuffer, spec: string): Promise<Uint8Array> {
  const source = await loadSourcePdf(file);
  const indices = parsePageSpec(spec, source.getPageCount());

  const result = await PDFDocument.create();
  const pages = await result.copyPages(source, indices);
  for (const page of pages) result.addPage(page);

  return result.save({ useObjectStreams: true });
}

export async function imagesToPdf(
  images: ImageInput[],
  pageSize: PageSizeOption = "fit",
  fit: FitOption = "contain",
): Promise<Uint8Array> {
  if (images.length === 0) throw new Error("NO_IMAGES");

  const pdf = await PDFDocument.create();

  for (const image of images) {
    let embedded;
    if (image.type === "image/jpeg") {
      embedded = await pdf.embedJpg(image.bytes);
    } else if (image.type === "image/png") {
      embedded = await pdf.embedPng(image.bytes);
    } else {
      throw new Error("UNSUPPORTED_IMAGE");
    }

    if (pageSize === "fit") {
      const page = pdf.addPage([embedded.width, embedded.height]);
      page.drawImage(embedded, {
        x: 0,
        y: 0,
        width: embedded.width,
        height: embedded.height,
      });
      continue;
    }

    const dimensions = pageSize === "a4" ? [595.28, 841.89] : [612, 792];
    const pageWidth = dimensions[0];
    const pageHeight = dimensions[1];
    const page = pdf.addPage([pageWidth, pageHeight]);
    const scale =
      fit === "cover"
        ? Math.max(pageWidth / embedded.width, pageHeight / embedded.height)
        : Math.min(pageWidth / embedded.width, pageHeight / embedded.height);
    const width = embedded.width * scale;
    const height = embedded.height * scale;

    page.drawImage(embedded, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height,
    });
  }

  return pdf.save({ useObjectStreams: true });
}

export async function compressPdfStructure(file: ArrayBuffer): Promise<Uint8Array> {
  const pdf = await loadSourcePdf(file);

  pdf.setTitle("");
  pdf.setAuthor("");
  pdf.setSubject("");
  pdf.setKeywords([]);
  pdf.setCreator("");
  pdf.setProducer("");

  return pdf.save({ useObjectStreams: true });
}

export async function addWatermark(file: ArrayBuffer, options: WatermarkOptions): Promise<Uint8Array> {
  const pdf = await loadSourcePdf(file);
  const indices = selectedIndices(pdf.getPageCount(), options.scope, options.spec);
  const color = options.mode === "text" ? colorFromHex(options.color) : undefined;
  const font = options.mode === "text" ? await pdf.embedFont(StandardFonts.HelveticaBold) : undefined;
  const embeddedImage =
    options.mode === "image"
      ? options.image.type === "image/jpeg"
        ? await pdf.embedJpg(options.image.bytes)
        : options.image.type === "image/png"
          ? await pdf.embedPng(options.image.bytes)
          : null
      : null;

  if (options.mode === "image" && !embeddedImage) throw new Error("UNSUPPORTED_IMAGE");

  const pages = pdf.getPages();
  const watermarkText = options.mode === "text" ? options.text.trim() || "WATERMARK" : "";

  for (const index of indices) {
    const page = pages[index];
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    if (options.mode === "text" && font && color) {
      const text = watermarkText;
      const textWidth = font.widthOfTextAtSize(text, options.fontSize);
      const centers = markCenters(
        pageWidth,
        pageHeight,
        textWidth,
        options.fontSize,
        options.rotation,
        options.position,
      );
      const box = rotatedDimensions(textWidth, options.fontSize, options.rotation);

      for (const center of centers) {
        const origin = rotatedOrigin(
          center.x,
          center.y,
          textWidth,
          options.fontSize,
          box.cosine,
          box.sine,
        );
        page.drawText(text, {
          x: origin.x,
          y: origin.y,
          size: options.fontSize,
          font,
          color,
          opacity: options.opacity,
          rotate: degrees(options.rotation),
        });
      }
    }

    if (options.mode === "image" && embeddedImage) {
      const width = (pageWidth * options.widthPercent) / 100;
      const height = width * (embeddedImage.height / embeddedImage.width);
      const centers = markCenters(
        pageWidth,
        pageHeight,
        width,
        height,
        options.rotation,
        options.position,
      );
      const box = rotatedDimensions(width, height, options.rotation);

      for (const center of centers) {
        const origin = rotatedOrigin(
          center.x,
          center.y,
          width,
          height,
          box.cosine,
          box.sine,
        );
        page.drawImage(embeddedImage, {
          x: origin.x,
          y: origin.y,
          width,
          height,
          opacity: options.opacity,
          rotate: degrees(options.rotation),
        });
      }
    }
  }

  if (options.mode === "text") writeWatermarkMarker(pdf, [watermarkText]);

  return pdf.save({ useObjectStreams: true });
}

export async function addPageNumbers(file: ArrayBuffer, options: PageNumberOptions): Promise<Uint8Array> {
  const pdf = await loadSourcePdf(file);
  const indices = selectedIndices(pdf.getPageCount(), options.scope, options.spec);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const totalPages = pdf.getPageCount();
  const pages = pdf.getPages();
  const margin = Math.max(14, options.fontSize);

  indices.forEach((pageIndex, position) => {
    const page = pages[pageIndex];
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    const current = options.startNumber + position;
    const label =
      options.format === "number"
        ? `${current}`
        : options.format === "page-x"
          ? `Page ${current}`
          : options.format === "page-x-of-y"
            ? `Page ${current} of ${totalPages}`
            : `${current} / ${totalPages}`;
    const textWidth = font.widthOfTextAtSize(label, options.fontSize);

    const x =
      options.position === "bottom-left" || options.position === "top-left"
        ? margin
        : options.position === "bottom-right" || options.position === "top-right"
          ? pageWidth - margin - textWidth
          : (pageWidth - textWidth) / 2;
    const y =
      options.position === "top-left" ||
      options.position === "top-center" ||
      options.position === "top-right"
        ? pageHeight - margin - options.fontSize
        : margin;

    page.drawText(label, { x, y, size: options.fontSize, font });
  });

  return pdf.save({ useObjectStreams: true });
}

export async function rotatePdf(file: ArrayBuffer, options: RotateOptions): Promise<Uint8Array> {
  const pdf = await loadSourcePdf(file);
  const pages = pdf.getPages();

  pages.forEach((page, index) => {
    const angle = options.mode === "all" ? options.angle : options.perPage[index + 1];
    if (!angle) return;
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  });

  return pdf.save({ useObjectStreams: true });
}

export async function getWatermarkTexts(file: ArrayBuffer): Promise<string[]> {
  const pdf = await loadSourcePdf(file);
  return getWatermarkTextsFromPdf(pdf);
}

export async function removeWatermark(
  file: ArrayBuffer,
  options: RemoveWatermarkOptions,
): Promise<Uint8Array> {
  const pdf = await loadSourcePdf(file);
  const texts = uniqueTexts(options.texts);
  if (texts.length === 0) throw new Error("NO_WATERMARK_TEXT");

  const indices = selectedIndices(pdf.getPageCount(), options.scope, options.spec);
  const pages = pdf.getPages();
  let removed = 0;

  for (const index of indices) {
    const source = pageContentBytes(pdf, index);
    if (source.length === 0) continue;

    const result = removeTextBlocks(bytesToString(source), texts);
    if (result.removed === 0) continue;

    const stream = pdf.context.stream(stringToBytes(result.output));
    const streamRef = pdf.context.register(stream);
    pages[index].node.set(PDFName.Contents, streamRef);
    removed += result.removed;
  }

  if (removed === 0) throw new Error("NO_MATCHING_WATERMARK");

  pdf.catalog.delete(WATERMARK_MARKER_KEY);
  return pdf.save({ useObjectStreams: true });
}

export async function organizePdf(file: ArrayBuffer, options: OrganizeOptions): Promise<Uint8Array> {
  const source = await loadSourcePdf(file);
  const totalPages = source.getPageCount();
  const order = options.order;

  if (!Array.isArray(order) || order.length === 0) throw new Error("NO_PAGES");
  if (new Set(order).size !== order.length) throw new Error("INVALID_PAGE");
  for (const index of order) {
    if (!Number.isInteger(index) || index < 0 || index >= totalPages) {
      throw new Error("INVALID_PAGE");
    }
  }

  const result = await PDFDocument.create();
  const copied = await result.copyPages(source, order);
  for (const page of copied) result.addPage(page);

  if (options.insert) {
    const extra = await loadSourcePdf(options.insert.file);
    const selected = options.insert.pages;
    for (const index of selected) {
      if (!Number.isInteger(index) || index < 0 || index >= extra.getPageCount()) {
        throw new Error("INVALID_PAGE");
      }
    }

    const inserted = await result.copyPages(extra, selected);
    const position = Math.max(0, Math.min(options.insert.position, result.getPageCount()));
    inserted.forEach((page, offset) => result.insertPage(position + offset, page));
  }

  if (result.getPageCount() === 0) throw new Error("NO_PAGES");
  return result.save({ useObjectStreams: true });
}

export async function signPdf(file: ArrayBuffer, options: SignOptions): Promise<Uint8Array> {
  const pdf = await loadSourcePdf(file);
  const indices = selectedIndices(pdf.getPageCount(), options.scope, options.spec);

  const image =
    options.signature.type === "image/png"
      ? await pdf.embedPng(options.signature.bytes)
      : options.signature.type === "image/jpeg"
        ? await pdf.embedJpg(options.signature.bytes)
        : null;
  if (!image) throw new Error("UNSUPPORTED_IMAGE");

  for (const index of indices) {
    const page = pdf.getPages()[index];
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    const width = (pageWidth * options.widthPercent) / 100;
    const height = width * (image.height / image.width);
    const x = Math.max(0, Math.min((pageWidth * options.xPercent) / 100, pageWidth - width));
    const y = Math.max(
      0,
      Math.min(pageHeight * (1 - options.yPercent / 100) - height, pageHeight - height),
    );

    page.drawImage(image, { x, y, width, height, opacity: options.opacity });
  }

  return pdf.save({ useObjectStreams: true });
}
