import { formatCurrency, formatDate, formatNumber } from "@/i18n/format";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type Color,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

export interface InvoiceItemInput {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceInput {
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  number: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  taxRate: number;
  notes: string;
  items: InvoiceItemInput[];
}

export interface InvoiceTotals {
  subtotal: number;
  tax: number;
  total: number;
}

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 46;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const colors = {
  ink: rgb(0.1, 0.11, 0.14),
  muted: rgb(0.42, 0.45, 0.5),
  accent: rgb(0.13, 0.32, 0.56),
  line: rgb(0.82, 0.84, 0.88),
  header: rgb(0.95, 0.96, 0.98),
};

const columns = {
  description: { x: MARGIN + 8, width: 244 },
  quantity: { x: MARGIN + 258, width: 46 },
  rate: { x: MARGIN + 316, width: 80 },
  amount: { x: MARGIN + 406, width: 87 },
};

const supportedCurrencies = new Set(["USD", "EUR", "GBP", "CAD", "AUD", "INR", "PKR"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function isValidDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function assertValidInvoice(input: InvoiceInput): void {
  const required = [
    input.yourName,
    input.clientName,
    input.number,
    input.invoiceDate,
    input.dueDate,
  ];

  if (required.some((value) => !value.trim())) {
    throw new Error("Missing required invoice details.");
  }

  if (!isValidDate(input.invoiceDate) || !isValidDate(input.dueDate)) {
    throw new Error("Invoice dates must be valid.");
  }

  if (input.dueDate < input.invoiceDate) {
    throw new Error("The due date cannot be before the invoice date.");
  }

  if (!supportedCurrencies.has(input.currency)) {
    throw new Error("Unsupported currency.");
  }

  if (
    !Number.isFinite(input.taxRate) ||
    input.taxRate < 0 ||
    input.taxRate > 100
  ) {
    throw new Error("The tax rate must be between 0 and 100.");
  }

  if (input.yourEmail.trim() && !emailPattern.test(input.yourEmail.trim())) {
    throw new Error("Your email address is invalid.");
  }

  if (input.clientEmail.trim() && !emailPattern.test(input.clientEmail.trim())) {
    throw new Error("The client email address is invalid.");
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new Error("Add at least one line item.");
  }

  for (const item of input.items) {
    if (
      !item.description.trim() ||
      !Number.isFinite(item.quantity) ||
      item.quantity <= 0 ||
      !Number.isFinite(item.rate) ||
      item.rate < 0
    ) {
      throw new Error("Each line item needs a description, quantity and rate.");
    }
  }
}

export function calculateInvoiceTotals(input: InvoiceInput): InvoiceTotals {
  const subtotal = input.items.reduce(
    (sum, item) => sum + roundMoney(item.quantity * item.rate),
    0,
  );
  const tax = roundMoney((subtotal * input.taxRate) / 100);

  return {
    subtotal: roundMoney(subtotal),
    tax,
    total: roundMoney(subtotal + tax),
  };
}

function toPdfText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201e\u201f]/g, '"')
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/\u20ac/g, "EUR ")
    .replace(/\u20b9/g, "INR ")
    .replace(/[^\x20-\x7e\xa1-\xff]/g, "?");
}

function splitLongWord(
  word: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const parts: string[] = [];
  let part = "";

  for (const character of Array.from(word)) {
    const next = part + character;
    if (font.widthOfTextAtSize(next, size) <= maxWidth || part.length === 0) {
      part = next;
    } else {
      parts.push(part);
      part = character;
    }
  }

  if (part) parts.push(part);
  return parts;
}

function wrapText(
  value: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const lines: string[] = [];

  for (const paragraph of toPdfText(value).split("\n")) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }

    let current = "";
    for (const word of words) {
      const chunks =
        font.widthOfTextAtSize(word, size) > maxWidth
          ? splitLongWord(word, font, size, maxWidth)
          : [word];

      for (const chunk of chunks) {
        const candidate = current ? `${current} ${chunk}` : chunk;
        if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !current) {
          current = candidate;
        } else {
          lines.push(current);
          current = chunk;
        }
      }
    }

    if (current) lines.push(current);
  }

  return lines;
}

