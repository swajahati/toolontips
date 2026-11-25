export type ImageMime = "image/jpeg" | "image/png" | "image/webp";
export type PassportBackground = "#ffffff" | "#2f5fb2" | "#c62828";

type DetectedMime = ImageMime | "image/heic" | "image/heif";

export interface Dimensions {
  width: number;
  height: number;
}

export interface CropRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ResizeOptions {
  mode: "pixels" | "percent";
  width: number;
  height: number;
  scale: number;
  keepAspect: boolean;
}

export interface ImageResult {
  bytes: Uint8Array;
  name: string;
  mime: ImageMime;
  width: number;
  height: number;
}

const RASTER_MIMES: ImageMime[] = ["image/jpeg", "image/png", "image/webp"];
const HEIC_MIMES: Array<"image/heic" | "image/heif"> = ["image/heic", "image/heif"];
const EXTENSIONS: Record<ImageMime, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function detectImageMime(file: File): DetectedMime | null {
  const type = file.type.toLowerCase() as DetectedMime;
  if (RASTER_MIMES.some((mime) => mime === type)) return type;
  if (HEIC_MIMES.some((mime) => mime === type)) return type;

  const name = file.name.toLowerCase();
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".heic")) return "image/heic";
  if (name.endsWith(".heif")) return "image/heif";
  return null;
}

function rasterMime(mime: DetectedMime | null): ImageMime | null {
  if (!mime) return null;
  return RASTER_MIMES.find((value) => value === mime) ?? null;
}

export function isRasterImage(file: File): boolean {
  const mime = detectImageMime(file);
  return mime !== null && RASTER_MIMES.some((value) => value === mime);
}

export function isHeicImage(file: File): boolean {
  const mime = detectImageMime(file);
  return mime !== null && HEIC_MIMES.some((value) => value === mime);
}

export function isConvertibleImage(file: File): boolean {
  return isRasterImage(file) || isHeicImage(file);
}

export function baseName(name: string): string {
  const cleaned = name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "image";
}

export function outputName(name: string, mime: ImageMime, suffix: string): string {
  return `${baseName(name)}-${suffix}.${EXTENSIONS[mime]}`;
}

export function savingsPercent(originalBytes: number, resultBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((1 - resultBytes / originalBytes) * 100)));
}

export async function blobToBytes(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

export async function loadImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  const image = new Image();
  image.decoding = "async";

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("IMAGE_LOAD_FAILED"));
      image.src = url;
    });
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function getImageDimensions(blob: Blob): Promise<Dimensions> {
  const image = await loadImage(blob);
  return {
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
  };
}

export function canvasToBytes(
  canvas: HTMLCanvasElement,
  mime: ImageMime,
  quality = 0.92,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("CANVAS_EXPORT_FAILED"));
          return;
        }
        blobToBytes(blob).then(resolve, reject);
      },
      mime,
      quality,
    );
  });
}

export function drawImageToCanvas(
  image: HTMLImageElement,
  width: number,
  height: number,
  background?: string,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));

  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_UNAVAILABLE");

  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function clampCrop(crop: CropRect, width: number, height: number): CropRect {
  const cropWidth = clamp(Math.round(crop.width), 1, width);
  const cropHeight = clamp(Math.round(crop.height), 1, height);
  return {
    left: clamp(Math.round(crop.left), 0, width - cropWidth),
    top: clamp(Math.round(crop.top), 0, height - cropHeight),
    width: cropWidth,
    height: cropHeight,
  };
}

export function fullCrop(dimensions: Dimensions): CropRect {
  return { left: 0, top: 0, width: dimensions.width, height: dimensions.height };
}

export async function compressImageFile(
  file: File,
  quality: number,
  maxWidth?: number,
): Promise<ImageResult> {
  const mime = rasterMime(detectImageMime(file));
  if (!mime) {
    throw new Error("UNSUPPORTED_IMAGE");
  }

  const { default: imageCompression } = await import("browser-image-compression");
  const compressed = await imageCompression(file, {
    initialQuality: clamp(quality, 0.05, 1),
    maxSizeMB: Number.POSITIVE_INFINITY,
    maxWidthOrHeight: maxWidth && maxWidth > 0 ? Math.round(maxWidth) : undefined,
    useWebWorker: false,
    maxIteration: 10,
  });

  const dimensions = await getImageDimensions(compressed);
  return {
    bytes: await blobToBytes(compressed),
    name: outputName(file.name, mime, "compressed"),
    mime,
    width: dimensions.width,
    height: dimensions.height,
  };
}

