import { isCareerErrorCode, parseCareerApplication } from "@/lib/careers/application";
import type { CareerErrorCode } from "@/lib/careers/application";
import { readCvAttachment } from "@/lib/careers/cv-file";
import {
  clientIp,
  isFormHoneypotFilled,
  isRateLimited,
  isSameOrigin,
  readCareerForm,
} from "@/lib/careers/guard";
import { notifyHr } from "@/lib/careers/notify-hr";

function jsonError(error: CareerErrorCode, status: number): Response {
  return Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function ok(): Response {
  return Response.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}

function applicationFields(form: FormData): Record<string, unknown> {
  return {
    firstName: form.get("firstName"),
    lastName: form.get("lastName"),
    age: form.get("age"),
    residence: form.get("residence"),
    position: form.get("position"),
  };
}

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return jsonError("invalid", 403);
  }

  if (isRateLimited(clientIp(request))) {
    return jsonError("rate_limited", 429);
  }

  const form = await readCareerForm(request);
  if (!form) {
    return jsonError("invalid", 400);
  }

  if (isFormHoneypotFilled(form)) {
    return ok();
  }

  const application = parseCareerApplication(applicationFields(form));
  if (!application) {
    return jsonError("invalid", 400);
  }

  const cv = await readCvAttachment(form.get("cv"));
  if (!cv) {
    return jsonError("cv_invalid", 400);
  }

  const result = await notifyHr(application, cv);
  if (isCareerErrorCode(result)) {
    const status = result === "unavailable" ? 503 : 502;
    return jsonError(result, status);
  }

  return ok();
}
