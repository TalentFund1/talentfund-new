export type SkillCategory = 'specialized' | 'common' | 'certification';

// Map of skills to their categories
const skillCategoryMap: { [key: string]: SkillCategory } = {
  // Specialized skills
  'Machine Learning': 'specialized',
  'Deep Learning': 'specialized',
  'Natural Language Processing': 'specialized',
  'Computer Vision': 'specialized',
  'TensorFlow': 'specialized',
  'Python': 'specialized',
  'GraphQL': 'specialized',
  'Database Design': 'specialized',
  
  // Common skills
  'Team Leadership': 'common',
  'Technical Writing': 'common',
  'Problem Solving': 'common',
  'Code Review': 'common',
  
  // Certification skills
  'AWS Certified DevOps Engineer': 'certification',
  'AWS Certified Solutions Architect': 'certification',
  'Kubernetes Administrator (CKA)': 'certification'
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  const category = skillCategoryMap[skillTitle] || 'common';
  console.log('Skill category result:', { skill: skillTitle, category });
  return category;
};