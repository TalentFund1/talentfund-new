export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  // Specialized skills (AI/ML focused)
  const specializedSkills = [
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'PyTorch',
    'Computer Vision',
    'Natural Language Processing',
    'Natural Language Understanding',
    'Artificial Intelligence',
    'Data Engineering',
    'System Architecture',
    'Cloud Computing',
    'DevOps',
    'GraphQL',
    'MLflow',
    'Data Science',
    'System Design',
    'Technical Architecture',
    'Risk Management',
    'API Development',
    'Database Design',
    'Node.js',
    'React',
    'TypeScript',
    'Next.js',
    'Vue.js',
    'Webpack',
    'UI/UX Design',
    'CSS/SASS'
  ];

  // Common skills (general technical and soft skills)
  const commonSkills = [
    'Python',
    'JavaScript',
    'SQL',
    'Git',
    'Agile',
    'Problem Solving',
    'Technical Writing',
    'Communication',
    'Team Leadership',
    'Project Management',
    'Cross-browser Compatibility',
    'Responsive Design',
    'Code Review',
    'Agile Methodologies',
    'Strategic Planning',
    'Stakeholder Management',
    'Conflict Resolution',
    'Resource Planning',
    'Organizational Development',
    'Business Strategy'
  ];

  // Certification keywords
  const certificationKeywords = [
    'AWS Certified',
    'Azure',
    'Certificate',
    'Certification',
    'Professional Scrum',
    'PMP',
    'CISSP',
    'CKA',
    'Administrator (CKA)',
    'Google Cloud Professional',
    'TensorFlow Developer Certificate',
    'MongoDB Professional',
    'Solutions Architect',
    'ITIL',
    'Mobile Web Specialist',
    'Developer - Associate'
  ];

  // Check if it's a certification first
  if (certificationKeywords.some(cert => 
    skill.toLowerCase().includes(cert.toLowerCase())
  )) {
    return 'certification';
  }
  
  // Then check if it's a specialized skill
  if (specializedSkills.some(spec => 
    skill.toLowerCase().includes(spec.toLowerCase())
  )) {
    return 'specialized';
  }
  
  // Then check if it's a common skill
  if (commonSkills.some(common => 
    skill.toLowerCase().includes(common.toLowerCase())
  )) {
    return 'common';
  }
  
  // Default to specialized if no match is found
  // This ensures AI/ML related skills that might not be in the list
  // are categorized as specialized
  return 'specialized';
};

export const filterSkillsByCategory = (
  skills: Array<any>,
  category: string
): Array<any> => {
  if (category === 'all') {
    return skills;
  }

  return skills.filter(skill => 
    categorizeSkill(skill.title) === category
  );
};