function drawLeft(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color: Color = colors.ink,
): void {
  page.drawText(toPdfText(text), { x, y, font, size, color });
}

function drawRight(
  page: PDFPage,
  text: string,
  rightX: number,
  y: number,
  font: PDFFont,
  size: number,
  color: Color = colors.ink,
): void {
  const value = toPdfText(text);
  page.drawText(value, {
    x: rightX - font.widthOfTextAtSize(value, size),
    y,
    font,
    size,
    color,
  });
}

function money(value: number, currency: string, locale: string): string {
  return formatCurrency(value, currency, locale);
}

function formattedDate(value: string, locale: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  return formatDate(date, locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function partyLines(
  name: string,
  email: string,
  address: string,
  font: PDFFont,
  width: number,
): string[] {
  const lines = wrapText(name, font, 9, width);
  const trimmedEmail = email.trim();
  if (trimmedEmail) lines.push(toPdfText(trimmedEmail));
  lines.push(...wrapText(address, font, 9, width));
  return lines.filter((line) => line.length > 0);
}

export async function createInvoicePdf(
  input: InvoiceInput,
  locale = "en-US",
): Promise<Uint8Array> {
  assertValidInvoice(input);

  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const totals = calculateInvoiceTotals(input);

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  function drawTableHeader(): void {
    page.drawRectangle({
      x: MARGIN,
      y: y - 8,
      width: CONTENT_WIDTH,
      height: 20,
      color: colors.header,
    });
    drawLeft(page, "DESCRIPTION", columns.description.x, y - 2, bold, 8, colors.muted);
    drawRight(page, "QTY", columns.quantity.x + columns.quantity.width, y - 2, bold, 8, colors.muted);
    drawRight(page, "RATE", columns.rate.x + columns.rate.width, y - 2, bold, 8, colors.muted);
    drawRight(page, "AMOUNT", columns.amount.x + columns.amount.width, y - 2, bold, 8, colors.muted);
    y -= 28;
  }

  function addPage(continued: boolean): void {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
    drawLeft(
      page,
      continued ? "INVOICE (continued)" : "INVOICE",
      MARGIN,
      y,
      bold,
      18,
      colors.accent,
    );
    y -= 18;
    drawLeft(page, `No. ${input.number}`, MARGIN, y, regular, 9, colors.muted);
    y -= 24;
    if (continued) drawTableHeader();
  }

  function ensureSpace(height: number, continued: boolean): void {
    if (y - height < MARGIN + 24) addPage(continued);
  }

  drawLeft(page, "INVOICE", MARGIN, y, bold, 28, colors.accent);
  y -= 22;
  drawLeft(page, input.number, MARGIN, y, bold, 11);
  drawRight(
    page,
    `Date: ${formattedDate(input.invoiceDate, locale)}`,
    PAGE_WIDTH - MARGIN,
    y,
    regular,
    9,
    colors.muted,
  );
  y -= 15;
  drawRight(
    page,
    `Due: ${formattedDate(input.dueDate, locale)}`,
    PAGE_WIDTH - MARGIN,
    y,
    regular,
    9,
    colors.muted,
  );
  y -= 30;

  const partyTop = y;
  const partyWidth = CONTENT_WIDTH / 2 - 12;
  const fromLines = partyLines(input.yourName, input.yourEmail, input.yourAddress, regular, partyWidth);
  const toLines = partyLines(input.clientName, input.clientEmail, input.clientAddress, regular, partyWidth);

  drawLeft(page, "FROM", MARGIN, partyTop, bold, 8, colors.muted);
  drawLeft(page, "BILL TO", MARGIN + CONTENT_WIDTH / 2, partyTop, bold, 8, colors.muted);

  fromLines.forEach((line, index) => {
    drawLeft(page, line, MARGIN, partyTop - 14 - index * 12, regular, 9);
  });
  toLines.forEach((line, index) => {
    drawLeft(
      page,
      line,
      MARGIN + CONTENT_WIDTH / 2,
      partyTop - 14 - index * 12,
      regular,
      9,
    );
  });

  y = partyTop - 14 - Math.max(fromLines.length, toLines.length) * 12 - 14;
  ensureSpace(40, false);
  drawTableHeader();

  for (const item of input.items) {
    const descriptionLines = wrapText(item.description, regular, 9, columns.description.width);
    const lineCount = Math.max(1, descriptionLines.length);
    const rowHeight = (lineCount - 1) * 12 + 20;

    ensureSpace(rowHeight + 30, true);

    const baseline = y;
    descriptionLines.forEach((line, index) => {
      drawLeft(page, line, columns.description.x, baseline - index * 12, regular, 9);
    });

    drawRight(
      page,
      formatNumber(item.quantity, locale, { maximumFractionDigits: 2 }),
      columns.quantity.x + columns.quantity.width,
      baseline,
      regular,
      9,
    );
    drawRight(
      page,
      money(item.rate, input.currency, locale),
      columns.rate.x + columns.rate.width,
      baseline,
      regular,
      9,
    );
    drawRight(
      page,
      money(roundMoney(item.quantity * item.rate), input.currency, locale),
      columns.amount.x + columns.amount.width,
      baseline,
      bold,
      9,
    );

    const separatorY = baseline - (lineCount - 1) * 12 - 10;
    page.drawLine({
      start: { x: MARGIN, y: separatorY },
      end: { x: PAGE_WIDTH - MARGIN, y: separatorY },
      thickness: 0.5,
      color: colors.line,
    });
    y = separatorY - 10;
  }

  ensureSpace(78, false);
  y -= 8;

  const taxLabel =
    input.taxRate > 0
      ? `Tax (${formatNumber(input.taxRate, locale, { maximumFractionDigits: 2 })}%)`
      : "Tax";

  drawRight(page, "Subtotal", columns.rate.x + columns.rate.width, y, regular, 9, colors.muted);
  drawRight(
    page,
    money(totals.subtotal, input.currency, locale),
    columns.amount.x + columns.amount.width,
    y,
    regular,
    9,
  );
  y -= 17;

  drawRight(page, taxLabel, columns.rate.x + columns.rate.width, y, regular, 9, colors.muted);
  drawRight(
    page,
    money(totals.tax, input.currency, locale),
    columns.amount.x + columns.amount.width,
    y,
    regular,
    9,
  );
  y -= 20;

  drawRight(page, "TOTAL", columns.rate.x + columns.rate.width, y, bold, 11, colors.accent);
  drawRight(
    page,
    money(totals.total, input.currency, locale),
    columns.amount.x + columns.amount.width,
    y,
    bold,
    12,
    colors.accent,
  );

  page.drawLine({
    start: { x: columns.rate.x, y: y - 8 },
    end: { x: PAGE_WIDTH - MARGIN, y: y - 8 },
    thickness: 1,
    color: colors.accent,
  });
  y -= 26;

  if (input.notes.trim()) {
    const noteLines = wrapText(input.notes, regular, 9, CONTENT_WIDTH);
    ensureSpace(noteLines.length * 12 + 34, false);
    drawLeft(page, "Notes", MARGIN, y, bold, 9, colors.muted);
    y -= 14;
    noteLines.forEach((line, index) => {
      drawLeft(page, line, MARGIN, y - index * 12, regular, 9);
    });
  }

  page.drawLine({
    start: { x: MARGIN, y: MARGIN - 10 },
    end: { x: PAGE_WIDTH - MARGIN, y: MARGIN - 10 },
    thickness: 0.5,
    color: colors.line,
  });
  drawLeft(page, "Created locally in your browser.", MARGIN, MARGIN - 24, regular, 8, colors.muted);

  return pdf.save();
}
