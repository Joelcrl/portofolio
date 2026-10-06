import { MONTHS } from "@/lib/projects";
import type { ExperienceEntry } from "@/lib/types";

const DATE = /(?:([A-Za-z]+)\s+)?(\d{4})/g;

/**
 * The latest date in a period as a sortable number, e.g. "March 2025 to June
 * 2026" sorts by June 2026. Year-only dates sort before dated ones of the same
 * year. "Present" is ongoing and sorts first; null and unreadable sort last.
 */
export function experienceDateValue(period: string | null) {
  if (!period) return -1;
  if (/present/i.test(period)) return Number.MAX_SAFE_INTEGER;
  const dates = [...period.matchAll(DATE)];
  if (dates.length === 0) return -1;
  const [, month, year] = dates[dates.length - 1];
  const monthIndex = month ? MONTHS.indexOf(month.toLowerCase()) : -1;
  return Number(year) * 13 + monthIndex + 1;
}

/** Newest first. Entries with the same date keep their order in the content file. */
export function sortExperienceNewestFirst(entries: ExperienceEntry[]) {
  return [...entries].sort(
    (a, b) => experienceDateValue(b.period) - experienceDateValue(a.period),
  );
}

/** First and last year across all periods, or null when none has a year. */
export function experienceYearRange(entries: ExperienceEntry[]) {
  const years = entries.flatMap((entry) =>
    [...(entry.period ?? "").matchAll(DATE)].map((match) => Number(match[2])),
  );
  if (years.length === 0) return null;
  return {
    from: String(Math.min(...years)),
    to: String(Math.max(...years)),
  };
}
