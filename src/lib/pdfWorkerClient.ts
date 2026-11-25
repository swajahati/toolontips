"use client";

import type { PdfJob } from "@/types/pdf";

const DEFAULT_WORKER_TIMEOUT_MS = 120_000;

type EncodedBytes = { __bytes: string };

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function encode(value: unknown): unknown {
  if (value instanceof Uint8Array) {
    return { __bytes: toBase64(value) } satisfies EncodedBytes;
  }
  if (value instanceof ArrayBuffer) {
    return { __bytes: toBase64(new Uint8Array(value)) } satisfies EncodedBytes;
  }
  if (Array.isArray(value)) return value.map(encode);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, encode(nested)]),
  );
}

export async function runPdfJob(
  job: PdfJob,
  timeoutMs: number = DEFAULT_WORKER_TIMEOUT_MS,
): Promise<Uint8Array> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ job: encode(job) }),
      signal: controller.signal,
    });

    const payload = (await response.json()) as {
      bytes?: string;
      message?: string;
    };

    if (!response.ok || !payload.bytes) {
      throw new Error(payload.message || "PDF processing failed");
    }

    return fromBase64(payload.bytes);
  } finally {
    window.clearTimeout(timeout);
  }
}
