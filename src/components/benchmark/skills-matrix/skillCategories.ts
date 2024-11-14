export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") {
    return skills;
  }

  const specializationMap: { [key: string]: string } = {
    // Specialized Skills - AI & ML
    "Machine Learning": "specialized",
    "Deep Learning": "specialized",
    "Natural Language Processing": "specialized",
    "Computer Vision": "specialized",
    "PyTorch": "specialized",
    "TensorFlow": "specialized",
    "Python": "specialized", // Moved Python to specialized skills
    
    // Common Skills
    "Problem Solving": "common",
    "Technical Writing": "common",
    
    // Certifications
    "AWS Certified Machine Learning - Specialty": "certification",
    "TensorFlow Developer Certificate": "certification",
    "Google Cloud Professional Machine Learning Engineer": "certification"
  };

  return skills.filter(skill => {
    const skillCategory = specializationMap[skill.title];
    return skillCategory === category;
  });
};

export const getCategoryCount = (skills: any[], category: string) => {
  return filterSkillsByCategory(skills, category).length;
};

export const categorizeSkill = (skillName: string): string => {
  const specializationMap: { [key: string]: string } = {
    // Specialized Skills - AI & ML
    "Machine Learning": "specialized",
    "Deep Learning": "specialized",
    "Natural Language Processing": "specialized",
    "Computer Vision": "specialized",
    "PyTorch": "specialized",
    "TensorFlow": "specialized",
    "Python": "specialized", // Moved Python to specialized skills
    
    // Common Skills
    "Problem Solving": "common",
    "Technical Writing": "common",
    
    // Certifications
    "AWS Certified Machine Learning - Specialty": "certification",
    "TensorFlow Developer Certificate": "certification",
    "Google Cloud Professional Machine Learning Engineer": "certification"
  };

  return specializationMap[skillName] || 'common';
};