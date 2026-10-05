# Portfolio Website: Joel Chriscendo

Personal portfolio for Joel Chriscendo, a Computer Science student at BINUS University specializing in Data Science. The audience is recruiters and interviewers for data science, machine learning and data engineering internships. Every page should make it fast to answer three questions: who is Joel, what has he built, and how do I contact him.

## Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS
- shadcn/ui as the base component layer
- Extra components from shadcn-compatible registries such as 21st.dev
- Deployment on Vercel, custom domain from dwebhost

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build, must pass before every commit
npm run lint
```

## Site Map

**Home (`/`)**, sections in this order:
1. Hero: name, headline, short bio, buttons "View Projects" and "Download CV", social icons
2. About & Education
3. Skills (grouped by area, no progress bars or percentages)
4. Core Projects: 5 cards, plus a link to `/projects`
5. Publications
6. Organization
7. Certifications
8. Contact

**All Projects (`/projects`)**: every project, filterable by category tag.

**Project detail (`/projects/[slug]`)**: problem, approach, results, stack, links, images, and role for team projects.

## Folder Structure

```
app/
  page.tsx                  # Home, composes the sections
  projects/page.tsx         # All Projects
  projects/[slug]/page.tsx  # Project detail
components/
  ui/                       # shadcn and registry components (button, card, badge, ...)
  sections/                 # Hero, About, Skills, Projects, Publications, Organization, Certifications, Contact
  shared/                   # Reusable pieces built from ui/ (ProjectCard, SectionHeading, Timeline, ImageSlot)
content/                    # ALL site copy and data lives here
  site.ts                   # name, headline, bios, links, CV path
  tech-stack.ts             # Hero logo sliders
  education.ts
  skills.ts
  projects.ts
  publications.ts
  organization.ts
  certifications.ts
lib/
  types.ts                  # shared content types
public/
  images/                   # profile, projects/<slug>/, certificates/, organization/
  cv/                       # CV PDF
```

## Content Rules

- **All copy comes from `content/`.** Components render data, they never hardcode text, metrics or links.
- **Never invent facts.** Do not add skills, metrics, dates, links, roles or achievements that are not in `content/`. If something is missing, render the placeholder state and leave a `// TODO:` comment.
- **Language:** all site copy is in English.
- **Punctuation:** never use em dashes (—) or en dashes (–) in site copy. Use commas, colons or separate sentences.
- **Tone:** concise and professional. No buzzwords like "passionate", "cutting-edge" or "leveraging".

### Placeholder Slots

Joel fills these in himself. Each must render cleanly while empty (a neutral placeholder box or a hidden button, never a broken image or dead link):

- Profile photo
- CV PDF (hide "Download CV" until the path is set)
- Contact links: email, LinkedIn, GitHub, Google Scholar or ORCID
- Organization committee entries: image + title + description, variable count
- Certifications: image + title + issuer + date + optional verification link, variable count
- Publication: conference certificate image and paper link
- Project images and missing links

Model optional fields as `string | null` in `lib/types.ts`, and make every list render correctly with zero, one or many items.

## Content Accuracy

These facts were verified against the repos. Do not change them without Joel confirming:

- **Customer Churn Prediction:** final model is a stacking ensemble of Logistic Regression, XGBoost and Random Forest with a Logistic Regression meta-learner. LightGBM was benchmarked but is not in the ensemble. The dashboard has four views.
- **Laptop Price Prediction:** a team project of 3. Metrics (R² 0.913, MAPE 8.46%) are 5-fold cross-validation means, and must be labeled as cross-validated.
- **SkillSwap:** describe only the tech stack (Flutter, Firebase Auth, Cloud Firestore, Riverpod, go_router) and how the app works: users list skills they teach and want to learn, swipe on a Discover deck with a Swap Fit % score, get matched only when both like each other, then chat, mark each teaching turn done, and rate each other. Access rules are enforced by Firestore security rules. Do not mention team size or roles.
- **DCS-LCA:** research, shown only in Publications, never as a project card.
- For team projects other than SkillSwap, show team size and Joel's specific role.

