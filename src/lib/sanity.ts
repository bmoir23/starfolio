import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Sanity client for fetching blog content.
 *
 * Required env vars (see `.env.example`):
 *   - SANITY_PROJECT_ID
 *   - SANITY_DATASET        (default: "production")
 *   - SANITY_API_VERSION    (default: "2024-10-01")
 *   - SANITY_API_TOKEN      (optional — only needed for private datasets)
 *
 * On Cloudflare, these are read from the local `.dev.vars` file during
 * `astro dev` / `wrangler` and from the project's secret bindings in prod.
 */
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID ?? "",
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: process.env.SANITY_API_VERSION ?? "2024-10-01",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max").width(1200);
}

export function urlForSquare(source: SanityImageSource, size = 600) {
  return builder.image(source).auto("format").fit("crop").width(size).height(size);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type BlogPostSummary = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: number;
  coverImageUrl?: string;
  tags: string[];
};

export type BlogPostFull = BlogPostSummary & {
  bodyMarkdown: string;
  author?: { name?: string; avatarUrl?: string };
};

export type ProjectSummary = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  dates: string;
  active: boolean;
  coverImageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  websiteUrl?: string;
  order?: number;
};

export type ProjectFull = ProjectSummary & {
  overview: string;
  skills: string[];
  architectureMarkdown: string;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

const SUMMARY_PROJECTION = `
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  "readingTime": readingTime,
  "coverImageUrl": coverImage.asset->url,
  "tags": tags[]
`;

const POSTS_LIST_QUERY = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc)[0...20]
  { ${SUMMARY_PROJECTION} }
`;

const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]
  {
    ${SUMMARY_PROJECTION},
    bodyMarkdown,
    "author": author-> { name, "avatarUrl": avatar.asset->url }
  }
`;

const SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
`;

function normalizeSummary(raw: any): BlogPostSummary {
  return {
    _id: raw._id,
    slug: raw.slug,
    title: raw.title ?? "Untitled",
    excerpt: raw.excerpt ?? "",
    publishedAt: raw.publishedAt ?? new Date().toISOString(),
    readingTime: typeof raw.readingTime === "number" ? raw.readingTime : undefined,
    coverImageUrl: raw.coverImageUrl ?? undefined,
    tags: Array.isArray(raw.tags) ? raw.tags.filter(Boolean) : [],
  };
}

export async function getPosts(limit = 20): Promise<BlogPostSummary[]> {
  if (!process.env.SANITY_PROJECT_ID) return [];
  const raw = await sanityClient.fetch(POSTS_LIST_QUERY, {});
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeSummary).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
  if (!process.env.SANITY_PROJECT_ID) return null;
  const raw = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!raw) return null;
  return {
    ...normalizeSummary(raw),
    bodyMarkdown: raw.bodyMarkdown ?? "",
    author: raw.author
      ? { name: raw.author.name, avatarUrl: raw.author.avatarUrl }
      : undefined,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  if (!process.env.SANITY_PROJECT_ID) return [];
  const slugs = await sanityClient.fetch(SLUGS_QUERY, {});
  return Array.isArray(slugs) ? slugs.filter(Boolean) : [];
}

export function isSanityConfigured(): boolean {
  return Boolean(process.env.SANITY_PROJECT_ID);
}

// ─── Projects ───────────────────────────────────────────────────────────────

const PROJECT_SUMMARY_PROJECTION = `
  _id,
  "slug": slug.current,
  title,
  excerpt,
  dates,
  active,
  "coverImageUrl": coverImage.asset->url,
  "technologies": technologies[],
  githubUrl,
  websiteUrl,
  order
`;

const PROJECTS_LIST_QUERY = `
  *[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(order asc, publishedAt desc)[0...50]
  { ${PROJECT_SUMMARY_PROJECTION} }
`;

const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0]
  {
    ${PROJECT_SUMMARY_PROJECTION},
    overview,
    "skills": skills[],
    architectureMarkdown
  }
`;

const PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
`;

function normalizeProjectSummary(raw: any): ProjectSummary {
  return {
    _id: raw._id,
    slug: raw.slug,
    title: raw.title ?? "Untitled",
    excerpt: raw.excerpt ?? "",
    dates: raw.dates ?? "",
    active: Boolean(raw.active),
    coverImageUrl: raw.coverImageUrl ?? undefined,
    technologies: Array.isArray(raw.technologies) ? raw.technologies.filter(Boolean) : [],
    githubUrl: raw.githubUrl ?? undefined,
    websiteUrl: raw.websiteUrl ?? undefined,
    order: typeof raw.order === "number" ? raw.order : undefined,
  };
}

export async function getProjects(limit = 50): Promise<ProjectSummary[]> {
  if (!process.env.SANITY_PROJECT_ID) return [];
  const raw = await sanityClient.fetch(PROJECTS_LIST_QUERY, {});
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeProjectSummary).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectFull | null> {
  if (!process.env.SANITY_PROJECT_ID) return null;
  const raw = await sanityClient.fetch(PROJECT_BY_SLUG_QUERY, { slug });
  if (!raw) return null;
  return {
    ...normalizeProjectSummary(raw),
    overview: raw.overview ?? "",
    skills: Array.isArray(raw.skills) ? raw.skills.filter(Boolean) : [],
    architectureMarkdown: raw.architectureMarkdown ?? "",
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (!process.env.SANITY_PROJECT_ID) return [];
  const slugs = await sanityClient.fetch(PROJECT_SLUGS_QUERY, {});
  return Array.isArray(slugs) ? slugs.filter(Boolean) : [];
}
