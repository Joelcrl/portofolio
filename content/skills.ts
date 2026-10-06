import type { SkillGroup, SkillsSectionContent } from "@/lib/types";

/**
 * Skills grouped by area, each tied to the projects that prove it.
 * Groups with an empty usedIn show no "Used in" row.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Machine Learning",
    description:
      "Tabular modeling from feature engineering to tuned ensembles, with explanations for each prediction.",
    skills: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "Optuna",
      "SHAP",
    ],
    usedIn: ["churn-prediction", "laptop-price-prediction"],
    featured: true, // main focus, gets the larger tile
  },
  {
    title: "Deep Learning",
    description: "Image classification with transfer learning, deployed in a web app.",
    skills: ["TensorFlow", "Keras", "OpenCV"],
    usedIn: ["nutrivision-pro"],
  },
  {
    title: "Data Engineering",
    description:
      "Streaming pipelines with data quality checks, monitoring and tests, running in containers.",
    skills: ["Apache Kafka", "Apache Spark", "Docker", "Supabase Storage", "pytest"],
    usedIn: ["realtime-streaming-pipeline"],
  },
  {
    title: "Apps & Deployment",
    description: "Turning models and ideas into tools people can use.",
    skills: ["Streamlit", "Plotly", "Flutter", "Firebase", "Git"],
    usedIn: ["churn-prediction", "laptop-price-prediction", "skillswap"],
  },
  {
    title: "Design & Productivity",
    description: "Tools for design and visual work.", // TODO: Joel, confirm or reword
    skills: ["Figma", "Canva"],
    usedIn: [], // TODO: Joel, add project slugs if any project used these
  },
];

export const skillsSection: SkillsSectionContent = {
  eyebrow: "Skills",
  heading: "What I work with",
  usedInLabel: "Used in",
};
