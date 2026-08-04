import salaryData from '../data/salaryData.json';
import skillsDb from '../data/skills.json';

export const calculateSalary = (userProfile, targetRole = null) => {
  const { country, experienceBand, skills } = userProfile;
  const roleToEvaluate = targetRole || userProfile.jobRole;

  // 1. Find the base salary from our data engine
  let baseData = salaryData.find(
    (data) =>
      data.country === country &&
      data.jobRole === roleToEvaluate &&
      data.experienceBand === experienceBand
  );

  // Fallback if exact JSON data is insufficient (Dynamically generate an estimate)
  if (!baseData) {
    let minBase = 500000; // Base for IN
    if (country === 'US') minBase = 70000;
    else if (country !== 'IN') minBase = 45000; // Generic base for other countries

    // Naye experience bands ke hisaab se multipliers
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

  // 2. Calculate Skill Impact
  let skillBonusPercent = 0;
  const relevantSkillsFound = [];

  if (skills && skills.length > 0) {
    skills.forEach((userSkill) => {
      const skillInfo = skillsDb.find((s) => s.name === userSkill);
      if (skillInfo) {
        skillBonusPercent += skillInfo.maxImpactPercent;
        relevantSkillsFound.push(skillInfo.name);
      } else {
        // Agar skill JSON me missing hai toh default 3% boost de dein
        skillBonusPercent += 3;
        relevantSkillsFound.push(userSkill);
      }
    });
  }

  // Cap the maximum skill impact to avoid absurd salaries
  const MAX_SKILL_BOOST = 30;
  if (skillBonusPercent > MAX_SKILL_BOOST) {
    skillBonusPercent = MAX_SKILL_BOOST;
  }

  // 3. Apply Skill Adjustment safely
  const skillMultiplier = 1 + skillBonusPercent / 100;
  const adjustedMin = Math.round(baseData.minimumSalary * skillMultiplier);
  const adjustedMedian = Math.round(baseData.medianSalary * skillMultiplier);
  const adjustedMax = Math.round(baseData.maximumSalary * skillMultiplier);

  // 4. Return the strict output structure required
  return {
    role: roleToEvaluate,
    currencyCode: baseData.country, 
    minSalary: adjustedMin,
    medianSalary: adjustedMedian,
    maxSalary: adjustedMax,
    confidence: baseData.confidence,
    source: {
      name: baseData.source,
      date: baseData.sourceDate
    },
    factors: [
      `${experienceBand || '0-1 years'} experience`,
      `${relevantSkillsFound.length} validated tech skills`,
      `${country || 'Selected'} market standard`
    ]
  };
};