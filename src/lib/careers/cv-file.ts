import { CV_MAX_BYTES } from "./cv-limits";

const PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46];
const DOC_SIGNATURE = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
const ZIP_SIGNATURES = [
  [0x50, 0x4b, 0x03, 0x04],
  [0x50, 0x4b, 0x05, 0x06],
  [0x50, 0x4b, 0x07, 0x08],
];

const CONTENT_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

type CvKind = keyof typeof CONTENT_TYPES;

export type CvAttachment = {
  filename: string;
  contentType: string;
  contentBase64: string;
};

function startsWith(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((byte, index) => bytes[index] === byte);
}

function hasPdfHeader(bytes: Uint8Array): boolean {
  const limit = Math.min(bytes.length, 1024);
  for (let index = 0; index <= limit - PDF_SIGNATURE.length; index += 1) {
    if (PDF_SIGNATURE.every((byte, offset) => bytes[index + offset] === byte)) {
      return true;
    }
  }
  return false;
}

function includesSequence(bytes: Uint8Array, needle: Uint8Array): boolean {
  if (needle.length === 0 || needle.length > bytes.length) {
    return false;
  }

  for (let index = 0; index <= bytes.length - needle.length; index += 1) {
    const matches = needle.every((byte, offset) => bytes[index + offset] === byte);
    if (matches) {
      return true;
    }
  }
  return false;
}

function includesAscii(bytes: Uint8Array, value: string): boolean {
  return includesSequence(bytes, new TextEncoder().encode(value));
}

function includesUtf16Le(bytes: Uint8Array, value: string): boolean {
  const needle = new Uint8Array(value.length * 2);
  for (let index = 0; index < value.length; index += 1) {
    needle[index * 2] = value.charCodeAt(index);
  }
  return includesSequence(bytes, needle);
}

function detectKind(bytes: Uint8Array): CvKind | null {
  if (hasPdfHeader(bytes)) {
    return "pdf";
  }
  if (startsWith(bytes, DOC_SIGNATURE)) {
    return includesUtf16Le(bytes, "WordDocument") ? "doc" : null;
  }
  if (ZIP_SIGNATURES.some((signature) => startsWith(bytes, signature))) {
    return includesAscii(bytes, "word/document.xml") ? "docx" : null;
  }
  return null;
}

/** Accepts a PDF or Word CV after checking size and file signature. */
export async function readCvAttachment(value: unknown): Promise<CvAttachment | null> {
  if (!(value instanceof File) || value.size === 0 || value.size > CV_MAX_BYTES) {
    return null;
  }

  const bytes = new Uint8Array(await value.arrayBuffer());
  const kind = detectKind(bytes);
  if (!kind) {
    return null;
  }

  return {
    filename: `CV.${kind}`,
    contentType: CONTENT_TYPES[kind],
    contentBase64: Buffer.from(bytes).toString("base64"),
  };
}
