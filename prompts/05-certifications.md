# Task: Certifications section (Squeeze Carousel)

Read CLAUDE.md first.

## Source

- Component: `prompts/components/carousel-squeeze.tsx.txt` (from 21st.dev, unmodified). Copy it to `components/ui/carousel-squeeze.tsx`. No extra npm dependencies.
- Data: `certifications` from `content/certifications.ts`. Ignore the original demo slides and do not add stock images.
- Build the section in `components/sections/certifications.tsx` with `id="certifications"`.

## Adapt the component

1. **Font:** delete the `GEIST` `@font-face` block, the `<style>{GEIST}</style>` element and the inline `fontFamily`. The site already loads Geist through `next/font`; the component should inherit it.
2. **Map each certification to a slide:** `title` = certificate title, `description` = "issuer, date", `overlay` = issuer name, `image` = `image`, `imageAlt` = "<title> certificate", `action` = "Verify" with `href` = `verifyUrl` and `target="_blank"` (no button when `verifyUrl` is null). When `image` is null, use a gradient `background` from the CLAUDE.md palette.
3. **Certificates must not be cropped.** Certificates are usually landscape A4, not 16:9, and `object-cover` cuts off names and dates. Use `object-contain` on a dark backdrop for the open panel.
4. **Colors:** `accent` = `var(--primary)`, `accentForeground` = white. Transparent section background.
5. **Few items.** The carousel repeats slides to fill its strip, so with fewer than 5 certificates the same certificate appears twice. Render the carousel only with 5 or more items. With 1 to 4, render a simple grid of certificate cards (same data, `--card` styling).
6. **Empty:** with 0 certifications, render nothing (the section and its heading stay hidden).

## Done when

- Works with 0, 1, 4 and 6 test entries (test with temporary entries, then restore the file).
- No demo slides or 21st.dev image URLs remain.
- Mobile at 375px works and the arrows are reachable.
- `npm run build` passes.
- Commit: `feat: certifications section`.
