import type { AboutSectionContent, SiteContent } from "@/lib/types";

export const site: SiteContent = {
  name: "Joel Chriscendo",
  fullName: "Joel Chriscendo Rahardjo Liem",

  // TODO: Joel, fill these in. Leave as null to hide the element.
  profileImage: null, // e.g. "/images/profile.jpg"
  cvPath: null, // e.g. "/cv/Joel-Chriscendo-CV.pdf"
  links: {
    email: null, // e.g. "mailto:you@example.com"
    linkedin: null,
    github: "https://github.com/Joelcrl",
    scholar: null,
  },

  nav: [
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "Publications", href: "#publications" },
    { title: "Organization", href: "#organization" },
    { title: "Contact", href: "#contact" },
  ],

  hero: {
    badge: "Data Science @ BINUS University",
    headline:
      "Data Science student building ML models and the pipelines that feed them.",
    description:
      "Computer Science student at BINUS University specializing in Data Science. I build end-to-end machine learning systems, from data collection and modeling to deployed dashboards, with a growing focus on data engineering.",
    primaryCta: { label: "View Projects", href: "#projects" },
    // Hidden automatically while site.cvPath is null.
    secondaryCta: { label: "Download CV", href: null },
    languagesLabel: "Languages",
    toolsLabel: "Libraries & Tools",
  },

  longBio:
    "I'm Joel, a Computer Science student at BINUS University specializing in Data Science, graduating in 2028. I enjoy the full path from raw data to a working product: scraping and cleaning data, building and explaining models, and shipping them as tools people can actually use. My work spans explainable churn prediction, a real-time streaming pipeline with Kafka and Spark, and research on dynamic ensemble selection accepted at ICTIM 2026. Outside coursework, I serve as Vice Manager of the Academic Event commission at HIMTI. I'm currently looking for internship opportunities in data science, machine learning, or data engineering.",
};

export const aboutSection: AboutSectionContent = {
  eyebrow: "About",
  heading: "Hi, I'm Joel.",
  graduationLabel: "Expected graduation",
  gpaLabel: "GPA",
  relevantLabel: "Relevant coursework",
  foundationsLabel: "Foundations",
};
