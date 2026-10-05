import type { Project } from "@/lib/types";

/**
 * All projects. `core: true` projects appear on Home, in this order.
 * Facts here were checked against the GitHub repos. See CLAUDE.md
 * "Content Accuracy" before changing any of them.
 *
 * TODO: Joel, add cover images (16:9) to public/images/projects/<slug>/
 * and set coverImage, e.g. "/images/projects/churn-prediction/cover.png".
 */
export const projects: Project[] = [
  {
    slug: "churn-prediction",
    title: "Customer Churn Prediction",
    category: "Data Science",
    tagline:
      "Predicting telecom churn and explaining why each customer is at risk.",
    summary:
      "End-to-end ML system on 7,043 Telco customers. After benchmarking Logistic Regression, Random Forest, XGBoost and LightGBM, the best performers were combined into a stacking ensemble, with SHAP explaining individual predictions. Deployed as a four-view Streamlit dashboard: portfolio summary with revenue at risk and a retention ROI simulator, what-if single prediction, validated batch scoring, and per-customer explanations.",
    metrics: [
      { label: "ROC-AUC", value: "0.849" },
      { label: "Recall", value: "0.807" },
    ],
    stack: ["Python", "scikit-learn", "XGBoost", "LightGBM", "SHAP", "Streamlit"],
    links: {
      repo: "https://github.com/Joelcrl/customer-churn-prediction",
      demo: "https://joel-customer-churn-prediction.streamlit.app/",
      paper: null,
    },
    coverImage: null, // repo has docs/dashboard_screenshot.png
    team: null,
    date: "September 2026",
    core: true,
  },
  {
    slug: "realtime-streaming-pipeline",
    title: "Real-Time Transaction Streaming Pipeline",
    category: "Data Engineering",
    tagline:
      "Streaming card transactions from Kafka to cloud storage, with data quality checks and lag monitoring.",
    summary:
      "Containerized pipeline where a Python producer replays the Kaggle credit card dataset into Kafka, and Spark Structured Streaming validates each record against five data quality rules. Valid rows are written as Parquet to Supabase Storage through idempotent per-batch uploads, invalid rows are quarantined with reason codes instead of dropped, and an external monitor compares Kafka offsets with Spark's checkpoint to report pipeline health.",
    metrics: [
      { label: "Automated tests", value: "11" },
      { label: "Data quality rules", value: "5" },
    ],
    stack: ["Apache Kafka", "Apache Spark", "Docker", "Supabase", "Python", "pytest"],
    links: {
      repo: "https://github.com/Joelcrl/realtime-streaming-pipeline",
      demo: null,
      paper: null,
    },
    coverImage: null, // repo has docs/images/ screenshots and an architecture diagram
    team: null,
    date: "September 2026",
    core: true,
  },
  {
    slug: "laptop-price-prediction",
    title: "Laptop Price Prediction",
    category: "Machine Learning",
    tagline: "Estimating laptop market prices in Indonesia from hardware specs.",
    summary:
      "Built on a self-collected dataset of 583 listings scraped from the Agres marketplace. A stacking ensemble of XGBoost, LightGBM and CatBoost with a RidgeCV meta-learner, each base model tuned with Optuna. The full preprocessing pipeline is serialized with the model, so the Streamlit app passes raw inputs straight to it and benchmarks inference latency.",
    metrics: [
      { label: "R² (5-fold CV)", value: "0.913" },
      { label: "MAPE (5-fold CV)", value: "8.46%" },
    ],
    stack: ["Python", "XGBoost", "LightGBM", "CatBoost", "Optuna", "Streamlit"],
    links: {
      repo: "https://github.com/Joelcrl/Laptop-Prediction",
      demo: "https://joel-laptop-prediction.streamlit.app/",
      paper: null,
    },
    coverImage: null,
    team: { size: 3, role: null }, // TODO: Joel, describe your role
    date: "June 2026",
    core: true,
  },
  {
    slug: "nutrivision-pro",
    title: "NutriVision Pro",
    category: "Deep Learning",
    tagline:
      "Helping parents track children's nutrition, with an AI fruit scanner.",
    summary:
      "Streamlit web app with authentication, child profiles with automatic BMI calculation, and daily nutrition tracking against recommended guidelines. The fruit scanner uses a MobileNetV2 classifier covering 24 fruits, including local fruits such as durian, rambutan, salak and longan, and shows each fruit's nutritional content.",
    metrics: [{ label: "Fruit classes", value: "24" }],
    stack: ["TensorFlow", "Keras", "OpenCV", "Streamlit"],
    links: {
      repo: "https://github.com/Joelcrl/NutriVision-Pro",
      demo: null, // TODO: README demo link is still a placeholder
      paper: null,
    },
    coverImage: null,
    team: null,
    date: "December 2025",
    core: true,
  },
  {
    slug: "skillswap",
    title: "SkillSwap",
    category: "Mobile App",
    tagline: "Trade skills instead of paying for courses.",
    summary:
      "Flutter and Firebase app where users list the skills they teach and want to learn, swipe through a Discover deck ranked by a Swap Fit score, and get matched only when both people like each other. Each swap has its own chat, both people mark their teaching turn done, then rate each other. Access rules are enforced by Firestore security rules.",
    metrics: [],
    stack: ["Flutter", "Firebase Auth", "Cloud Firestore", "Riverpod", "go_router"],
    links: {
      repo: "https://github.com/Joelcrl/Skill-Swap",
      demo: null,
      paper: null,
    },
    coverImage: null,
    team: null, // per Joel: describe stack and how it works only
    date: "June 2026",
    core: true,
  },
];

export const coreProjects = projects.filter((p) => p.core);
