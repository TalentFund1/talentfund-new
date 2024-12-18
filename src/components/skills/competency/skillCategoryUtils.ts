import { getUnifiedSkillData } from '../data/skillDatabaseService';

export const isSpecializedSkill = (skill: string, profileId: string): boolean => {
  const skillData = getUnifiedSkillData(skill);
  return skillData.category === 'specialized';
};

export const isCommonSkill = (skill: string, profileId: string): boolean => {
  const skillData = getUnifiedSkillData(skill);
  return skillData.category === 'common';
};

export const isCertificationSkill = (skill: string, profileId: string): boolean => {
  const skillData = getUnifiedSkillData(skill);
  return skillData.category === 'certification';
};