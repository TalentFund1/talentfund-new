import { UnifiedSkill } from '../types/SkillTypes';
import { normalizeSkillTitle } from '../utils/normalization';
import { managementSkills } from './categories/managementSkills';
import { aiSkills } from './categories/aiSkills';
import { webSkills } from './categories/webSkills';
import { devopsSkills } from './categories/devopsSkills';

// Combine all skills into one central database with proper categorization
const allSkills = [
  ...managementSkills,
  ...aiSkills,
  ...webSkills,
  ...devopsSkills
].map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title)
}));

// Get unified skill data with proper categorization
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = allSkills.find(skill => 
    normalizeSkillTitle(skill.title) === normalizedTitle
  );
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title, 'with category:', existingSkill.category);
    return {
      ...existingSkill,
      requirement: 'preferred' as const,
      isCompanySkill: true
    };
  }

  // If skill not found, create a new one with proper categorization based on type
  const category = determineSkillCategory(normalizedTitle);
  console.log('Creating new skill entry for:', normalizedTitle, 'with category:', category);
  
  const newSkill: UnifiedSkill = {
    id: `SKILL${Math.random().toString(36).substr(2, 9)}`,
    title: normalizedTitle,
    category: category,
    businessCategory: determineBusinessCategory(normalizedTitle),
    subcategory: determineSubcategory(normalizedTitle),
    weight: determineWeight(normalizedTitle),
    level: 'unspecified',
    growth: '20%',
    salary: '$150,000',
    confidence: 'medium',
    benchmarks: { 
      B: true, 
      R: true, 
      M: true, 
      O: true 
    },
    requirement: 'preferred',
    isCompanySkill: true
  };

  return newSkill;
};

// Helper function to determine skill category
const determineSkillCategory = (title: string): 'specialized' | 'common' | 'certification' => {
  const lowerTitle = title.toLowerCase();
  
  // Check for certification first
  if (lowerTitle.includes('certification') || 
      lowerTitle.includes('certified') ||
      lowerTitle.includes('certificate')) {
    return 'certification';
  }

  // Check for specialized skills
  const specializedKeywords = [
    'architecture',
    'machine learning',
    'deep learning',
    'ai',
    'artificial intelligence',
    'cloud',
    'aws',
    'azure',
    'devops',
    'security'
  ];

  if (specializedKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'specialized';
  }

  // Default to common
  return 'common';
};

// Helper function to determine business category
const determineBusinessCategory = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('management') || lowerTitle.includes('leadership')) {
    return 'Management';
  }
  
  if (lowerTitle.includes('communication') || lowerTitle.includes('writing')) {
    return 'Communication';
  }
  
  return 'Information Technology';
};

// Helper function to determine subcategory
const determineSubcategory = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('backend')) return 'Backend Development';
  if (lowerTitle.includes('frontend')) return 'Frontend Development';
  if (lowerTitle.includes('database')) return 'Data Management';
  if (lowerTitle.includes('machine learning')) return 'AI & ML';
  if (lowerTitle.includes('management')) return 'Management';
  
  return 'General';
};

// Helper function to determine weight
const determineWeight = (title: string): 'critical' | 'technical' | 'necessary' => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('certification')) return 'critical';
  if (lowerTitle.includes('management') || lowerTitle.includes('leadership')) return 'necessary';
  
  return 'technical';
};

// Export additional utility functions
export const getAllUnifiedSkills = (): UnifiedSkill[] => {
  return allSkills;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === category);
};

console.log('Skill database service initialized with', allSkills.length, 'skills');