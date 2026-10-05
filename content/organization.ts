import type { Organization } from "@/lib/types";

export const organization: Organization = {
  name: "HIMTI BINUS University",
  image: null, // TODO: Joel, group photo or logo, e.g. "/images/organization/himti.jpg"

  roles: [
    {
      year: "2025",
      month: null, // TODO: Joel, add the month if you want it shown
      title: "Activist, Commission 1 (Academic Event)",
      description:
        "Contributed to academic event committees for HIMTI, the Computer Science student association.",
    },
    {
      year: "2026",
      month: null,
      title: "Vice Manager, Commission 1",
      description:
        "Co-leading Commission 1 at HIMTI BINUS Semarang.", // TODO: Joel, confirm wording and add what you lead
    },
  ],

  // TODO: Joel, add one entry per committee you joined.
  committees: [
    // {
    //   title: "Event name, Committee role",
    //   year: "2025",
    //   description: "What you did, in one or two sentences.",
    //   image: "/images/organization/event-name.jpg",
    // },
  ],
};
