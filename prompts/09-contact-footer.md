# Task: Contact section and Footer

Read CLAUDE.md first. Tasks 01 to 08 must be done.

## Source

- Footer component: `prompts/components/footer-section.tsx.txt` (from 21st.dev, unmodified). Use it as the layout starting point for `components/sections/footer.tsx`. Do not copy it into `components/ui/` as is: most of it has to change.
- shadcn primitives it needs: `npx shadcn@latest add button tooltip`. Skip `input`, `label`, `switch` and `textarea`: they are no longer used after the changes below.
- Data: `site` from `content/site.ts` (name, nav, links, cvPath).

## Part 1: Contact section

Build `components/sections/contact.tsx` with `id="contact"`, the last section on Home.

- Eyebrow "Contact", heading "Let's work together".
- One sentence: "I'm looking for internship opportunities in data science, machine learning and data engineering. My inbox is open."
- Primary button "Email me" (`mailto:` from `site.links.email`), secondary button "Download CV" (`site.cvPath`). Hide each button while its value is null.
- A row of profile links (GitHub, LinkedIn, Google Scholar). Hide any link whose value is null.
- Centered, on a single wide `--card` panel with a soft `--primary` glow behind it.

## Part 2: Footer (adapted from the source)

Remove from the source component:
- **The dark mode switch** and the `useEffect` that adds or removes the `dark` class on `<html>`. The site is dark only, and this effect would override the theme.
- **The newsletter form** ("Stay Connected", email input, submit). There is no backend for it.
- **The fake address and phone** block.
- **Privacy Policy, Terms of Service, Cookie Settings** links.
- **Facebook, Twitter and Instagram** buttons, and the unused `isChatOpen` state and imports.
- `bg-background` on the footer (shader shows through; keep the top border).

Keep and adapt:
- **Column 1:** `site.name` and the short headline from `site.hero.headline`.
- **Column 2, "Navigate":** links from `site.nav`, plus "All Projects" to `/projects`.
- **Column 3, "Connect":** icon buttons with tooltips for Email, GitHub, LinkedIn and Google Scholar. Use one `TooltipProvider` for the whole row, not one per icon. Hide a button when its link is null.
- **Bottom bar:** "© {current year} Joel Chriscendo" on the left and "Built with Next.js" on the right. No dashes.

## Icons (important)

`lucide-react` no longer ships brand icons, so `Facebook`, `Twitter`, `Instagram`, `Linkedin` and `Github` imports will fail to compile.
- Email: lucide `Mail`.
- GitHub and Google Scholar: Simple Icons via `logoUrl("github", "ffffff")` and `logoUrl("googlescholar", "ffffff")` from `content/tech-stack.ts`.
- LinkedIn: Simple Icons has no LinkedIn logo either. Create `components/shared/icons.tsx` with a small inline SVG `LinkedInIcon` (the "in" glyph) using `currentColor`.

## Done when

- No newsletter, theme switch, fake address, or company links remain.
- Every icon button has an accessible label, and buttons for null links are hidden.
- The footer appears on every page (put it in `app/layout.tsx`), including `/projects`.
- `npm run build` passes.
- Commit: `feat: contact section and footer`.
