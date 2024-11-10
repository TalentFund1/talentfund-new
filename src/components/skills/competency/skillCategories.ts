import { technicalSkills, softSkills } from "../../skillsData";

export const isSpecializedSkill = (skill: string): boolean => {
  const specializations = [
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "AWS",
    "Cloud Computing",
    "TensorFlow",
    "PyTorch",
    "Data Science",
    "Neural Networks"
  ];
  
  return technicalSkills.includes(skill) && 
    specializations.some(spec => 
      skill.toLowerCase().includes(spec.toLowerCase())
    );
};

export const isCommonSkill = (skill: string): boolean => {
  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "SQL",
    "Git",
    "Agile",
    "Communication",
    "HTML",
    "CSS",
    "React"
  ];
  
  return softSkills.includes(skill) || 
    commonSkills.some(common => 
      skill.toLowerCase().includes(common.toLowerCase())
    );
};

export const isCertificationSkill = (skill: string): boolean => {
  const certKeywords = [
    "AWS Certified",
    "Professional Scrum",
    "PMP",
    "CISSP",
    "CKA",
    "Solutions Architect",
    "Azure Solutions",
    "Professional Agile",
    "Certified",
    "Certification",
    "Certificate"
  ];
  
  return certKeywords.some(cert => 
    skill.toLowerCase().includes(cert.toLowerCase())
  );
};

export const categorizeSkills = (skills: string[]) => {
  return {
    all: skills.length,
    specialized: skills.filter(isSpecializedSkill).length,
    common: skills.filter(isCommonSkill).length,
    certification: skills.filter(isCertificationSkill).length
  };
};