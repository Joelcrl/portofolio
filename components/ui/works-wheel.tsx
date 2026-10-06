"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
//
// Adapted from 21st.dev for this site: cover placeholders, project details
// beside the front card, next/link items, a render loop that sleeps once the
// wheel settles, and scroll capture only while the stage fills the viewport.
import * as React from "react";
import Link from "next/link";

import { ProjectCover } from "@/components/shared/project-cover";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art, or null for a gradient placeholder with the title. */
  image: string | null;
  /** Internal route the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Short category shown above the title. */
  category?: string;
  /** One-line description shown under the title. */
  tagline?: string;
  /** Headline numbers; the first two are shown. */
  metrics?: { label: string; value: string }[];
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. */
  label: string;
  /** Label on the card's hover affordance. Omit to drop it. */
  action?: string;
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.38; // front card height, of the stage
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights - and everything below likewise
const LENS = 2.7; // perspective distance
const RING_R = 0.9; // ring radius (tighter than the original 1.14: with only
// a handful of projects the wider ring ran off the top of the stage)
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.82;
/** Largest a card gets while the ring is up, as a fraction of the front card. */
const RING_MAX_SCALE = 0.5;
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Pointer travel (px) before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 6;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Wheel travel (in items) below which a gesture settles back where it started
    instead of moving on, so a stray trackpad twitch doesn't turn the wheel. */
const SETTLE_MIN = 0.05;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;
/** The wheel only takes over the scroll while the stage fills the viewport:
    its top within this fraction of the viewport from the top, and its bottom
    likewise from the bottom. Otherwise the page scrolls past untouched. */
