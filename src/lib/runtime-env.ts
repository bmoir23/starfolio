/**
 * Read environment variables / secrets across runtimes.
 *
 * On Cloudflare (production) secrets and vars live on
 * `Astro.locals.runtime.env`. During `astro dev` and in Node-ish contexts
 * they may also be on `process.env` (e.g. from `.dev.vars` / `.env`).
 * This helper checks the Cloudflare runtime first, then falls back.
 */
export function getEnv(locals: unknown, key: string): string | undefined {
  const env = (locals as { runtime?: { env?: Record<string, unknown> } })
    ?.runtime?.env;
  const fromRuntime = env?.[key];
  if (typeof fromRuntime === "string" && fromRuntime.length > 0) {
    return fromRuntime;
  }
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[key] : undefined;
  if (typeof fromProcess === "string" && fromProcess.length > 0) {
    return fromProcess;
  }
  return undefined;
}
