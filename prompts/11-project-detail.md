# Task: Project detail page (`/projects/[slug]`)

Read CLAUDE.md first. Tasks 01 to 10 must be done.

There is no source component for this task. Keep it calm and readable, like a case study: this page is for reading, so motion stays minimal.

## Data

The matching project from `content/projects.ts`. Unknown slugs return `notFound()`.

## Page

`app/projects/[slug]/page.tsx`, statically generated with `generateStaticParams` for every project.

**Structure, top to bottom (max content width about 760px, cover and metrics can go wider):**
1. "Back to projects" link to `/projects`.
2. Mono eyebrow: category and date ("Data Science · September 2026").
3. Title (the page's only `<h1>`) and the tagline below it.
4. Action buttons: "Live demo" (`--primary`) and "Source code" (outline), from `links.demo` and `links.repo`, opening in a new tab. Hide each when null.
5. Cover image, 16:9, rounded, with `next/image`. When `coverImage` is null, show the same gradient placeholder as the project card.
6. Metrics strip: each metric as a stat card (large mono value, small label). Hide when the list is empty.
7. "Overview": the `summary` paragraph.
8. `details` sections (Problem, Approach, Results, ...) when present, each with its own `<h2>`. Skip when undefined.
9. "Tech stack": chips.
10. "Team": "Team of {size}" and Joel's role, only when `team` is not null. When `team.role` is null, show only the team size.
11. Previous and next project links at the bottom, in the same order as `content/projects.ts`.

## Metadata

`generateMetadata` per project: title `"{title} | Joel Chriscendo"`, description from `tagline`, and Open Graph image from `coverImage` when set.

## Done when

- All 5 project pages build statically and `/projects/does-not-exist` shows the 404 page.
- Pages look complete with the current data (no cover images, no `details`).
- Header and Footer appear on every detail page.
- Looks right at 375px, 768px and 1280px.
- `npm run build` passes.
- Commit: `feat: project detail pages`.
