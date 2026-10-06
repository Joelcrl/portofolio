# Task: Experience & Organization section (scroll timeline)

Read CLAUDE.md first.

## Source

- Component: `prompts/components/timeline.tsx.txt` (from 21st.dev, unmodified). Copy it to `components/ui/timeline.tsx`.
- Install: `npm install gsap`. SplitText and ScrollTrigger ship inside the `gsap` package.
- Data: `experience` and `experienceSection` from `content/organization.ts`. Ignore the original demo data and do not add stock images.
- Build the section in `components/sections/organization.tsx` with `id="experience"`.

## Adapt the component

1. **Data from props, not hardcoded.** Remove `topJourneyData` and `bottomJourneyData`. Accept an `items` prop built from `experience`. Each entry has `type` ("Committee", "Freshmen Leader", "Freshmen Partner" or "Organization"), `title`, `organization`, `period`, `description` and `image`; the last three can be null. Render a type badge on each item. Sort newest first by period (`lib/experience.ts`).
2. **Free-form period.** `period` is "2025", "March 2025" or "March 2025 to June 2026". Sort by its latest date, dated items before year-only items of the same year, "Present" first and null last.
3. **Positions for any number of items.** The scroll positions are a hardcoded array of exactly 7 pairs. Compute them from the item count instead, so 2 items and 12 items both work.
4. **Section height scales with item count.** The original is `h-[200vw]` (and `400vh` on mobile), which is far too long for a few entries. Derive the height from the number of items, with a sensible minimum.
5. **Empty list.** With 0 entries, render nothing and leave the nav link out. 1 entry must look complete.
6. **Colors and background:** transparent background (shader shows through), `activeColor` = `var(--primary)`, text and muted colors from the CLAUDE.md tokens.
7. **Title:** "Experience & Organization", `periodLabel` "2025 to 2026" (computed from the data, no dashes).
8. **Fix the typo** `tranlate-y-[-50%]` to `-translate-y-1/2`.
9. **Photos.** Each entry's `image` is shown above the title in its own timeline card, through the shared `ImageSlot` (gradient placeholder while null). There is no separate committee grid.

## Done when

- With the current data (2 HIMTI roles) the timeline looks complete, not empty, and does not leave a long stretch of blank scroll.
- Adding entries of any type to `content/organization.ts` needs no component changes.
- Reduced motion: no pinning animation, all entries visible (keep the built-in handling).
- Mobile at 375px works and the page is not trapped.
- No `#ff5f00`, no demo copy, no 21st.dev image URLs remain.
- `npm run build` passes.
- Commit: `feat: organization section`.
