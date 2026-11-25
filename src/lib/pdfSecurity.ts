import {
  createPdfToolkit,
  PdfPasswordError,
  type PdfToolkit,
  type Permissions,
} from "pdfstudio";

export interface ProtectPdfOptions {
  userPassword: string;
  ownerPassword?: string;
  print: NonNullable<Permissions["print"]>;
  modify: NonNullable<Permissions["modify"]>;
  extract: boolean;
}

let toolkitPromise: Promise<PdfToolkit> | undefined;

function getToolkit(): Promise<PdfToolkit> {
  if (!toolkitPromise) {
    toolkitPromise = createPdfToolkit().catch((error) => {
      toolkitPromise = undefined;
      throw error;
    });
  }
  return toolkitPromise;
}

export async function protectPdf(
  file: ArrayBuffer,
  options: ProtectPdfOptions,
): Promise<Uint8Array> {
  if (!options.userPassword.trim()) throw new Error("PASSWORD_REQUIRED");
  if (options.userPassword.length < 8) throw new Error("PASSWORD_TOO_SHORT");

  const ownerPassword = options.ownerPassword?.trim() || options.userPassword;
  const permissions: Permissions = {
    print: options.print,
    modify: options.modify,
    extract: options.extract,
  };

  const pdf = await getToolkit();
  return pdf.lock(file, {
    userPassword: options.userPassword,
    ownerPassword,
    keyLength: 256,
    permissions,
  });
}

export async function unlockPdf(file: ArrayBuffer, password: string): Promise<Uint8Array> {
  const pdf = await getToolkit();
  try {
    return await pdf.unlock(file, { password });
  } catch (error) {
    if (error instanceof PdfPasswordError) throw new Error("WRONG_PASSWORD");
    throw error;
  }
}
