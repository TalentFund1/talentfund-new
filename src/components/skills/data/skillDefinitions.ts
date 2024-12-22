import { UnifiedSkill } from '../types/SkillTypes';

// Universal skill database - single source of truth
export const skillDefinitions: UnifiedSkill[] = [
  // AI & ML Skills
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
    id: "ai_4",
    title: "Computer Vision",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "ai_5",
    title: "TensorFlow",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },

  // Frontend Development Skills
  {
    id: "fe_1",
    title: "React",
    subcategory: "Frontend Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "fe_2",
    title: "TypeScript",
    subcategory: "Frontend Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "24%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "fe_3",
    title: "Next.js",
    subcategory: "Frontend Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "23%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "fe_4",
    title: "CSS/SASS",
    subcategory: "Frontend Development",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "advanced",
    growth: "22%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "fe_5",
    title: "Performance Optimization",
    subcategory: "Frontend Development",
    category: "common",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "advanced",
    growth: "21%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },

  // Backend Development Skills
  {
    id: "be_1",
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
    id: "be_2",
    title: "Database Design",
    subcategory: "Backend Development",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "be_3",
    title: "API Development",
    subcategory: "Backend Development",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "27%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "be_4",
    title: "System Architecture",
    subcategory: "Backend Development",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "26%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },

  // Soft Skills
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

  // Certifications
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
  },
  {
    id: "cert_2",
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Cloud Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "26%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "cert_3",
    title: "AWS Certified Machine Learning - Specialty",
    subcategory: "Cloud Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper functions to access the universal database
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getSkillWeight = (title: string): UnifiedSkill['weight'] => {
  const skill = getSkillByTitle(title);
  return skill?.weight || 'necessary';
};

export const getSkillCategory = (title: string): UnifiedSkill['category'] => {
  const skill = getSkillByTitle(title);
  return skill?.category || 'common';
};

console.log('Initialized universal skills database:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: skillDefinitions.filter(s => s.category === 'specialized').length,
    common: skillDefinitions.filter(s => s.category === 'common').length,
    certification: skillDefinitions.filter(s => s.category === 'certification').length
  }
});