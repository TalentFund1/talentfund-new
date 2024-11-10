export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  const certificationKeywords = [
    'CISSP',
    'AWS Certified',
    'Certified Information Systems Security Professional',
    'Solutions Architect',
    'Professional Scrum',
    'Azure Solutions Architect',
    'Google Cloud Professional',
    'CompTIA Security+',
    'Security+ Certification',
    'PMP',
    'Project Management Professional',
    'Certified Scrum Master',
    'CSM',
    'Cisco CCNA',
    'Oracle Certified Professional',
    'Salesforce Certified Developer',
    'Red Hat Certified Engineer',
    'HashiCorp Certified',
    'Certified Ethical Hacker',
    'ITIL Foundation',
    'Certification',
    'Certificate'
  ];

  const specializedSkills = [
    'Amazon Web Services',
    'Artificial Intelligence',
    'Conversational AI',
    'Deep Learning',
    'Machine Learning',
    'MLflow',
    'Natural Language Understanding',
    'Computer Vision',
    'TensorFlow',
    'PyTorch',
    'Docker',
    'JavaScript',
    'Docker (Software)',
    'Kubernetes',
    'Cloud Architecture',
    'Data Engineering',
    'Quantum Computing',
    'Robotics Programming',
    '5G Network Architecture',
    'System Architecture',
    'Microservices Design'
  ];

  const commonSkills = [
    'Python',
    'Git',
    'SQL',
    'REST APIs',
    'System Design',
    'DevOps',
    'UI/UX Design',
    'Problem Solving',
    'Critical Thinking',
    'Team Leadership',
    'Project Management',
    'Communication Skills',
    'Agile Methodologies',
    'Time Management',
    'Conflict Resolution',
    'Strategic Planning',
    'Mentoring',
    'Cross-functional Collaboration',
    'Stakeholder Management',
    'Change Management',
    'Decision Making',
    'Innovation',
    'Analytical Skills',
    'Technical Writing',
    'Agile Project Management',
    'Business Analysis',
    'Risk Management'
  ];

  // Check if the skill contains any certification keywords
  if (certificationKeywords.some(cert => 
    skill.toLowerCase().includes(cert.toLowerCase())
  )) {
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
    categorizeSkill(skill.title) === category
  );
};