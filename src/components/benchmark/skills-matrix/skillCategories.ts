export const categories = {
  specialized: [
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
    'Blockchain Development',
    'IoT Development',
    'Cybersecurity',
    'DevSecOps',
    'Big Data Analytics',
    'Robotics Programming',
    'Edge Computing',
    'System Architecture',
    'Microservices Design'
  ],

  common: [
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
  ],

  certification: [
    'Cybersecurity License',
    'AWS Certified Solutions Architect'
  ]
};

export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === 'all') return skills;
  return skills.filter(skill => {
    if (category === 'specialized') {
      return categories.specialized.includes(skill.title);
    }
    if (category === 'common') {
      return categories.common.includes(skill.title);
    }
    if (category === 'certification') {
      return categories.certification.includes(skill.title);
    }
    return false;
  });
};