function resolveTargetDimensions(source: Dimensions, options: ResizeOptions): Dimensions {
  const limit = 12000;

  if (options.mode === "percent") {
    const factor = clamp(options.scale, 1, 500) / 100;
    return {
      width: clamp(Math.round(source.width * factor), 1, limit),
      height: clamp(Math.round(source.height * factor), 1, limit),
    };
  }

  if (options.keepAspect) {
    const factor = Math.min(
      clamp(options.width, 1, limit) / source.width,
      clamp(options.height, 1, limit) / source.height,
    );
    return {
      width: clamp(Math.round(source.width * factor), 1, limit),
      height: clamp(Math.round(source.height * factor), 1, limit),
    };
  }

  return {
    width: clamp(Math.round(options.width), 1, limit),
    height: clamp(Math.round(options.height), 1, limit),
  };
}

export async function resizeImageFile(file: File, options: ResizeOptions): Promise<ImageResult> {
  const mime = rasterMime(detectImageMime(file));
  if (!mime) {
    throw new Error("UNSUPPORTED_IMAGE");
  }

  const source = await getImageDimensions(file);
  const target = resolveTargetDimensions(source, options);

  const { default: imageCompression } = await import("browser-image-compression");
  const prepared = await imageCompression(file, {
    initialQuality: 0.92,
    maxSizeMB: Number.POSITIVE_INFINITY,
    maxWidthOrHeight: Math.max(target.width, target.height),
    useWebWorker: false,
    maxIteration: 10,
  });

  const image = await loadImage(prepared);
  const canvas = drawImageToCanvas(
    image,
    target.width,
    target.height,
    mime === "image/jpeg" ? "#ffffff" : undefined,
  );

  return {
    bytes: await canvasToBytes(canvas, mime),
    name: outputName(file.name, mime, "resized"),
    mime,
    width: canvas.width,
    height: canvas.height,
  };
}

export async function convertImageFile(file: File, outputMime: ImageMime): Promise<ImageResult> {
  const detected = detectImageMime(file);
  if (!detected || !isConvertibleImage(file)) {
    throw new Error("UNSUPPORTED_IMAGE");
  }

  let source: Blob = file;
  if (HEIC_MIMES.some((value) => value === detected)) {
    const { default: heic2any } = await import("heic2any");
    const converted = await heic2any({ blob: file, toType: "image/png", quality: 1 });
    const first = Array.isArray(converted) ? converted[0] : converted;
    if (!first) throw new Error("HEIC_CONVERSION_FAILED");
    source = first;
  }

  const image = await loadImage(source);
  const canvas = drawImageToCanvas(
    image,
    image.naturalWidth,
    image.naturalHeight,
    outputMime === "image/jpeg" ? "#ffffff" : undefined,
  );

  return {
    bytes: await canvasToBytes(canvas, outputMime),
    name: outputName(file.name, outputMime, "converted"),
    mime: outputMime,
    width: canvas.width,
    height: canvas.height,
  };
}

export async function cropImageFile(file: File, crop: CropRect): Promise<ImageResult> {
  const mime = rasterMime(detectImageMime(file));
  if (!mime) {
    throw new Error("UNSUPPORTED_IMAGE");
  }

  const image = await loadImage(file);
  const rect = clampCrop(crop, image.naturalWidth, image.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_UNAVAILABLE");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image,
    rect.left,
    rect.top,
    rect.width,
    rect.height,
    0,
    0,
    rect.width,
    rect.height,
  );

  return {
    bytes: await canvasToBytes(canvas, mime),
    name: outputName(file.name, mime, "cropped"),
    mime,
    width: rect.width,
    height: rect.height,
  };
}

export async function createPassportSheet(
  file: File,
  background: PassportBackground,
): Promise<ImageResult> {
  if (!isRasterImage(file)) throw new Error("UNSUPPORTED_IMAGE");

  const mime: ImageMime = "image/png";
  const image = await loadImage(file);
  const photoWidth = 413;
  const photoHeight = 531;
  const gapX = 40;
  const gapY = 30;
  const startX = Math.round((1800 - photoWidth * 3 - gapX * 2) / 2);
  const startY = Math.round((1200 - photoHeight * 2 - gapY) / 2);

  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  canvas.height = 1200;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_UNAVAILABLE");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const positions = Array.from({ length: 6 }, (_, index) => ({
    x: startX + (index % 3) * (photoWidth + gapX),
    y: startY + Math.floor(index / 3) * (photoHeight + gapY),
  }));

  for (const position of positions) {
    context.fillStyle = background;
    context.fillRect(position.x, position.y, photoWidth, photoHeight);

    const scale = Math.max(
      photoWidth / image.naturalWidth,
      photoHeight / image.naturalHeight,
    );
    const sourceWidth = photoWidth / scale;
    const sourceHeight = photoHeight / scale;
    const sourceX = (image.naturalWidth - sourceWidth) / 2;
    const sourceY = Math.max(0, (image.naturalHeight - sourceHeight) * 0.25);

    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      position.x,
      position.y,
      photoWidth,
      photoHeight,
    );
  }

  return {
    bytes: await canvasToBytes(canvas, mime),
    name: outputName(file.name, mime, "passport-sheet"),
    mime,
    width: canvas.width,
    height: canvas.height,
  };
}
