## Learned User Preferences

- Use `pnpm` as the package manager (e.g. `pnpm dev`); a `pnpm-workspace.yaml` is present.
- New shadcn-style React components should be dropped into `src/components/ui/` so the `@/lib/utils` `cn` import resolves.
- Use `lucide-react` for icons when a component needs SVG/logo glyphs.
- Async UI sections should include a loading skeleton and an empty/error state, not just a flash of the empty state.
- Floating-nav / social buttons should have brand-accurate hover colors that work in both light and dark mode (GitHub=black, LinkedIn=#0a66c2, Blog=neon red #ff2d55), implemented via CSS variables + `group-hover:` arbitrary Tailwind classes with `dark:` variants.

## Learned Workspace Facts

- This is an Astro portfolio (`starfolio-1`) using the Cloudflare adapter (`wrangler.jsonc`); TypeScript + Tailwind + shadcn-style structure.
- Dev env vars: Cloudflare adapter reads `.dev.vars`, Astro/Vite also reads `.env`. `.dev.vars*` is gitignored. Sanity creds go there.
- Sanity CMS is wired for the blog: client in `src/lib/sanity.ts` (`@sanity/client` + `@sanity/image-url`), schema reference in `sanity/schemas/post.ts`. The `sanity/schemas/` directory is excluded from `tsconfig.json` so it doesn't break `astro check`.
- Blog surface: `src/pages/api/posts.json.ts` (Astro endpoint), `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro` (SSR), `src/components/blog-card.tsx`, `src/components/section/blog-section.tsx`, `src/components/blog-post-body.tsx` (react-markdown + remark-gfm).
- HomePage section order is controlled by the `order` field on each entry in `src/data/resume.tsx`; current order is Hero → githubActivity → about → work → education → skills → projects → blog → contact (photos & hackathons disabled).
- `astro check` reports ~22 pre-existing errors in `src/components/section/hackathons-section.tsx`, `src/components/section/photos-section.tsx`, and `HomePage.tsx:88` (education `start` field), caused by `as const` empty arrays in `resume.tsx`. Do not attribute these to new changes.
- The sandboxed shell CAN run `pnpm dev` (homepage renders cleanly at `http://localhost:4321/`); the real blocker is the Cloudflare `AI` binding forcing remote mode — see the Cursor Cloud section below for the exact run caveats.

## Cursor Cloud specific instructions

- Single product: an Astro v6 SSR portfolio on the `@astrojs/cloudflare` adapter. Dependencies install with `pnpm install`; standard scripts live in `package.json` (`pnpm dev`, `pnpm build`, `pnpm astro check`). The core app is the SSR homepage (`/`), driven by `src/data/resume.tsx` + `src/data/config.ts`.
- Cloudflare remote-bindings caveat (non-obvious): `wrangler.jsonc` declares an `AI` binding. AI bindings always run remotely, so `@cloudflare/vite-plugin` tries to start a remote proxy session and `pnpm dev` / `pnpm build` / `pnpm astro check` fail with "You must be logged in to use wrangler dev in remote mode" unless you either: (a) set `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (the binding is unused at runtime; this only authenticates the proxy), or (b) disable remote bindings for local dev via `cloudflare({ remoteBindings: false })` in `astro.config.mjs`. Do NOT commit option (b) — it is a deploy-config change.
- `pnpm dev` and `pnpm astro check` work with `remoteBindings:false` alone. `pnpm build` compiles all entrypoints but its final workerd prerender runs in a *preview* miniflare that re-enables remote bindings, so a full `pnpm build` still needs Cloudflare creds even with `remoteBindings:false`.
- `pnpm astro check` reports 22 pre-existing type errors (`hackathons-section.tsx`, `photos-section.tsx`, `HomePage.tsx`) from empty `as const` arrays in `resume.tsx`; unrelated to your changes.
- Blog/Sanity caveat: `/blog` and `/api/posts.json` import `src/lib/sanity.ts`, which calls `createClient` at module load and throws "Configuration must contain `projectId`" when `SANITY_PROJECT_ID` is unset — 500ing those routes and broadcasting a vite error overlay onto the homepage. To run the blog locally, put `SANITY_PROJECT_ID` (+ `SANITY_DATASET`) in `.dev.vars` (gitignored) AND add `nodejs_compat` to `compatibility_flags` in `wrangler.jsonc` so `process.env` is populated inside workerd (the code reads `process.env`, not `Astro.locals.runtime.env`). A placeholder project id is enough to stop the crash; the endpoint then degrades gracefully ("Couldn't load posts").
