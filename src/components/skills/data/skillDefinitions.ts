import { UnifiedSkill, SkillCategory, SkillWeight } from '@/types/skillTypes';

// Universal skill database - single source of truth
export const skillDefinitions: UnifiedSkill[] = [
  {
    id: "skill_machine_learning",
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
    id: "skill_natural_language_processing",
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
  },
  {
    id: "cert_2",
    title: "Certified Scrum Master",
    subcategory: "Certifications",
    category: "certification",
    businessCategory: "Project Management",
    weight: "critical",
    level: "intermediate",
    growth: "20%",
    salary: "$100,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "cert_3",
    title: "PMP Certification",
    subcategory: "Certifications",
    category: "certification",
    businessCategory: "Project Management",
    weight: "critical",
    level: "intermediate",
    growth: "18%",
    salary: "$95,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

// Helper functions to access the universal database
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log('Getting unified skill data for:', title);
  const skill = skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
  
  if (skill) {
    console.log('Found existing skill:', title);
    return skill;
  }

  console.warn('Skill not found in universal database:', title);
  return undefined;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getSkillWeight = (title: string): SkillWeight => {
  const skill = getSkillByTitle(title);
  return skill?.weight || 'necessary';
};

export const getSkillCategory = (title: string): SkillCategory => {
  const skill = getSkillByTitle(title);
  return skill?.category || 'common';
};

export const getSkillType = (title: string): string => {
  const skill = getSkillByTitle(title);
  return skill?.businessCategory || 'General';
};

export const generateSkillId = (title: string): string => {
  return `skill_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
};

console.log('Initialized universal skills database with consistent IDs:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: skillDefinitions.filter(s => s.category === 'specialized').length,
    common: skillDefinitions.filter(s => s.category === 'common').length,
    certification: skillDefinitions.filter(s => s.category === 'certification').length
  }
});