export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  // Specialized skills for AI Engineer
  const specializedSkills = [
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'Natural Language Processing',
    'Computer Vision',
    'PyTorch'
  ];

  // Common skills for AI Engineer
  const commonSkills = [
    'Python',
    'Problem Solving',
    'Technical Writing'
  ];

  // Certifications for AI Engineer
  const certificationKeywords = [
    'AWS Certified Machine Learning - Specialty',
    'TensorFlow Developer Certificate',
    'Google Cloud Professional Machine Learning Engineer'
  ];

  // Check if it's a certification first (exact match needed)
  if (certificationKeywords.some(cert => 
    skill === cert
  )) {
    return 'certification';
  }
  
  // Then check if it's a specialized skill (exact match needed)
  if (specializedSkills.some(spec => 
    skill === spec
  )) {
    return 'specialized';
  }
  
  // Then check if it's a common skill (exact match needed)
  if (commonSkills.some(common => 
    skill === common
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