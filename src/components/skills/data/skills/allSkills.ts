import { UnifiedSkill } from '../../types/SkillTypes';

// Memoize the skills array to prevent unnecessary recalculations
let memoizedSkills: UnifiedSkill[] | null = null;

// Helper function to generate a skill ID if none exists
const generateSkillId = (title: string, category: string): string => {
  const prefix = category.toUpperCase().slice(0, 3);
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3);
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SKILL_${prefix}_${cleanTitle}_${randomNum}`;
};

// Define all skills in one place
const skillsData: UnifiedSkill[] = [
  {
    id: 'SKILL_ML_031',
    title: "Machine Learning",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "35%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_DL_862',
    title: "Deep Learning",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NLP_865',
    title: "Natural Language Processing",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CV_735',
    title: "Computer Vision",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TF_000',
    title: "TensorFlow",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PY_128',
    title: "Python",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "20%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_REA_873',
    title: "React",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_AWS_078',
    title: "AWS Certified Machine Learning - Specialty",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TF_008',
    title: "TensorFlow Developer Certificate",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_API_082',
    title: "API Development",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "22%",
    salary: "$125,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_SYS_678',
    title: "System Architecture",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "advanced",
    growth: "18%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_DB_123',
    title: "Database Design",
    category: "specialized",
    businessCategory: "Data Management",
    weight: "technical",
    level: "advanced",
    growth: "15%",
    salary: "$120,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_K8S_427',
    title: "Kubernetes Administrator (CKA)",
    category: "certification",
    businessCategory: "DevOps",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NJS_027',
    title: "Node.js",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "22%",
    salary: "$135,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TL_238',
    title: "Team Leadership",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "18%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TC_748',
    title: "Team Collaboration",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "14%",
    salary: "$105,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PO_686',
    title: "Performance Optimization",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "advanced",
    growth: "20%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  if (memoizedSkills) {
    return memoizedSkills;
  }

  console.log('Initializing skills database...');
  memoizedSkills = skillsData;
  console.log('Skills database initialized with', skillsData.length, 'skills');
  return skillsData;
};

// Helper function to get skills by category
const categoryCache: { [key: string]: UnifiedSkill[] } = {};
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  if (categoryCache[category]) {
    return categoryCache[category];
  }

  console.log(`Getting skills for category: ${category}`);
  const skills = getAllSkills().filter(skill => skill.category === category);
  categoryCache[category] = skills;
  return skills;
};

// Helper function to find a skill by title
const titleCache: { [key: string]: UnifiedSkill | undefined } = {};
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  const lowerTitle = title.toLowerCase();
  if (titleCache[lowerTitle] !== undefined) {
    return titleCache[lowerTitle];
  }

  console.log(`Finding skill by title: ${title}`);
  const skill = getAllSkills().find(skill => skill.title.toLowerCase() === lowerTitle);
  titleCache[lowerTitle] = skill;
  
  if (!skill) {
    console.log(`Skill not found: ${title}`);
  }
  return skill;
};

// Role-specific skill categorization helpers with memoization
const specializedCache: UnifiedSkill[] | null = null;
export const getSpecializedSkills = (): UnifiedSkill[] => {
  if (specializedCache) return specializedCache;
  return getAllSkills().filter(skill => skill.category === 'specialized');
};

const commonCache: UnifiedSkill[] | null = null;
export const getCommonSkills = (): UnifiedSkill[] => {
  if (commonCache) return commonCache;
  return getAllSkills().filter(skill => skill.category === 'common');
};

const certificationCache: UnifiedSkill[] | null = null;
export const getCertificationSkills = (): UnifiedSkill[] => {
  if (certificationCache) return certificationCache;
  return getAllSkills().filter(skill => skill.category === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

// Log initial skills data for debugging
console.log('Skills database loaded:', {
  total: getAllSkills().length,
  byCategory: {
    specialized: getSpecializedSkills().length,
    common: getCommonSkills().length,
    certification: getCertificationSkills().length
  }
});
