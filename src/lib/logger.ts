type LogFields = Record<string, string | number | boolean | null>;

/** Structured server error log. Details stay on the server. */
export function logError(message: string, fields?: LogFields): void {
  console.error(
    JSON.stringify({
      level: "error",
      message,
      ...fields,
    }),
  );
}
