import type { SVGProps } from "react";

/**
 * The "in" glyph for LinkedIn. lucide-react and Simple Icons no longer ship
 * it, so it is drawn inline and follows the surrounding text color.
 */
export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="9" width="3.6" height="11.5" rx="0.6" />
      <circle cx="4.8" cy="4.9" r="2.1" />
      <path d="M9.5 9h3.4v1.6h.05c.5-.9 1.7-1.8 3.5-1.8 3.5 0 4.1 2.3 4.1 5.3v6.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.5V9Z" />
    </svg>
  );
}
