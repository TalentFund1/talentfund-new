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
  'Git Version Control': 'common',
  
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
  
  // First check if it's explicitly mapped
  if (skillCategoryMap[skillTitle]) {
    console.log(`Found explicit category mapping for ${skillTitle}:`, skillCategoryMap[skillTitle]);
    return skillCategoryMap[skillTitle];
  }
  
  // Check for AWS certifications
  if (skillTitle.toLowerCase().includes('aws') && 
      skillTitle.toLowerCase().includes('certified')) {
    console.log('Detected AWS certification:', skillTitle);
    return 'certification';
  }
  
  // Check for other certifications
  if (skillTitle.toLowerCase().includes('certified') || 
      skillTitle.toLowerCase().includes('certificate')) {
    console.log('Detected certification:', skillTitle);
    return 'certification';
  }
  
  // Default to common if no other matches
  console.log(`No specific category found for ${skillTitle}, defaulting to common`);
  return 'common';
};