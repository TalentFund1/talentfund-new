import { SkillCategory } from '@/types/skillTypes';
import { skillDefinitions } from '../skillDefinitions';

// Create a Map for faster lookups
const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title.toLowerCase(), skill])
);

// Predefined categories for known skills
const specializedSkills = new Set([
  'machine learning',
  'deep learning',
  'natural language processing',
  'computer vision',
  'tensorflow',
  'python',
  'javascript',
  'react',
  'node.js'
]);

const certificationSkills = new Set([
  'aws certified solutions architect',
  'certified scrum master',
  'pmp certification',
  'kubernetes administrator (cka)',
  'aws certified machine learning - specialty',
  'tensorflow developer certificate'
]);

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  // First check the skill definitions map
  const skill = skillDefinitionMap.get(skillTitle.toLowerCase());
  if (skill?.category) {
    return skill.category as SkillCategory;
  }

  // Then check predefined sets
  const normalizedTitle = skillTitle.toLowerCase();
  if (specializedSkills.has(normalizedTitle)) {
    return 'specialized';
  }
  if (certificationSkills.has(normalizedTitle)) {
    return 'certification';
  }

  // Default to common if not found in other categories
  return 'common';
};

// Helper functions for type checking
export const isSpecializedSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'specialized';
};

export const isCommonSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'common';
};

export const isCertificationSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'certification';
};

// Function to get all skills of a specific category
export const getSkillsByCategory = (category: SkillCategory): string[] => {
  return skillDefinitions
    .filter(skill => skill.category === category)
    .map(skill => skill.title);
};

console.log('Skill categories system initialized');