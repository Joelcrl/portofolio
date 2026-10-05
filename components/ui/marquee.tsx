"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  /** Scroll in the opposite direction. */
  reverse?: boolean;
  /** Pause the animation while the pointer is over the marquee. */
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

/**
 * Horizontal marquee. The content is repeated as many times as the container
 * width needs, so the loop never shows a gap. Keyframes and the
 * reduced-motion fallback live in app/globals.css.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(2);

  useEffect(() => {
    const container = containerRef.current;
    const copy = copyRef.current;
    if (!container || !copy) return;

    const update = () => {
      const copyWidth = copy.offsetWidth;
      if (!copyWidth) return;
      // One extra copy so the next one is already in view while the first scrolls out.
      setRepeat(Math.max(2, Math.ceil(container.clientWidth / copyWidth) + 1));
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(copy);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "marquee flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]",
        pauseOnHover && "marquee-pause",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          ref={i === 0 ? copyRef : undefined}
          aria-hidden={i > 0 ? true : undefined}
          className={cn(
            "marquee-track flex shrink-0 justify-around gap-(--gap)",
            reverse && "marquee-reverse",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
