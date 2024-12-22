import { UnifiedSkill } from '../../../types/skillTypes';

export const skillDefinitions: UnifiedSkill[] = [
  {
    id: "ai_1",
    title: "Machine Learning",
    subcategory: "Artificial Intelligence",
    category: "specialized",
    businessCategory: "AI & Machine Learning",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "ai_2",
    title: "Natural Language Processing",
    subcategory: "Artificial Intelligence",
    category: "specialized",
    businessCategory: "AI & Machine Learning",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "dev_1",
    title: "JavaScript",
    subcategory: "Web Development",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "critical",
    level: "advanced",
    growth: "20%",
    salary: "$120,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "dev_2",
    title: "React",
    subcategory: "Web Development",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "dev_3",
    title: "Node.js",
    subcategory: "Web Development",
    category: "specialized",
    businessCategory: "Software Development",
    weight: "critical",
    level: "advanced",
    growth: "22%",
    salary: "$125,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_1",
    title: "Communication Skills",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$80,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "soft_2",
    title: "Teamwork",
    subcategory: "Soft Skills",
    category: "common",
    businessCategory: "Professional Skills",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$75,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "cert_1",
    title: "AWS Certified Solutions Architect",
    subcategory: "Certifications",
    category: "certification",
    businessCategory: "Cloud Computing",
    weight: "critical",
    level: "advanced",
    growth: "35%",
    salary: "$150,000",
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