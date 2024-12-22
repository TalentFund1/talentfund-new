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
  'AWS Certified Machine Learning - Specialty': 'certification',
  'Kubernetes Administrator (CKA)': 'certification',
  'TensorFlow Developer Certificate': 'certification',
  'Project Management Professional (PMP)': 'certification',
  'Certified Scrum Master (CSM)': 'certification'
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  // Check for AWS certifications first
  if (skillTitle.toLowerCase().includes('aws certified')) {
    console.log('Detected AWS certification:', skillTitle);
    return 'certification';
  }
  
  // Check for other certifications
  if (skillTitle.toLowerCase().includes('certified') || 
      skillTitle.toLowerCase().includes('certificate')) {
    console.log('Detected certification:', skillTitle);
    return 'certification';
  }
  
  const category = skillCategoryMap[skillTitle] || 'common';
  console.log('Skill category result:', { skill: skillTitle, category });
  return category;
};