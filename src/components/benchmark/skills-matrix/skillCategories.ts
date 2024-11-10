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
    'Kubernetes'
  ];

  const certifications = [
    'AWS Certified',
    'Azure Solutions Architect',
    'Professional Scrum',
    'CISSP',
    'CKA'
  ];

  const commonSkills = [
    'JavaScript',
    'Python',
    'Git',
    'SQL',
    'REST APIs',
    'System Design',
    'DevOps',
    'UI/UX Design'
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