import { SkillCategory } from '../../../types/SkillTypes';

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  // Map of skills to their categories
  const skillCategoryMap: { [key: string]: SkillCategory } = {
    // Specialized skills
    'Machine Learning': 'specialized',
    'Deep Learning': 'specialized',
    'Natural Language Processing': 'specialized',
    'Computer Vision': 'specialized',
    'TensorFlow': 'specialized',
    'Python': 'specialized',
    'Node.js': 'specialized',
    'React': 'specialized',
    'API Development': 'specialized',
    'System Architecture': 'specialized',
    'Database Design': 'specialized',
    
    // Common skills
    'Problem Solving': 'common',
    'Code Review': 'common',
    'Technical Writing': 'common',
    'Communication': 'common',
    'Team Leadership': 'common',
    'Project Management': 'common',
    
    // Certification skills
    'AWS Certified Machine Learning - Specialty': 'certification',
    'TensorFlow Developer Certificate': 'certification',
    'AWS Certified Solutions Architect': 'certification',
    'Kubernetes Administrator (CKA)': 'certification',
    'MongoDB Professional Developer': 'certification',
    'Google Mobile Web Specialist': 'certification',
    'Professional Scrum Developer': 'certification'
  };

  // First check if it's explicitly mapped
  if (skillCategoryMap[skillTitle]) {
    return skillCategoryMap[skillTitle];
  }

  // Check for certification patterns
  if (skillTitle.toLowerCase().includes('certification') ||
      skillTitle.toLowerCase().includes('certified') ||
      skillTitle.toLowerCase().includes('certificate')) {
    return 'certification';
  }

  // Check for specialized skill patterns
  if (skillTitle.toLowerCase().includes('development') ||
      skillTitle.toLowerCase().includes('programming') ||
      skillTitle.toLowerCase().includes('engineering')) {
    return 'specialized';
  }

  // Default to common if no other matches
  return 'common';
};

export const getSubcategory = (skillTitle: string): string => {
  const subcategories: { [key: string]: string } = {
    'Machine Learning': 'AI & ML',
    'Deep Learning': 'AI & ML',
    'Natural Language Processing': 'AI Applications',
    'Computer Vision': 'AI Applications',
    'TensorFlow': 'ML Frameworks',
    'Python': 'Programming Languages',
    'Node.js': 'Backend Development',
    'React': 'Frontend Development',
    'API Development': 'Backend Development',
    'System Architecture': 'Architecture',
    'Database Design': 'Data Management',
    'Problem Solving': 'Development Practices',
    'Code Review': 'Development Practices',
    'Technical Writing': 'Communication',
    'Communication': 'Soft Skills',
    'Team Leadership': 'Leadership',
    'Project Management': 'Project Management'
  };

  return subcategories[skillTitle] || 'General';
};