
# 🤖 AI Salary Calculator

An interactive, high-end web application built with React to provide accurate, data-driven salary estimates for Artificial Intelligence and Machine Learning (AI/ML) roles across multiple countries and experience tiers.

---

## 🌟 Features

- **Multi-Country & Currency Support:** Estimates localized salaries based on global markets (India, United States, UK, Canada, Australia, etc.).
- **Dynamic Role & Skill Matching:** Tailored tech-stack recommendations and multipliers based on specific AI/ML job titles (e.g., LLM Engineer, MLOps Engineer, Data Scientist).
- **Experience Bands:** Comprehensive experience tracking ranging from Entry-Level (`0–1 years`) to Principal/Expert (`12+ years`).
- **Smart Form Automation:** Automatic country-code mapping for WhatsApp inputs based on the selected location.
- **Robust Fallback Logic:** Built-in calculation engine (`salaryEngine.js`) to handle edge cases and provide accurate projections even if a specific dataset entry is missing.
- **Sleek & Responsive UI:** Clean, minimalist design with custom styling and smooth component transitions.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Inline CSS / Modern Flexbox & Grid UI Standards
- **Data Engine:** Custom JavaScript calculation engine with JSON datasets

---

## 🚀 Getting Started & Local Installation

To run this project locally on your machine, follow these simple steps:

### 1. Clone the Repository
```bash
git clone [https://github.com/asiyamomin02/ai-salary-calculator.git](https://github.com/asiyamomin02/ai-salary-calculator.git)
cd ai-salary-calculator
2. Install Dependencies
Make sure you have Node.js installed, then run:

Bash
npm install
3. Run the Development Server
Bash
npm run dev
Open your browser and navigate to the local URL provided by Vite (usually http://localhost:5173).

📂 Project Structure
Plaintext
ai-salary-calculator/
├── public/                # Static assets
├── src/
│   ├── data/              # JSON files for roles, skills, and base salaries
│   ├── services/          # Core calculation logic (salaryEngine.js)
│   ├── components/        # React components (SalarySimulator, SalaryResult, etc.)
│   ├── App.jsx            # Main App container
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
💡 Usage
Select your target Location (country code and currency adapt automatically).

Choose your Job Title to unlock role-specific technical skills.

Select your Years of Experience band and preferred technical Key Skills (up to 5).

Fill in optional details like College Background, Current Industry, Email, and WhatsApp Number.

Click Calculate Estimated Salary to view detailed salary breakdowns, market confidence metrics, and career projections.
