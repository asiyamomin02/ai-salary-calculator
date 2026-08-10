// src/data/learningData.js

export const learningResources = {
  'Data Analyst': {
    courses: [
      { title: "Google Data Analytics Professional Certificate", source: "Coursera (Audit for Free)", url: "https://www.coursera.org" },
      { title: "Data Analyst Bootcamp by Alex The Analyst", source: "YouTube", url: "https://www.youtube.com/c/AlexTheAnalyst" },
      { title: "SQL Tutorial for Beginners", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeJZ1OA" }
    ],
    keywords: ["Data Visualization", "ETL", "Dashboarding", "A/B Testing", "Data Cleaning", "KPI Metrics", "Statistical Analysis"],
    questions: [
      "What is the difference between WHERE and HAVING in SQL?",
      "How do you handle missing values in a dataset?",
      "Can you explain a time you found a surprising insight from data?"
    ]
  },
  'Machine Learning Engineer': {
    courses: [
      { title: "Machine Learning Specialization by Andrew Ng", source: "Coursera (Audit for Free)", url: "https://www.coursera.org" },
      { title: "Complete Machine Learning Playlist", source: "Krish Naik (YouTube)", url: "https://www.youtube.com/user/krishnaik06" },
      { title: "Fast.ai - Practical Deep Learning for Coders", source: "Fast.ai", url: "https://course.fast.ai/" }
    ],
    keywords: ["Model Deployment", "Hyperparameter Tuning", "Predictive Modeling", "TensorFlow/PyTorch", "MLOps", "Cross-validation"],
    questions: [
      "Explain the Bias-Variance Tradeoff.",
      "How do you prevent a model from overfitting?",
      "Describe the process of deploying an ML model into production."
    ]
  },
  'Generative AI Engineer': {
    courses: [
      { title: "Generative AI with Large Language Models", source: "AWS & DeepLearning.AI", url: "https://www.coursera.org" },
      { title: "LangChain & Vector Databases Full Course", source: "freeCodeCamp", url: "https://www.youtube.com" },
      { title: "Hugging Face NLP Course", source: "Hugging Face", url: "https://huggingface.co/course/chapter1/1" }
    ],
    keywords: ["RAG (Retrieval-Augmented Generation)", "Prompt Engineering", "LLM Fine-tuning", "Vector Search", "LangChain/LlamaIndex", "Semantic Search"],
    questions: [
      "What is RAG and how does it improve LLM responses?",
      "How do you handle hallucination in Large Language Models?",
      "Explain the difference between sparse and dense embeddings."
    ]
  },
  'Full Stack Developer': {
    courses: [
      { title: "The Odin Project - Full Stack Curriculum", source: "The Odin Project", url: "https://www.theodinproject.com/" },
      { title: "100xDevs / Web Dev Tutorials", source: "Harkirat Singh (YouTube)", url: "https://www.youtube.com" },
      { title: "Full Stack Development Bootcamp", source: "freeCodeCamp", url: "https://www.youtube.com" }
    ],
    keywords: ["RESTful APIs", "Microservices", "State Management", "CI/CD", "Responsive Design", "Server-Side Rendering (SSR)"],
    questions: [
      "What is the Virtual DOM in React and how does it work?",
      "Explain the difference between SQL and NoSQL databases.",
      "How do you secure a REST API?"
    ]
  },
  'default': {
    courses: [
      { title: "CS50: Introduction to Computer Science", source: "Harvard (edX)", url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x" },
      { title: "Tech Interview Prep", source: "freeCodeCamp", url: "https://www.youtube.com" }
    ],
    keywords: ["Problem Solving", "Agile Methodology", "System Design", "Version Control (Git)", "Team Collaboration", "Debugging"],
    questions: [
      "Describe a challenging technical problem you solved recently.",
      "Where do you see your career in the next 3 years?",
      "How do you keep your technical skills updated?"
    ]
  }
};