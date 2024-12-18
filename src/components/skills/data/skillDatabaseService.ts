import { UnifiedSkill } from '../types/SkillTypes';
import { skillsDatabase, getSkillByTitle, getSkillsByCategory, getAllSkills } from './skillsDatabase';

// Re-export the core functions
export { getSkillByTitle, getSkillsByCategory, getAllSkills };

// Get unified skill data with proper categorization
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const existingSkill = getSkillByTitle(title);
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title, 'with category:', existingSkill.category);
    return {
      ...existingSkill,
      requirement: 'preferred' as const,
      isCompanySkill: true
    };
  }

  // If skill not found, create a new one with proper categorization
  console.log('Creating new skill entry for:', title);
  
  const newSkill: UnifiedSkill = {
    id: `SKILL${Math.random().toString(36).substr(2, 9)}`,
    title: title,
    category: determineSkillCategory(title),
    businessCategory: determineBusinessCategory(title),
    subcategory: determineSubcategory(title),
    weight: determineWeight(title),
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
  
  if (lowerTitle.includes('certification') || 
      lowerTitle.includes('certified') ||
      lowerTitle.includes('certificate')) {
    console.log(`${title} categorized as certification based on name`);
    return 'certification';
  }

  // Common skills list
  const commonSkills = [
    'team leadership',
    'project management',
    'communication',
    'problem solving',
    'git',
    'agile',
    'code review',
    'technical writing'
  ];

  if (commonSkills.some(skill => lowerTitle.includes(skill))) {
    console.log(`${title} categorized as common based on predefined list`);
    return 'common';
  }

  // Specialized skills keywords
  const specializedKeywords = [
    'machine learning',
    'deep learning',
    'ai',
    'artificial intelligence',
    'python',
    'javascript',
    'react',
    'node',
    'database',
    'api',
    'cloud',
    'aws',
    'azure',
    'devops',
    'kubernetes',
    'docker',
    'architecture',
    'system design'
  ];

  if (specializedKeywords.some(keyword => lowerTitle.includes(keyword))) {
    console.log(`${title} categorized as specialized based on keywords`);
    return 'specialized';
  }

  console.log(`${title} defaulting to common category`);
  return 'common';
};

// Helper functions for business category and subcategory determination
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

const determineSubcategory = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('machine learning') || lowerTitle.includes('deep learning')) {
    return 'Artificial Intelligence and Machine Learning';
  }
  if (lowerTitle.includes('leadership') || lowerTitle.includes('management')) {
    return 'Leadership';
  }
  
  return 'General';
};

const determineWeight = (title: string): 'critical' | 'technical' | 'necessary' => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('certification') || lowerTitle.includes('certified')) {
    return 'critical';
  }
  if (lowerTitle.includes('management') || lowerTitle.includes('leadership')) {
    return 'necessary';
  }
  
  return 'technical';
};

// Export additional utility functions
export const getAllUnifiedSkills = (): UnifiedSkill[] => {
  return skillsDatabase;
};

console.log('Skill database service initialized with', skillsDatabase.length, 'skills');