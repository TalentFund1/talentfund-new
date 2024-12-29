import { UnifiedSkill } from '../../types/SkillTypes';

const allSkills: UnifiedSkill[] = [
  {
    id: 'SKILL_ML_031',
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "35%",
    salary: "$160,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "35%",
      salary: "$160,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_REA_873',
    title: "React",
    subcategory: "Frontend Frameworks",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$130,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "25%",
      salary: "$130,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NOD_789',
    title: "Node.js",
    subcategory: "Backend Development",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "22%",
    salary: "$125,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "22%",
      salary: "$125,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CER_160',
    title: "Certified AI Professional",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$145,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$145,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_COM_227',
    title: "Communication",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$110,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$110,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TEA_214',
    title: "Team Collaboration",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$115,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$115,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PRO_261',
    title: "Problem Solving",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$120,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$120,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_GIT_119',
    title: "Git Version Control",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$115,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$115,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_KUB_785',
    title: "Kubernetes Administrator (CKA)",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$140,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$140,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_NAT_105',
    title: "Natural Language Processing",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$150,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$150,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_COM_544',
    title: "Computer Vision",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$155,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$155,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TEN_887',
    title: "TensorFlow",
    subcategory: "General",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$145,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$145,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

export const getSkillByTitle = (title: string | undefined) => {
  if (!title) {
    console.warn('Attempted to get skill with undefined title');
    return undefined;
  }

  const skill = allSkills.find(skill => 
    skill.title.toLowerCase() === title.toLowerCase()
  );

  if (!skill) {
    console.warn(`Skill not found: ${title}`);
  }

  return skill;
};

export const getAllSkills = () => allSkills;

console.log('Universal skills database initialized with', allSkills.length, 'skills');

export const universalSkillsDatabase = allSkills;