# Task: All Projects page (`/projects`)

Read CLAUDE.md first. Tasks 01 to 09 must be done.

There is no source component for this task. Reuse `components/shared/project-card.tsx` from task 03 (the mobile card list) so cards look the same everywhere.

## Data

`projects` from `content/projects.ts`, all of them (core and non-core).

## Page

`app/projects/page.tsx`, a server component.

- The Header from the Hero (task 02) must also appear here, with nav links pointing back to Home anchors (`/#about`, `/#projects`, ...). If the header currently only works on Home, make it work on both.
- Page heading "All Projects" and one line: "Everything I have built, from ML models to data pipelines and apps."
- **Filter by category:** a row of pill buttons, "All" plus one per unique `category` in the data (computed, not hardcoded). Active pill uses `--primary`. Keep the selected filter in the URL query (`/projects?category=Data%20Engineering`) so a filtered view can be shared. Only this filter bar needs to be a client component.
- **Grid:** 1 column on mobile, 2 on tablet, 3 on desktop. Sort by `date`, newest first.
- Each card links to `/projects/<slug>`.
- Empty state for a filter with no projects (should not happen, but handle it).
- Small "Back to home" link at the top.

## Metadata

`title: "Projects | Joel Chriscendo"` and a one-line description.

## Done when

- Adding a project to `content/projects.ts` makes it appear here, and adding a new category creates a new filter pill, with no code changes.
- Filters work with the browser back button.
- Looks right at 375px, 768px and 1280px.
- `npm run build` passes.
- Commit: `feat: all projects page`.
