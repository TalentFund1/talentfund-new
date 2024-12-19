import { SkillCategory, UnifiedSkill } from '../../../types/SkillTypes';
import { normalizeSkillTitle } from '../../../utils/normalization';

// Initialize with empty database, will be set after initialization
let universalSkillsDatabase: UnifiedSkill[] = [];

// Function to initialize the database
export const initializeSkillsDatabase = (skills: UnifiedSkill[]) => {
  console.log('Initializing universal skills database with', skills.length, 'skills');
  universalSkillsDatabase = skills;
};

// Predefined category mappings - these take precedence over database lookups
const categoryMappings: Record<string, SkillCategory> = {
  // AI & ML Skills (specialized)
  'machine learning': 'specialized',
  'deep learning': 'specialized',
  'natural language processing': 'specialized',
  'computer vision': 'specialized',
  'tensorflow': 'specialized',
  'pytorch': 'specialized',
  'graphql': 'specialized',

  // Programming Skills (specialized)
  'python': 'specialized',
  'typescript': 'specialized',
  'javascript': 'specialized',
  'node.js': 'specialized',
  'react': 'specialized',
  'next.js': 'specialized',
  'css/sass': 'specialized',
  'performance optimization': 'specialized',
  'api development': 'specialized',
  'database design': 'specialized',
  'system architecture': 'specialized',
  'react native': 'specialized',
  'flutter': 'specialized',

  // DevOps Skills (specialized)
  'docker': 'specialized',
  'kubernetes': 'specialized',
  'aws': 'specialized',
  'jenkins': 'specialized',
  'terraform': 'specialized',
  'system design': 'specialized',
  'technical architecture': 'specialized',
  'linux administration': 'specialized',
  'shell scripting': 'specialized',

  // Management Skills (specialized)
  'team leadership': 'specialized',
  'project management': 'specialized',
  'risk management': 'specialized',
  'strategic planning': 'specialized',

  // Common Skills
  'problem solving': 'common',
  'communication': 'common',
  'technical writing': 'common',
  'git version control': 'common',
  'code review': 'common',
  'agile methodologies': 'common',
  'stakeholder management': 'common',

  // Certifications
  'aws certified machine learning - specialty': 'certification',
  'aws certified solutions architect': 'certification',
  'aws certified developer - associate': 'certification',
  'aws certified devops engineer': 'certification',
  'tensorflow developer certificate': 'certification',
  'certified kubernetes administrator': 'certification',
  'hashicorp certified terraform associate': 'certification',
  'project management professional (pmp)': 'certification',
  'certified scrum master (csm)': 'certification',
  'google mobile web specialist': 'certification'
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  const normalizedTitle = normalizeSkillTitle(skillTitle).toLowerCase();
  
  console.log('Getting category for skill:', {
    original: skillTitle,
    normalized: normalizedTitle
  });
  
  // First check predefined mappings
  if (categoryMappings[normalizedTitle]) {
    console.log('Found skill in predefined mappings:', {
      skill: normalizedTitle,
      category: categoryMappings[normalizedTitle]
    });
    return categoryMappings[normalizedTitle];
  }
  
  // Then check universal database
  const skill = universalSkillsDatabase.find(
    s => normalizeSkillTitle(s.title).toLowerCase() === normalizedTitle
  );

  if (skill?.category) {
    console.log('Found skill in universal database:', {
      skill: normalizedTitle,
      category: skill.category
    });
    return skill.category;
  }
  
  // Determine category based on characteristics
  if (normalizedTitle.includes('certified') || 
      normalizedTitle.includes('certification') || 
      normalizedTitle.includes('certificate')) {
    console.log('Categorized as certification based on name:', normalizedTitle);
    return 'certification';
  }
  
  // Check for specialized skills based on keywords
  const specializedKeywords = [
    'development', 'engineering', 'architecture', 'design',
    'programming', 'analysis', 'security', 'devops',
    'cloud', 'data', 'machine learning', 'ai', 'automation',
    'infrastructure', 'backend', 'frontend', 'full stack',
    'database', 'system', 'network', 'mobile', 'web',
    'testing', 'quality', 'deployment', 'ci/cd'
  ];
  
  if (specializedKeywords.some(keyword => normalizedTitle.includes(keyword))) {
    console.log('Categorized as specialized based on keywords:', normalizedTitle);
    return 'specialized';
  }
  
  console.log('Defaulting to common category for:', normalizedTitle);
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