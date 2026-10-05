import Link from "next/link";

import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  /** Accessible name of the filter group. */
  label: string;
  /** Label of the pill that clears the filter. */
  allLabel: string;
  categories: string[];
  /** Currently selected category, or null for all. */
  active: string | null;
  /** Route the filter lives on, e.g. "/projects". */
  basePath: string;
};

const PILL =
  "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium outline-none backdrop-blur-md transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none";

/**
 * Category pills. Each one is a link to ?category=..., so the selection lives
 * in the URL: shareable, and every change is a history entry for the back
 * button. The page reads the query on the server, so no client JS is needed.
 */
export function CategoryFilter({
  label,
  allLabel,
  categories,
  active,
  basePath,
}: CategoryFilterProps) {
  const pills = [
    { name: allLabel, href: basePath, selected: active === null },
    ...categories.map((category) => ({
      name: category,
      href: `${basePath}?category=${encodeURIComponent(category)}`,
      selected: active === category,
    })),
  ];

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {pills.map((pill) => (
          <li key={pill.name}>
            <Link
              href={pill.href}
              scroll={false}
              aria-current={pill.selected ? "page" : undefined}
              className={cn(
                PILL,
                pill.selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary",
              )}
            >
              {pill.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
