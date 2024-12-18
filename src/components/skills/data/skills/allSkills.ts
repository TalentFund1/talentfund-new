import { UnifiedSkill, SkillCategory, SkillWeight } from '../../types/SkillTypes';

// Core skill classification structure - Single source of truth
export const skillClassifications: { [key: string]: SkillCategory } = {
  // AI & ML Skills
  "Machine Learning": "specialized",
  "Deep Learning": "specialized",
  "Natural Language Processing": "specialized",
  "Computer Vision": "specialized",
  "TensorFlow": "specialized",
  
  "Node.js": "specialized",
  "Database Design": "specialized",
  "API Development": "specialized",
  "System Architecture": "specialized",
  "Kubernetes": "specialized",
  
  // Frontend Skills
  "React": "specialized",
  "TypeScript": "specialized",
  "Next.js": "specialized",
  "CSS/SASS": "specialized",
  "Performance Optimization": "specialized",
  
  // Common Skills
  "Problem Solving": "common",
  "Code Review": "common",
  "Agile Methodologies": "common",
  "Communication": "common",
  "Team Leadership": "common",
  "Git Version Control": "common",
  "Technical Writing": "common",
  
  // Certifications
  "AWS Certified Solutions Architect": "certification",
  "Kubernetes Administrator (CKA)": "certification",
  "AWS Certified Machine Learning - Specialty": "certification",
  "TensorFlow Developer Certificate": "certification",
  "Project Management Professional (PMP)": "certification",
  "Certified Scrum Master (CSM)": "certification"
};

// Weight classifications - Single source of truth
export const skillWeightClassifications: { [key: string]: SkillWeight } = {
  // Critical Skills
  "Machine Learning": "critical",
  "Deep Learning": "critical",
  "System Design": "critical",
  "Technical Architecture": "critical",
  "AWS Certified Solutions Architect": "critical",
  "AWS Certified Machine Learning - Specialty": "critical",
  "Cloud Architecture": "critical",
  "Git": "critical",
  "Git Version Control": "critical",
  "Team Leadership": "critical",
  "AWS": "critical",
  "Kubernetes": "critical",
  "Docker": "critical",
  "Jenkins": "critical",
  "Terraform": "critical",

  // Technical Skills
  "Node.js": "technical",
  "React": "technical",
  "TypeScript": "technical",
  "Shell Scripting": "technical",
  "CSS/SASS": "technical",
  "Database Design": "technical",
  "API Development": "technical",
  "Flutter": "technical",
  "GraphQL": "technical",
  "Linux Administration": "technical",
  "Python": "technical",
  "TensorFlow": "technical",
  "Natural Language Processing": "technical",
  "Computer Vision": "technical"
};

// Helper function to get skill weight
export const getSkillWeight = (skillTitle: string): SkillWeight => {
  console.log(`Getting weight for skill: ${skillTitle}`);
  return skillWeightClassifications[skillTitle] || "necessary";
};

// Define all skills with their core categorization
export const allSkills: UnifiedSkill[] = [
  // AI & ML Skills (Specialized)
  {
    id: 'SKILL001',
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: getSkillWeight("Machine Learning"),
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
  // Web Development Skills (Specialized)
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

// Helper function to get skill category from core classification
export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  return skillClassifications[skillTitle] || "common";
};

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', allSkills.length, 'skills found');
  return allSkills.map(skill => ({
    ...skill,
    category: getSkillCategory(skill.title)
  }));
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === category);
};

// Helper function to find a skill by ID
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by ID: ${id}`);
  const skill = allSkills.find(skill => skill.id === id);
  if (skill) {
    return {
      ...skill,
      category: getSkillCategory(skill.title)
    };
  }
  return undefined;
};

// Helper function to find a skill by title
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  const skill = allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
  if (skill) {
    return {
      ...skill,
      category: getSkillCategory(skill.title)
    };
  }
  return undefined;
};

// Role-specific skill categorization helpers
export const getSpecializedSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === 'specialized');
};

export const getCommonSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === 'common');
};

export const getCertificationSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

console.log('Skills loaded with weights:', {
  total: allSkills.length,
  byWeight: {
    critical: allSkills.filter(skill => getSkillWeight(skill.title) === 'critical').length,
    technical: allSkills.filter(skill => getSkillWeight(skill.title) === 'technical').length,
    necessary: allSkills.filter(skill => getSkillWeight(skill.title) === 'necessary').length
  }
});