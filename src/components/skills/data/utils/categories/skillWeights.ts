import { getSubcategory } from './skillSubcategories';
import { SkillWeight } from '../../../types/SkillTypes';

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  console.log('Calculating weight for skill:', skillTitle);

  // Critical skills - high impact, core competencies
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Team Leadership',
    'Project Management',
    'Strategic Planning',
    'System Design',
    'Technical Architecture',
    'AWS Certified Solutions Architect',
    'AWS Certified Machine Learning - Specialty',
    'Cloud Architecture'
  ];

  // Technical skills - specialized technical competencies
  const technicalSkills = [
    'Python',
    'TensorFlow',
    'Computer Vision',
    'GraphQL',
    'Docker',
    'Kubernetes',
    'API Development',
    'Database Design',
    'Node.js',
    'React',
    'TypeScript'
  ];

  // Necessary skills - important but not core technical requirements
  const necessarySkills = [
    'Communication',
    'Agile Methodologies',
    'Documentation',
    'Collaboration',
    'Time Management',
    'Problem Solving',
    'Code Review',
    'Technical Writing',
    'Git Version Control',
    'Development Practices',
    'Shell Scripting',
    'Linux Administration',
    'Cross-browser Compatibility',
    'Responsive Design',
    'Stakeholder Management'
  ];

  console.log('Determining weight category for:', skillTitle);

  // Check if the skill title contains certain keywords that indicate it's a necessary skill
  const necessaryKeywords = ['practices', 'methodology', 'communication', 'collaboration', 'management'];
  const containsNecessaryKeyword = necessaryKeywords.some(keyword => 
    skillTitle.toLowerCase().includes(keyword.toLowerCase())
  );

  if (criticalSkills.includes(skillTitle)) {
    console.log(`${skillTitle} identified as critical skill`);
    return 'critical';
  }

  if (technicalSkills.includes(skillTitle)) {
    console.log(`${skillTitle} identified as technical skill`);
    return 'technical';
  }

  if (necessarySkills.includes(skillTitle) || containsNecessaryKeyword) {
    console.log(`${skillTitle} identified as necessary skill`);
    return 'necessary';
  }

  // For skills related to practices, methodologies, or soft skills
  if (skillTitle.toLowerCase().includes('practice') || 
      skillTitle.toLowerCase().includes('methodology') ||
      skillTitle.toLowerCase().includes('soft skill')) {
    console.log(`${skillTitle} categorized as necessary based on keywords`);
    return 'necessary';
  }

  // Check subcategory for additional context
  const subcategory = getSubcategory(skillTitle);
  if (subcategory.includes('Practices') || 
      subcategory.includes('Methodology') || 
      subcategory.includes('Communication') ||
      subcategory === 'Development Practices') {
    console.log(`${skillTitle} categorized as necessary based on subcategory ${subcategory}`);
    return 'necessary';
  }

  // Default to technical if no other categorization applies
  console.log(`${skillTitle} defaulting to technical skill`);
  return 'technical';
};