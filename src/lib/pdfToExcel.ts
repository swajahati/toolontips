import { getPdfPageCount, getPdfTextItems } from "@/lib/pdfRender";

export interface PdfToExcelOptions {
  pageNumbers: number[];
  rowTolerance: number;
  columnGap: number;
}

interface TextItem {
  text: string;
  x: number;
  y: number;
  width: number;
}

function itemsToRows(items: TextItem[], rowTolerance: number, columnGap: number): string[][] {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: TextItem[][] = [];

  for (const item of sorted) {
    const line = lines.find((candidate) => Math.abs(candidate[0].y - item.y) <= rowTolerance);
    if (line) {
      line.push(item);
    } else {
      lines.push([item]);
    }
  }

  return lines.map((line) => {
    line.sort((a, b) => a.x - b.x);
    const cells: string[] = [];
    let current = "";
    let previousEnd = -Infinity;

    for (const item of line) {
      const startsNewCell = previousEnd !== -Infinity && item.x - previousEnd > columnGap;
      if (startsNewCell) {
        cells.push(current.trim());
        current = "";
      }
      current += current ? ` ${item.text}` : item.text;
      previousEnd = Math.max(previousEnd === -Infinity ? item.x + item.width : previousEnd, item.x + item.width);
    }

    if (current.trim()) cells.push(current.trim());
    return cells;
  });
}

export async function pdfToExcel(
  file: ArrayBuffer,
  options: PdfToExcelOptions,
): Promise<Uint8Array> {
  if (options.pageNumbers.length === 0) throw new Error("NO_PAGES");
  const pageCount = await getPdfPageCount(file);
  const pages = options.pageNumbers.filter((page) => page >= 1 && page <= pageCount);
  if (pages.length === 0) throw new Error("INVALID_PAGE");
  if (pages.length > 100) throw new Error("TOO_MANY_PAGES");

  const XLSX = await import("xlsx");
  const workbook = XLSX.utils.book_new();
  let hasText = false;

  for (const pageNumber of pages) {
    const items = await getPdfTextItems(file, pageNumber);
    const rows = itemsToRows(items, options.rowTolerance, options.columnGap);
    if (rows.some((row) => row.some((cell) => cell.trim()))) hasText = true;
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, sheet, `Page ${pageNumber}`.slice(0, 31));
  }

  if (!hasText) throw new Error("NO_TEXT");
  return new Uint8Array(XLSX.write(workbook, { type: "array", bookType: "xlsx" }) as ArrayBuffer);
}
