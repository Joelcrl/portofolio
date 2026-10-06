"use client";

import { useEffect, useRef } from "react";
import type { TubesCursorApp } from "threejs-components/build/cursors/tubes1.min.js";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * "Tubes Cursor" from 21st.dev (threejs-components, ISC), adapted per
 * prompts/12-cursor.md: colors come from CSS variables, no demo copy, no
 * click-to-randomize. Rendered only in the Hero.
 */

// Mouse or trackpad users without reduced motion. Touch devices have no
// cursor to follow, so they skip the 775 KB three.js chunk entirely.
const TUBES_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Defined in app/globals.css.
const TUBE_VARS = ["--tubes-1", "--tubes-2", "--tubes-3"];
const LIGHT_VARS = [
  "--tubes-light-1",
  "--tubes-light-2",
  "--tubes-light-3",
  "--tubes-light-4",
];
const LIGHT_INTENSITY = 200;
// The library pins the pixel ratio to 2. Cap it lower to save GPU time.
const MIN_PIXEL_RATIO = 1;
const MAX_PIXEL_RATIO = 1.5;
// The library computes NaN radii if it starts before the canvas has its
// final size, so give layout a moment first.
const INIT_DELAY_MS = 100;

type TubesCursorProps = {
  className?: string;
};

export default function TubesCursor({ className }: TubesCursorProps) {
  const enabled = useMediaQuery(TUBES_QUERY);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let app: TubesCursorApp | null = null;
    let cancelled = false;
    let timer = 0;

    // Load on the first mouse move, not on page load, so the three.js chunk
    // never competes with the first paint and hydration.
    const start = () => {
      timer = window.setTimeout(init, INIT_DELAY_MS);
    };
    window.addEventListener("pointermove", start, { once: true, passive: true });

    const init = () => {
      loadTubes()
        .then((createTubes) => {
          const canvas = canvasRef.current;
          if (cancelled || !canvas) return;

          const styles = getComputedStyle(canvas);
          const read = (vars: string[]) =>
            vars.map((name) => styles.getPropertyValue(name).trim());

          app = createTubes(canvas, {
            tubes: {
              colors: read(TUBE_VARS),
              lights: { intensity: LIGHT_INTENSITY, colors: read(LIGHT_VARS) },
            },
          });
          app.three.minPixelRatio = MIN_PIXEL_RATIO;
          app.three.maxPixelRatio = MAX_PIXEL_RATIO;
          app.three.resize();
        })
        .catch((error) => console.error("[TubesCursor]", error));
    };

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", start);
      window.clearTimeout(timer);
      app?.dispose();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

function loadTubes() {
  return import("threejs-components/build/cursors/tubes1.min.js").then(
    (module) => module.default,
  );
}
