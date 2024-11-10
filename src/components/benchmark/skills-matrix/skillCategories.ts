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

  // Check if the skill title or subcategory contains certification keywords
  const isCertification = (skill: string, subcategory?: string): boolean => {
    const normalizedSkill = skill.toLowerCase();
    const normalizedSubcategory = subcategory?.toLowerCase() || '';
    
    return certificationKeywords.some(cert => 
      normalizedSkill.includes(cert.toLowerCase()) || 
      normalizedSubcategory.includes('certification')
    );
  };

  const specializedSkills = [
    'Quantum Computing',
    'Robotics Programming',
    '5G Network Architecture',
    'Edge Computing',
    'Blockchain Development',
    'DevSecOps',
    'System Architecture',
    'Data Engineering',
    'IoT Development'
  ];

  const commonSkills = [
    'Technical Writing',
    'Agile Project Management',
    'Business Analysis',
    'Risk Management',
    'Strategic Leadership',
    'Change Management',
    'Cross-cultural Communication'
  ];

  if (isCertification(skill)) {
    return 'certification';
  }
  
  if (specializedSkills.includes(skill)) {
    return 'specialized';
  }
  
  return 'common';
};

export const filterSkillsByCategory = (
  skills: Array<any>,
  category: string
): Array<any> => {
  if (category === 'all') {
    return skills;
  }

  return skills.filter(skill => 
    categorizeSkill(skill.title) === category || 
    (category === 'certification' && skill.subcategory.toLowerCase().includes('certification'))
  );
};