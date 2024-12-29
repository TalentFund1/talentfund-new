import { UnifiedSkill } from '../../types/SkillTypes';

// Combine all skills into a single database
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
    minimumLevel: "advanced",
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
    minimumLevel: "intermediate",
    requirementLevel: "required",
    metrics: {
      growth: "25%",
      salary: "$130,000",
      skillScore: 0
    },
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
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "12%",
      salary: "$95,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper functions to get skills
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