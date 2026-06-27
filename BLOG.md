# Blog (Sanity CMS)

The blog is powered by [Sanity](https://www.sanity.io). Posts are authored in a
Sanity Studio and fetched at request time by the Astro pages.

## 1. Create a Sanity project

1. Sign up at https://www.sanity.io and create a new project.
2. Note the **Project ID** and **Dataset** (default: `production`).
3. If your dataset is private, generate a **read token** in
   *Manage → API → Tokens*.

## 2. Configure environment

Copy `.env.example` to `.dev.vars` (used by `astro dev` / Wrangler locally):

```bash
cp .env.example .dev.vars
```

Then fill in:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-10-01
SANITY_API_TOKEN=optional_read_token
```

For production on Cloudflare, add the same variables as secrets in your
Cloudflare Pages/Workers project dashboard (or via `wrangler secret put`).

## 3. Set up the Sanity Studio

The schema for the `post` document lives in [`sanity/schemas/post.ts`](./sanity/schemas/post.ts).

Either:

- **Use an existing studio** — drop `sanity/schemas/post.ts` into your studio's
  `schemas/` folder and register it in `sanity.config.ts`.
- **Create a new studio** — run `npm create sanity@latest` in a sibling folder
  (e.g. `../blog-studio`), copy the schema file in, and run `sanity deploy`.

Required fields: `title`, `slug`, `publishedAt`. Recommended: `excerpt`,
`bodyMarkdown` (Markdown), `coverImage`, `tags`.

## 4. What gets rendered

- `/blog` — list of posts (newest first) as cards.
- `/blog/[slug]` — full post page rendered from `bodyMarkdown` via
  `react-markdown` + `remark-gfm` + `rehype-pretty-code` (same pipeline as the
  rest of the site).
- The home page shows the latest 3 posts as cards in the **From the Blog**
  section (sits right after Projects).

If `SANITY_PROJECT_ID` is not set, the blog pages render an empty state with a
"Connect Sanity" prompt instead of crashing — handy for first deploy.
