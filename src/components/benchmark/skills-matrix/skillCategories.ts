```typescript
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
  const commonSkills = [
    "Communication",
    "Problem Solving",
    "Leadership",
    "Teamwork",
    "Time Management"
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Architect",
    "Microsoft Azure Solutions Architect",
    "Certified Information Systems Security Professional",
    "Project Management Professional"
  ];

  if (commonSkills.includes(skillTitle)) {
    return "common";
  } else if (certifications.includes(skillTitle)) {
    return "certification";
  } else {
    return "specialized";
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
```