const NAME_MAX = 60;
const TEXT_MAX = 120;
const MIN_AGE = 16;
const MAX_AGE = 70;

const NAME_PATTERN = /^[\p{L}][\p{L}\s'.’-]{0,59}$/u;
const TEXT_PATTERN = /^[\p{L}\p{N}\s'’.,\-()/#&+]{1,120}$/u;

export const CAREER_ERROR_CODES = [
  "invalid",
  "cv_invalid",
  "rate_limited",
  "unavailable",
  "send_failed",
] as const;

export type CareerErrorCode = (typeof CAREER_ERROR_CODES)[number];

export type CareerApplication = {
  firstName: string;
  lastName: string;
  age: number;
  residence: string;
  position: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalize(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length > 0 ? trimmed : null;
}

function parseName(value: unknown): string | null {
  const name = normalize(value);
  if (!name || name.length > NAME_MAX || !NAME_PATTERN.test(name)) {
    return null;
  }
  return name;
}

function parseText(value: unknown): string | null {
  const text = normalize(value);
  if (!text || text.length > TEXT_MAX || !TEXT_PATTERN.test(text)) {
    return null;
  }
  return text;
}

function parseAge(value: unknown): number | null {
  const age = typeof value === "number" ? value : Number(normalize(value));
  if (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE) {
    return null;
  }
  return age;
}

/** Parses a career application from untrusted JSON or form state. */
export function parseCareerApplication(input: unknown): CareerApplication | null {
  if (!isRecord(input)) {
    return null;
  }

  const firstName = parseName(input.firstName);
  const lastName = parseName(input.lastName);
  const age = parseAge(input.age);
  const residence = parseText(input.residence);
  const position = parseText(input.position);

  if (!firstName || !lastName || age === null || !residence || !position) {
    return null;
  }

  return { firstName, lastName, age, residence, position };
}

export function isCareerErrorCode(value: unknown): value is CareerErrorCode {
  return (
    typeof value === "string" &&
    (CAREER_ERROR_CODES as readonly string[]).includes(value)
  );
}
