// Define comprehensive skill lists
export const specializedSkills = [
  // AI & ML Skills
  'Machine Learning',
  'Deep Learning',
  
  // Backend & Infrastructure
  'Node.js',
  'Database Design',
  'API Development',
  'System Architecture',
  'Kubernetes',
  'Docker',
  'DevOps',
  'Microservices',
  
  // Frontend & Mobile
  'React',
  'React Native',
  'Flutter',
  'Performance Optimization',
  
  // Architecture & System Design
  'System Design',
  'Technical Architecture',
  'Data Engineering',
  'Blockchain'
];

export const commonSkills = [
  // AI & ML Skills
  'Natural Language Processing',
  'TensorFlow',
  'PyTorch',
  'MLflow',
  
  // Development Practices
  'Python',
  'Problem Solving',
  'Technical Writing',
  'Code Review',
  'Agile Methodologies',
  'Git',
  'Git Version Control',
  'TypeScript',
  'GraphQL',
  'CSS/SASS',
  
  // Soft Skills
  'Communication',
  'Team Leadership',
  'Project Management',
  'Risk Management',
  'Strategic Planning',
  'Stakeholder Management',
  
  // Technical Skills
  'Cross-browser Compatibility',
  'Responsive Design',
  'UI/UX Design',
  'Data Science',
  'Cybersecurity',
  'Linux Administration',
  'Shell Scripting'
];

export const certificationSkills = [
  // AWS Certifications
  'AWS Certified Machine Learning - Specialty',
  'AWS Certified Solutions Architect',
  'AWS Certified Developer - Associate',
  'AWS Certified DevOps Engineer',
  
  // Cloud & Infrastructure Certifications
  'Google Cloud Professional Machine Learning Engineer',
  'Certified Kubernetes Administrator',
  'HashiCorp Certified Terraform Associate',
  
  // Development Certifications
  'TensorFlow Developer Certificate',
  'TensorFlow Developer Certification',
  'MongoDB Professional Developer',
  'Google Mobile Web Specialist',
  'Professional Scrum Developer',
  
  // Management Certifications
  'Project Management Professional (PMP)',
  'Certified Scrum Master (CSM)',
  'ITIL Foundation'
];

// Helper function to generate a skill ID
export const generateSkillId = (title: string): string => {
  const normalizedTitle = title
    .replace(/certification/gi, 'CERT')
    .replace(/certificate/gi, 'CERT')
    .replace(/certified/gi, 'CERT')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toUpperCase();
  return `SKILL_${normalizedTitle}`;
};

// Helper function to determine skill category
export const getSkillCategory = (skillTitle: string): 'specialized' | 'common' | 'certification' => {
  // First check exact matches
  if (specializedSkills.includes(skillTitle)) {
    console.log(`${skillTitle} found in specialized skills list`);
    return 'specialized';
  }
  if (commonSkills.includes(skillTitle)) {
    console.log(`${skillTitle} found in common skills list`);
    return 'common';
  }
  if (certificationSkills.includes(skillTitle)) {
    console.log(`${skillTitle} found in certification skills list`);
    return 'certification';
  }
  
  // Then check for variations and patterns
  const lowerTitle = skillTitle.toLowerCase();
  
  // Check certification patterns first since they're most specific
  if (lowerTitle.includes('certification') || 
      lowerTitle.includes('certified') ||
      lowerTitle.includes('certificate')) {
    console.log(`${skillTitle} categorized as certification based on naming pattern`);
    return 'certification';
  }
  
  // Check for specialized skill patterns
  if (lowerTitle.includes('aws') ||
      lowerTitle.includes('cloud') ||
      lowerTitle.includes('ai') ||
      lowerTitle.includes('ml') ||
      lowerTitle.includes('architecture') ||
      lowerTitle.includes('design') ||
      lowerTitle.includes('development')) {
    console.log(`${skillTitle} categorized as specialized based on keywords`);
    return 'specialized';
  }
  
  console.log(`${skillTitle} defaulting to common category`);
  return 'common';
};
