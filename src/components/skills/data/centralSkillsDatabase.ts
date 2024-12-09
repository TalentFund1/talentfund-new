import { UnifiedSkill } from '../types/SkillTypes';

export const normalizeSkillTitle = (title: string): string => {
  console.log('Normalizing skill title:', title);
  
  const normalizations: { [key: string]: string } = {
    'Git': 'Git Version Control',
    'Version Control': 'Git Version Control',
    'AWS': 'Amazon Web Services',
    'Amazon AWS': 'Amazon Web Services',
    'TensorFlow Developer Certificate': 'TensorFlow Developer Certification',
    'AWS Certified Machine Learning - Specialty': 'AWS Certified Machine Learning Specialty',
    'AWS DevOps': 'AWS Certified DevOps Engineer',
    'Kubernetes Administrator': 'Certified Kubernetes Administrator',
    'Terraform Associate': 'HashiCorp Certified Terraform Associate',
    'Project Management Professional': 'Project Management Professional (PMP)',
    'Scrum Master': 'Certified Scrum Master (CSM)',
    'Node': 'Node.js',
    'NodeJS': 'Node.js',
    'React JS': 'React',
    'ReactJS': 'React',
    'Next': 'Next.js',
    'NextJS': 'Next.js',
    'TypeScript': 'TypeScript',
    'TS': 'TypeScript',
    'Machine Learning': 'Machine Learning',
    'ML': 'Machine Learning',
    'Artificial Intelligence': 'Artificial Intelligence',
    'AI': 'Artificial Intelligence',
    'CSS3': 'CSS/SASS',
    'SASS': 'CSS/SASS',
    'SCSS': 'CSS/SASS',
    'Docker Container': 'Docker',
    'Kubernetes Container': 'Kubernetes',
    'K8s': 'Kubernetes',
    'Amazon Web Service': 'Amazon Web Services',
  };
  
  const normalized = normalizations[title] || title;
  console.log('Normalized title:', normalized);
  return normalized;
};

export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  // Define subcategories based on the skill
  const getSubcategory = (skillTitle: string): string => {
    const subcategories: { [key: string]: string } = {
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
      'Jenkins': 'CI/CD Tools',
      'Terraform': 'Infrastructure as Code',
      'Amazon Web Services': 'Cloud Services',
      'Linux Administration': 'System Administration',
      'Shell Scripting': 'System Administration',
      'React': 'Frontend Frameworks',
      'Next.js': 'Frontend Frameworks',
      'TypeScript': 'Programming Languages',
      'Python': 'Programming Languages',
      'CSS/SASS': 'Frontend Development',
      'Git Version Control': 'Development Tools',
      'Team Leadership': 'Leadership',
      'Project Management': 'Project Management',
      'Risk Management': 'Management',
      'Problem Solving': 'Development Practices',
      'Code Review': 'Development Practices',
      'Agile Methodologies': 'Development Practices',
      'Technical Writing': 'Communication',
      'AWS Certified Machine Learning Specialty': 'AI Certification',
      'TensorFlow Developer Certification': 'AI Certification',
      'AWS Certified Solutions Architect': 'Cloud Certification',
      'AWS Certified Developer - Associate': 'Cloud Certification',
      'Certified Kubernetes Administrator': 'Container Certification',
      'HashiCorp Certified Terraform Associate': 'Infrastructure Certification',
      'Project Management Professional (PMP)': 'Management Certification',
      'Certified Scrum Master (CSM)': 'Agile Certification'
    };
    
    return subcategories[skillTitle] || 'Development Tools';
  };

  // Define business categories based on the skill
  const getBusinessCategory = (skillTitle: string): string => {
    const categories = {
      'Amazon Web Services': 'Information Technology',
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
      'Communication': 'Media and Communications',
      'Problem Solving': 'Physical and Inherent Abilities',
      'Team Leadership': 'Initiative and Leadership',
      'Project Management': 'Project Management',
      'Data Science': 'Analysis',
      'Computer Vision': 'Analysis',
      'Natural Language Processing': 'Analysis',
      'Risk Management': 'Risk and Compliance',
      'System Design': 'Information Technology',
      'Database Design': 'Information Technology'
    };
    
    return categories[skillTitle as keyof typeof categories] || 'Information Technology';
  };

  return {
    id: `SKILL_${title.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`,
    title: normalizeSkillTitle(title),
    category: 'specialized',
    businessCategory: getBusinessCategory(title),
    subcategory: getSubcategory(title),
    weight: 'technical',
    level: 'unspecified',
    growth: '0%',
    salary: '$0',
    confidence: 'medium',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};