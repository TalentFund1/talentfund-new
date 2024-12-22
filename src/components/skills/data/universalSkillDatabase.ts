import { UnifiedSkill } from '../../../types/skillTypes';

// Universal skill database - single source of truth
export const skillDefinitions: UnifiedSkill[] = [
  {
    id: "ai_1",
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
    id: "ai_2",
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
  {
    id: "ai_3",
    title: "Natural Language Processing",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "dev_1",
    title: "Node.js",
    subcategory: "Backend Development",
    category: "common",
    businessCategory: "Information Technology", 
    weight: "technical",
    level: "advanced",
    growth: "30%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_1",
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
  {
    id: "soft_2",
    title: "Code Review",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "advanced",
    growth: "14%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_3",
    title: "Technical Writing",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "advanced",
    growth: "9%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_4",
    title: "Team Leadership",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "critical",
    level: "advanced",
    growth: "11%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_5",
    title: "Communication",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "advanced",
    growth: "12%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_6", 
    title: "Agile Methodologies",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "necessary",
    level: "advanced",
    growth: "13%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "arch_1",
    title: "System Architecture",
    subcategory: "Backend Development",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "advanced",
    growth: "26%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "cert_1",
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
  console.log('Looking up skill in universal database:', title);
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getAllSkills = (): UnifiedSkill[] => {
  return skillDefinitions;
};

console.log('Initialized universal skills database:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: skillDefinitions.filter(s => s.category === 'specialized').length,
    common: skillDefinitions.filter(s => s.category === 'common').length,
    certification: skillDefinitions.filter(s => s.category === 'certification').length
  }
});