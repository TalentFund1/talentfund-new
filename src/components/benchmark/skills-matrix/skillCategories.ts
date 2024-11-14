import { SkillData } from "../../skills/data/skillLevels";

// Sorting priority maps
const levelPriority: Record<string, number> = {
  'advanced': 0,
  'intermediate': 1,
  'beginner': 2,
  'unspecified': 3
};

const requirementPriority: Record<string, number> = {
  'required': 0,    // Skill Goal
  'preferred': 1,   // Preferred
  'not-interested': 2,
  'unknown': 3
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
    const levelDiff = levelPriority[levelA] - levelPriority[levelB];
    
    if (levelDiff !== 0) return levelDiff;
    
    // If levels are equal, compare by requirement
    const reqA = a.requirement?.toLowerCase() || 'unknown';
    const reqB = b.requirement?.toLowerCase() || 'unknown';
    return requirementPriority[reqA] - requirementPriority[reqB];
  });
};

export const categorizeSkill = (skillTitle: string): string => {
  if (specializedSkills.includes(skillTitle)) {
    return "specialized";
  } else if (commonSkills.includes(skillTitle)) {
    return "common";
  } else if (certificationSkills.includes(skillTitle)) {
    return "certification";
  } else {
    return "specialized"; // Default to specialized if not found
  }
};

export const filterSkillsByCategory = (skills: any[], category: string) => {
  const filteredSkills = category === 'all' 
    ? skills 
    : skills.filter(skill => categorizeSkill(skill.title) === category);
    
  return sortSkillsByPriority(filteredSkills);
};

export const getSkillsByCategory = (skills: SkillData[], category: string) => {
  return skills.filter(skill => skill.category === category);
};