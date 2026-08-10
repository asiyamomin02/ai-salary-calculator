import salaryData from '../data/salaryData.json';
import skillsDb from '../data/skills.json';

// 1. Currency mapping taaki 'IN' -> 'INR' me convert ho jaye
const CURRENCY_MAP = {
  IN: 'INR', US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', DE: 'EUR', FR: 'EUR', 
  NL: 'EUR', SG: 'SGD', AE: 'AED', JP: 'JPY', IL: 'ILS', CH: 'CHF', DK: 'DKK', 
  NO: 'NOK', BR: 'BRL', MX: 'MXN', CN: 'CNY', HK: 'HKD', NZ: 'NZD', AR: 'ARS'
};

// 2. Extra Multipliers for UI Dropdowns
const COLLEGE_MULTIPLIERS = { 'Tier 1': 0.15, 'Tier 2': 0.05, 'Tier 3': 0, '': 0 };
const INDUSTRY_MULTIPLIERS = {
  'Artificial Intelligence / ML': 0.12, 'FinTech': 0.10, 'Web3 & Blockchain': 0.10,
  'Cloud Computing & Web Services': 0.08, 'Software/Tech Product': 0.08,
  'Startup': 0.05, 'Cybersecurity': 0.05, 'Gaming & Entertainment': 0.05,
  'Banking & Financial Services': 0.05, 'Healthcare': 0.02, 'E-commerce': 0.03,
  'Consulting': 0.04, 'Enterprise/Corporate': 0.02, 'IT Services & Consulting': 0,
  'EdTech': 0, 'Telecom': 0, 'Manufacturing': -0.05, 'Retail': -0.05,
  'Government/Public Sector': -0.10, '': 0
};

// Fallback base salaries agar JSON me data missing ho
const FALLBACK_BASE = {
  IN: 500000, US: 70000, GB: 40000, CA: 65000, AU: 75000, DE: 50000, FR: 45000, 
  NL: 48000, SG: 65000, AE: 150000, JP: 4500000, BR: 70000, MX: 300000, default: 50000
};

// NAYA FUNCTION: Jo automatically ₹ ya $ lagayega comma ke sath
const formatCurrency = (amount, currencyCode) => {
  if (!amount) return '';
  return new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currencyCode || 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateSalary = (userProfile, targetRole = null) => {
  const { country, experienceBand, skills, collegeTier, industry } = userProfile;
  const roleToEvaluate = targetRole || userProfile.jobRole;

  // 1. Find the base salary from our data engine (JSON)
  let baseData = salaryData.find(
    (data) =>
      data.country === country &&
      data.jobRole === roleToEvaluate &&
      data.experienceBand === experienceBand
  );

  // Fallback if exact JSON data is missing
  if (!baseData) {
    let minBase = FALLBACK_BASE[country] || FALLBACK_BASE.default;

    // Experience multipliers for fallback
    if (experienceBand === '1-3 years (Junior)') minBase *= 1.3;
    else if (experienceBand === '3-5 years (Mid-Level)') minBase *= 1.8;
    else if (experienceBand === '5-8 years (Senior)') minBase *= 2.4;
    else if (experienceBand === '8-12 years (Lead)') minBase *= 3.0;
    else if (experienceBand === '12+ years (Principal/Expert)') minBase *= 4.0;

    baseData = {
      country: country || 'IN',
      jobRole: roleToEvaluate,
      experienceBand: experienceBand || '0-1 years (Entry Level)',
      minimumSalary: minBase,
      medianSalary: minBase * 1.25,
      maximumSalary: minBase * 1.6,
      confidence: "Estimated",
      source: "Market Projections",
      sourceDate: "2026-08-05"
    };
  }

  // 2. Calculate Skill Impact (Max Cap restricted to 25%)
  let skillBonusPercent = 0;
  const relevantSkillsFound = [];

  if (skills && skills.length > 0) {
    skills.forEach((userSkill) => {
      const skillInfo = skillsDb.find((s) => s.name === userSkill);
      if (skillInfo) {
        skillBonusPercent += skillInfo.maxImpactPercent;
        relevantSkillsFound.push(skillInfo.name);
      } else {
        // Agar skill JSON me missing hai toh default 2% boost de dein
        skillBonusPercent += 2;
        relevantSkillsFound.push(userSkill);
      }
    });
  }

  // The "Diminishing Returns" strict cap limit
  const MAX_SKILL_BOOST = 25; 
  if (skillBonusPercent > MAX_SKILL_BOOST) {
    skillBonusPercent = MAX_SKILL_BOOST;
  }

  // 3. College & Industry Impact Calculate Karein
  const collegeBonusPercent = COLLEGE_MULTIPLIERS[collegeTier] || 0;
  const industryBonusPercent = INDUSTRY_MULTIPLIERS[industry] || 0;

  // 4. Apply All Multipliers securely
  const totalBonusFactor = (skillBonusPercent / 100) + collegeBonusPercent + industryBonusPercent;
  const finalMultiplier = Math.max(1, 1 + totalBonusFactor); 

  const adjustedMin = Math.round(baseData.minimumSalary * finalMultiplier);
  const adjustedMedian = Math.round(baseData.medianSalary * finalMultiplier);
  const adjustedMax = Math.round(baseData.maximumSalary * finalMultiplier);

  // 5. Build safe factors array for UI display
  const finalFactors = [
    `${experienceBand || '0-1 years'} experience`,
    `${relevantSkillsFound.length} validated tech skills`,
    `${country || 'Selected'} market standard`
  ];

  if (collegeTier) finalFactors.push(`${collegeTier} College tier applied`);
  if (industry) finalFactors.push(`${industry} industry demand factored`);

  const finalCurrencyCode = CURRENCY_MAP[baseData.country] || 'USD';

  // 6. Return the strict output structure required
  return {
    role: roleToEvaluate,
    currencyCode: finalCurrencyCode, 
    minSalary: adjustedMin,
    medianSalary: adjustedMedian,
    maxSalary: adjustedMax,
    
    // YAHAN NAYE FORMATTED FIELDS HAIN
    formattedMinSalary: formatCurrency(adjustedMin, finalCurrencyCode),
    formattedMedianSalary: formatCurrency(adjustedMedian, finalCurrencyCode),
    formattedMaxSalary: formatCurrency(adjustedMax, finalCurrencyCode),

    confidence: baseData.confidence,
    source: {
      name: baseData.source,
      date: baseData.sourceDate
    },
    factors: finalFactors
  };
};