const CAPTURE_SLACK = 0.15;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label,
  action,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = React.useRef(0);
  const target = React.useRef(0);
  // The item the wheel last came to rest on. Wheel gestures settle relative to
  // it, in the direction they travelled.
  const rest = React.useRef(0);
  // Wakes the render loop after the target moves. The loop sleeps once the
  // wheel has settled, so an idle wheel costs nothing.
  const wake = React.useRef<() => void>(() => {});
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given. Capped at
    // RING_MAX_SCALE so a short list doesn't turn the ring into a heap.
    const ringScale = count
      ? clamp(
          (((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1),
          0.16,
          RING_MAX_SCALE,
        )
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
      // Room left of the front card for the title and details.
      infoW: Math.max(200, (w - cardW) / 2 - w * 0.08 - 24),
    };
  }, [stage, count]);

  // Ease toward the target, then write every transform. Runs only while the
  // wheel is moving; `wake` restarts it.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = 0;
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          // Culled by distance, not by angle: at a full turn the far side comes
          // back round to face us, and everything past the neighbours lands on
          // the vanishing point in a heap.
          const hidden = m > 0.5 && Math.abs(d) > CULL;
          card.style.opacity = hidden ? "0" : "1";
          card.style.visibility = hidden ? "hidden" : "visible";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));

      if (turn.current !== target.current) frame = requestAnimationFrame(draw);
    };

    wake.current = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      wake.current = () => {};
    };
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
      if (Number.isInteger(target.current)) rest.current = target.current;
      wake.current();
    },
    [last],
  );

  const settling = React.useRef(0);

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader. It also leaves the event alone
  // until the stage fills the viewport, so scrolling down the page never stalls
  // on a wheel that has only just come into view.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const fillsViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return (
        rect.top <= vh * CAPTURE_SLACK && rect.bottom >= vh * (1 - CAPTURE_SLACK)
      );
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !fillsViewport()) return; // ctrl+wheel is pinch-zoom
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      // A wheel gesture arrives as a burst of events with no end of its own, so
      // the rest position is whatever notch it happened to stop on. Left there
      // the drum sits between two cards - nothing at the front, and the pair
      // either side of the gap both turned half away. Settle onto an item in
      // the direction of travel: rounding to the nearest would undo a single
      // mouse-wheel notch (a small fraction of an item) every time.
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(() => {
        const moved = target.current - rest.current;
        if (Math.abs(moved) < SETTLE_MIN) to(rest.current);
        else to(moved > 0 ? Math.ceil(target.current) : Math.floor(target.current));
      }, SETTLE);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  // Pointer drag. Capture starts only once the pointer has really moved, so a
  // plain click still reaches the card's link, and a drag never opens one.
  const drag = React.useRef<{ y: number; moved: number } | null>(null);
  const dragged = React.useRef(false);
  const endDrag = () => {
    drag.current = null;
    // Land on an item rather than between two.
    if (dragged.current && target.current > 1) to(Math.round(target.current));
  };

  const current = items[active];
  const currentMetrics = current?.metrics?.slice(0, 2) ?? [];

  return (
    <div
      className={cn(
        "text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-ring absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          drag.current = { y: event.clientY, moved: 0 };
          dragged.current = false;
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const dy = drag.current.y - event.clientY;
          drag.current.y = event.clientY;
          drag.current.moved += Math.abs(dy);
          if (!dragged.current && drag.current.moved > DRAG_THRESHOLD) {
            dragged.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          if (dragged.current) to(target.current + dy / DRAG_UNITS);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (!dragged.current) return;
          dragged.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
        onKeyDown={(event) => {
          let next: number;
          if (event.key === "ArrowDown") next = Math.round(target.current) + 1;
          else if (event.key === "ArrowUp") next = Math.round(target.current) - 1;
          else return;
          // At either end, leave the key to the page.
          if (next < 0 || next > last + 1) return;
          to(next);
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const style = {
              width: metrics.cardW,
              height: metrics.cardH,
              marginLeft: -metrics.cardW / 2,
              marginTop: -metrics.cardH / 2,
            };
            const ref = (node: HTMLElement | null) => {
              cardRefs.current[i] = node;
            };
            const face = (
              <span className="bg-muted shadow-primary/30 relative block size-full overflow-hidden rounded-lg border border-border shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                <ProjectCover
                  title={item.title}
                  image={item.image}
                  sizes={`${Math.ceil(metrics.cardW) || 480}px`}
                  variant={i}
                  className="size-full"
                />
                {action && item.href ? (
                  <span className="bg-background/80 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <svg
                      viewBox="0 0 12 12"
                      className="size-2.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 9 9 3M4 3h5v5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {action}
                  </span>
                ) : null}
              </span>
            );
            const shared = {
              id: `works-wheel-${i}`,
              role: "option",
              "aria-selected": i === active,
              className: "group absolute [backface-visibility:hidden]",
              style,
            } as const;

            return item.href ? (
              <Link
                key={item.title}
                {...shared}
                ref={ref}
                href={item.href}
                draggable={false}
              >
                {face}
              </Link>
            ) : (
              <div key={item.title} {...shared} ref={ref}>
                {face}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ring title and front-card details trade places across the transition.
          Type is sized off the measured stage, not vh, so the wheel keeps its
          proportions inside a card as well as at full bleed. */}
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center font-semibold tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="bg-card border-border pointer-events-none absolute top-1/2 left-[6%] flex -translate-y-1/2 flex-col gap-3 rounded-xl border p-5 opacity-0 backdrop-blur-md"
        style={{ width: metrics.infoW }}
      >
        {current?.category ? (
          <p className="text-accent font-mono text-xs tracking-wide uppercase">
            {current.category}
          </p>
        ) : null}
        <p
          className="leading-tight font-semibold tracking-tight text-balance"
          style={{ fontSize: Math.min(metrics.title, 40) }}
        >
          {current?.title}
        </p>
        {current?.tagline ? (
          <p className="text-muted-foreground text-sm">{current.tagline}</p>
        ) : null}
        {currentMetrics.length > 0 ? (
          <dl className="flex flex-wrap gap-x-6 gap-y-2">
            {currentMetrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="text-muted-foreground text-xs">{metric.label}</dt>
                <dd className="font-mono text-lg">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {/* Index. Kept clear of the fixed site header (h-20) at the top. */}
      <ol
        className="bg-card border-border text-muted-foreground absolute right-[2.5%] rounded-xl border px-4 py-3 text-right leading-[1.75] backdrop-blur-md"
        style={{
          fontSize: Math.max(metrics.index, 13),
          top: "max(7.5%, 6rem)",
        }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                // min-h-6: 24px tall click target (WCAG 2.5.8).
                "focus-visible:outline-ring hover:text-foreground inline-flex min-h-6 cursor-pointer items-center rounded-sm transition-colors outline-none focus-visible:outline-2",
                i === active && "text-foreground font-medium",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default WorksWheel;
