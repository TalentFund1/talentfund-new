import { SkillWeight } from '../../types/SkillTypes';

// Define the skill categories
const specializedSkills = [
  'Machine Learning',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'TensorFlow',
  'Node.js',
  'Database Design',
  'API Development',
  'System Architecture',
  'Kubernetes',
  'React',
  'TypeScript',
  'Next.js',
  'Vue.js',
  'Webpack',
  'System Design',
  'Technical Architecture',
  'Risk Management',
  'Git',  // Added Git to specialized skills
  'CSS/SASS',
  'Team Leadership'
];

const commonSkills = [
  'Python',
  'Problem Solving',
  'Technical Writing',
  'Shell Scripting',
  'Code Review',
  'Agile Methodologies',
  'Cross-browser Compatibility',
  'Responsive Design',
  'Strategic Planning',
  'Stakeholder Management',
  'Communication'
];

const certificationSkills = [
  'AWS Certified Machine Learning - Specialty',
  'TensorFlow Developer Certificate',
  'Google Cloud Professional Machine Learning Engineer',
  'AWS Certified Solutions Architect',
  'Kubernetes Administrator (CKA)',
  'MongoDB Professional Developer',
  'AWS Certified Developer - Associate',
  'Google Mobile Web Specialist',
  'Professional Scrum Developer',
  'Project Management Professional (PMP)',
  'Certified Scrum Master (CSM)',
  'ITIL Foundation',
  'AWS Certified DevOps Engineer',
  'Certified Kubernetes Administrator',
  'HashiCorp Certified Terraform Associate'
];

export const getSkillCategory = (skillTitle: string): string => {
  console.log(`Categorizing skill: ${skillTitle}`);
  if (specializedSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as specialized`);
    return 'specialized';
  }
  if (commonSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as common`);
    return 'common';
  }
  if (certificationSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as certification`);
    return 'certification';
  }
  
  console.log(`${skillTitle} defaulting to specialized category`);
  return 'specialized';
};

export const getSubcategory = (skillTitle: string): string => {
  const subcategories: { [key: string]: string } = {
    'React Native': 'Mobile Development',
    'Flutter': 'Mobile Development',
    'GraphQL': 'API Development',
    'Machine Learning': 'AI & ML',
    'Deep Learning': 'AI & ML',
    'Natural Language Processing': 'AI Applications',
    'Computer Vision': 'AI Applications',
    'TensorFlow': 'ML Frameworks',
    'PyTorch': 'ML Frameworks',
    'Node.js': 'Backend Development',
    'API Development': 'Backend Development',
    'Database Design': 'Data Management',
    'System Design': 'Software Architecture',
    'Technical Architecture': 'Architecture',
    'Docker': 'Container Technology',
    'Kubernetes': 'Container Orchestration',
    'React': 'Frontend Frameworks',
    'Next.js': 'Frontend Frameworks',
    'Git Version Control': 'Development Tools',
    'Git': 'Development Tools'  // Added Git mapping
  };

  return subcategories[skillTitle] || 'Development Tools';
};

export const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    'React Native': 'Information Technology',
    'Flutter': 'Information Technology',
    'GraphQL': 'Information Technology',
    'Machine Learning': 'Information Technology',
    'Deep Learning': 'Information Technology',
    'Python': 'Information Technology',
    'Docker': 'Information Technology',
    'Kubernetes': 'Information Technology',
    'Jenkins': 'Information Technology',
    'Terraform': 'Information Technology',
    'Linux Administration': 'Information Technology',
    'Node.js': 'Information Technology',
    'React': 'Information Technology',
    'Next.js': 'Information Technology',
    'Git': 'Information Technology',  // Added Git mapping
    'Communication': 'Media and Communications',
    'Technical Writing': 'Media and Communications',
    'Problem Solving': 'Physical and Inherent Abilities',
    'Team Leadership': 'Initiative and Leadership',
    'Project Management': 'Project Management',
    'Strategic Planning': 'Project Management',
    'Data Science': 'Analysis',
    'Computer Vision': 'Analysis',
    'Natural Language Processing': 'Analysis',
    'Risk Management': 'Risk and Compliance',
    'Stakeholder Management': 'Initiative and Leadership',
    'System Design': 'Information Technology',
    'Database Design': 'Information Technology',
    'Technical Architecture': 'Information Technology',
    'Git Version Control': 'Development Tools'
  };
  
  return categories[skillTitle] || 'Information Technology';
};

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'System Design',
    'Technical Architecture',
    'Team Leadership',
    'Git'  // Added Git as a critical skill
  ];

  const technicalSkills = [
    'Node.js',
    'Database Design',
    'API Development',
    'Kubernetes',
    'React',
    'TypeScript',
    'Shell Scripting',
    'CSS/SASS'
  ];

  if (criticalSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as critical skill`);
    return 'critical';
  }
  
  if (technicalSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as technical skill`);
    return 'technical';
  }
  
  console.log(`${skillTitle} categorized as necessary skill`);
  return 'necessary';
};