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

// Centralized skills database
export const centralizedSkills: UnifiedSkill[] = [
  {
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "specialized",
    type: "critical",
    growth: "30%",
    salary: "$180,256",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "specialized",
    type: "critical",
    growth: "28%",
    salary: "$182,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    category: "specialized",
    type: "technical",
    growth: "28%",
    salary: "$190,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Computer Vision",
    subcategory: "AI Applications",
    category: "specialized",
    type: "technical",
    growth: "22%",
    salary: "$188,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "TensorFlow",
    subcategory: "ML Frameworks",
    category: "specialized",
    type: "technical",
    growth: "20%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Python",
    subcategory: "Programming Languages",
    category: "common",
    type: "necessary",
    growth: "25%",
    salary: "$173,344",
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
    title: "Technical Writing",
    subcategory: "Communication",
    category: "common",
    type: "necessary",
    growth: "12%",
    salary: "$156,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Node.js",
    subcategory: "Backend Development",
    category: "specialized",
    type: "technical",
    growth: "25%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Database Design",
    subcategory: "Data Management",
    category: "specialized",
    type: "technical",
    growth: "15%",
    salary: "$172,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "API Development",
    subcategory: "Backend Development",
    category: "specialized",
    type: "technical",
    growth: "25%",
    salary: "$178,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper functions to access the centralized database
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return centralizedSkills.find(skill => skill.title === title);
};

export const getSkillsByCategory = (category: 'specialized' | 'common' | 'certification'): UnifiedSkill[] => {
  return centralizedSkills.filter(skill => skill.category === category);
};

export const getSkillsByType = (type: 'critical' | 'technical' | 'necessary'): UnifiedSkill[] => {
  return centralizedSkills.filter(skill => skill.type === type);
};

// Function to ensure skill data consistency
export const getUnifiedSkillData = (skillTitle: string): Partial<UnifiedSkill> => {
  const skill = getSkillByTitle(skillTitle);
  if (!skill) {
    console.warn(`Skill "${skillTitle}" not found in centralized database`);
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
  return skill;
};