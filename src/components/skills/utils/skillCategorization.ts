import { UnifiedSkill, RoleSkillData } from '../types/SkillTypes';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

export const getCategorizedSkills = (roleData: RoleSkillData) => {
  const specialized: UnifiedSkill[] = [];
  const common: UnifiedSkill[] = [];
  const certifications: UnifiedSkill[] = [];

  roleData.skills.forEach(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    switch (unifiedData.category) {
      case 'specialized':
        specialized.push(unifiedData);
        break;
      case 'common':
        common.push(unifiedData);
        break;
      case 'certification':
        certifications.push(unifiedData);
        break;
    }
  });

  console.log('Categorized skills:', {
    roleId: roleData.title,
    specialized: specialized.length,
    common: common.length,
    certifications: certifications.length
  });

  return {
    specialized,
    common,
    certifications,
    all: roleData.skills
  };
};

export const getSkillCategory = (skillTitle: string): 'specialized' | 'common' | 'certification' => {
  const unifiedData = getUnifiedSkillData(skillTitle);
  return unifiedData.category;
};