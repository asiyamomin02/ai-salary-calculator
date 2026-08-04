import React, { useState } from 'react';
import { calculateSalary } from '../services/salaryEngine';
import SalaryResult from './SalaryResult';

const roleSkillsMap = {
  'Data Analyst': ['Excel', 'SQL', 'Python', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'MySQL', 'PostgreSQL', 'Statistics', 'Data Visualization', 'Data Cleaning', 'Data Modeling', 'Google Sheets', 'Business Intelligence', 'KPI Analysis', 'Dashboard Development', 'Microsoft PowerPoint'],
  'Junior Data Scientist': ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'Statistics', 'Probability', 'Data Cleaning', 'Data Visualization', 'Matplotlib', 'Seaborn', 'Machine Learning', 'Feature Engineering', 'Jupyter', 'MySQL', 'PostgreSQL', 'Git', 'Power BI'],
  'Data Scientist': ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Statistics', 'Probability', 'Machine Learning', 'Deep Learning', 'Feature Engineering', 'NLP', 'Data Visualization', 'Matplotlib', 'Seaborn', 'Git', 'Jupyter', 'A/B Testing', 'Model Deployment'],
  'Senior Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Statistics', 'Probability', 'Feature Engineering', 'NLP', 'Computer Vision', 'MLOps', 'MLflow', 'Docker', 'AWS', 'Azure', 'Spark', 'A/B Testing', 'Model Deployment'],
  'Machine Learning Engineer': ['Python', 'SQL', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Machine Learning', 'Deep Learning', 'Feature Engineering', 'MLflow', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'CI/CD', 'Model Deployment', 'Model Monitoring', 'Spark', 'Hugging Face'],
  'Senior ML Engineer': ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Deep Learning', 'NLP', 'Computer Vision', 'MLflow', 'Kubernetes', 'Docker', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Model Deployment', 'Model Monitoring', 'Distributed Computing', 'Spark', 'System Design'],
  'Data Engineer': ['Python', 'SQL', 'Apache Spark', 'PySpark', 'Airflow', 'Kafka', 'ETL', 'ELT', 'Data Warehousing', 'Data Lakes', 'AWS', 'Azure', 'GCP', 'Snowflake', 'Databricks', 'PostgreSQL', 'MySQL', 'Docker', 'Kubernetes', 'dbt'],
  'Senior Data Engineer': ['Python', 'SQL', 'Spark', 'PySpark', 'Kafka', 'Airflow', 'Databricks', 'Snowflake', 'AWS', 'Azure', 'GCP', 'Data Lakes', 'Data Warehousing', 'ETL', 'ELT', 'dbt', 'Kubernetes', 'Docker', 'Data Modeling', 'Distributed Systems'],
  'AI Engineer': ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LLMs', 'RAG', 'LangChain', 'Hugging Face', 'OpenAI APIs', 'Vector Databases', 'Embeddings', 'AI Agents', 'Prompt Engineering', 'Docker', 'Kubernetes', 'AWS', 'Model Deployment', 'MLOps'],
  'GenAI Engineer': ['Python', 'LLMs', 'RAG', 'LangChain', 'LlamaIndex', 'Prompt Engineering', 'AI Agents', 'OpenAI APIs', 'Gemini APIs', 'Claude APIs', 'Hugging Face', 'Fine-tuning', 'Embeddings', 'Vector Databases', 'PyTorch', 'TensorFlow', 'Docker', 'Kubernetes', 'AWS', 'Evaluation & Monitoring'],
  'MLOps Engineer': ['Python', 'Docker', 'Kubernetes', 'MLflow', 'Kubeflow', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Git', 'GitHub Actions', 'Jenkins', 'Terraform', 'Model Deployment', 'Model Monitoring', 'Prometheus', 'Grafana', 'Airflow', 'Linux', 'Infrastructure as Code'],
  'Research Scientist': ['Python', 'PyTorch', 'TensorFlow', 'Deep Learning', 'Machine Learning', 'Statistics', 'Probability', 'Mathematics', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Transformers', 'LLMs', 'Research Methodology', 'Experiment Design', 'Scientific Computing', 'Jupyter', 'Git', 'CUDA', 'Academic Research'],
  'AI Product Manager': ['AI Product Strategy', 'Product Management', 'Machine Learning', 'Generative AI', 'LLMs', 'Prompt Engineering', 'User Research', 'Product Analytics', 'SQL', 'A/B Testing', 'Agile', 'Scrum', 'Roadmapping', 'KPI Management', 'Data Analysis', 'AI Ethics', 'AI Governance', 'Stakeholder Management', 'Product Design', 'Market Research'],
  'Analytics Manager': ['SQL', 'Python', 'Excel', 'Power BI', 'Tableau', 'Statistics', 'Data Visualization', 'Business Intelligence', 'Data Modeling', 'KPI Analysis', 'A/B Testing', 'Forecasting', 'Data Storytelling', 'Dashboard Development', 'Stakeholder Management', 'Team Leadership', 'Business Strategy', 'Project Management'],
  'Data Science Manager': ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Deep Learning', 'Data Visualization', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'MLOps', 'Experimentation', 'A/B Testing', 'Data Strategy', 'Team Leadership', 'Project Management', 'Stakeholder Management', 'Product Analytics', 'Business Strategy', 'Model Deployment', 'AI Strategy'],
  'Principal Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'Statistics', 'Probability', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision', 'MLOps', 'MLflow', 'Cloud Computing', 'Data Architecture', 'Experiment Design', 'AI Strategy', 'Technical Leadership', 'System Design', 'Research'],
  'Staff ML Engineer': ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'Distributed Systems', 'System Design', 'MLOps', 'Kubernetes', 'Docker', 'AWS', 'GCP', 'Azure', 'MLflow', 'Model Deployment', 'Model Monitoring', 'CI/CD', 'Spark', 'Kafka', 'Technical Leadership'],
  'Applied AI Engineer': ['Python', 'Machine Learning', 'Deep Learning', 'LLMs', 'RAG', 'LangChain', 'Hugging Face', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'AI Agents', 'Prompt Engineering', 'Embeddings', 'Vector Databases', 'OpenAI APIs', 'Docker', 'AWS', 'Model Deployment', 'MLOps'],
  'AI Solutions Architect': ['AI Architecture', 'Machine Learning', 'Generative AI', 'LLMs', 'RAG', 'Cloud Architecture', 'AWS', 'Azure', 'GCP', 'Python', 'Docker', 'Kubernetes', 'Vector Databases', 'AI Agents', 'API Design', 'System Design', 'Data Architecture', 'Security', 'MLOps', 'Technical Leadership'],
  'NLP Engineer': ['Python', 'NLP', 'Transformers', 'Hugging Face', 'PyTorch', 'TensorFlow', 'BERT', 'LLMs', 'NLTK', 'spaCy', 'Tokenization', 'Embeddings', 'RAG', 'Fine-tuning', 'Prompt Engineering', 'Machine Learning', 'Deep Learning', 'SQL', 'Docker', 'Model Deployment'],
  'Computer Vision Engineer': ['Python', 'OpenCV', 'PyTorch', 'TensorFlow', 'Computer Vision', 'Deep Learning', 'CNNs', 'Object Detection', 'Image Segmentation', 'YOLO', 'Image Classification', 'OCR', 'Image Processing', 'Transformers', 'CUDA', 'NumPy', 'Scikit-learn', 'Docker', 'AWS', 'Model Deployment'],
  'LLM Engineer': ['Python', 'LLMs', 'Transformers', 'Hugging Face', 'RAG', 'LangChain', 'LlamaIndex', 'Prompt Engineering', 'Fine-tuning', 'Embeddings', 'Vector Databases', 'OpenAI APIs', 'Gemini APIs', 'Claude APIs', 'AI Agents', 'PyTorch', 'NLP', 'Docker', 'Kubernetes', 'LLM Evaluation'],
  'Deep Learning Engineer': ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'Deep Learning', 'Neural Networks', 'CNNs', 'RNNs', 'Transformers', 'Computer Vision', 'NLP', 'GPU Computing', 'CUDA', 'NumPy', 'Scikit-learn', 'MLflow', 'Docker', 'Kubernetes', 'AWS', 'Model Deployment'],
  'Data Architect': ['SQL', 'Python', 'Data Architecture', 'Data Modeling', 'Data Warehousing', 'Data Lakes', 'ETL', 'Big Data', 'Spark', 'Snowflake', 'Databricks', 'AWS', 'Azure', 'GCP', 'Kafka', 'Airflow', 'PostgreSQL', 'MySQL', 'Data Governance', 'Distributed Systems'],
  'AI Solutions Engineer': ['Python', 'Machine Learning', 'Generative AI', 'LLMs', 'RAG', 'OpenAI APIs', 'Gemini APIs', 'Claude APIs', 'LangChain', 'AI Agents', 'Vector Databases', 'REST APIs', 'SQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'System Design', 'Model Deployment', 'MLOps'],
  'Business Intelligence Analyst': ['SQL', 'Excel', 'Power BI', 'Tableau', 'Data Visualization', 'Data Modeling', 'DAX', 'Power Query', 'MySQL', 'PostgreSQL', 'Business Intelligence', 'KPI Analysis', 'Data Cleaning', 'Statistics', 'Dashboard Development', 'Reporting', 'Data Storytelling', 'ETL'],
  'AI Evaluation Engineer': ['Python', 'LLMs', 'Generative AI', 'Prompt Engineering', 'Model Evaluation', 'AI Evaluation', 'NLP', 'Machine Learning', 'RAG', 'LLM Evaluation', 'Benchmarking', 'Data Analysis', 'SQL', 'Python Testing', 'PyTorch', 'Hugging Face', 'Model Monitoring', 'AI Safety', 'Bias Detection', 'Quality Assurance'],
  'Prompt Engineer': ['Prompt Engineering', 'LLMs', 'Generative AI', 'OpenAI APIs', 'Gemini APIs', 'Claude APIs', 'RAG', 'LangChain', 'LlamaIndex', 'AI Agents', 'NLP', 'Python', 'Embeddings', 'Vector Databases', 'Fine-tuning', 'LLM Evaluation', 'Prompt Optimization', 'AI Safety', 'Model Testing', 'Automation'],
  'Data Quality Analyst': ['SQL', 'Excel', 'Python', 'Pandas', 'Data Cleaning', 'Data Validation', 'Data Profiling', 'Data Quality', 'Data Governance', 'ETL', 'Power BI', 'Tableau', 'Statistics', 'MySQL', 'PostgreSQL', 'Data Testing', 'Data Reconciliation', 'Quality Assurance'],
  'Machine Learning Architect': ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'MLOps', 'MLflow', 'Kubernetes', 'Docker', 'AWS', 'Azure', 'GCP', 'System Design', 'Distributed Systems', 'Model Deployment', 'Model Monitoring', 'Data Architecture', 'AI Architecture', 'Security', 'Technical Leadership'],
  'Cloud Data Engineer': ['Python', 'SQL', 'AWS', 'Azure', 'GCP', 'Spark', 'PySpark', 'Kafka', 'Airflow', 'Snowflake', 'Databricks', 'BigQuery', 'Data Warehousing', 'Data Lakes', 'ETL', 'ELT', 'Docker', 'Kubernetes', 'Terraform', 'Data Modeling'],
  'Head of Data Science': ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'AI Strategy', 'Data Strategy', 'Data Architecture', 'MLOps', 'Cloud Computing', 'Statistics', 'Product Analytics', 'Business Intelligence', 'Data Governance', 'Team Leadership', 'Executive Communication', 'Budget Management', 'Hiring', 'Stakeholder Management', 'Project Management', 'Business Strategy'],
  'Director of AI': ['AI Strategy', 'Machine Learning', 'Generative AI', 'LLMs', 'AI Architecture', 'MLOps', 'Cloud Computing', 'AI Governance', 'AI Security', 'Product Strategy', 'Data Strategy', 'Technical Leadership', 'Team Management', 'Budget Management', 'Stakeholder Management', 'Risk Management', 'AI Ethics', 'Innovation Strategy', 'Project Management', 'Executive Communication'],
  'VP of AI / ML': ['AI Strategy', 'Machine Learning', 'Generative AI', 'LLMs', 'AI Architecture', 'MLOps', 'Cloud Architecture', 'Data Strategy', 'AI Governance', 'AI Security', 'Product Strategy', 'Business Strategy', 'Technical Leadership', 'Executive Leadership', 'Team Building', 'Budget Management', 'Risk Management', 'AI Ethics', 'Innovation Management', 'Stakeholder Management']
};

