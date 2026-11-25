import * as QRCode from "qrcode";
import type { QRCodeToDataURLOptions, QRCodeToStringOptions } from "qrcode";

export type QrCodeMode = "text" | "url" | "wifi" | "vcard";
export type QrEncryption = "WPA" | "WEP" | "nopass";
export type QrErrorCorrection = "L" | "M" | "Q" | "H";

export interface QrCodeFields {
  mode: QrCodeMode;
  text: string;
  url: string;
  ssid: string;
  wifiPassword: string;
  encryption: QrEncryption;
  name: string;
  phone: string;
  email: string;
  organisation: string;
}

export interface QrCodeOptions {
  size: number;
  errorCorrection: QrErrorCorrection;
}

export interface QrCodeResult {
  payload: string;
  pngDataUrl: string;
  svg: string;
}

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function buildTextPayload(fields: QrCodeFields): string {
  const value = fields.text.trim();
  if (!value) throw new Error("invalid");
  return value;
}

function buildUrlPayload(fields: QrCodeFields): string {
  const value = fields.url.trim();
  if (!value) throw new Error("invalid");

  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    throw new Error("invalid");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("invalid");
  }
  return parsed.toString();
}

function buildWifiPayload(fields: QrCodeFields): string {
  const ssid = fields.ssid.trim();
  const password = fields.wifiPassword;
  if (!ssid || (fields.encryption !== "nopass" && !password)) {
    throw new Error("invalid");
  }

  const passwordPart =
    fields.encryption === "nopass" ? "" : `P:${escapeWifi(password)};`;
  return `WIFI:T:${fields.encryption};S:${escapeWifi(ssid)};${passwordPart};`;
}

function buildVCardPayload(fields: QrCodeFields): string {
  const name = fields.name.trim();
  const phone = fields.phone.trim();
  const email = fields.email.trim();
  const organisation = fields.organisation.trim();
  if (!name && !phone && !email && !organisation) {
    throw new Error("invalid");
  }

  const displayName = name || phone || email || organisation;
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (name) lines.push(`N:${escapeVCard(name)};;;;`);
  lines.push(`FN:${escapeVCard(displayName)}`);
  if (organisation) lines.push(`ORG:${escapeVCard(organisation)};`);
  if (phone) lines.push(`TEL;TYPE=CELL:${escapeVCard(phone)}`);
  if (email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(email)}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function buildQrPayload(fields: QrCodeFields): string {
  switch (fields.mode) {
    case "text":
      return buildTextPayload(fields);
    case "url":
      return buildUrlPayload(fields);
    case "wifi":
      return buildWifiPayload(fields);
    case "vcard":
      return buildVCardPayload(fields);
  }
}

export async function generateQrCode(
  payload: string,
  options: QrCodeOptions,
): Promise<QrCodeResult> {
  const width = Math.min(2048, Math.max(128, Math.floor(options.size)));
  const baseOptions = {
    errorCorrectionLevel: options.errorCorrection,
    margin: 4,
    width,
    color: { dark: "#000000ff", light: "#ffffffff" },
  };
  const pngOptions: QRCodeToDataURLOptions = { ...baseOptions, type: "image/png" };
  const svgOptions: QRCodeToStringOptions = { ...baseOptions, type: "svg" };

  const [pngDataUrl, svg] = await Promise.all([
    QRCode.toDataURL(payload, pngOptions),
    QRCode.toString(payload, svgOptions),
  ]);

  return { payload, pngDataUrl, svg };
}

export function dataUrlBytes(dataUrl: string): Uint8Array {
  const encoded = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
