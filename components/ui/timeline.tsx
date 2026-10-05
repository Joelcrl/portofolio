// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for this site: items come from props, layout and scroll length are
// computed from the item count, and the track only pins (vertical scroll
// drives it sideways) when it is wider than the screen.
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  },
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    // Revert the previous run's tweens and ScrollTriggers before re-adding,
    // so a re-layout (e.g. pinned -> not pinned) starts from a clean slate.
    ctxRef.current.revert();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export type TimelineItem = {
  id: string;
  year: string;
  /** Full month name, or null to show the year only. */
  month: string | null;
  title: string;
  description: string;
};

/** Oldest first. Year-only items come before dated items of the same year. */
export function sortTimelineItems(items: TimelineItem[]) {
  return [...items].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    const monthA = a.month ? (monthOrder[a.month] ?? 0) : 0;
    const monthB = b.month ? (monthOrder[b.month] ?? 0) : 0;
    return monthA - monthB;
  });
}

export type TimelineProps = {
  items: TimelineItem[];
  title: string;
  /** Small line under the title, e.g. the organization's name. */
  subtitle?: string;
  periodLabel?: string;
  /** id for the title, so a wrapping section can use aria-labelledby. */
  headingId?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  /** Image panel at the start of the track. null drops the panel. */
  imageUrl?: string | null;
  imageAlt?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

/** How far the track overflows its viewport, in px. 0 when it fits. */
function useOverflow(
  viewportRef: { current: HTMLElement | null },
  trackRef: { current: HTMLElement | null },
) {
  const [overflow, setOverflow] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () =>
      setOverflow(
        Math.max(0, Math.ceil(track.offsetWidth - viewport.clientWidth)),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, [viewportRef, trackRef]);

  return overflow;
}

export default function Timeline({
  items,
  title,
  subtitle,
  periodLabel,
  headingId,
  textColor = "var(--foreground)",
  mutedTextColor = "var(--muted-foreground)",
  activeColor = "var(--primary)",
  imageUrl = null,
  imageAlt = "",
}: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const overflow = useOverflow(viewportRef, trackRef);
  // Pin only when there is something to scroll sideways, and never with
  // reduced motion: then the track just scrolls horizontally on its own.
  const pinned = !reducedMotion && overflow > 0;

  const sorted = sortTimelineItems(items);
  const activeStyle: CSSProperties = { backgroundColor: activeColor };
  const mutedTextStyle: CSSProperties = { color: mutedTextColor };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track || reducedMotion) return;

      const q = gsap.utils.selector(section);
      const line = q(".journey-line");
      const entries = q(".journey-item");

      // Builds one entry's reveal: connector grows out of the main line, the
      // dot pops, the card slides in from the far side.
      const reveal = (entry: Element) => {
        const isTop = entry.getAttribute("data-row") === "top";
        return gsap
          .timeline()
          .from(entry.querySelector(".journey-connector"), {
            scaleY: 0,
            duration: 0.4,
            ease: "none",
          })
          .from(
            entry.querySelector(".journey-dot"),
            { scale: 0, duration: 0.4, ease: "none" },
            "<",
          )
          .from(
            entry.querySelector(".journey-card"),
            {
              opacity: 0,
              y: isTop ? -24 : 24,
              duration: 0.6,
              ease: "power2.out",
            },
            "<0.2",
          );
      };

      if (pinned) {
        // Pin for exactly `overflow` px of scroll, so the track moves sideways
        // one px for every px scrolled. GSAP pins rather than CSS sticky: a
        // sticky section sized in svh releases early whenever the real viewport
        // is taller (mobile address bar hidden), cutting off the last entry.
        const move = gsap.to(track, {
          x: -overflow,
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: `+=${overflow}`,
            pin: true,
            scrub: true,
          },
        });

        gsap.from(line, {
          scaleX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: line[0],
            containerAnimation: move,
            start: "left 90%",
            end: "right 90%",
            scrub: true,
          },
        });

        // Each entry reveals as it enters from the right, however many there are.
        entries.forEach((entry) => {
          const tl = reveal(entry);
          ScrollTrigger.create({
            trigger: entry,
            containerAnimation: move,
            // Ends early enough that the last entry, which stops short of the
            // left side, still finishes revealing.
            start: "left 95%",
            end: "left 70%",
            scrub: true,
            animation: tl,
          });
        });
        return;
      }

      // Everything fits on screen: reveal once, in order, when it scrolls in.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: track, start: "top 75%", once: true },
      });
      tl.from(line, { scaleX: 0, duration: 0.6, ease: "power1.out" });
      entries.forEach((entry, i) => tl.add(reveal(entry), 0.2 + i * 0.15));
    },
    {
      dependencies: [reducedMotion, pinned, overflow, sorted.length],
      scope: sectionRef,
    },
  );

  // Item width and the step between neighbours. Neighbours alternate rows, so
  // items in the same row sit two steps apart and never overlap.
  const trackVars = {
    "--item-w": "min(22rem, 78vw)",
    "--step": "calc(var(--item-w) * 0.62)",
    color: textColor,
  } as CSSProperties;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div
        ref={viewportRef}
        className={cn(
          "w-full",
          pinned
            ? "flex h-svh items-center overflow-hidden"
            : "overflow-x-auto py-16",
        )}
      >
        <div
          ref={trackRef}
          className="mx-auto flex h-[min(72svh,38rem)] min-h-[30rem] w-max items-stretch gap-[5vw] px-[5vw]"
          style={trackVars}
        >
          {imageUrl ? (
            <div className="relative h-full w-[min(26rem,85vw)] shrink-0 overflow-hidden rounded-xl border border-border">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 26rem, 85vw"
                draggable={false}
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="flex w-[min(18rem,70vw)] shrink-0 flex-col justify-between py-2">
            <div className="space-y-3">
              <h2
                id={headingId}
                className="text-4xl leading-[0.95] font-semibold tracking-tight md:text-5xl"
              >
                {title}
              </h2>
              {subtitle ? (
                <p className="text-base" style={mutedTextStyle}>
                  {subtitle}
                </p>
              ) : null}
            </div>
            {periodLabel ? (
              <p className="font-mono text-sm" style={mutedTextStyle}>
                {periodLabel}
              </p>
            ) : null}
          </div>

          {sorted.length > 0 ? (
            <div
              className="relative h-full shrink-0"
              style={{
                width: `calc(${sorted.length - 1} * var(--step) + var(--item-w))`,
              }}
            >
              {/* Main line across the middle, with a dot at each end. */}
              <div
                aria-hidden
                className="absolute top-1/2 left-0 flex w-full -translate-y-1/2 items-center"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={activeStyle}
                />
                <span
                  className="journey-line h-px flex-1 origin-left"
                  style={activeStyle}
                />
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={activeStyle}
                />
              </div>

              <ol className="absolute inset-0">
                {sorted.map((item, index) => {
                  const isTop = index % 2 === 0;
                  const date = item.month
                    ? `${item.month} ${item.year}`
                    : item.year;
                  return (
                    <li
                      key={item.id}
                      data-row={isTop ? "top" : "bottom"}
                      className={cn(
                        "journey-item absolute flex h-1/2 flex-col",
                        isTop ? "top-0 justify-start" : "top-1/2 justify-end",
                      )}
                      style={{
                        left: `calc(${index} * var(--step))`,
                        width: "var(--item-w)",
                      }}
                    >
                      {/* Connector from the main line out to the card. */}
                      <span
                        aria-hidden
                        className={cn(
                          "journey-connector absolute left-0 w-px",
                          isTop
                            ? "top-4 bottom-0 origin-bottom"
                            : "top-0 bottom-4 origin-top",
                        )}
                        style={activeStyle}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "journey-dot absolute left-0 size-3 -translate-x-1/2 rounded-full ring-4 ring-background/60",
                          isTop
                            ? "bottom-0 translate-y-1/2"
                            : "top-0 -translate-y-1/2",
                        )}
                        style={activeStyle}
                      />

                      <div className="journey-card ml-5 space-y-2 rounded-xl border border-border bg-card p-4 backdrop-blur-md">
                        <p className="font-mono text-xs" style={mutedTextStyle}>
                          {date}
                        </p>
                        <h3 className="text-lg leading-snug font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={mutedTextStyle}
                        >
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
