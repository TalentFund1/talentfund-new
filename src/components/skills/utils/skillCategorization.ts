import { UnifiedSkill, RoleSkillData } from '../types/SkillTypes';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

export const getCategorizedSkills = (roleSkills: RoleSkillData) => {
  const specialized: UnifiedSkill[] = [];
  const common: UnifiedSkill[] = [];
  const certifications: UnifiedSkill[] = [];

  roleSkills.skills.forEach(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    switch (unifiedData.category) {
      case 'specialized':
        specialized.push(skill);
        break;
      case 'common':
        common.push(skill);
        break;
      case 'certification':
        certifications.push(skill);
        break;
    }
  });

  return {
    specialized,
    common,
    certifications,
    all: roleSkills.skills
  };
};

export const getSkillCategory = (skillTitle: string): 'specialized' | 'common' | 'certification' => {
  const unifiedData = getUnifiedSkillData(skillTitle);
  return unifiedData.category;
};