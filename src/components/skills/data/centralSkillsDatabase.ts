import { SkillEntry } from '../types/SkillTypes';

export interface UnifiedSkill {
  title: string;
  subcategory: string;
  category: 'specialized' | 'common' | 'certification';
  type: 'critical' | 'technical' | 'necessary';
  level?: string;
  growth: string;
  salary: string;
  confidence: 'high' | 'medium' | 'low';
  requirement?: 'required' | 'preferred' | 'skill_goal' | 'not_interested';
  benchmarks: {
    B: boolean; // Business
    R: boolean; // Role
    M: boolean; // Market
    O: boolean; // Organization
  };
}

// Centralized skills database with complete information
export const centralizedSkills: UnifiedSkill[] = [
  {
    title: "React",
    subcategory: "Frontend Frameworks",
    category: "specialized",
    type: "critical",
    growth: "28%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "TypeScript",
    subcategory: "Programming Languages",
    category: "specialized",
    type: "critical",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Next.js",
    subcategory: "Frontend Frameworks",
    category: "specialized",
    type: "technical",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "CSS/SASS",
    subcategory: "Frontend Development",
    category: "specialized",
    type: "technical",
    growth: "18%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: "common",
    type: "necessary",
    growth: "15%",
    salary: "$158,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Code Review",
    subcategory: "Development Practices",
    category: "common",
    type: "technical",
    growth: "20%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Agile Methodologies",
    subcategory: "Project Management",
    category: "common",
    type: "necessary",
    growth: "16%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "AWS Certified Developer - Associate",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "technical",
    growth: "22%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Google Mobile Web Specialist",
    subcategory: "Web Development Certification",
    category: "certification",
    type: "technical",
    growth: "20%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Performance Optimization",
    subcategory: "Frontend Development",
    category: "specialized",
    type: "technical",
    growth: "24%",
    salary: "$168,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper functions to access the centralized database
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log('Getting skill data for:', title);
  return centralizedSkills.find(skill => skill.title === title);
};

export const getSkillsByCategory = (category: 'specialized' | 'common' | 'certification'): UnifiedSkill[] => {
  console.log('Getting skills for category:', category);
  return centralizedSkills.filter(skill => skill.category === category);
};

export const getSkillsByType = (type: 'critical' | 'technical' | 'necessary'): UnifiedSkill[] => {
  console.log('Getting skills by type:', type);
  return centralizedSkills.filter(skill => skill.type === type);
};

// Function to ensure skill data consistency
export const getUnifiedSkillData = (skillTitle: string): Partial<UnifiedSkill> => {
  console.log('Fetching unified skill data for:', skillTitle);
  const skill = getSkillByTitle(skillTitle);
  if (!skill) {
    console.warn(`Skill "${skillTitle}" not found in centralized database, using default values`);
    return {
      title: skillTitle,
      subcategory: "General Skills",
      category: "common",
      type: "necessary",
      growth: "0%",
      salary: "$0",
      confidence: "low",
      benchmarks: { B: false, R: false, M: false, O: false }
    };
  }
  console.log('Found skill data:', skill);
  return skill;
};