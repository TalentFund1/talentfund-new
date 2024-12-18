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
  'Git Version Control',
  'Git',
  'CSS/SASS',
  'Team Leadership',
  'Flutter',
  'GraphQL',
  'Docker',
  'AWS',
  'Jenkins',
  'Terraform'
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
  'Communication',
  'Linux Administration'
];

const certificationSkills = [
  'AWS Certified Machine Learning - Specialty',
  'TensorFlow Developer Certificate',
  'TensorFlow Developer Certification',
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
    // Mobile & Frontend Development
    'React Native': 'Mobile Development',
    'Flutter': 'Mobile Development',
    'GraphQL': 'API Development',
    
    // AI & ML Skills
    'Machine Learning': 'AI & ML',
    'Deep Learning': 'AI & ML',
    'Natural Language Processing': 'AI Applications',
    'Computer Vision': 'AI Applications',
    'TensorFlow': 'ML Frameworks',
    'PyTorch': 'ML Frameworks',
    'TensorFlow Developer Certificate': 'AI Certification',
    'TensorFlow Developer Certification': 'AI Certification',
    
    // Backend Skills
    'Node.js': 'Backend Development',
    'API Development': 'Backend Development',
    'Database Design': 'Data Management',
    
    // Architecture Skills
    'System Design': 'Software Architecture',
    'Technical Architecture': 'Architecture',
    
    // DevOps Skills
    'Docker': 'Container Technology',
    'Kubernetes': 'Container Orchestration',
    'Jenkins': 'CI/CD',
    'Terraform': 'Infrastructure as Code',
    
    // Frontend Skills
    'React': 'Frontend Frameworks',
    'Next.js': 'Frontend Frameworks',
    'Vue.js': 'Frontend Frameworks',
    'CSS/SASS': 'Frontend Development',
    
    // Development Tools & Practices
    'Git Version Control': 'Development Tools',
    'Git': 'Development Tools',
    'Problem Solving': 'Development Practices',
    'Code Review': 'Development Practices',
    'Agile Methodologies': 'Development Practices',
    'Shell Scripting': 'Development Tools',
    'Linux Administration': 'System Administration',
    
    // Soft Skills
    'Team Leadership': 'Leadership',
    'Project Management': 'Project Management',
    'Risk Management': 'Management',
    'Technical Writing': 'Communication',
    'Communication': 'Communication',
    'Strategic Planning': 'Management',
    'Stakeholder Management': 'Management',
    
    // Cloud & Infrastructure
    'AWS': 'Cloud Services',
    
    // Certifications
    'AWS Certified Machine Learning - Specialty': 'AI Certification',
    'AWS Certified Solutions Architect': 'Cloud Certification',
    'AWS Certified Developer - Associate': 'Cloud Certification',
    'AWS Certified DevOps Engineer': 'Cloud Certification',
    'Certified Kubernetes Administrator': 'Container Certification',
    'HashiCorp Certified Terraform Associate': 'Infrastructure Certification',
    'Project Management Professional (PMP)': 'Management Certification',
    'Certified Scrum Master (CSM)': 'Agile Certification',
    'MongoDB Professional Developer': 'Database Certification',
    'Google Mobile Web Specialist': 'Web Development Certification',
    'Professional Scrum Developer': 'Development Certification',
    'ITIL Foundation': 'IT Service Management'
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
    'Git Version Control': 'Information Technology',
    'Git': 'Information Technology',
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
    'TensorFlow': 'Information Technology',
    'TensorFlow Developer Certificate': 'Information Technology',
    'TensorFlow Developer Certification': 'Information Technology',
    'AWS': 'Information Technology',
    'AWS Certified Machine Learning - Specialty': 'Information Technology',
    'AWS Certified Solutions Architect': 'Information Technology',
    'AWS Certified Developer - Associate': 'Information Technology',
    'AWS Certified DevOps Engineer': 'Information Technology',
    'Certified Kubernetes Administrator': 'Information Technology',
    'HashiCorp Certified Terraform Associate': 'Information Technology',
    'MongoDB Professional Developer': 'Information Technology',
    'Google Mobile Web Specialist': 'Information Technology',
    'Professional Scrum Developer': 'Information Technology',
    'Project Management Professional (PMP)': 'Project Management',
    'Certified Scrum Master (CSM)': 'Project Management',
    'ITIL Foundation': 'Information Technology'
  };
  
  return categories[skillTitle] || 'Information Technology';
};

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'System Design',
    'Technical Architecture',
    'AWS Certified Solutions Architect',
    'AWS Certified Machine Learning - Specialty',
    'Cloud Architecture',
    'Git Version Control',
    'Git',
    'Team Leadership',
    'AWS',
    'Kubernetes',
    'Docker',
    'Jenkins',
    'Terraform'
  ];

  const technicalSkills = [
    'Node.js',
    'React',
    'TypeScript',
    'Shell Scripting',
    'CSS/SASS',
    'Database Design',
    'API Development',
    'Flutter',
    'GraphQL',
    'Linux Administration',
    'Python',
    'TensorFlow',
    'Natural Language Processing',
    'Computer Vision'
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