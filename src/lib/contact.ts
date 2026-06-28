import { neon } from "@neondatabase/serverless";
import { getEnv } from "@/lib/runtime-env";

/**
 * Contact submission handling.
 *
 * Flow (all steps are optional and controlled by env vars):
 *   1. Insert the message directly into a Neon Postgres database
 *      (`NEON_DATABASE_URL` or `DATABASE_URL`).
 *   2. Forward the payload to an n8n webhook (`N8N_CONTACT_WEBHOOK_URL`)
 *      so n8n can sync to Notion and route an email via a Worker.
 *
 * See CONTACT.md for the table schema and wiring instructions.
 */

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type ContactResult = {
  ok: boolean;
  stored: boolean;
  forwarded: boolean;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const body = input as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject =
    typeof body.subject === "string" ? body.subject.trim() : undefined;
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 1 || name.length > 200) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length < 1 || message.length > 5000) {
    return { ok: false, error: "Please enter a message (up to 5000 chars)." };
  }
  if (subject && subject.length > 300) {
    return { ok: false, error: "Subject is too long." };
  }

  return { ok: true, data: { name, email, subject, message } };
}

type Locals = unknown;

async function storeInNeon(
  locals: Locals,
  data: ContactPayload,
  meta: { ip?: string; userAgent?: string },
): Promise<boolean> {
  const connectionString =
    getEnv(locals, "NEON_DATABASE_URL") ?? getEnv(locals, "DATABASE_URL");
  if (!connectionString) return false;

  const sql = neon(connectionString);
  await sql`
    INSERT INTO contact_messages (name, email, subject, message, source, ip, user_agent)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.subject ?? null},
      ${data.message},
      ${"portfolio"},
      ${meta.ip ?? null},
      ${meta.userAgent ?? null}
    )
  `;
  return true;
}

async function forwardToN8n(
  locals: Locals,
  data: ContactPayload,
  meta: { ip?: string; userAgent?: string },
): Promise<boolean> {
  const webhookUrl = getEnv(locals, "N8N_CONTACT_WEBHOOK_URL");
  if (!webhookUrl) return false;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      source: "portfolio",
      submittedAt: new Date().toISOString(),
      ...meta,
    }),
  });
  if (!res.ok) {
    throw new Error(`n8n webhook responded ${res.status}`);
  }
  return true;
}

export async function handleContact(
  locals: Locals,
  data: ContactPayload,
  meta: { ip?: string; userAgent?: string },
): Promise<ContactResult> {
  let stored = false;
  let forwarded = false;
  const errors: string[] = [];

  try {
    stored = await storeInNeon(locals, data, meta);
  } catch (e) {
    errors.push(`Neon: ${e instanceof Error ? e.message : "insert failed"}`);
  }

  try {
    forwarded = await forwardToN8n(locals, data, meta);
  } catch (e) {
    errors.push(`n8n: ${e instanceof Error ? e.message : "forward failed"}`);
  }

  // Success if at least one sink accepted the message.
  if (stored || forwarded) {
    return { ok: true, stored, forwarded };
  }

  // Nothing configured at all.
  if (errors.length === 0) {
    return {
      ok: false,
      stored,
      forwarded,
      error:
        "No contact backend is configured yet. Set NEON_DATABASE_URL or N8N_CONTACT_WEBHOOK_URL.",
    };
  }

  return { ok: false, stored, forwarded, error: errors.join("; ") };
}

export function isContactConfigured(locals: Locals): boolean {
  return Boolean(
    getEnv(locals, "NEON_DATABASE_URL") ??
      getEnv(locals, "DATABASE_URL") ??
      getEnv(locals, "N8N_CONTACT_WEBHOOK_URL"),
  );
}
