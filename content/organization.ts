import type { ExperienceEntry, ExperienceSectionContent } from "@/lib/types";

/**
 * Experience & Organization timeline. Order here does not matter: entries are
 * shown newest first by period. The section and its nav link hide while empty.
 */
export const experience: ExperienceEntry[] = [
  {
    type: "Organization",
    title: "Activist, Commission 1 (Academic Event)",
    organization: "HIMTI BINUS University",
    period: "2025", // TODO: Joel, add the month if you want it shown, e.g. "March 2025"
    description:
      "Contributed to academic event committees for HIMTI, the Computer Science student association.",
    image: null, // TODO: Joel, 16:9 photo, e.g. "/images/organization/himti-activist.jpg"
  },
  {
    type: "Organization",
    title: "Vice Manager, Commission 1",
    organization: "HIMTI BINUS University",
    period: "2026", // TODO: Joel, add the month if you want it shown
    description: "Co-leading Commission 1 at HIMTI BINUS Semarang.", // TODO: Joel, confirm wording and add what you lead
    image: null, // TODO: Joel, 16:9 photo
  },

  // TODO: Joel, add committees, Freshmen Leader and Freshmen Partner roles.
  // {
  //   type: "Committee", // or "Freshmen Leader", "Freshmen Partner", "Organization"
  //   title: "Event name, Committee role",
  //   organization: "HIMTI BINUS University",
  //   period: "2025",
  //   description: "What you did, in one or two sentences.",
  //   image: "/images/organization/event-name.jpg",
  // },
];

export const experienceSection: ExperienceSectionContent = {
  title: "Experience & Organization",
  imageAlt: (title, organization) => `${title}, ${organization}`,
  periodLabel: (from, to) => `${from} to ${to}`,
};
