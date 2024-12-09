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
    'React Native': 'React Native',
    'GraphQL': 'GraphQL',
    'Flutter': 'Flutter'
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
      // AI & ML Skills
      'Machine Learning': 'AI & ML',
      'Deep Learning': 'AI & ML',
      'Natural Language Processing': 'AI Applications',
      'Computer Vision': 'AI Applications',
      'TensorFlow': 'ML Frameworks',
      'PyTorch': 'ML Frameworks',
      
      // Backend Skills
      'Node.js': 'Backend Development',
      'API Development': 'Backend Development',
      'GraphQL': 'API Development',
      'Database Design': 'Data Management',
      
      // Architecture Skills
      'System Design': 'Software Architecture',
      'Technical Architecture': 'Architecture',
      
      // DevOps Skills
      'Docker': 'Container Technology',
      'Kubernetes': 'Container Orchestration',
      'Jenkins': 'CI/CD Tools',
      'Terraform': 'Infrastructure as Code',
      'Amazon Web Services': 'Cloud Services',
      
      // System Administration
      'Linux Administration': 'System Administration',
      'Shell Scripting': 'System Administration',
      
      // Frontend Skills
      'React': 'Frontend Frameworks',
      'React Native': 'Mobile Development',
      'Flutter': 'Mobile Development',
      'Next.js': 'Frontend Frameworks',
      'TypeScript': 'Programming Languages',
      'Python': 'Programming Languages',
      'CSS/SASS': 'Frontend Development',
      
      // Development Tools & Practices
      'Git Version Control': 'Development Tools',
      'Problem Solving': 'Development Practices',
      'Code Review': 'Development Practices',
      'Agile Methodologies': 'Development Practices',
      
      // Soft Skills
      'Team Leadership': 'Leadership',
      'Project Management': 'Project Management',
      'Risk Management': 'Management',
      'Technical Writing': 'Communication',
      'Communication': 'Communication',
      'Strategic Planning': 'Management',
      'Stakeholder Management': 'Management',
      
      // Certifications
      'AWS Certified Machine Learning Specialty': 'AI Certification',
      'TensorFlow Developer Certification': 'AI Certification',
      'AWS Certified Solutions Architect': 'Cloud Certification',
      'AWS Certified Developer - Associate': 'Cloud Certification',
      'AWS Certified DevOps Engineer': 'Cloud Certification',
      'Certified Kubernetes Administrator': 'Container Certification',
      'HashiCorp Certified Terraform Associate': 'Infrastructure Certification',
      'Project Management Professional (PMP)': 'Management Certification',
      'Certified Scrum Master (CSM)': 'Agile Certification'
    };
    
    return subcategories[skillTitle] || 'Development Tools';
  };

  // Helper function to determine the category based on subcategory
  const getCategory = (subcategory: string): 'specialized' | 'common' | 'certification' => {
    const certificationSubcategories = [
      'AI Certification',
      'Cloud Certification',
      'Container Certification',
      'Infrastructure Certification',
      'Management Certification',
      'Agile Certification'
    ];

    const commonSubcategories = [
      'Development Practices',
      'Communication',
      'Management',
      'Leadership',
      'System Administration',
      'Development Tools'
    ];

    if (certificationSubcategories.includes(subcategory)) {
      return 'certification';
    } else if (commonSubcategories.includes(subcategory)) {
      return 'common';
    }
    return 'specialized';
  };

  const subcategory = getSubcategory(title);
  const category = getCategory(subcategory);

  // Get business category based on skill title
  const businessCategory = getBusinessCategory(title);

  return {
    id: `SKILL_${title.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`,
    title: normalizeSkillTitle(title),
    category: category,
    businessCategory: businessCategory,
    subcategory: subcategory,
    weight: getSkillWeight(title),
    level: 'unspecified',
    growth: getSkillGrowth(title),
    salary: getSkillSalary(title),
    confidence: 'medium',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};

// Define business categories based on the skill
const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    // Technical Skills
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
    'React Native': 'Information Technology',
    'Flutter': 'Information Technology',
    'GraphQL': 'Information Technology',
    
    // Soft Skills
    'Communication': 'Media and Communications',
    'Technical Writing': 'Media and Communications',
    'Problem Solving': 'Physical and Inherent Abilities',
    'Team Leadership': 'Initiative and Leadership',
    'Project Management': 'Project Management',
    'Strategic Planning': 'Project Management',
    
    // Analysis Skills
    'Data Science': 'Analysis',
    'Computer Vision': 'Analysis',
    'Natural Language Processing': 'Analysis',
    
    // Management Skills
    'Risk Management': 'Risk and Compliance',
    'Stakeholder Management': 'Initiative and Leadership',
    
    // Architecture Skills
    'System Design': 'Information Technology',
    'Database Design': 'Information Technology',
    'Technical Architecture': 'Information Technology'
  };
  
  return categories[skillTitle] || 'Information Technology';
};

// Helper function to determine skill weight
const getSkillWeight = (skillTitle: string): 'critical' | 'technical' | 'necessary' => {
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'AWS Certified Solutions Architect',
    'Team Leadership',
    'Project Management'
  ];

  return criticalSkills.includes(skillTitle) ? 'critical' : 'technical';
};

// Helper function to get skill growth percentage
const getSkillGrowth = (skillTitle: string): string => {
  const growthRates: { [key: string]: string } = {
    'Machine Learning': '35%',
    'Deep Learning': '32%',
    'React Native': '28%',
    'Flutter': '25%',
    'GraphQL': '24%'
  };

  return growthRates[skillTitle] || '20%';
};

// Helper function to get skill salary
const getSkillSalary = (skillTitle: string): string => {
  const salaries: { [key: string]: string } = {
    'Machine Learning': '$185,000',
    'Deep Learning': '$180,000',
    'React Native': '$160,000',
    'Flutter': '$150,000',
    'GraphQL': '$155,000'
  };

  return salaries[skillTitle] || '$150,000';
};