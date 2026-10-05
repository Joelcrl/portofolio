import type { SkillGroup } from "@/lib/types";

/**
 * Skills grouped by area, each tied to the projects that prove it.
 * Every skill here appears in at least one public repo.
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
];
