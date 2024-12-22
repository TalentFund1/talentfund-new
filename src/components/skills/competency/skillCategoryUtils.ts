import { roleSkills } from '../data/roleSkills';

export const isSpecializedSkill = (skill: string, profileId: string): boolean => {
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];
  return currentRoleSkills?.specialized.some(spec => 
    spec.title.toLowerCase() === skill.toLowerCase()
  ) || false;
};

export const isCommonSkill = (skill: string, profileId: string): boolean => {
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];
  return currentRoleSkills?.common.some(common => 
    common.title.toLowerCase() === skill.toLowerCase()
  ) || false;
};

export const isCertificationSkill = (skill: string, profileId: string): boolean => {
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];
  return currentRoleSkills?.certifications.some(cert => 
    cert.title.toLowerCase() === skill.toLowerCase()
  ) || false;
};