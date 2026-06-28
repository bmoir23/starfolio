import type { APIRoute } from "astro";
import { handleContact, validateContact } from "@/lib/contact";

export const prerender = false;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const validated = validateContact(payload);
  if (!validated.ok) {
    return json({ ok: false, error: validated.error }, 400);
  }

  let ip: string | undefined;
  try {
    ip =
      request.headers.get("cf-connecting-ip") ??
      clientAddress ??
      undefined;
  } catch {
    ip = undefined;
  }
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const result = await handleContact(locals, validated.data, { ip, userAgent });

  if (!result.ok) {
    return json(result, 503);
  }
  return json(result, 200);
};
