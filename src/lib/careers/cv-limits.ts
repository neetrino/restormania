/** Stays under the 4.5 MB platform request limit, including the form fields. */
export const CV_MAX_BYTES = 4 * 1024 * 1024;

const CV_NAME_PATTERN = /\.(pdf|doc|docx)$/i;

/** Client-side check before upload. The server still checks the file bytes. */
export function isAcceptableCvSelection(file: File): boolean {
  return file.size > 0 && file.size <= CV_MAX_BYTES && CV_NAME_PATTERN.test(file.name);
}
