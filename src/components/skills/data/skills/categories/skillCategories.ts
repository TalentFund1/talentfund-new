// Map of skills to their categories
const skillCategoryMap: { [key: string]: string } = {
  // Technical skills
  'Machine Learning': 'technical',
  'Deep Learning': 'technical',
  'Natural Language Processing': 'technical',
  'Computer Vision': 'technical',
  'TensorFlow': 'technical',
  'Python': 'technical',
  'GraphQL': 'technical',
  'Database Design': 'technical',
  
  // Critical skills
  'Team Leadership': 'critical',
  'Technical Writing': 'critical',
  
  // Necessary skills
  'Problem Solving': 'necessary',
  'Code Review': 'necessary',
  'AWS Certified DevOps Engineer': 'necessary'
};

export const getSkillCategory = (skillTitle: string): string => {
  console.log('Getting category for skill:', skillTitle);
  const category = skillCategoryMap[skillTitle] || 'necessary';
  console.log('Skill category result:', { skill: skillTitle, category });
  return category;
};