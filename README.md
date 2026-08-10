AI Salary Calculator
An interactive, professional web application built with React to provide accurate, data-driven salary estimates for Artificial Intelligence, Machine Learning, and Tech roles across multiple countries and experience tiers.

🌟 Key Features
Multi-Country & Currency Support: Estimates localized salaries with automatic currency formatting (e.g., ₹ for India, $ for US) across global markets.

Dynamic Role & Skill Matching: Categorized job titles with role-specific technical skills (Software, GenAI, Data Analytics, and Leadership).

Market Position Gauge: Interactive horizontal calibration gauge visualizing minimum, median, average, maximum, and top 10% salary benchmarks.

Free Learning Hub & Resume Prep: Integrated free course recommendations with direct links, ATS resume keywords, and top technical interview questions tailored to each role.

Career Path Explorer & Interactive Modals: Strategic career progression paths with interactive popup modals showing step-by-step milestones, timelines, and target salaries.

Sleek & Professional UI: Modern minimal design using custom design tokens, Space Grotesk/Inter typography, responsive flex/grid layouts, and smooth fade-up animations.

🛠️ Tech Stack
Frontend: React.js

Styling: Custom inline design tokens & modern CSS Flexbox/Grid

Data Engine: Custom JavaScript calculation engine with structured JSON datasets

🚀 Getting Started & Local Installation
To run this project locally on your machine, follow these steps:

1. Clone the Repository
Bash
git clone https://github.com/asiyamomin02/ai-salary-calculator.git
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
│   ├── data/              # Role-specific datasets and learning resources (learningData.js)
│   ├── services/          # Core calculation logic (salaryEngine.js)
│   ├── components/        # React components (SalarySimulator.jsx, SalaryResult.jsx)
│   ├── App.jsx            # Main App container
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
💡 Usage
Select your target Location and Job Title (categorized by domain).

Choose your Years of Experience level and select relevant Key Skills.

Fill in additional parameters like College Background, Current Industry, Email, and optional WhatsApp Number.

Click Calculate Estimated Salary to view:

Your precise salary range and median breakdown.

An interactive Market Position Gauge.

Curated Free Learning Resources with direct links, ATS Resume Keywords, and Interview Questions.

The Career Path Explorer featuring interactive modal popups with step-by-step promotion milestones.
