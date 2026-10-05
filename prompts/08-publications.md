# Task: Publications section

Read CLAUDE.md first. Tasks 01 to 07 must be done.

There is no source component for this task: design it yourself to match the existing sections (shared section heading, same card surface).

## Data

`publications` from `content/publications.ts`. It currently holds one paper; the layout must also work with two or three.

Build it in `components/sections/publications.tsx` with `id="publications"`, after Core Projects.

## Layout

- Eyebrow "Research", heading "Publications".
- One wide card per publication, styled like a paper entry:
  - Top line in mono: venue and year ("ICTIM 2026"), plus a status badge ("Accepted for presentation") in `--accent`.
  - The full paper title as the card heading. It is long, so allow wrapping and use `text-balance`.
  - Authors in muted text. Bold Joel's name ("Joel Chriscendo Rahardjo Liem").
  - The summary paragraph.
  - Metrics as a stat (F1-score 0.8638, large number in mono) and the stack as chips.
  - Actions: "Read paper" button (`--primary`) when `paperUrl` is set, opening in a new tab. Hidden when null.
- **Certificate:** when `certificateImage` is set, show a thumbnail on the right side of the card (desktop) or below the text (mobile). Clicking it opens the full certificate in a dialog (shadcn `dialog`), shown with `object-contain` so nothing is cropped. When null, the text takes the full width.

## Done when

- With `paperUrl` and `certificateImage` both null, the card still looks complete.
- Test with a temporary certificate image and paper link, then restore the content file.
- The dialog closes with Escape and returns focus to the thumbnail.
- `npm run build` passes.
- Commit: `feat: publications section`.
