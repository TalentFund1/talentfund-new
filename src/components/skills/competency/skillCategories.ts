export const isSpecializedSkill = (skill: string): boolean => {
  const specializedSkills = [
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Computer Vision",
    "Natural Language Processing"
  ];
  
  return specializedSkills.includes(skill);
};

export const isCommonSkill = (skill: string): boolean => {
  const commonSkills = [
    "Python",
    "Problem Solving",
    "Technical Writing"
  ];
  
  return commonSkills.includes(skill);
};

export const isCertificationSkill = (skill: string): boolean => {
  const certifications = [
    "AWS Certified Machine Learning - Specialty",
    "TensorFlow Developer Certificate",
    "Google Cloud Professional Machine Learning Engineer"
  ];
  
  return certifications.includes(skill);
};

export const categorizeSkills = (skills: string[]) => {
  const specialized = skills.filter(isSpecializedSkill);
  const common = skills.filter(isCommonSkill);
  const certifications = skills.filter(isCertificationSkill);
  
  return {
    all: skills.length,
    specialized: specialized.length,
    common: common.length,
    certification: certifications.length
  };
};

export const getSkillsByCategory = (skills: string[]) => {
  return {
    specialized: skills.filter(isSpecializedSkill),
    common: skills.filter(isCommonSkill),
    certification: skills.filter(isCertificationSkill)
  };
};