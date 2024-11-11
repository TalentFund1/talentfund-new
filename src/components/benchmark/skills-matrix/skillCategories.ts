import { getEmployeeSkills } from "./initialSkills";

const skillSets = {
  "123": { // AI Engineer
    specialized: new Set([
      'Machine Learning',
      'Deep Learning',
      'TensorFlow',
      'Natural Language Processing', 
      'Computer Vision',
      'PyTorch'
    ]),
    common: new Set([
      'Python',
      'Problem Solving',
      'Technical Writing'
    ]),
    certification: new Set([
      'AWS Certified Machine Learning - Specialty',
      'TensorFlow Developer Certificate',
      'Google Cloud Professional Machine Learning Engineer'
    ])
  },
  "124": { // Backend Engineer
    specialized: new Set([
      'Node.js',
      'Database Design',
      'API Development',
      'System Architecture',
      'Kubernetes',
      'GraphQL'
    ]),
    common: new Set([
      'Problem Solving',
      'Code Review',
      'Agile Methodologies'
    ]),
    certification: new Set([
      'AWS Certified Solutions Architect',
      'Kubernetes Administrator (CKA)',
      'MongoDB Professional Developer'
    ])
  },
  "125": { // Frontend Engineer
    specialized: new Set([
      'React',
      'TypeScript',
      'UI/UX Design',
      'CSS/SASS',
      'Next.js',
      'Vue.js'
    ]),
    common: new Set([
      'Cross-browser Compatibility',
      'Responsive Design',
      'Problem Solving'
    ]),
    certification: new Set([
      'AWS Certified Developer - Associate',
      'Google Mobile Web Specialist',
      'Professional Scrum Developer'
    ])
  },
  "126": { // Engineering Manager
    specialized: new Set([
      'System Design',
      'Technical Architecture',
      'Risk Management'
    ]),
    common: new Set([
      'Team Leadership',
      'Project Management',
      'Strategic Planning',
      'Stakeholder Management'
    ]),
    certification: new Set([
      'Project Management Professional (PMP)',
      'Certified Scrum Master (CSM)',
      'ITIL Foundation'
    ])
  }
};

export const categorizeSkill = (skill: string, profileId: string = "123"): 'specialized' | 'common' | 'certification' => {
  const profileSkills = skillSets[profileId as keyof typeof skillSets] || skillSets["123"];

  if (profileSkills.specialized.has(skill)) {
    return 'specialized';
  }
  
  if (profileSkills.common.has(skill)) {
    return 'common';
  }
  
  if (profileSkills.certification.has(skill)) {
    return 'certification';
  }
  
  return 'common';
};

export const filterSkillsByCategory = (
  skills: Array<any>,
  category: string,
  profileId: string = "123"
): Array<any> => {
  if (category === 'all') {
    return skills;
  }

  return skills.filter(skill => 
    categorizeSkill(skill.title, profileId) === category
  );
};

export const getSkillCounts = (profileId: string = "123") => {
  const skills = getEmployeeSkills(profileId);
  const specialized = skills.filter(skill => categorizeSkill(skill.title, profileId) === 'specialized');
  const common = skills.filter(skill => categorizeSkill(skill.title, profileId) === 'common');
  const certification = skills.filter(skill => categorizeSkill(skill.title, profileId) === 'certification');

  return {
    all: skills.length,
    specialized: specialized.length,
    common: common.length,
    certification: certification.length
  };
};