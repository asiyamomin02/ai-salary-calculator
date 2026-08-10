import React, { useState } from 'react';
import { calculateSalary } from '../services/salaryEngine'; 
import SalaryResult from './SalaryResult';

// --- DATA SECTION (unchanged) ---
const JOB_ROLES_WITH_SKILLS = {
  // Software, Cloud & DevOps
  'Full Stack Developer': { category: 'Software, Cloud & DevOps', skills: ['React', 'Node.js', 'Next.js', 'Express.js', 'TypeScript', 'JavaScript', 'Python', 'HTML5/CSS3', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL', 'Docker', 'Git', 'CI/CD', 'AWS', 'Redis', 'System Design', 'Unit Testing'] },
  'Backend Developer': { category: 'Software, Cloud & DevOps', skills: ['Python', 'Java', 'Node.js', 'Go', 'C++', 'Django', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'REST APIs', 'GraphQL', 'Docker', 'Kubernetes', 'Microservices', 'AWS', 'System Design'] },
  'Frontend Developer': { category: 'Software, Cloud & DevOps', skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS', 'Redux', 'Zustand', 'Webpack', 'Vite', 'REST APIs', 'GraphQL', 'Figma', 'Jest', 'Cypress', 'Responsive Design'] },
  'Web Scraping & Data Mining Specialist': { category: 'Software, Cloud & DevOps', skills: ['Python', 'Beautiful Soup', 'Scrapy', 'Selenium', 'Playwright', 'Puppeteer', 'Request-HTML', 'Proxy Management', 'Anti-Bot Bypass', 'Regex', 'LXML', 'Headless Browsers', 'Data Parsing', 'Pandas', 'JSON/XML', 'MongoDB', 'CAPTCHA Solving', 'REST APIs'] },
  'DevOps Engineer': { category: 'Software, Cloud & DevOps', skills: ['Linux', 'Bash', 'Python', 'Go', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'AWS', 'Azure', 'GCP', 'Prometheus', 'Grafana', 'ELK Stack', 'CI/CD', 'Infrastructure as Code'] },
  'Cloud Architect': { category: 'Software, Cloud & DevOps', skills: ['AWS', 'Azure', 'GCP', 'Cloud Architecture', 'Serverless', 'Docker', 'Kubernetes', 'Terraform', 'Microservices', 'System Design', 'Network Security', 'IAM', 'CloudFormation', 'Python', 'CI/CD'] },
  'Cybersecurity Analyst': { category: 'Software, Cloud & DevOps', skills: ['Network Security', 'Penetration Testing', 'Ethical Hacking', 'Linux', 'Python', 'SIEM', 'Firewalls', 'Wireshark', 'Splunk', 'Cryptography', 'Vulnerability Assessment', 'OWASP Top 10', 'Cloud Security', 'Incident Response', 'IAM'] },
  'Software Engineer': { category: 'Software, Cloud & DevOps', skills: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'Data Structures', 'Algorithms', 'System Design', 'SQL', 'NoSQL', 'Git', 'Docker', 'REST APIs', 'Testing', 'CI/CD', 'Agile', 'Microservices', 'AWS'] },

  // Artificial Intelligence & GenAI
  'Generative AI Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'LLMs', 'RAG', 'LangChain', 'LlamaIndex', 'Prompt Engineering', 'AI Agents', 'OpenAI APIs', 'Gemini APIs', 'Claude APIs', 'Hugging Face', 'Fine-Tuning', 'Vector Databases', 'Pinecone', 'ChromaDB', 'Embeddings', 'PyTorch', 'Model Evaluation', 'Docker', 'AWS'] },
  'LLM Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'Transformers', 'Hugging Face', 'PyTorch', 'TensorFlow', 'Fine-Tuning', 'LoRA', 'RLHF', 'RAG', 'Vector Databases', 'LangChain', 'Embeddings', 'Prompt Optimization', 'LLM Evaluation', 'CUDA', 'Docker', 'Kubernetes'] },
  'AI Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LLMs', 'RAG', 'LangChain', 'Hugging Face', 'Vector Databases', 'AI Agents', 'Prompt Engineering', 'Docker', 'Kubernetes', 'AWS', 'Model Deployment', 'FastAPI'] },
  'Machine Learning Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'SQL', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Machine Learning', 'Deep Learning', 'Feature Engineering', 'MLflow', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'CI/CD', 'Model Deployment', 'Spark', 'FastAPI'] },
  'MLOps Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'Docker', 'Kubernetes', 'MLflow', 'Kubeflow', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Git', 'GitHub Actions', 'Jenkins', 'Terraform', 'Model Deployment', 'Prometheus', 'Grafana', 'Airflow', 'Linux'] },
  'Prompt Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Prompt Engineering', 'LLMs', 'Generative AI', 'OpenAI APIs', 'Claude APIs', 'Gemini APIs', 'RAG', 'LangChain', 'AI Agents', 'NLP', 'Python', 'Few-Shot Prompting', 'Chain of Thought', 'Prompt Optimization', 'LLM Evaluation', 'AI Safety'] },
  'NLP Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'NLP', 'Transformers', 'Hugging Face', 'PyTorch', 'TensorFlow', 'BERT', 'LLMs', 'NLTK', 'spaCy', 'Tokenization', 'Embeddings', 'RAG', 'Fine-Tuning', 'Machine Learning', 'Deep Learning', 'Regex', 'Text Classification'] },
  'Computer Vision Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'OpenCV', 'PyTorch', 'TensorFlow', 'Deep Learning', 'CNNs', 'Object Detection', 'Image Segmentation', 'YOLO', 'Image Classification', 'OCR', 'Image Processing', 'Vision Transformers', 'CUDA', 'NumPy', 'Docker', 'AWS'] },
  'AI Research Scientist': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'PyTorch', 'TensorFlow', 'Deep Learning', 'Machine Learning', 'Mathematics', 'Statistics', 'Probability', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Transformers', 'LLMs', 'Scientific Computing', 'CUDA'] },
  'AI Evaluation Engineer': { category: 'Artificial Intelligence & GenAI', skills: ['Python', 'LLMs', 'Generative AI', 'Model Evaluation', 'Prompt Engineering', 'NLP', 'Machine Learning', 'RAG', 'Benchmarking', 'Data Analysis', 'SQL', 'Testing Frameworks', 'PyTorch', 'Hugging Face', 'AI Safety', 'Bias Detection'] },

  // Data Engineering & Analytics
  'Data Analyst': { category: 'Data Engineering & Analytics', skills: ['Excel', 'SQL', 'Python', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'MySQL', 'PostgreSQL', 'Statistics', 'Data Visualization', 'Data Cleaning', 'Data Modeling', 'Business Intelligence', 'KPI Analysis', 'Dashboard Development', 'A/B Testing'] },
  'Data Scientist': { category: 'Data Engineering & Analytics', skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Statistics', 'Probability', 'Machine Learning', 'Feature Engineering', 'NLP', 'Data Visualization', 'Matplotlib', 'Seaborn', 'A/B Testing', 'Model Deployment', 'XGBoost'] },
  'Data Engineer': { category: 'Data Engineering & Analytics', skills: ['Python', 'SQL', 'Apache Spark', 'PySpark', 'Airflow', 'Kafka', 'ETL', 'ELT', 'Data Warehousing', 'Data Lakes', 'AWS', 'Azure', 'Snowflake', 'Databricks', 'PostgreSQL', 'Docker', 'Kubernetes', 'dbt'] },
  'Cloud Data Engineer': { category: 'Data Engineering & Analytics', skills: ['Python', 'SQL', 'AWS', 'Azure', 'GCP', 'Spark', 'Kafka', 'Airflow', 'Snowflake', 'Databricks', 'Data Warehousing', 'Data Lakes', 'ETL', 'Docker', 'Terraform', 'CI/CD', 'Data Modeling'] },
  'Analytics Engineer': { category: 'Data Engineering & Analytics', skills: ['SQL', 'dbt', 'Python', 'Data Modeling', 'Data Warehousing', 'Snowflake', 'BigQuery', 'Redshift', 'ETL', 'ELT', 'Git', 'CI/CD', 'Power BI', 'Tableau', 'Airflow', 'Business Intelligence'] },
  'Business Intelligence Analyst': { category: 'Data Engineering & Analytics', skills: ['SQL', 'Excel', 'Power BI', 'Tableau', 'Looker', 'Data Visualization', 'Data Modeling', 'DAX', 'Power Query', 'Business Intelligence', 'KPI Analysis', 'Data Cleaning', 'Statistics', 'Dashboard Development', 'Data Storytelling'] },
  'Data Architect': { category: 'Data Engineering & Analytics', skills: ['SQL', 'Python', 'Data Architecture', 'Data Modeling', 'Data Warehousing', 'Data Lakes', 'ETL', 'Big Data', 'Spark', 'Snowflake', 'Databricks', 'AWS', 'Azure', 'GCP', 'Kafka', 'Data Governance', 'System Design'] },
  'Data Quality Analyst': { category: 'Data Engineering & Analytics', skills: ['SQL', 'Excel', 'Python', 'Pandas', 'Data Cleaning', 'Data Validation', 'Data Profiling', 'Data Quality', 'Data Governance', 'ETL', 'Power BI', 'Tableau', 'Statistics', 'Data Testing', 'Quality Assurance'] },

  // Tech Leadership & Product
  'AI Product Manager': { category: 'Tech Leadership & Product', skills: ['AI Product Strategy', 'Product Management', 'Machine Learning', 'Generative AI', 'LLMs', 'Prompt Engineering', 'User Research', 'Product Analytics', 'SQL', 'A/B Testing', 'Agile', 'Roadmapping', 'KPI Management', 'AI Ethics', 'Stakeholder Management'] },
  'AI Solutions Architect': { category: 'Tech Leadership & Product', skills: ['AI Architecture', 'Machine Learning', 'Generative AI', 'LLMs', 'RAG', 'Cloud Architecture', 'AWS', 'Azure', 'GCP', 'Python', 'Docker', 'Kubernetes', 'Vector Databases', 'AI Agents', 'System Design', 'Security', 'MLOps'] },
  'Head of Data / Director of AI': { category: 'Tech Leadership & Product', skills: ['AI Strategy', 'Machine Learning', 'Data Strategy', 'Generative AI', 'AI Architecture', 'Cloud Computing', 'AI Governance', 'Team Leadership', 'Budget Management', 'Stakeholder Management', 'Product Analytics', 'Business Strategy', 'Executive Communication'] }
};

