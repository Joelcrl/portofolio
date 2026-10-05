# Task: About & Education section

Read CLAUDE.md first. Tasks 01 to 05 must be done.

There is no source component for this task: design it yourself so it belongs with what is already built.

## Match the existing site

Before writing code, read `components/sections/*` and the adapted components in `components/ui/` (hero, works-wheel, timeline, carousel-squeeze). Reuse their section heading style, card surface (`--card`, `--border`, `backdrop-blur`), radius, spacing scale and Geist Mono labels. If no shared heading exists yet, create `components/shared/section-heading.tsx` (small mono eyebrow label + heading) and use it here and in every later section.

## Data

- `site.longBio` and `site.profileImage` from `content/site.ts`
- `education` from `content/education.ts`

Build it in `components/sections/about.tsx` with `id="about"`, placed right after the Hero.

## Layout

**Desktop (≥ 1024px), two columns:**
- Left (about 5/12): profile photo in a rounded card. When `profileImage` is null, show a placeholder card with Joel's initials "JC" on a gradient from the palette, never a broken image.
- Right (about 7/12): eyebrow "About", heading "Hi, I'm Joel.", then the long bio.

**Below, full width: an Education card**
- Top row: university, degree, specialization, "Expected graduation 2028".
- A GPA stat on the right: large "3.92" with "/ 4.00" in muted mono, label "GPA".
- Two course groups as chips: "Relevant coursework" (accent-tinted chips) and "Foundations" (muted chips) from `supportingCourses`.

**Mobile:** single column, photo first and smaller (max 240px wide), then bio, then the Education card.

## Motion

Fade and slide up once when the section enters the viewport (200 to 400ms, small stagger between photo, text and card). Nothing continuous. Respect reduced motion.

## Done when

- All text comes from `content/`, nothing hardcoded except the eyebrow labels and the heading.
- Looks right at 375px, 768px and 1280px, and text is readable over the shader.
- `npm run build` passes.
- Commit: `feat: about and education section`.
