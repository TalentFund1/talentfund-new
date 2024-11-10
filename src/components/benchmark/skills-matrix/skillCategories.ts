export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
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
    'JavaScript', // Added JavaScript
    'Docker (Software)', // Added Docker with full name
    'Kubernetes',
    'Cloud Architecture',
    'Data Engineering',
    'Quantum Computing',
    'Blockchain Development',
    'IoT Development',
    'Cybersecurity',
    'DevSecOps',
    'Big Data Analytics',
    'Robotics Programming',
    'Edge Computing',
    'System Architecture',
    'Microservices Design'
  ];

  const certifications = [
    'AWS Certified',
    'Azure Solutions Architect',
    'Professional Scrum',
    'CISSP',
    'CKA',
    'Google Cloud Professional',
    'CompTIA Security+',
    'PMP Certification',
    'Cisco CCNA',
    'Oracle Certified Professional',
    'Salesforce Certified Developer',
    'Red Hat Certified Engineer',
    'HashiCorp Certified',
    'Certified Ethical Hacker',
    'ITIL Foundation'
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
    'Analytical Skills'
  ];

  if (certifications.some(cert => skill.includes(cert))) {
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