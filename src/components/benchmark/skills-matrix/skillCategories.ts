import { specializedSkills, commonSkills, certificationSkills } from '@/components/skillsData';

export const isSpecializedSkill = (skill: string): boolean => {
  return specializedSkills.includes(skill);
};

export const isCommonSkill = (skill: string): boolean => {
  return commonSkills.includes(skill);
};

export const isCertificationSkill = (skill: string): boolean => {
  return certificationSkills.includes(skill);
};

export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") return skills;
  
  const filterFn = {
    specialized: isSpecializedSkill,
    common: isCommonSkill,
    certification: isCertificationSkill
  }[category];
  
  return filterFn ? skills.filter(skill => filterFn(skill.title)) : skills;
};