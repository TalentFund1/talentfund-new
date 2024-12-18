import { UnifiedSkill } from '../types/SkillTypes';

// Central skills database with proper categorization
export const skillsDatabase: UnifiedSkill[] = [
  // AI Skills
  {
    id: 'AI001',
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "20%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI002',
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "19%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Web Skills
  {
    id: 'WEB001',
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
    id: 'COM001',
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'COM002',
    title: "Communication",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Media and Communications",
    weight: "necessary",
    level: "intermediate",
    growth: "12%",
    salary: "$135,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Certifications
  {
    id: 'CERT001',
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

// Helper functions
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log('Getting skill by title:', title);
  return skillsDatabase.find(skill => skill.title.toLowerCase() === title.toLowerCase());
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log('Getting skills by category:', category);
  return skillsDatabase.filter(skill => skill.category === category);
};

export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills from central database');
  return skillsDatabase;
};

// Categorization helper
export const getSkillCategory = (title: string): 'specialized' | 'common' | 'certification' => {
  const skill = getSkillByTitle(title);
  if (!skill) {
    console.warn(`Skill not found in database: ${title}, defaulting to common`);
    return 'common';
  }
  console.log(`Categorized ${title} as ${skill.category}`);
  return skill.category as 'specialized' | 'common' | 'certification';
};