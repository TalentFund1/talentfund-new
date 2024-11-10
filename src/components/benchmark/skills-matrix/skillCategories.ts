export const isSpecializedSkill = (skill: string): boolean => {
  const specializedSkills = [
    "Amazon Web Services",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "MLflow",
    "Natural Language Understanding",
    "Computer Vision",
    "Kubernetes",
    "Docker (Software)",
    "Conversational AI",
    "TensorFlow",
    "PyTorch"
  ];
  
  return specializedSkills.includes(skill);
};

export const isCommonSkill = (skill: string): boolean => {
  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "SQL",
    "Git",
    "REST APIs",
    "Communication",
    "Problem Solving",
    "Team Collaboration"
  ];
  
  return commonSkills.includes(skill);
};

export const isCertificationSkill = (skill: string): boolean => {
  const certifications = [
    "Cybersecurity License",
    "AWS Certified Solutions Architect",
    "AWS Certified Developer",
    "Professional Scrum Master",
    "Kubernetes Administrator (CKA)",
    "Azure Solutions Architect"
  ];
  
  return certifications.includes(skill);
};

export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") return skills;
  
  const filterFn = {
    specialized: (skill: any) => !isCommonSkill(skill.title) && !isCertificationSkill(skill.title),
    common: (skill: any) => isCommonSkill(skill.title),
    certification: (skill: any) => isCertificationSkill(skill.title)
  }[category];
  
  return filterFn ? skills.filter(filterFn) : skills;
};
