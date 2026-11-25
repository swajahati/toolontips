export type TextEncoding = "base64" | "base64Url" | "urlComponent";
export type TextOperation = "encode" | "decode";
export type CaseStyle = "title" | "sentence" | "upper" | "lower" | "camel" | "snake" | "kebab";
export type PasswordMode = "random" | "passphrase";
export type PasswordStrength = "weak" | "fair" | "strong" | "veryStrong";

export interface WordCounts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
}

export interface PasswordOptions {
  mode: PasswordMode;
  length: number;
  wordCount: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
}

const SIMILAR_CHARS = new Set(["I", "l", "1", "O", "0", "o"]);
const LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{};:,.?/";

const PASSPHRASE_WORDS = [
  "amber",
  "anchor",
  "apple",
  "badger",
  "beacon",
  "beaver",
  "berry",
  "birch",
  "bison",
  "brave",
  "bread",
  "breeze",
  "bush",
  "cake",
  "candle",
  "canyon",
  "candy",
  "cedar",
  "cheese",
  "cherry",
  "chestnut",
  "cliff",
  "cloud",
  "comet",
  "crane",
  "cream",
  "dawn",
  "deer",
  "desert",
  "dragon",
  "dusk",
  "eagle",
  "echo",
  "egg",
  "ember",
  "fern",
  "fig",
  "fire",
  "flame",
  "forest",
  "frost",
  "gale",
  "garden",
  "glacier",
  "grape",
  "granite",
  "gravity",
  "grove",
  "hail",
  "hammer",
  "harbor",
  "haze",
  "herbs",
  "heron",
  "honey",
  "horse",
  "island",
  "ivory",
  "jasmine",
  "jasper",
  "jungle",
  "kite",
  "koala",
  "lantern",
  "maple",
  "marsh",
  "meadow",
  "meat",
  "mint",
  "moon",
  "mountain",
  "neptune",
  "nectar",
  "north",
  "nut",
  "oak",
  "oat",
  "ocean",
  "olive",
  "orbit",
  "orchid",
  "peach",
  "pear",
  "pebble",
  "pepper",
  "pine",
  "planet",
  "plum",
  "prairie",
  "proton",
  "quartz",
  "quark",
  "quiver",
  "rabbit",
  "rain",
  "raven",
  "reed",
  "rice",
  "river",
  "rocket",
  "rose",
  "rye",
  "sand",
  "seed",
  "silver",
  "sky",
  "snow",
  "soup",
  "spark",
  "sparrow",
  "spice",
  "stem",
  "storm",
  "stream",
  "sugar",
  "sun",
  "sunset",
  "tea",
  "thunder",
  "tiger",
  "tree",
  "tulip",
  "umber",
  "umbrella",
  "valley",
  "velvet",
  "vine",
  "violet",
  "walnut",
  "wave",
  "wheat",
  "window",
  "wind",
  "wolf",
  "wood",
  "wren",
  "yak",
  "yellow",
  "yacht",
  "zebra",
  "zenith",
];

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "in",
  "is",
  "nor",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function getRandomInt(max: number): number {
  if (max <= 0) throw new Error("Invalid random range");
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  let value = 0;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return value % max;
}

function pick<T>(values: readonly T[]): T {
  return values[getRandomInt(values.length)];
}

function filterChars(chars: string, excludeSimilar: boolean): string[] {
  return Array.from(chars).filter((char) => !excludeSimilar || !SIMILAR_CHARS.has(char));
}

function shuffle(values: string[]): string[] {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

function strengthFromBits(bits: number, thresholds: [number, number, number]): PasswordStrength {
  if (bits < thresholds[0]) return "weak";
  if (bits < thresholds[1]) return "fair";
  if (bits < thresholds[2]) return "strong";
  return "veryStrong";
}

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunkSize)));
  }
  return btoa(binary);
}

function normalizeBase64(value: string, urlSafe: boolean): string {
  const compact = value.replace(/\s/g, "");
  const pattern = urlSafe ? /^[A-Za-z0-9_-]*={0,2}$/ : /^[A-Za-z0-9+/]*={0,2}$/;
  if (!pattern.test(compact)) throw new Error("Invalid Base64 input");

  const body = compact.replace(/=+$/, "");
  if (compact.includes("=") && compact.length % 4 !== 0) throw new Error("Invalid Base64 padding");
  if (body.length % 4 === 1) throw new Error("Invalid Base64 length");

  const normalized = urlSafe ? body.replace(/-/g, "+").replace(/_/g, "/") : body;
  return normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
}

