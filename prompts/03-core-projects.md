# Task: Core Projects section (Works Wheel)

Read CLAUDE.md first. Do tasks 01 and 02 before this one.

## Source

- Component: `prompts/components/works-wheel.tsx.txt` (from 21st.dev, unmodified). Copy it to `components/ui/works-wheel.tsx`. No extra npm dependencies.
- Data: `coreProjects` from `content/projects.ts`. Ignore the original demo data and do not add stock images.
- Build the section in `components/sections/projects.tsx` with `id="projects"`, and render it on Home after About/Skills.

## Adapt the component

1. **Background:** remove `bg-background` from the root `<section>` so the shader shows through.
2. **Labels:** ring label "Selected Projects", hover action "View project". Each item links to `/projects/<slug>` with `next/link` semantics (keep the anchor, but internal navigation).
3. **Missing cover images:** `coverImage` can be null. Render a gradient placeholder (palette colors from CLAUDE.md) with the project title on it instead of a broken `<img>`.
4. **More than a title:** next to the front card, under the big title, add the project's `category`, `tagline` and up to two `metrics` (Geist Mono for the numbers), fading with the title. Recruiters must see what each project is without clicking.
5. **Section height:** give the wheel a fixed stage, e.g. `h-[100svh] min-h-[36rem]`, inside the section.
6. **Index list (top right):** keep it, but make sure it does not overlap the Header.

## Scroll behaviour (important)

The wheel captures the mouse wheel while it has items left to turn, and its stage uses `touch-pan-x`, which blocks vertical page scrolling on touch screens.

- **Desktop (≥ 1024px and fine pointer):** keep the wheel. Check that the page scrolls on normally after the last item and before the first, and that a trackpad swipe does not get stuck.
- **Mobile and tablet (< 1024px or coarse pointer):** do not render the wheel. Render a simple vertical list of project cards instead (cover, title, category, tagline, metrics, link), using `--card` styling from CLAUDE.md. Build this card as `components/shared/project-card.tsx`; it will be reused on `/projects`.
- Below the section, add a "View all projects" link to `/projects`.

## Done when

- No demo titles, crafterui images or stock photos remain.
- Desktop: the wheel works with mouse wheel, trackpad, drag and arrow keys, and never traps the page scroll.
- Mobile at 375px: the card list shows and the page scrolls normally.
- `prefers-reduced-motion`: the wheel jumps instead of gliding (built in, keep it).
- `npm run build` passes.
- Commit: `feat: core projects section`.
