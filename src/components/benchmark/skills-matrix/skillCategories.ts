export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") {
    return skills;
  }

  const specializationMap: { [key: string]: string[] } = {
    "System Design": "specialized",
    "Technical Architecture": "specialized",
    "Team Leadership": "common",
    "Project Management": "common",
    "Risk Management": "common"
  };

  return skills.filter(skill => {
    const skillCategory = specializationMap[skill.title];
    return skillCategory === category;
  });
};

export const getCategoryCount = (skills: any[], category: string) => {
  return filterSkillsByCategory(skills, category).length;
};