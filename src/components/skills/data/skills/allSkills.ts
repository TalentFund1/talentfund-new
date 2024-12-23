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

// Unified skills database without subcategories
const skillsData: UnifiedSkill[] = [
  // Specialized Skills
  {
    id: 'SKILL_ML_001',
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
    id: 'SKILL_DL_002',
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
    id: 'SKILL_NLP_003',
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
    id: 'SKILL_CV_004',
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
    id: 'SKILL_TF_005',
    title: "TensorFlow",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "25%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PY_006',
    title: "Python",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "20%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_REACT_007',
    title: "React",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "25%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NODE_008',
    title: "Node.js",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "22%",
    salary: "$135,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Common Skills
  {
    id: 'SKILL_PS_009',
    title: "Problem Solving",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "advanced",
    growth: "15%",
    salary: "$120,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CR_010',
    title: "Code Review",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$115,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TL_011',
    title: "Team Leadership",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "advanced",
    growth: "18%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_COM_012',
    title: "Communication",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$100,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Certifications
  {
    id: 'SKILL_AWS_013',
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
    id: 'SKILL_K8S_014',
    title: "Kubernetes Administrator (CKA)",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TF_015',
    title: "TensorFlow Developer Certificate",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
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

// Helper function to get a skill by title
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log('Finding skill by title:', title);
  return getAllSkills().find(skill => skill.title.toLowerCase() === title.toLowerCase());
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return getAllSkills().filter(skill => skill.category === category);
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSkillsByCategory('specialized'),
  common: getSkillsByCategory('common'),
  certification: getSkillsByCategory('certification')
};

// Log initial skills data for debugging
console.log('Skills database loaded:', {
  total: getAllSkills().length,
  byCategory: {
    specialized: getSkillsByCategory('specialized').length,
    common: getSkillsByCategory('common').length,
    certification: getSkillsByCategory('certification').length
  }
});