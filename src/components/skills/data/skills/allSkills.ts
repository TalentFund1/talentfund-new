import { UnifiedSkill } from '../../types/SkillTypes';

// Define all skills in a single array
export const allSkills: UnifiedSkill[] = [
  // AI & ML Skills
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
  // Web Development Skills
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
  {
    id: 'SKILL004',
    title: "GraphQL",
    subcategory: "API Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "Intermediate",
    growth: "24%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // DevOps Skills
  {
    id: 'SKILL005',
    title: "Docker",
    subcategory: "Container Technology",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "Advanced",
    growth: "15%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL006',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "Advanced",
    growth: "17%",
    salary: "$155,000",
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
  return allSkills.filter(skill => skill.category === category);
};

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
};

export const Skills = {
  all: allSkills
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    all: allSkills.length
  }
});