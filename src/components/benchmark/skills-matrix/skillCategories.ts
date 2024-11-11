export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  // Specialized skills for AI Engineer (exactly 6)
  const specializedSkills = [
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'Natural Language Processing',
    'Computer Vision',
    'PyTorch'
  ];

  // Common skills for AI Engineer (exactly 3)
  const commonSkills = [
    'Python',
    'Problem Solving',
    'Technical Writing'
  ];

  // Certifications for AI Engineer (exactly 3)
  const certifications = [
    'AWS Certified Machine Learning - Specialty',
    'TensorFlow Developer Certificate',
    'Google Cloud Professional Machine Learning Engineer'
  ];

  // Check if it's a certification (exact match)
  if (certifications.includes(skill)) {
    return 'certification';
  }
  
  // Check if it's a specialized skill (exact match)
  if (specializedSkills.includes(skill)) {
    return 'specialized';
  }
  
  // Check if it's a common skill (exact match)
  if (commonSkills.includes(skill)) {
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