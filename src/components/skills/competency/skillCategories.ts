export const isSpecializedSkill = (skill: string): boolean => {
  const specializations = [
    "Amazon Web Services",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "TensorFlow",
    "PyTorch",
    "Data Science",
    "Neural Networks",
    "MongoDB",
    "Kubernetes"
  ];
  
  return specializations.some(spec => 
    skill.toLowerCase().includes(spec.toLowerCase())
  );
};

export const isCommonSkill = (skill: string): boolean => {
  const commonSkills = [
    "Python",
    "JavaScript",
    "Java",
    "SQL",
    "Git",
    "Agile",
    "Communication",
    "Leadership",
    "Project Management",
    "Team Management"
  ];
  
  return commonSkills.some(common => 
    skill.toLowerCase().includes(common.toLowerCase())
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