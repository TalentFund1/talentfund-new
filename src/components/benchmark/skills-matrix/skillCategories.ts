import { getEmployeeSkills } from "./initialSkills";

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

  if (certifications.includes(skill)) {
    return 'certification';
  }
  
  if (specializedSkills.includes(skill)) {
    return 'specialized';
  }
  
  if (commonSkills.includes(skill)) {
    return 'common';
  }
  
  // Default to common to avoid uncategorized skills
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

export const getSkillCounts = (employeeId: string) => {
  const skills = getEmployeeSkills(employeeId);
  const specialized = skills.filter(skill => categorizeSkill(skill.title) === 'specialized');
  const common = skills.filter(skill => categorizeSkill(skill.title) === 'common');
  const certification = skills.filter(skill => categorizeSkill(skill.title) === 'certification');

  return {
    all: skills.length,
    specialized: specialized.length,
    common: common.length,
    certification: certification.length
  };
};