const JOB_CATEGORIES = ['Software, Cloud & DevOps', 'Artificial Intelligence & GenAI', 'Data Engineering & Analytics', 'Tech Leadership & Product'];

const COUNTRIES = [
  { id: 'IN', name: 'India', flag: '🇮🇳', dial: '+91' },
  { id: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
  { id: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { id: 'CA', name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { id: 'AU', name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { id: 'DE', name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { id: 'FR', name: 'France', flag: '🇫🇷', dial: '+33' },
  { id: 'NL', name: 'Netherlands', flag: '🇳🇱', dial: '+31' },
  { id: 'SG', name: 'Singapore', flag: '🇸🇬', dial: '+65' },
  { id: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dial: '+971' },
  { id: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81' },
  { id: 'IL', name: 'Israel', flag: '🇮🇱', dial: '+972' },
  { id: 'CH', name: 'Switzerland', flag: '🇨🇭', dial: '+41' },
  { id: 'DK', name: 'Denmark', flag: '🇩🇰', dial: '+45' },
  { id: 'NO', name: 'Norway', flag: '🇳🇴', dial: '+47' },
  { id: 'BR', name: 'Brazil', flag: '🇧🇷', dial: '+55' },
  { id: 'MX', name: 'Mexico', flag: '🇲🇽', dial: '+52' },
  { id: 'CN', name: 'China', flag: '🇨🇳', dial: '+86' },
  { id: 'HK', name: 'Hong Kong', flag: '🇭🇰', dial: '+852' },
  { id: 'NZ', name: 'New Zealand', flag: '🇳🇿', dial: '+64' },
  { id: 'AR', name: 'Argentina', flag: '🇦🇷', dial: '+54' }
];

const countryDialCodes = COUNTRIES.reduce((acc, curr) => { acc[curr.id] = curr.dial; return acc; }, {});

// --- DESIGN TOKENS ---
// Instrument-panel aesthetic: a calibrated "measurement" motif carried from
// the hero through the form steps into the results gauge. Cool graphite +
// signal teal, with a muted gold used only for benchmark markers.
const THEME = {
  bg: '#F5F6F4',
  surface: '#FFFFFF',
  border: '#E2E5E0',
  borderStrong: '#CBD1C8',
  ink: '#12181A',
  inkMuted: '#5B6360',
  inkFaint: '#8E958F',
  signal: '#0B6E5C',
  signalDeep: '#08503F',
  signalSoft: '#E4F1EC',
  gold: '#9C6B14',
  goldSoft: '#F5EEDD',
  danger: '#B3261E',
  fontDisplay: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
  fontBody: "'Inter', -apple-system, system-ui, sans-serif",
};

const FONT_IMPORTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700&display=swap');`;

const GLOBAL_CSS = `
${FONT_IMPORTS}
.asc-root * { box-sizing: border-box; }
.asc-root select.asc-field, .asc-root input.asc-field {
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}
.asc-root select.asc-field:focus, .asc-root input.asc-field:focus {
  outline: none;
  border-color: ${THEME.signal};
  box-shadow: 0 0 0 3px ${THEME.signalSoft};
  background-color: #ffffff;
}
.asc-root .asc-chip { transition: all 0.15s ease; }
.asc-root .asc-chip:hover { border-color: ${THEME.borderStrong}; }
.asc-root .asc-btn-primary {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.asc-root .asc-btn-primary:hover { background-color: ${THEME.signalDeep}; }
.asc-root .asc-btn-primary:active { transform: scale(0.99); }
@keyframes asc-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.asc-fade-up { animation: asc-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
`;

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: '8px',
  border: `1px solid ${THEME.border}`, backgroundColor: '#FBFCFB',
  fontSize: '14.5px', color: THEME.ink, boxSizing: 'border-box',
  fontFamily: THEME.fontBody, fontWeight: 500,
};

const labelStyle = {
  display: 'flex', flexDirection: 'column', gap: '8px',
  fontWeight: '600', fontSize: '13px', color: THEME.inkMuted, textAlign: 'left',
  fontFamily: THEME.fontBody, letterSpacing: '0.01em',
};

const sectionEyebrow = (num, title) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
    <span style={{
      fontFamily: THEME.fontMono, fontSize: '11px', fontWeight: 600, color: THEME.signal,
      backgroundColor: THEME.signalSoft, borderRadius: '4px', padding: '2px 7px', letterSpacing: '0.02em'
    }}>{num}</span>
    <span style={{
      fontFamily: THEME.fontDisplay, fontSize: '13px', fontWeight: 600, color: THEME.ink,
      textTransform: 'uppercase', letterSpacing: '0.06em'
    }}>{title}</span>
  </div>
);

// --- MAIN COMPONENT ---
const SalarySimulator = () => {
  const [profile, setProfile] = useState({
    country: '', jobRole: '', experienceBand: '', skills: [],
    collegeTier: '', industry: '', email: '', whatsapp: ''
  });

  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setResult(calculateSalary(profile));
  };

  const handleSkillToggle = (skill) => {
    setProfile(prev => {
      const isSelected = prev.skills.includes(skill);
      const skills = isSelected ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleRoleChange = (e) => {
    setProfile({ ...profile, jobRole: e.target.value, skills: [] });
  };

  const currentRoleSkills = JOB_ROLES_WITH_SKILLS[profile.jobRole]?.skills || [];

  return (
    <div className="asc-root" style={{ backgroundColor: THEME.bg, padding: '56px 20px' }}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ maxWidth: '880px', margin: '0 auto', fontFamily: THEME.fontBody, color: THEME.ink }}>

        {/* --- HERO SECTION --- */}
        <div className="asc-fade-up" style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px',
            fontFamily: THEME.fontMono, fontSize: '11.5px', fontWeight: 600, color: THEME.signal,
            letterSpacing: '0.08em', textTransform: 'uppercase'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: THEME.signal, display: 'inline-block' }} />
            Live market calibration
          </div>
          <h1 style={{
            fontFamily: THEME.fontDisplay, fontSize: '38px', fontWeight: '700', color: THEME.ink,
            marginBottom: '14px', letterSpacing: '-0.01em', lineHeight: 1.15
          }}>
            Discover your true market value
          </h1>
          <p style={{ color: THEME.inkMuted, fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: '1.6' }}>
            An AI/ML/Data salary estimate calibrated against government data, industry surveys, and live job markets — not a guess.
          </p>

          {/* --- STAT TICKER (replaces generic icon cards) --- */}
          <div style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0',
            marginTop: '30px', border: `1px solid ${THEME.border}`, borderRadius: '10px',
            backgroundColor: THEME.surface, overflow: 'hidden'
          }}>
            {[
              { n: '20+', l: 'countries covered' },
              { n: '30+', l: 'AI/tech roles' },
              { n: 'Live', l: 'market data' },
            ].map((s, i) => (
              <div key={s.l} style={{
                padding: '16px 28px', textAlign: 'center',
                borderRight: i < 2 ? `1px solid ${THEME.border}` : 'none', flex: '1 1 0'
              }}>
                <div style={{ fontFamily: THEME.fontMono, fontSize: '19px', fontWeight: 600, color: THEME.ink }}>{s.n}</div>
                <div style={{ fontSize: '12px', color: THEME.inkFaint, marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MAIN FORM PANEL --- */}
        <div className="asc-fade-up" style={{
          backgroundColor: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: '16px',
          padding: '36px', boxShadow: '0 1px 2px rgba(18,24,26,0.04), 0 12px 32px -12px rgba(18,24,26,0.08)',
          animationDelay: '0.05s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: THEME.fontDisplay, fontSize: '19px', fontWeight: '700', color: THEME.ink, margin: 0 }}>
              Salary Calculator
            </h2>
            <span style={{ fontFamily: THEME.fontMono, fontSize: '11.5px', color: THEME.inkFaint }}>5 fields</span>
          </div>

          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>

            <div>
              {sectionEyebrow('01', 'Location & role')}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '14px' }}>
                <label style={labelStyle}>
                  <span>Country</span>
                  <select className="asc-field" value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} style={inputStyle} required>
                    <option value="" disabled>Select your country</option>
                    {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
                  </select>
                </label>

                <label style={labelStyle}>
                  <span>Job title</span>
                  <select className="asc-field" value={profile.jobRole} onChange={handleRoleChange} style={inputStyle} required>
                    <option value="" disabled>Select your role</option>
                    {JOB_CATEGORIES.map(category => (
                      <optgroup key={category} label={category}>
                        {Object.keys(JOB_ROLES_WITH_SKILLS).filter(r => JOB_ROLES_WITH_SKILLS[r].category === category).map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div>
              {sectionEyebrow('02', 'Experience')}
              <label style={{ ...labelStyle, marginTop: '14px' }}>
                <span>Years of experience</span>
                <select className="asc-field" value={profile.experienceBand} onChange={(e) => setProfile({...profile, experienceBand: e.target.value})} style={inputStyle} required>
                  <option value="" disabled>Select experience level</option>
                  <option value="0-1 years (Entry Level)">0–1 years (Entry Level)</option>
                  <option value="1-3 years (Junior)">1–3 years (Junior)</option>
                  <option value="3-5 years (Mid-Level)">3–5 years (Mid-Level)</option>
                  <option value="5-8 years (Senior)">5–8 years (Senior)</option>
                  <option value="8-12 years (Lead)">8–12 years (Lead)</option>
                  <option value="12+ years (Principal/Expert)">12+ years (Principal/Expert)</option>
                </select>
              </label>
            </div>

            <div>
              {sectionEyebrow('03', 'Skills')}
              <div style={{ marginTop: '14px' }}>
                {!profile.jobRole ? (
                  <div style={{
                    padding: '18px', backgroundColor: THEME.bg, color: THEME.inkMuted, borderRadius: '10px',
                    fontSize: '13.5px', textAlign: 'center', border: `1px dashed ${THEME.border}`
                  }}>
                    Select a job title first to see relevant skills
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                    {currentRoleSkills.map(skill => {
                      const active = profile.skills.includes(skill);
                      return (
                        <label key={skill} className="asc-chip" style={{
                          padding: '9px 14px', borderRadius: '8px', border: '1px solid',
                          backgroundColor: active ? THEME.signalSoft : '#FBFCFB',
                          borderColor: active ? THEME.signal : THEME.border,
                          color: active ? THEME.signalDeep : THEME.inkMuted,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                          fontSize: '13px', fontWeight: '500'
                        }}>
                          <input type="checkbox" checked={active} onChange={() => handleSkillToggle(skill)} style={{ width: '14px', height: '14px', accentColor: THEME.signal }} />
                          {skill}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div>
              {sectionEyebrow('04', 'Background')}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '14px' }}>
                <label style={labelStyle}>
                  <span>College background</span>
                  <select className="asc-field" value={profile.collegeTier} onChange={(e) => setProfile({...profile, collegeTier: e.target.value})} style={inputStyle}>
                    <option value="" disabled>Select college tier</option>
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                    <option value="Tier 3">Tier 3</option>
                  </select>
                </label>

                <label style={labelStyle}>
                  <span>Current industry</span>
                  <select className="asc-field" value={profile.industry} onChange={(e) => setProfile({...profile, industry: e.target.value})} style={inputStyle}>
                    <option value="" disabled>Select your industry</option>
                    <option value="FinTech">FinTech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Startup">Startup</option>
                    <option value="Enterprise/Corporate">Enterprise/Corporate</option>
                    <option value="Banking & Financial Services">Banking & Financial Services</option>
                    <option value="IT Services & Consulting">IT Services & Consulting</option>
                    <option value="Software/Tech Product">Software/Tech Product</option>
                    <option value="Artificial Intelligence / ML">Artificial Intelligence / ML</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Cloud Computing & Web Services">Cloud Computing & Web Services</option>
                  </select>
                </label>
              </div>
            </div>

            <div>
              {sectionEyebrow('05', 'Contact')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '14px' }}>
                <label style={labelStyle}>
                  <span>Email address <span style={{ color: THEME.danger }}>*</span></span>
                  <input className="asc-field" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="you@email.com — for 100+ free AI/ML courses" style={inputStyle} required />
                </label>

                <label style={labelStyle}>
                  <span>WhatsApp number (optional)</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ ...inputStyle, width: '76px', textAlign: 'center', backgroundColor: THEME.bg, color: THEME.inkMuted, fontFamily: THEME.fontMono }}>
                      {profile.country ? countryDialCodes[profile.country] : '+--'}
                    </div>
                    <input className="asc-field" type="tel" value={profile.whatsapp} onChange={(e) => setProfile({...profile, whatsapp: e.target.value})} placeholder="For a personalised learning roadmap" style={{ ...inputStyle, flex: 1 }} />
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="asc-btn-primary" style={{
              padding: '15px', backgroundColor: THEME.signal, color: '#ffffff', border: 'none',
              borderRadius: '9px', cursor: 'pointer', fontSize: '15px', fontWeight: '600',
              fontFamily: THEME.fontDisplay, marginTop: '6px', letterSpacing: '0.01em'
            }}>
              Calculate my estimated salary
            </button>
          </form>
        </div>

        <SalaryResult result={result} />
      </div>
    </div>
  );
};

export default SalarySimulator;