const countryDialCodes = {
  IN: '+91', US: '+1', AR: '+54', AU: '+61', BR: '+55', CA: '+1',
  CN: '+86', DK: '+45', FR: '+33', DE: '+49', HK: '+852', IL: '+972',
  JP: '+81', MX: '+52', NL: '+31', NZ: '+64', NO: '+47'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  backgroundColor: '#fff',
  fontSize: '14px',
  color: '#374151',
  boxSizing: 'border-box',
  outline: 'none'
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontWeight: '500',
  fontSize: '14px',
  color: '#374151',
  textAlign: 'left'
};

const SalarySimulator = () => {
  const [profile, setProfile] = useState({
    country: '', 
    jobRole: '', 
    experienceBand: '',
    skills: [],
    collegeTier: '',
    industry: '',
    email: '',
    whatsapp: ''
  });

  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const calculatedResult = calculateSalary(profile);
    setResult(calculatedResult);
  };

  const handleSkillToggle = (skill) => {
    setProfile(prev => {
      const isSelected = prev.skills.includes(skill);
      if (!isSelected && prev.skills.length >= 5) return prev; 
      
      const skills = isSelected
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleRoleChange = (e) => {
    setProfile({
      ...profile,
      jobRole: e.target.value,
      skills: [] 
    });
  };

  const currentRoleSkills = roleSkillsMap[profile.jobRole] || [];

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>AI Salary Calculator</h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Get accurate salary estimates for AI and Machine Learning roles</p>
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <label style={labelStyle}>
            <span style={{color: '#6b7280'}}>🌐 Location</span>
            <select 
              value={profile.country} 
              onChange={(e) => setProfile({...profile, country: e.target.value})}
              style={inputStyle}
              required
            >
              <option value="" disabled>Select your country</option>
              <option value="IN">🇮🇳 India</option>
              <option value="US">🇺🇸 United States</option>
              <option value="AR">🇦🇷 Argentina</option>
              <option value="AU">🇦🇺 Australia</option>
              <option value="BR">🇧🇷 Brazil</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="CN">🇨🇳 China</option>
              <option value="DK">🇩🇰 Denmark</option>
              <option value="FR">🇫🇷 France</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="HK">🇭🇰 Hong Kong</option>
              <option value="IL">🇮🇱 Israel</option>
              <option value="JP">🇯🇵 Japan</option>
              <option value="MX">🇲🇽 Mexico</option>
              <option value="NL">🇳🇱 Netherlands</option>
              <option value="NZ">🇳🇿 New Zealand</option>
              <option value="NO">🇳🇴 Norway</option>
            </select>
          </label>

          <label style={labelStyle}>
            <span style={{color: '#6b7280'}}>💼 Job Title</span>
            <select 
              value={profile.jobRole} 
              onChange={handleRoleChange}
              style={inputStyle}
              required
            >
              <option value="" disabled>Select your role</option>
              {Object.keys(roleSkillsMap).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>
        </div>

        <label style={labelStyle}>
          <span style={{color: '#6b7280'}}>📅 Years of Experience</span>
          <select 
            value={profile.experienceBand} 
            onChange={(e) => setProfile({...profile, experienceBand: e.target.value})}
            style={inputStyle}
            required
          >
            <option value="" disabled>Select experience level</option>
            <option value="0-1 years (Entry Level)">0–1 years (Entry Level)</option>
            <option value="1-3 years (Junior)">1–3 years (Junior)</option>
            <option value="3-5 years (Mid-Level)">3–5 years (Mid-Level)</option>
            <option value="5-8 years (Senior)">5–8 years (Senior)</option>
            <option value="8-12 years (Lead)">8–12 years (Lead)</option>
            <option value="12+ years (Principal/Expert)">12+ years (Principal/Expert)</option>
          </select>
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
          <span style={{ fontWeight: '500', fontSize: '14px', color: '#6b7280' }}>⚙️ Key Skills (Select up to 5 skills)</span>
          
          {!profile.jobRole ? (
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '8px', fontSize: '14px' }}>
              Please select a job title first to see relevant skills
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {currentRoleSkills.map(skill => (
                <label key={skill} style={{ 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  border: '1px solid',
                  backgroundColor: profile.skills.includes(skill) ? '#eff6ff' : '#fff',
                  borderColor: profile.skills.includes(skill) ? '#3b82f6' : '#d1d5db',
                  color: profile.skills.includes(skill) ? '#1d4ed8' : '#4b5563',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  userSelect: 'none',
                  transition: 'all 0.2s ease'
                }}>
                  <input 
                    type="checkbox" 
                    checked={profile.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    style={{ display: 'none' }} 
                  /> 
                  {skill}
                </label>
              ))}
            </div>
          )}
        </div>

        <label style={labelStyle}>
          <span style={{color: '#6b7280'}}>🎓 College Background</span>
          <select 
            value={profile.collegeTier} 
            onChange={(e) => setProfile({...profile, collegeTier: e.target.value})}
            style={inputStyle}
          >
            <option value="" disabled>Select college tier</option>
            <option value="Tier 1">Tier 1 </option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
          </select>
        </label>

        <label style={labelStyle}>
          <span style={{color: '#6b7280'}}>🏢 Current Industry</span>
          <select 
            value={profile.industry} 
            onChange={(e) => setProfile({...profile, industry: e.target.value})}
            style={inputStyle}
          >
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
            <option value="Telecom">Telecom</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Government/Public Sector">Government/Public Sector</option>
          </select>
        </label>

        <label style={labelStyle}>
          <span style={{color: '#6b7280'}}>✉️ Email Address <span style={{color: '#ef4444'}}>*</span></span>
          <input 
            type="email"
            value={profile.email} 
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            placeholder="Enter your email for 100+ FREE AI/ML certificate courses"
            style={inputStyle}
            required
          />
        </label>

        <label style={labelStyle}>
          <span style={{color: '#6b7280'}}>💬 WhatsApp Number (Optional)</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              ...inputStyle, 
              width: '70px', 
              padding: '10px 0', 
              textAlign: 'center', 
              backgroundColor: '#f3f4f6', 
              color: '#4b5563',
              border: '1px solid #d1d5db',
              fontWeight: '500'
            }}>
              {profile.country ? countryDialCodes[profile.country] : '+--'}
            </div>
            <input 
              type="tel"
              value={profile.whatsapp} 
              onChange={(e) => setProfile({...profile, whatsapp: e.target.value})}
              placeholder="Get personalised learning roadmap with career projections"
              style={{...inputStyle, flex: 1}}
            />
          </div>
        </label>

        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            backgroundColor: '#000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '16px',
            width: '100%'
          }}
        >
          Calculate Estimated Salary
        </button>
      </form>

      <SalaryResult result={result} />
    </div>
  );
};

export default SalarySimulator;