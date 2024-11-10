export const isSpecializedSkill = (skill: string): boolean => {
  const specializedSkills = [
    "Amazon Web Services",
    "Python",
    "TensorFlow",
    "MongoDB",
    "Kubernetes",
    "PyTorch",
    "Natural Language Processing",
    "Computer Vision"
  ];
  
  return specializedSkills.some(spec => 
    skill.toLowerCase() === spec.toLowerCase()
  );
};

export const isCommonSkill = (skill: string): boolean => {
  const commonSkills = [
    "Git",
    "JavaScript",
    "Java",
    "SQL",
    "Agile",
    "Communication",
    "Leadership",
    "Project Management",
    "Team Management"
  ];
  
  return commonSkills.some(common => 
    skill.toLowerCase() === common.toLowerCase()
  ) && !isCertificationSkill(skill);
};

export const isCertificationSkill = (skill: string): boolean => {
  const certKeywords = [
    "AWS Certified",
    "Azure Solutions Architect",
    "Solutions Architect",
    "Professional Scrum",
    "PMP",
    "CISSP",
    "CKA",
    "Administrator (CKA)",
    "Certified",
    "Certification",
    "Certificate"
  ];
  
  return certKeywords.some(cert => 
    skill.toLowerCase().includes(cert.toLowerCase())
  );
};

export const categorizeSkills = (skills: string[]) => {
  const specialized = skills.filter(isSpecializedSkill);
  const certifications = skills.filter(isCertificationSkill);
  const common = skills.filter(skill => 
    !isSpecializedSkill(skill) && 
    !isCertificationSkill(skill) && 
    isCommonSkill(skill)
  );
  
  return {
    all: skills.length,
    specialized: specialized.length,
    common: common.length,
    certification: certifications.length
  };
};