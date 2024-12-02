import { specializedSkillsByProfile, commonSkillsByProfile, certificationSkillsByProfile } from './skillProfileData';

export const isSpecializedSkill = (skill: string, profileId: string): boolean => {
  return specializedSkillsByProfile[profileId]?.some(spec => 
    skill.toLowerCase() === spec.toLowerCase()
  ) || false;
};

export const isCommonSkill = (skill: string, profileId: string): boolean => {
  return commonSkillsByProfile[profileId]?.some(common => 
    skill.toLowerCase() === common.toLowerCase()
  ) || false;
};

export const isCertificationSkill = (skill: string, profileId: string): boolean => {
  return certificationSkillsByProfile[profileId]?.some(cert => 
    skill.toLowerCase() === cert.toLowerCase()
  ) || false;
};