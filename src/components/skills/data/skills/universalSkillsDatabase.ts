import { UnifiedSkill } from '../../types/SkillTypes';
import { aiSkills } from './categories/aiSkills';
import { developmentSkills } from './categories/developmentSkills';
import { managementSkills } from './categories/managementSkills';

// Combine all skill categories
const universalSkillsDatabase: UnifiedSkill[] = [
  ...aiSkills,
  ...developmentSkills,
  ...managementSkills,
  {
    id: 'SKILL_NLP_024',
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "30%",
    salary: "$150,000",
    skillScore: 80,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "30%",
      salary: "$150,000",
      skillScore: 80
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CV_053',
    title: "Computer Vision",
    subcategory: "AI Applications",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$140,000",
    skillScore: 78,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "25%",
      salary: "$140,000",
      skillScore: 78
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_AGI_037',
    title: "Agile Methodologies",
    subcategory: "Project Management",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "15%",
    salary: "$125,000",
    skillScore: 75,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "15%",
      salary: "$125,000",
      skillScore: 75
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
    skillScore: 72,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "22%",
      salary: "$125,000",
      skillScore: 72
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_GIT_409',
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    businessCategory: "Software Development",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$110,000",
    skillScore: 70,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$110,000",
      skillScore: 70
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_COM_227',
    title: "Communication",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Media and Communications",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$110,000",
    skillScore: 65,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$110,000",
      skillScore: 65
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TEA_214',
    title: "Team Collaboration",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Media and Communications",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$115,000",
    skillScore: 68,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$115,000",
      skillScore: 68
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PRO_261',
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$120,000",
    skillScore: 70,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$120,000",
      skillScore: 70
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_CER_160',
    title: "Certified AI Professional",
    subcategory: "AI Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$145,000",
    skillScore: 78,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$145,000",
      skillScore: 78
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_KUB_785',
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Container Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$140,000",
    skillScore: 75,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$140,000",
      skillScore: 75
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

export const getSkillByTitle = (title: string | undefined) => {
  if (!title) {
    console.warn('Attempted to get skill with undefined title');
    return undefined;
  }

  const skill = universalSkillsDatabase.find(skill => 
    skill.title.toLowerCase() === title.toLowerCase()
  );

  if (!skill) {
    console.warn(`Skill not found: ${title}`);
  }

  return skill;
};

export const getAllSkills = () => universalSkillsDatabase;

console.log('Universal skills database initialized with', universalSkillsDatabase.length, 'skills');

export { universalSkillsDatabase };
