# Task: Build the Hero section

Read CLAUDE.md first.

## 1. Install the base component

```bash
npx shadcn@latest add @shadcn-space/hero-01
```

If the registry is not configured, follow the Shadcn Space setup for `components.json`, or use the install command from the component's 21st.dev page. Place the files under `components/ui/hero-01-utils/` (`hero.tsx`, `header.tsx`, `brand-slider.tsx`). Delete the generated `hero-01.tsx` and `demo.tsx` wrappers: `components/sections/hero.tsx` replaces them.

## 2. Adapt the component internals

`components/sections/hero.tsx`, `content/site.ts`, `content/tech-stack.ts` and `lib/types.ts` are already written. Change the three utils files so they accept the props that `components/sections/hero.tsx` passes:

**header.tsx**
- Add a `brandName: string` prop and show it as the logo text, replacing the demo logo.
- Nav links are in-page anchors (`#about`, `#projects`, ...). Scroll smoothly and highlight the active section on scroll instead of using a static `isActive`.
- Replace any demo CTA button (e.g. "Get started", sign-in) with a "Contact" button linking to `#contact`. Remove any sign-in or form UI.
- The mobile menu (Sheet) must list the same links and close after a link is clicked.

**hero.tsx**
- Replace the hardcoded agency copy with props: `badge`, `headline`, `description`, `primaryCta: { label, href }`, `secondaryCta: { label, href } | null`, `profileImage: string | null`.
- Remove the avatar group / social proof ("trusted by X clients") and the `AvatarList` type entirely.
- Render the secondary button only when `secondaryCta` is not null. It downloads the CV (`download` attribute).
- If `profileImage` is set, show it with `next/image`. If null, render nothing in its place, and keep the layout balanced.
- Headline is the single `<h1>` on the page.

**brand-slider.tsx**
- The Hero shows two sliders: Languages, then Libraries & Tools.
- Add props: optional `label: string` rendered above the slider (small, muted), and optional `reverse: boolean` that scrolls the marquee in the opposite direction.
- Change `BrandList` so `image` and `lightimg` are `string | null`. When null (items with no official logo, like SQL, XGBoost or SHAP), render a text badge with the item's name, sized and styled to sit evenly with the logo items.
- Show each item's name under or next to its logo, and use `name` as the image alt text.
- Give the two sliders slightly different speeds so they don't move in lockstep.
- Duplicate the list inside the marquee as many times as needed so the loop never shows a gap, at every screen width.
- Pause the animation on hover and respect `prefers-reduced-motion`.
- Logos load from `cdn.simpleicons.org`. If the component uses `next/image`, add that host to `images.remotePatterns` in `next.config`, or use a plain `<img>` for these SVGs.

## 3. Background

The "Mesh drift" WebGL shader is already mounted as a full-page background (`prompts/01-shader-background.md`, do that task first). Make the Hero, Header and BrandSlider backgrounds transparent so the shader shows through, and make sure text stays readable on the dark purple and blue palette.

## 4. Done when

- `npm run build` passes with no type errors.
- The Hero looks right at 375px, 768px and 1280px.
- No demo text, avatars, brand logos or `cdn.21st.dev` URLs remain.
- All copy comes from `content/`. Nothing is hardcoded in components.
- Commit: `feat: hero section`.
