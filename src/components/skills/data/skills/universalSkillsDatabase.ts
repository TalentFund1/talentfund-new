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
    id: 'SKILL_PYT_445',
    title: "Python",
    subcategory: "Programming Languages",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "28%",
    salary: "$135,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "28%",
      salary: "$135,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_AWS_662',
    title: "AWS",
    subcategory: "Cloud Computing",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$155,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "32%",
      salary: "$155,000",
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
    id: 'SKILL_SQL_234',
    title: "SQL",
    subcategory: "Databases",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "20%",
    salary: "$120,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "20%",
      salary: "$120,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_JAV_567',
    title: "Java",
    subcategory: "Programming Languages",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "technical",
    level: "intermediate",
    growth: "18%",
    salary: "$140,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "18%",
      salary: "$140,000",
      skillScore: 0
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_DOC_890',
    title: "Docker",
    subcategory: "DevOps",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "30%",
    salary: "$145,000",
    skillScore: 0,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "30%",
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