import type {
  FitOption,
  ImageInput,
  OrganizeOptions,
  PageNumberOptions,
  PageSizeOption,
  RemoveWatermarkOptions,
  RotateOptions,
  SignOptions,
  WatermarkOptions,
} from "@/lib/pdfProcessor";
import type { ProtectPdfOptions } from "@/lib/pdfSecurity";

export type PdfJob =
  | { type: "merge"; files: ArrayBuffer[] }
  | { type: "split"; file: ArrayBuffer; spec: string }
  | { type: "images"; images: ImageInput[]; pageSize: PageSizeOption; fit: FitOption }
  | { type: "compress"; file: ArrayBuffer }
  | { type: "watermark"; file: ArrayBuffer; options: WatermarkOptions }
  | { type: "page-numbers"; file: ArrayBuffer; options: PageNumberOptions }
  | { type: "rotate"; file: ArrayBuffer; options: RotateOptions }
  | { type: "remove-watermark"; file: ArrayBuffer; options: RemoveWatermarkOptions }
  | { type: "organize"; file: ArrayBuffer; options: OrganizeOptions }
  | { type: "sign"; file: ArrayBuffer; options: SignOptions }
  | { type: "unlock"; file: ArrayBuffer; password: string }
  | { type: "protect"; file: ArrayBuffer; options: ProtectPdfOptions };

export type PdfWorkerResponse =
  | { ok: true; bytes: Uint8Array }
  | { ok: false; message: string };