## Design System

**Theme:** dark only. No light mode or theme toggle.

**Background:** the animated "Mesh drift" WebGL shader in `components/shared/shader-background.tsx`, mounted once in `app/layout.tsx` as a fixed full-page layer behind all content. Never edit its fragment shader or uniform values. Sections have transparent backgrounds so the shader shows through.

**Palette** (taken from the shader):

| Token | Value | Use |
|---|---|---|
| `--background` | `#10002B` | Page fallback color while the shader loads or if WebGL is unavailable |
| `--foreground` | `#F5F3FF` | Body text |
| `--muted-foreground` | `#C4B5FD` at reduced opacity | Secondary text, labels |
| `--primary` | `#7F00FF` | Primary buttons, key highlights |
| `--accent` | `#33AEB9` | Links, tags, small accents |
| `--card` | `rgb(255 255 255 / 0.05)` with `backdrop-blur` | Cards and panels over the shader |
| `--border` | `rgb(255 255 255 / 0.10)` | Card and divider borders |

**Readability over the shader:** text sits directly on the shader only in the Hero. Every other block of text sits on a `--card` surface. Check contrast (WCAG AA) wherever text overlaps the brightest teal and blue areas.

**Fonts:** Geist Sans for all text, Geist Mono for small technical labels (metrics, tech tags). Both ship with create-next-app via `next/font`.

**Radius:** `--radius: 0.75rem`.

**Motion:** subtle. Fade and slide in on scroll, short durations (200 to 400ms). The shader and the two Hero logo sliders are the only continuous animations. Respect `prefers-reduced-motion` everywhere.

**Chosen registry components:**
- Hero: `hero-01` from Shadcn Space (header, hero, brand slider), adapted per `prompts/02-hero.md`
- Core Projects: Works Wheel, per `prompts/03-core-projects.md`
- Organization: GSAP scroll timeline, per `prompts/04-organization.md`
- Certifications: Squeeze Carousel, per `prompts/05-certifications.md`
- Footer: adapted from a 21st.dev footer, per `prompts/09-contact-footer.md`
- About & Education, Skills, Publications, Contact, `/projects`, `/projects/[slug]`: custom, designed to match the components above (`prompts/06` to `prompts/11`)

## Task Prompts

Tasks live in `prompts/`, numbered in the order to run them. Raw component sources from 21st.dev are kept in `prompts/components/` as `.txt` so the build ignores them; copy them into `components/ui/` only when the task says so. When a 21st.dev source conflicts with CLAUDE.md (stock images, demo copy, hardcoded colors, fonts), CLAUDE.md wins.

Rules that apply regardless of the final design:
- Colors, radius and fonts are defined only as CSS variables in `app/globals.css`. Never hardcode hex values or font names in components.
- Keep spacing, radius and typography consistent across components from different registries.

## Using Registry Components (21st.dev and similar)

- Install with the shadcn CLI and keep the URL in quotes: `npx shadcn@latest add "<url>"`
- After installing, adapt the component: replace demo content with props, map its colors to the theme's CSS variables, and match radius and spacing.
- Add `"use client"` to components that use state, effects or animation.
- Check the license before using a component.
- Use heavy visual effects (3D, particles, large animated backgrounds) only in the Hero, and make sure they don't hurt mobile performance.
- Before adding a new primitive (Button, Card, Badge), check whether `components/ui/` already has one.

## Working Rules

- Build one section at a time. Commit to Git after each section works.
- `npm run build` must pass before every commit.
- Check every section at 375px (mobile), 768px and 1280px widths.
- Use `next/image` for images and `next/link` for internal links. External links open in a new tab with `rel="noopener noreferrer"`.
- Accessibility: semantic headings in order, alt text on every image, visible focus states, sufficient color contrast.
- Keep Lighthouse performance and accessibility at 90 or above.
- Never commit secrets or API keys.

## Out of Scope (for now)

- AI chatbot: planned for version 2, after the site is finished
- Blog
