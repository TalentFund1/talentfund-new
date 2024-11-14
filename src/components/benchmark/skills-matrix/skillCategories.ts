import { SkillData } from "../../../components/skills/data/skillLevels";

// Sorting priority maps
const levelPriority: Record<string, number> = {
  'advanced': 0,
  'intermediate': 1,
  'beginner': 2,
  'unspecified': 3
};

const requirementPriority: Record<string, number> = {
  'required': 0,    // Skill Goal
  'not-interested': 1,
  'unknown': 2
};

// Specialized Skills - AI & ML
const specializedSkills = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "PyTorch",
  "TensorFlow",
  "Python"
];

// Common Skills
const commonSkills = [
  "Problem Solving",
  "Technical Writing"
];

// Certifications
const certificationSkills = [
  "AWS Certified Machine Learning - Specialty",
  "TensorFlow Developer Certificate",
  "Google Cloud Professional Machine Learning Engineer"
];

export const sortSkillsByPriority = (skills: any[]) => {
  return [...skills].sort((a, b) => {
    // First compare by level
    const levelA = a.level?.toLowerCase() || 'unspecified';
    const levelB = b.level?.toLowerCase() || 'unspecified';
    
    if (levelPriority[levelA] !== levelPriority[levelB]) {
      return levelPriority[levelA] - levelPriority[levelB];
    }
    
    // If levels are equal, compare by requirement
    const reqA = a.requirement?.toLowerCase() || 'unknown';
    const reqB = b.requirement?.toLowerCase() || 'unknown';
    
    if (requirementPriority[reqA] !== requirementPriority[reqB]) {
      return requirementPriority[reqA] - requirementPriority[reqB];
    }
    
    // If both level and requirement are equal, sort by title
    return a.title.localeCompare(b.title);
  });
};

export const filterSkillsByCategory = (skills: any[], category: string) => {
  const filteredSkills = category === 'all' 
    ? skills 
    : skills.filter(skill => categorizeSkill(skill.title) === category);
    
  return sortSkillsByPriority(filteredSkills);
};

export const categorizeSkill = (skillTitle: string): string => {
  if (specializedSkills.includes(skillTitle)) {
    return "specialized";
  } else if (commonSkills.includes(skillTitle)) {
    return "common";
  } else if (certificationSkills.includes(skillTitle)) {
    return "certification";
  }
  return "specialized"; // Default to specialized if not found
};

export const getSkillsByCategory = (skills: SkillData[], category: string) => {
  return skills.filter(skill => skill.category === category);
};