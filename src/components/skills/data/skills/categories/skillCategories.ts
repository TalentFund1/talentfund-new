import { SkillCategory, UnifiedSkill } from '../../../types/SkillTypes';
import { normalizeSkillTitle } from '../../../utils/normalization';

// Initialize with empty database, will be set after initialization
let universalSkillsDatabase: UnifiedSkill[] = [];

// Function to initialize the database
export const initializeSkillsDatabase = (skills: UnifiedSkill[]) => {
  console.log('Initializing universal skills database with', skills.length, 'skills');
  universalSkillsDatabase = skills;
};

// Predefined category mappings
const categoryMappings: Record<string, SkillCategory> = {
  // AI & ML Skills
  'Machine Learning': 'specialized',
  'Deep Learning': 'specialized',
  'Natural Language Processing': 'specialized',
  'Computer Vision': 'specialized',
  'TensorFlow': 'specialized',
  'PyTorch': 'specialized',

  // Programming Skills
  'Python': 'specialized',
  'TypeScript': 'specialized',
  'JavaScript': 'specialized',
  'Node.js': 'specialized',

  // DevOps Skills
  'Docker': 'specialized',
  'Kubernetes': 'specialized',
  'AWS': 'specialized',
  'Jenkins': 'specialized',
  'Terraform': 'specialized',

  // Common Skills
  'Problem Solving': 'common',
  'Communication': 'common',
  'Technical Writing': 'common',
  'Git Version Control': 'common',
  'Code Review': 'common',
  'Agile Methodologies': 'common',

  // Certifications
  'AWS Certified Machine Learning - Specialty': 'certification',
  'AWS Certified Solutions Architect': 'certification',
  'AWS Certified Developer - Associate': 'certification',
  'TensorFlow Developer Certificate': 'certification',
  'Certified Kubernetes Administrator': 'certification',
  'HashiCorp Certified Terraform Associate': 'certification'
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  const normalizedTitle = normalizeSkillTitle(skillTitle);
  
  // First try to get from predefined mappings
  if (categoryMappings[skillTitle]) {
    console.log('Found skill in category mappings:', {
      skill: skillTitle,
      category: categoryMappings[skillTitle]
    });
    return categoryMappings[skillTitle];
  }
  
  // Then try to get from universal database
  const skill = universalSkillsDatabase.find(
    s => normalizeSkillTitle(s.title) === normalizedTitle
  );

  if (skill) {
    console.log('Found skill in universal database:', {
      skill: skillTitle,
      category: skill.category
    });
    return skill.category;
  }
  
  // If not found in mappings or database, determine category based on characteristics
  if (skillTitle.includes('Certified') || skillTitle.includes('Certificate')) {
    return 'certification';
  }
  
  // Default to common if we can't determine the category
  console.log('Defaulting to common category for:', skillTitle);
  return 'common';
};

export const isSpecializedSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'specialized';
};

export const isCommonSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'common';
};

export const isCertificationSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'certification';
};

export const categorizeSkills = (skills: string[]) => {
  console.log('Categorizing skills:', skills);
  
  const categories = skills.reduce((acc, skill) => {
    const category = getSkillCategory(skill);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<SkillCategory, number>);

  console.log('Categorization results:', categories);

  return {
    all: skills.length,
    specialized: categories.specialized || 0,
    common: categories.common || 0,
    certification: categories.certification || 0
  };
};

// Export the universal database getter for direct access
export const getUniversalSkillsDatabase = (): UnifiedSkill[] => {
  return universalSkillsDatabase;
};