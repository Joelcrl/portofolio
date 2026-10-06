import type { Project } from "@/lib/types";

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/** "September 2026" as a sortable number. Unreadable dates count as oldest. */
export function projectDateValue(date: string) {
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(date.trim());
  if (!match) return 0;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  return Number(match[2]) * 12 + Math.max(month, 0);
}

/** Newest first. Projects with the same date keep their order in the content file. */
export function sortProjectsNewestFirst(projects: Project[]) {
  return [...projects].sort(
    (a, b) => projectDateValue(b.date) - projectDateValue(a.date),
  );
}

/** Each category once, in the order it first appears. */
export function projectCategories(projects: Project[]) {
  return [...new Set(projects.map((project) => project.category))];
}
