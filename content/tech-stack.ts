import type { TechLogo } from "@/lib/types";

/**
 * Hero slider 1: programming languages.
 * slug = Simple Icons slug (https://simpleicons.org). null = no official
 * logo, so the slider shows a text badge instead.
 */
export const languages: TechLogo[] = [
  { name: "Python", slug: "python" },
  { name: "SQL", slug: null },
  { name: "R", slug: "r" },
  { name: "Java", slug: "openjdk" },
  { name: "C", slug: "c" },
  { name: "C++", slug: "cplusplus" },
  { name: "JavaScript", slug: "javascript" },
  { name: "HTML", slug: "html5" },
  { name: "CSS", slug: "css" },
  { name: "Dart", slug: "dart" },
];

/**
 * Hero slider 2: libraries and tools, all used in Joel's public repos.
 * TODO: Joel, remove anything you don't want shown or add missing tools.
 */
export const tools: TechLogo[] = [
  // Data & ML
  { name: "pandas", slug: "pandas" },
  { name: "NumPy", slug: "numpy" },
  { name: "scikit-learn", slug: "scikitlearn" },
  { name: "XGBoost", slug: null },
  { name: "LightGBM", slug: null },
  { name: "CatBoost", slug: null },
  { name: "Optuna", slug: "optuna" },
  { name: "SHAP", slug: null },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Keras", slug: "keras" },
  { name: "OpenCV", slug: "opencv" },
  { name: "Plotly", slug: "plotly" },
  { name: "Streamlit", slug: "streamlit" },
  { name: "Jupyter", slug: "jupyter" },
  // Data engineering & infrastructure
  { name: "Apache Kafka", slug: "apachekafka" },
  { name: "Apache Spark", slug: "apachespark" },
  { name: "Docker", slug: "docker" },
  { name: "Supabase", slug: "supabase" },
  { name: "Firebase", slug: "firebase" },
  { name: "Flutter", slug: "flutter" },
  { name: "Git", slug: "git" },
];

/**
 * Logo URL from the Simple Icons CDN.
 * Pass a hex color without "#" (e.g. "ffffff") for a monochrome logo,
 * or omit it for the official brand color.
 */
export const logoUrl = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
