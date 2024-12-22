import { SkillCategory } from '../../../types/SkillTypes';

const skillCategoryMap: Record<string, SkillCategory> = {
  'Machine Learning': 'specialized',
  'Deep Learning': 'specialized',
  'Natural Language Processing': 'specialized',
  'Computer Vision': 'specialized',
  'TensorFlow': 'specialized',
  'Node.js': 'common',
  'Database Design': 'common',
  'API Development': 'common',
  'System Architecture': 'common',
  'AWS Certified Solutions Architect': 'certification',
  'Kubernetes Administrator (CKA)': 'certification',
  'AWS Certified Machine Learning - Specialty': 'certification'
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  return skillCategoryMap[skillTitle] || 'common';
};