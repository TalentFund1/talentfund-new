import { UnifiedSkill } from './categories/skillTypes';

// Helper function to generate a skill ID if none exists
const generateSkillId = (title: string, category: string): string => {
  const prefix = category.toUpperCase().slice(0, 3);
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3);
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SKILL_${prefix}_${cleanTitle}_${randomNum}`;
};

// Universal skills database with all skills and their metadata
const allSkills: UnifiedSkill[] = [
  {
    id: 'SKILL_ML_001',
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
    id: 'SKILL_DL_632',
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NLP_002',
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CV_003',
    title: "Computer Vision",
    subcategory: "AI Applications",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "25%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TF_004',
    title: "TensorFlow",
    subcategory: "ML Frameworks",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "20%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PY_839',
    title: "Python",
    subcategory: "Programming Languages",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "22%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PS_005',
    title: "Problem Solving",
    subcategory: "Core Skills",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "critical",
    level: "advanced",
    growth: "15%",
    salary: "$125,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_AWS_325',
    title: "AWS Certified Machine Learning - Specialty",
    subcategory: "Cloud Certifications",
    category: "certification",
    businessCategory: "Cloud Computing",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TDC_191',
    title: "TensorFlow Developer Certificate",
    subcategory: "AI Certifications",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "18%",
    salary: "$135,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_API_853',
    title: "API Development",
    subcategory: "Backend Development",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "24%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_OPT_965',
    title: "Performance Optimization",
    subcategory: "Software Engineering",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "advanced",
    growth: "20%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CR_524',
    title: "Code Review",
    subcategory: "Development Practices",
    category: "common",
    businessCategory: "Software Development",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$125,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TL_392',
    title: "Team Leadership",
    subcategory: "Leadership",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "critical",
    level: "advanced",
    growth: "18%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_K8S_427',
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Container Orchestration",
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
    id: 'SKILL_TW_794',
    title: "Technical Writing",
    subcategory: "Documentation",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "12%",
    salary: "$95,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_GIT_249',
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    businessCategory: "Software Development",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$110,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NJS_027',
    title: "Node.js",
    subcategory: "Backend Development",
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
    id: 'SKILL_TC_748',
    title: "Team Collaboration",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "14%",
    salary: "$105,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills from universal database:', allSkills.length, 'skills found');
  return allSkills.map(skill => ({
    ...skill,
    id: skill.id || generateSkillId(skill.title, skill.category)
  }));
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return allSkills.filter(skill => skill.category === category);
};

// Helper function to find a skill by ID
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by ID: ${id}`);
  return allSkills.find(skill => skill.id === id);
};

// Helper function to find a skill by title (case-insensitive)
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  const skill = allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
  if (!skill) {
    console.log(`Skill not found: ${title}`);
  }
  return skill;
};

// Role-specific skill categorization helpers
export const getSpecializedSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'specialized');
};

export const getCommonSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'common');
};

export const getCertificationSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    specialized: allSkills.filter(skill => skill.category === 'specialized').length,
    common: allSkills.filter(skill => skill.category === 'common').length,
    certification: allSkills.filter(skill => skill.category === 'certification').length
  },
  byWeight: {
    critical: allSkills.filter(skill => skill.weight === 'critical').length,
    technical: allSkills.filter(skill => skill.weight === 'technical').length,
    necessary: allSkills.filter(skill => skill.weight === 'necessary').length
  }
});