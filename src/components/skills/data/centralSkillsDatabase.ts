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
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "specialized",
    type: "critical",
    growth: "35%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "specialized",
    type: "critical",
    growth: "32%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    category: "specialized",
    type: "critical",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Computer Vision",
    subcategory: "AI Applications",
    category: "specialized",
    type: "critical",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "TensorFlow",
    subcategory: "ML Frameworks",
    category: "specialized",
    type: "technical",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "PyTorch",
    subcategory: "ML Frameworks",
    category: "specialized",
    type: "technical",
    growth: "28%",
    salary: "$168,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Python",
    subcategory: "Programming Languages",
    category: "common",
    type: "necessary",
    growth: "22%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "JavaScript",
    subcategory: "Programming Languages",
    category: "common",
    type: "necessary",
    growth: "20%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "TypeScript",
    subcategory: "Programming Languages",
    category: "specialized",
    type: "technical",
    growth: "25%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "React",
    subcategory: "Frontend Frameworks",
    category: "specialized",
    type: "technical",
    growth: "28%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Next.js",
    subcategory: "Frontend Frameworks",
    category: "specialized",
    type: "technical",
    growth: "32%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Node.js",
    subcategory: "Backend Development",
    category: "specialized",
    type: "technical",
    growth: "24%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "CSS/SASS",
    subcategory: "Frontend Development",
    category: "specialized",
    type: "technical",
    growth: "18%",
    salary: "$135,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    type: "necessary",
    growth: "15%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "API Development",
    subcategory: "Backend Development",
    category: "specialized",
    type: "technical",
    growth: "26%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "System Architecture",
    subcategory: "Software Architecture",
    category: "specialized",
    type: "critical",
    growth: "30%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Docker",
    subcategory: "Container Technology",
    category: "specialized",
    type: "technical",
    growth: "28%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    type: "technical",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "AWS",
    subcategory: "Cloud Platforms",
    category: "specialized",
    type: "critical",
    growth: "35%",
    salary: "$175,000",
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
    growth: "18%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Team Leadership",
    subcategory: "Leadership",
    category: "common",
    type: "necessary",
    growth: "20%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "AWS Certified Machine Learning - Specialty",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "technical",
    growth: "40%",
    salary: "$190,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "TensorFlow Developer Certificate",
    subcategory: "AI Certification",
    category: "certification",
    type: "technical",
    growth: "35%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "AWS Certified Developer - Associate",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "technical",
    growth: "30%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Google Mobile Web Specialist",
    subcategory: "Web Development Certification",
    category: "certification",
    type: "technical",
    growth: "25%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Container Certification",
    category: "certification",
    type: "technical",
    growth: "35%",
    salary: "$175,000",
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