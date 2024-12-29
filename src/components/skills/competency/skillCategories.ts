import { UnifiedSkill } from '../types/SkillTypes';
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

export const categorizeSkills = (skills: string[], profileId: string) => {
  console.log('Categorizing skills for profile:', profileId);
  
  const specialized = skills.filter(skill => isSpecializedSkill(skill, profileId));
  const common = skills.filter(skill => isCommonSkill(skill, profileId));
  const certifications = skills.filter(skill => isCertificationSkill(skill, profileId));
  
  return {
    all: skills.length,
    specialized: specialized.length,
    common: common.length,
    certification: certifications.length
  };
};

export const categorizeSkill = (skill: string, profileId: string): 'specialized' | 'common' | 'certification' => {
  console.log('Categorizing skill:', skill, 'for profile:', profileId);
  
  if (isSpecializedSkill(skill, profileId)) return 'specialized';
  if (isCertificationSkill(skill, profileId)) return 'certification';
  return 'common';
};