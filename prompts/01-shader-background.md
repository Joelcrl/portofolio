# Task: Add the shader background

Read CLAUDE.md first (Design System section).

`components/shared/shader-background.tsx` is already written and tested. Do not change the fragment shader, uniform values, time scale or DPR cap.

## Steps

1. Mount `<ShaderBackground />` once in `app/layout.tsx`, as the first child of `<body>`. It renders a fixed, full-page canvas at `-z-10` with `pointer-events-none`.
2. Set up the design tokens from CLAUDE.md in `app/globals.css`: dark only, remove any light theme variables and any `prefers-color-scheme` switching. Set `body` background to `var(--background)` (`#10002B`) so there is no white flash before WebGL starts.
3. Make sure no wrapper between `<body>` and the sections paints an opaque background that would hide the shader.
4. Keep Geist Sans and Geist Mono from `next/font` as the site fonts.

## Done when

- The shader animates behind the whole page and stays fixed while scrolling.
- Switching to another tab pauses it (no CPU/GPU use in the background), and it resumes smoothly.
- With "reduce motion" enabled in the OS, a single static frame is shown.
- `npm run build` passes.
- Commit: `feat: shader background and design tokens`.
