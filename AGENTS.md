## Learned User Preferences

- Use `pnpm` as the package manager (e.g. `pnpm dev`). This is a single-package repo with NO `pnpm-workspace.yaml` (a malformed one previously broke Cloudflare's `pnpm install --frozen-lockfile` with "packages field missing or empty"). Do not commit `package-lock.json`; pnpm is the only lockfile. When adding a dependency, run `pnpm add` so `pnpm-lock.yaml` stays in sync for the frozen install on Cloudflare.
- New shadcn-style React components should be dropped into `src/components/ui/` so the `@/lib/utils` `cn` import resolves.
- Use `lucide-react` for icons when a component needs SVG/logo glyphs.
- Async UI sections should include a loading skeleton and an empty/error state, not just a flash of the empty state.
- Floating-nav / social buttons should have brand-accurate hover colors that work in both light and dark mode (GitHub=black, LinkedIn=#0a66c2, Blog=neon red #ff2d55), implemented via CSS variables + `group-hover:` arbitrary Tailwind classes with `dark:` variants.

## Learned Workspace Facts

- This is an Astro portfolio (`starfolio-1`) using the Cloudflare adapter (`wrangler.jsonc`); TypeScript + Tailwind + shadcn-style structure.
- Dev env vars: Cloudflare adapter reads `.dev.vars`, Astro/Vite also reads `.env`. `.dev.vars*` is gitignored. Sanity creds go there.
- Sanity CMS is wired for the blog: client in `src/lib/sanity.ts` (`@sanity/client` + `@sanity/image-url`), schema reference in `sanity/schemas/post.ts`. The `sanity/schemas/` directory is excluded from `tsconfig.json` so it doesn't break `astro check`.
- Blog surface: `src/pages/api/posts.json.ts` (Astro endpoint), `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro` (SSR), `src/components/blog-card.tsx`, `src/components/section/blog-section.tsx`, `src/components/blog-post-body.tsx` (react-markdown + remark-gfm).
- Projects are CMS-driven via Sanity (the old `DATA.projects` array was removed from `src/data/resume.tsx`, now just a comment pointing to Sanity): schema `sanity/schemas/project.ts`, seed `sanity/seed/projects.ndjson`, queries in `src/lib/sanity.ts`. Surfaces: API `src/pages/api/projects.json.ts`, list `src/pages/projects/index.astro`, detail page `src/pages/projects/[slug].astro`, homepage island `src/components/section/projects-section.tsx`, card `src/components/project-card.tsx` (cards include a GitHub repo link button).
- HomePage section order is controlled by the `order` field on each entry in `src/data/resume.tsx`; current order is Hero → githubActivity → about → work → education → skills → projects → blog → contact (photos & hackathons disabled).
- `astro check` reports ~22 pre-existing errors in `src/components/section/hackathons-section.tsx`, `src/components/section/photos-section.tsx`, and `HomePage.tsx:88` (education `start` field), caused by `as const` empty arrays in `resume.tsx`. Do not attribute these to new changes.
- The sandboxed shell cannot run the Cloudflare dev plugin (`uv_interface_addresses` error); prefer `astro check` / build verification over `pnpm dev` when validating in-sandbox.
