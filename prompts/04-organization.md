# Task: Organization section (scroll timeline)

Read CLAUDE.md first.

## Source

- Component: `prompts/components/timeline.tsx.txt` (from 21st.dev, unmodified). Copy it to `components/ui/timeline.tsx`.
- Install: `npm install gsap`. SplitText and ScrollTrigger ship inside the `gsap` package.
- Data: `organization` from `content/organization.ts`. Ignore the original demo data and do not add stock images.
- Build the section in `components/sections/organization.tsx` with `id="organization"`.

## Adapt the component

1. **Data from props, not hardcoded.** Remove `topJourneyData` and `bottomJourneyData`. Accept an `items` prop built from `organization.roles` plus `organization.committees` (committees as timeline entries: year, title, description), sorted by date. Alternate items between the top and bottom rows automatically.
2. **Optional month.** `month` can be null. Show just the year in that case, and sort year-only items before dated items of the same year.
3. **Positions for any number of items.** The scroll positions are a hardcoded array of exactly 7 pairs. Compute them from the item count instead, so 2 items and 12 items both work.
4. **Section height scales with item count.** The original is `h-[200vw]` (and `400vh` on mobile), which is far too long for a few entries. Derive the height from the number of items, with a sensible minimum.
5. **Image.** Use `organization.image`. If null, drop the image panel and let the track start with the title.
6. **Colors and background:** transparent background (shader shows through), `activeColor` = `var(--primary)`, text and muted colors from the CLAUDE.md tokens.
7. **Title:** "Organization", `periodLabel` "2025 to 2026" (computed from the data, no dashes).
8. **Fix the typo** `tranlate-y-[-50%]` to `-translate-y-1/2`.
9. **Committee photos.** The timeline has no space for per-item photos. Below the timeline, add a "Committee highlights" grid of cards (image, title, year, description) from `organization.committees`. Hide the grid while the list is empty, and hide a card's image area when its `image` is null.

## Done when

- With the current data (2 roles, 0 committees) the timeline looks complete, not empty, and does not leave a long stretch of blank scroll.
- Adding committees to `content/organization.ts` needs no component changes.
- Reduced motion: no pinning animation, all entries visible (keep the built-in handling).
- Mobile at 375px works and the page is not trapped.
- No `#ff5f00`, no demo copy, no 21st.dev image URLs remain.
- `npm run build` passes.
- Commit: `feat: organization section`.
