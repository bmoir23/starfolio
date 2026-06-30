// Keep in sync with ../../sanity/schemas/project.ts (canonical schema for the app).
import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 120, isUnique: () => true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      description: "Short summary shown on the project card.",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "overview",
      title: "Overview (Markdown)",
      type: "text",
      rows: 12,
      description:
        "Full project overview in Markdown. GFM (tables, task lists, etc.) is supported.",
    }),
    defineField({
      name: "dates",
      title: "Dates",
      type: "string",
      description: 'e.g. "2023 - Present" or "2024".',
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "technologies",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "skills",
      title: "Skills Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "architectureMarkdown",
      title: "Architecture & Design Decisions (Markdown)",
      type: "text",
      rows: 16,
      description:
        "Deep dive into the architecture and key design decisions. Markdown with GFM support.",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Controls ordering in the homepage grid (lower shows first).",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "dates", media: "coverImage" },
  },
});

export default projectSchema;
