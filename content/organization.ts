import type { ExperienceEntry, ExperienceSectionContent } from "@/lib/types";

/**
 * Experience & Organization timeline. Order here does not matter: entries are
 * shown newest first by period. The section and its nav link hide while empty.
 */
export const experience: ExperienceEntry[] = [
  {
    type: "Organization",
    title: "Vice Manager, Commission 1 (Academic Event)",
    organization: "HIMTI BINUS University",
    period: "January 2026 to Present",
    description: "Co-leading Commission 1 at HIMTI BINUS Semarang.", // TODO: Joel, confirm wording and add what you lead
    image: "/images/organization/himti-vice-manager.jpeg",
  },
  {
    type: "Organization",
    title: "Staff, Academic Event",
    organization: "HIMTI BINUS University",
    period: "January 2025 to December 2025",
    description:
      "Contributed to academic event committees for HIMTI, the Computer Science student association.",
    image: "/images/organization/himti-staff.jpg",
  },
  {
    type: "Committee",
    title: "SESVENT 2025, Event Division Staff",
    organization: "HIMTI BINUS University",
    period: "September 2025 to October 2025",
    description:
      "Created the event rundown, designed the game concepts, and served as MC and usher during the event.",
    image: "/images/organization/sesvent-2025.jpg",
  },
  {
    type: "Committee",
    title: "TECHNO 2025, Event Division Staff (Rundown and Concept)",
    organization: "HIMTI BINUS University",
    period: "July 2025 to September 2025",
    description:
      "Person in charge of the concept and rundown for the event division. Guided each member on their tasks and ran regular progress check-ins.",
    image: "/images/organization/techno-2025.jpg",
  },
  {
    type: "Committee",
    title: "HIMTI x BCA Career Talk, Technical Division Staff",
    organization: "HIMTI BINUS University",
    period: "July 2025",
    description:
      "Technical lead for the Zoom session: spotlighted speakers, handled documentation, and managed the platform throughout the event.",
    image: "/images/organization/himti-bca.jpg",
  },
  {
    type: "Committee",
    title: "TECHFEST, Event Division Staff (Competition)",
    organization: "HIMTI BINUS University",
    period: "April 2025 to July 2025",
    description:
      "Designed the data analytics competition end to end: concept, event flow, guidebook and execution. Also served as MC for the competition's technical meeting.",
    image: "/images/organization/techfest-2025-cropped.jpeg",
  },
  {
    type: "Freshmen Partner",
    title: "Freshmen Partner, Binusian 2029",
    organization: "BINUS University",
    period: "September 2025 to January 2026",
    description:
      "Taught weekly sessions on Binusian values to new students. The program ended with a community service project planting seedlings at Tambak Lorok, Semarang.",
    image: "/images/organization/freshmen-partner-b29.jpeg",
  },
  {
    type: "Freshmen Leader",
    title: "Freshmen Leader, Binusian 2029",
    organization: "BINUS University",
    period: "August 2025 to September 2025",
    description:
      "Guided new students through the First Year Program, the university's orientation period, and taught sessions on university-related topics.",
    image: "/images/organization/freshmen-leader-b29.jpeg",
  },
];

export const experienceSection: ExperienceSectionContent = {
  title: "Experience & Organization",
  imageAlt: (title, organization) => `${title}, ${organization}`,
  periodLabel: (from, to) => `${from} to ${to}`,
};
