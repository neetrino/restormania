import { logError } from "@/lib/logger";
import type { CareerApplication } from "./application";
import type { CvAttachment } from "./cv-file";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_REQUEST_TIMEOUT_MS = 20_000;
const DEFAULT_HR_EMAIL = "kamancharest@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export type NotifyResult = "sent" | "unavailable" | "send_failed";

function configured(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed.includes("...")) {
    return null;
  }
  return trimmed;
}

function emailAddress(value: string): string {
  const wrapped = value.match(/<([^>]+)>/);
  return wrapped?.[1]?.trim() ?? value;
}

function readMailConfig(): MailConfig | null {
  const apiKey = configured(process.env.RESEND_API_KEY);
  const from = configured(process.env.RESEND_FROM_EMAIL);
  const to = configured(process.env.HR_NOTIFY_EMAIL) ?? DEFAULT_HR_EMAIL;

  if (!apiKey || !from || !EMAIL_PATTERN.test(emailAddress(from)) || !EMAIL_PATTERN.test(to)) {
    return null;
  }

  return { apiKey, from, to };
}

function formatFromAddress(from: string): string {
  return from.includes("<") ? from : `Restormania <${from}>`;
}

function formatApplication(application: CareerApplication): string {
  return [
    "Նոր դիմում — ազատ հաստիքներ",
    "",
    `Անուն: ${application.firstName}`,
    `Ազգանուն: ${application.lastName}`,
    `Տարիք: ${application.age}`,
    `Բնակության վայր: ${application.residence}`,
    `Հաստիք: ${application.position}`,
    "CV: կցված է",
  ].join("\n");
}

/** Sends one career application to the HR inbox through Resend. */
export async function notifyHr(
  application: CareerApplication,
  cv: CvAttachment,
): Promise<NotifyResult> {
  const config = readMailConfig();
  if (!config) {
    logError("Career mail is not configured");
    return "unavailable";
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: formatFromAddress(config.from),
        to: [config.to],
        subject: `Ազատ հաստիք — ${application.firstName} ${application.lastName}`,
        text: formatApplication(application),
        attachments: [
          {
            filename: cv.filename,
            content: cv.contentBase64,
            content_type: cv.contentType,
          },
        ],
      }),
      signal: AbortSignal.timeout(EMAIL_REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      logError("Career mail was rejected", { status: response.status });
      return "send_failed";
    }

    return "sent";
  } catch {
    logError("Career mail request failed");
    return "send_failed";
  }
}
