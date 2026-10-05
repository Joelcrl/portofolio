# Task: Skills section

Read CLAUDE.md first. Tasks 01 to 06 must be done.

There is no source component for this task: design it yourself to match the existing sections (use `components/shared/section-heading.tsx` and the same card surface as the Education card).

## Why this section exists

The Hero already shows every language and tool in two logo sliders. This section must not repeat that. It answers a different question: **what can Joel do, and where is the proof?** Each skill group links to the projects that used it.

## Data

- `skillGroups` from `content/skills.ts`
- `projects` from `content/projects.ts`, to turn each `usedIn` slug into a project title and link

Build it in `components/sections/skills.tsx` with `id="skills"`, after About.

## Layout

- Eyebrow "Skills", heading "What I work with".
- A bento-style grid of 4 cards (2 x 2 on desktop, 1 column on mobile). Give "Machine Learning" the larger tile on desktop, since it is Joel's main focus.
- Each card: group title, the one-line description, skills as small mono chips, and at the bottom "Used in" followed by links to the matching `/projects/<slug>` pages (project titles, not slugs).
- Hover: subtle border glow in `--primary` and a slight lift. No tilt or 3D effects.

## Done when

- Every "Used in" link points to an existing project page.
- No skill is shown that is not in `content/skills.ts`.
- Looks right at 375px, 768px and 1280px.
- `npm run build` passes.
- Commit: `feat: skills section`.
