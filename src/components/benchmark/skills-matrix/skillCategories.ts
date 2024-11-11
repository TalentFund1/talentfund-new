export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  // Certification keywords that should trigger certification categorization
  const certificationKeywords = [
    'CISSP',
    'AWS Certified',
    'CompTIA',
    'Security+',
    'PMP',
    'Project Management Professional',
    'Certified Scrum Master',
    'CSM',
    'Professional Certification',
    'Certified'
  ];

  // Specialized skills list (technical skills)
  const specializedSkills = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Amazon Web Services',
    'Docker',
    'Kubernetes',
    'DevSecOps',
    'System Architecture',
    'Data Engineering',
    'IoT Development',
    'Python',
    'TensorFlow',
    'PyTorch',
    'Blockchain Development',
    'Edge Computing',
    '5G Network Architecture',
    'Quantum Computing',
    'Robotics Programming'
  ];

  // Common skills list (non-technical, transferable skills)
  const commonSkills = [
    'Technical Writing',
    'Agile Project Management',
    'Business Analysis',
    'Risk Management',
    'Strategic Planning',
    'Documentation',
    'Project Management',
    'Team Management',
    'Problem Solving',
    'Communication',
    'Leadership'
  ];

  // Check if it's a certification
  if (certificationKeywords.some(cert => 
    skill.toLowerCase().includes(cert.toLowerCase())
  )) {
    return 'certification';
  }
  
  // Check if it's a specialized skill
  if (specializedSkills.some(spec => 
    skill.toLowerCase().includes(spec.toLowerCase())
  )) {
    return 'specialized';
  }
  
  // Check if it's a common skill
  if (commonSkills.some(common => 
    skill.toLowerCase().includes(common.toLowerCase())
  )) {
    return 'common';
  }
  
  // Default to specialized if no match is found
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