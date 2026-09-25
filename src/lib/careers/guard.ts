const MAX_REQUEST_BYTES = 4 * 1024 * 1024 + 64 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_CLIENTS = 500;

const hits = new Map<string, number[]>();

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) {
    return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Allows 5 submissions per 10 minutes for one client address. */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);

  if (hits.size > MAX_TRACKED_CLIENTS) {
    hits.clear();
  }

  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function isFormHoneypotFilled(form: FormData): boolean {
  const website = form.get("website");
  if (website instanceof File) {
    return website.size > 0;
  }
  return typeof website === "string" && website.trim().length > 0;
}

export async function readCareerForm(request: Request): Promise<FormData | null> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return null;
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return null;
  }

  try {
    return await request.formData();
  } catch {
    return null;
  }
}
