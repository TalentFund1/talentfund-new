export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  // Specialized skills (AI/ML focused)
  const specializedSkills = [
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'PyTorch',
    'Computer Vision',
    'Natural Language Processing',
    'Artificial Intelligence',
    'Data Engineering',
    'System Architecture',
    'Cloud Computing',
    'DevOps',
    'GraphQL'
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
    'Project Management'
  ];

  // Certification keywords
  const certificationKeywords = [
    'AWS Certified',
    'Certified',
    'Certificate',
    'Certification',
    'Professional Scrum',
    'PMP',
    'CISSP',
    'CKA',
    'Google Cloud Professional',
    'TensorFlow Developer Certificate',
    'MongoDB Professional'
  ];

  // Check if it's a certification first
  if (certificationKeywords.some(cert => 
    skill.toLowerCase().includes(cert.toLowerCase())
  )) {
    return 'certification';
  }
  
  // Then check if it's a specialized skill
  if (specializedSkills.some(spec => 
    skill.toLowerCase() === spec.toLowerCase()
  )) {
    return 'specialized';
  }
  
  // Then check if it's a common skill
  if (commonSkills.some(common => 
    skill.toLowerCase() === common.toLowerCase()
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