function base64ToBytes(value: string, urlSafe: boolean): Uint8Array {
  const binary = atob(normalizeBase64(value, urlSafe));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function formatJson(input: string, indent = 2): string {
  const parsed: unknown = JSON.parse(input);
  return JSON.stringify(parsed, null, clamp(indent, 1, 8));
}

export function minifyJson(input: string): string {
  const parsed: unknown = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function countWords(text: string): WordCounts {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = Array.from(text).length;
  const charactersNoSpaces = Array.from(text.replace(/\s/g, "")).length;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+(?:\s+|$)/).filter((part) => part.trim().length > 0).length
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter((part) => part.trim().length > 0).length
    : 0;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingMinutes: words === 0 ? 0 : Math.ceil(words / 200),
  };
}

export function convertCase(text: string, style: CaseStyle): string {
  if (style === "upper") return text.toLocaleUpperCase();
  if (style === "lower") return text.toLocaleLowerCase();

  if (style === "sentence") {
    return text
      .toLocaleLowerCase()
      .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toLocaleUpperCase());
  }

  const words = splitWords(text);
  if (words.length === 0) return "";

  if (style === "camel") {
    return words
      .map((word, index) => (index === 0 ? word.toLocaleLowerCase() : capitalize(word)))
      .join("");
  }

  if (style === "snake") return words.map((word) => word.toLocaleLowerCase()).join("_");
  if (style === "kebab") return words.map((word) => word.toLocaleLowerCase()).join("-");

  return words
    .map((word, index) => {
      const lower = word.toLocaleLowerCase();
      if (index > 0 && index < words.length - 1 && SMALL_WORDS.has(lower)) return lower;
      return capitalize(lower);
    })
    .join(" ");
}

export function convertText(input: string, operation: TextOperation, encoding: TextEncoding): string {
  try {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder("utf-8", { fatal: true });

    if (encoding === "urlComponent") {
      return operation === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    }

    if (operation === "encode") {
      const bytes = encoder.encode(input);
      const encoded = bytesToBase64(bytes);
      return encoding === "base64Url"
        ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
        : encoded;
    }

    const bytes = base64ToBytes(input, encoding === "base64Url");
    return decoder.decode(bytes);
  } catch {
    throw new Error("Could not process text");
  }
}

export function generatePassword(options: PasswordOptions): string {
  if (options.mode === "passphrase") {
    const words = options.excludeSimilar
      ? PASSPHRASE_WORDS.filter((word) => !/[ilo01]/i.test(word))
      : PASSPHRASE_WORDS;
    const count = clamp(options.wordCount, 3, 12);
    return Array.from({ length: count }, () => pick(words)).join("-");
  }

  const lower = filterChars(LOWER_CHARS, options.excludeSimilar);
  const upper = filterChars(UPPER_CHARS, options.excludeSimilar);
  const numbers = filterChars(NUMBER_CHARS, options.excludeSimilar);
  const symbols = filterChars(SYMBOL_CHARS, options.excludeSimilar);
  const sets = [options.lower ? lower : [], options.upper ? upper : [], options.numbers ? numbers : [], options.symbols ? symbols : []];
  const available = sets.flat();
  const pool = available.length > 0 ? available : filterChars(LOWER_CHARS, false);
  const length = clamp(options.length, 4, 128);
  const values = sets.filter((set) => set.length > 0).slice(0, length).map((set) => pick(set));

  while (values.length < length) values.push(pick(pool));
  return shuffle(values).join("");
}

export function estimatePasswordStrength(options: PasswordOptions): PasswordStrength {
  if (options.mode === "passphrase") {
    const words = options.excludeSimilar
      ? PASSPHRASE_WORDS.filter((word) => !/[ilo01]/i.test(word))
      : PASSPHRASE_WORDS;
    const bits = clamp(options.wordCount, 3, 12) * Math.log2(words.length);
    return strengthFromBits(bits, [32, 48, 64]);
  }

  const pool =
    (options.lower ? filterChars(LOWER_CHARS, options.excludeSimilar).length : 0) +
    (options.upper ? filterChars(UPPER_CHARS, options.excludeSimilar).length : 0) +
    (options.numbers ? filterChars(NUMBER_CHARS, options.excludeSimilar).length : 0) +
    (options.symbols ? filterChars(SYMBOL_CHARS, options.excludeSimilar).length : 0);
  const bits = clamp(options.length, 4, 128) * Math.log2(Math.max(pool, 1));
  return strengthFromBits(bits, [40, 60, 80]);
}
