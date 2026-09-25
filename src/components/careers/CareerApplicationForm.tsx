"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  isCareerErrorCode,
  parseCareerApplication,
  type CareerErrorCode,
} from "@/lib/careers/application";
import { isAcceptableCvSelection } from "@/lib/careers/cv-limits";
import { useTranslation } from "@/i18n/LocaleProvider";
import type { Messages } from "@/i18n/messages";
import styles from "./OpenPositions.module.css";

type FieldName = "firstName" | "lastName" | "age" | "residence" | "position";

type Fields = Record<FieldName, string> & { website: string };

const EMPTY_FIELDS: Fields = {
  firstName: "",
  lastName: "",
  age: "",
  residence: "",
  position: "",
  website: "",
};

const NAME_FIELDS: { name: FieldName; autoComplete: string }[] = [
  { name: "firstName", autoComplete: "given-name" },
  { name: "lastName", autoComplete: "family-name" },
];

const DETAIL_FIELDS: { name: FieldName; autoComplete: string }[] = [
  { name: "residence", autoComplete: "address-level2" },
  { name: "position", autoComplete: "organization-title" },
];

const CV_ACCEPT = [
  ".pdf",
  ".doc",
  ".docx",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

type CareerApplicationFormProps = {
  onSuccess: () => void;
};

function errorMessage(code: CareerErrorCode, copy: Messages["careers"]): string {
  if (code === "invalid") {
    return copy.invalid;
  }
  if (code === "cv_invalid") {
    return copy.cvInvalid;
  }
  if (code === "rate_limited") {
    return copy.rateLimited;
  }
  return copy.sendFailed;
}

async function readErrorCode(response: Response): Promise<CareerErrorCode> {
  const payload: unknown = await response.json().catch(() => null);
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    isCareerErrorCode(payload.error)
  ) {
    return payload.error;
  }
  return "send_failed";
}

async function submitApplication(
  fields: Fields,
  cv: File | null,
): Promise<CareerErrorCode | "ok"> {
  const application = parseCareerApplication(fields);
  if (!application) {
    return "invalid";
  }
  if (!cv || !isAcceptableCvSelection(cv)) {
    return "cv_invalid";
  }

  const body = new FormData();
  body.set("firstName", application.firstName);
  body.set("lastName", application.lastName);
  body.set("age", String(application.age));
  body.set("residence", application.residence);
  body.set("position", application.position);
  body.set("website", fields.website);
  body.set("cv", cv);

  const response = await fetch("/api/careers", { method: "POST", body });
  if (response.ok) {
    return "ok";
  }
  return readErrorCode(response);
}

function CvPicker({
  fileName,
  onPick,
}: {
  fileName: string | null;
  onPick: (file: File | null, accepted: boolean) => void;
}) {
  const { t } = useTranslation();

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const next = event.target.files?.[0] ?? null;
    if (next && !isAcceptableCvSelection(next)) {
      event.target.value = "";
      onPick(null, false);
      return;
    }
    onPick(next, true);
  }

  return (
    <div className={styles.field}>
      <span>{t.careers.cv}</span>
      <label className={styles.cvButton}>
        <span className={fileName ? styles.cvValue : styles.cvPlaceholder}>
          {fileName ?? t.careers.cvHint}
        </span>
        <input
          className={styles.cvInput}
          type="file"
          name="cv"
          accept={CV_ACCEPT}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

function CareerField({
  name,
  label,
  value,
  autoComplete,
  onValueChange,
}: {
  name: FieldName;
  label: string;
  value: string;
  autoComplete: string;
  onValueChange: (value: string) => void;
}) {
  const isAge = name === "age";

  return (
    <label className={styles.field} htmlFor={`career-${name}`}>
      <span>{label}</span>
      <input
        id={`career-${name}`}
        name={name}
        type={isAge ? "number" : "text"}
        inputMode={isAge ? "numeric" : "text"}
        autoComplete={autoComplete}
        required
        min={isAge ? 16 : undefined}
        max={isAge ? 70 : undefined}
        maxLength={isAge ? 3 : 120}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </label>
  );
}

export function CareerApplicationForm({ onSuccess }: CareerApplicationFormProps) {
  const { t } = useTranslation();
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [cv, setCv] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<CareerErrorCode | null>(null);

  function onPickCv(file: File | null, accepted: boolean): void {
    setCv(file);
    setError(accepted ? null : "cv_invalid");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSending(true);
    setError(null);

    try {
      const result = await submitApplication(fields, cv);
      if (result === "ok") {
        onSuccess();
        return;
      }
      setError(result);
    } catch {
      setError("send_failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={fields.website}
            onChange={(event) =>
              setFields((current) => ({ ...current, website: event.target.value }))
            }
          />
        </label>
      </div>
      <div className={styles.pair}>
        {NAME_FIELDS.map((field) => (
          <CareerField
            key={field.name}
            name={field.name}
            label={t.careers[field.name]}
            value={fields[field.name]}
            autoComplete={field.autoComplete}
            onValueChange={(value) =>
              setFields((current) => ({ ...current, [field.name]: value }))
            }
          />
        ))}
      </div>
      <div className={styles.pair}>
        <CareerField
          name="age"
          label={t.careers.age}
          value={fields.age}
          autoComplete="off"
          onValueChange={(value) =>
            setFields((current) => ({ ...current, age: value }))
          }
        />
        <CvPicker fileName={cv?.name ?? null} onPick={onPickCv} />
      </div>
      <div className={styles.detailPair}>
        {DETAIL_FIELDS.map((field) => (
        <CareerField
          key={field.name}
          name={field.name}
          label={t.careers[field.name]}
          value={fields[field.name]}
          autoComplete={field.autoComplete}
          onValueChange={(value) =>
            setFields((current) => ({ ...current, [field.name]: value }))
          }
          />
        ))}
      </div>
      {error ? (
        <p className={styles.error} role="alert">
          {errorMessage(error, t.careers)}
        </p>
      ) : null}
      <button className={styles.submit} type="submit" disabled={sending}>
        {sending ? t.careers.sending : t.careers.submit}
      </button>
    </form>
  );
}
