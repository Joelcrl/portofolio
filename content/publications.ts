import type { Publication, PublicationsSectionContent } from "@/lib/types";

export const publications: Publication[] = [
  {
    title:
      "Dynamic Classifier Selection using Local Class Accuracy on Overlap Cleaned Heterogeneous Pool of Experts",
    venue: "ICTIM 2026",
    status: "Accepted for presentation",
    year: "2026",
    authors: ["Joel Chriscendo Rahardjo Liem"], // TODO: Joel, add co-authors in paper order
    summary:
      "A multi-class classification system that predicts student academic outcomes. An Optuna-tuned pool of specialist experts (XGBoost, SVM, Gaussian Naive Bayes) is combined through Dynamic Classifier Selection with Local Class Accuracy (DCS-LCA), choosing the most competent expert for each student. The approach outperformed traditional static ensemble methods.",
    metrics: [{ label: "F1-score", value: "0.8638" }],
    stack: ["Python", "scikit-learn", "XGBoost", "Optuna"],
    paperUrl: null, // TODO: Joel, link to the paper
    coverImage: "/images/ICTIM-Logo.png", // TODO: Joel, 16:9 image, e.g. "/images/publications/ictim-2026.jpg"
    certificateImage: "/images/ICTIM.jpg", // TODO: Joel, e.g. "/images/publications/ictim-2026-certificate.jpg"
  },
];

export const publicationsSection: PublicationsSectionContent = {
  eyebrow: "Research",
  heading: "Publications",
  readPaperLabel: "Read paper",
  coverAlt: (title) => `Cover image for ${title}`,
  viewCertificateLabel: (title) => `View conference certificate for ${title}`,
  certificateTitle: "Conference certificate",
  certificateAlt: (title) => `Conference certificate for ${title}`,
};
