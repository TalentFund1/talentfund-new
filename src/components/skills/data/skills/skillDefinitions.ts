import { UnifiedSkill } from '../../types/SkillTypes';

export const skillDefinitions: UnifiedSkill[] = [
  // AI & ML Skills
  {
    id: 'SKILL001',
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: 'specialized',
    businessCategory: "Information Technology",
    weight: 'critical',
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
    category: 'specialized',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "32%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL003',
    title: "Natural Language Processing",
    subcategory: "AI & ML",
    category: 'specialized',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Development Skills
  {
    id: 'SKILL006',
    title: "Node.js",
    subcategory: "Backend Development",
    category: 'common',
    businessCategory: "Information Technology",
    weight: 'technical',
    level: "advanced",
    growth: "30%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL007',
    title: "Database Design",
    subcategory: "Backend Development",
    category: 'common',
    businessCategory: "Information Technology",
    weight: 'technical',
    level: "advanced",
    growth: "28%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Frontend Skills
  {
    id: 'SKILL011',
    title: "React",
    subcategory: "Frontend Development",
    category: 'specialized',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL012',
    title: "TypeScript",
    subcategory: "Frontend Development",
    category: 'specialized',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "24%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Soft Skills
  {
    id: 'SKILL016',
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: 'common',
    businessCategory: "Physical and Inherent Abilities",
    weight: 'necessary',
    level: "advanced",
    growth: "15%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL017',
    title: "Code Review",
    subcategory: "Soft Skills",
    category: 'common',
    businessCategory: "Physical and Inherent Abilities",
    weight: 'necessary',
    level: "advanced",
    growth: "14%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Certifications
  {
    id: 'SKILL023',
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: 'certification',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "28%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL024',
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Cloud Certification",
    category: 'certification',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "26%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper functions
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

console.log('Initialized universal skills database:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: skillDefinitions.filter(s => s.category === 'specialized').length,
    common: skillDefinitions.filter(s => s.category === 'common').length,
    certification: skillDefinitions.filter(s => s.category === 'certification').length
  }
});