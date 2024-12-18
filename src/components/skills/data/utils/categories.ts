export const getSkillCategory = (skillTitle: string): string => {
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
    'Git',  // Added Git as specialized skill
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

  if (specializedSkills.includes(skillTitle)) return 'specialized';
  if (commonSkills.includes(skillTitle)) return 'common';
  if (certificationSkills.includes(skillTitle)) return 'certification';
  
  console.log(`Categorizing skill: ${skillTitle} as specialized (default)`);
  return 'specialized'; // Default to specialized if not found
};

export const getSkillWeight = (skillTitle: string): string => {
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'System Design',
    'Technical Architecture',
    'Team Leadership',
    'Git'  // Added Git as critical skill
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

  if (criticalSkills.includes(skillTitle)) return 'critical';
  if (technicalSkills.includes(skillTitle)) return 'technical';
  
  console.log(`Setting weight for skill: ${skillTitle} as necessary (default)`);
  return 'necessary';
};