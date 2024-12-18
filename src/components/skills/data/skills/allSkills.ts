import { UnifiedSkill } from '../../types/SkillTypes';

// Define all skills in a single array with their core categorization
export const allSkills: UnifiedSkill[] = [
  // AI & ML Skills (Specialized)
  {
    id: 'SKILL001',
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "35%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL002',
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Web Development Skills (Specialized)
  {
    id: 'SKILL003',
    title: "React",
    subcategory: "Frontend Frameworks",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "Advanced",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Common Skills
  {
    id: 'SKILL007',
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "advanced",
    growth: "15%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Certifications
  {
    id: 'SKILL008',
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', allSkills.length, 'skills found');
  return allSkills;
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return allSkills.filter(skill => skill.category === category);
};

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  return allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
};

// New helper functions for role-specific skill categorization
export const getSpecializedSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'specialized');
};

export const getCommonSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'common');
};

export const getCertificationSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'certification');
};

export const Skills = {
  all: allSkills,
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    specialized: getSpecializedSkills().length,
    common: getCommonSkills().length,
    certification: getCertificationSkills().length
  }
});
