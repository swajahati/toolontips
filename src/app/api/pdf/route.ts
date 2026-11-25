import { runPdfJobServer } from "@/lib/pdfServer";
import type { PdfJob } from "@/types/pdf";

// Use Next.js's default Node.js runtime with cache components enabled.
function revive(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(revive);
  if (!value || typeof value !== "object") return value;

  const record = value as Record<string, unknown>;
  if (record.__bytes && typeof record.__bytes === "string") {
    return Uint8Array.from(Buffer.from(record.__bytes, "base64"));
  }

  return Object.fromEntries(
    Object.entries(record).map(([key, nested]) => [key, revive(nested)]),
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { job?: unknown };
    const job = revive(payload.job) as PdfJob;
    const bytes = await runPdfJobServer(job);

    return Response.json({
      bytes: Buffer.from(bytes).toString("base64"),
    });
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "PDF processing failed",
      },
      { status: 400 },
    );
  }
}
