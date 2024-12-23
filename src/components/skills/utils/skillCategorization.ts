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
        specialized.push({ ...unifiedData, ...skill });
        break;
      case 'common':
        common.push({ ...unifiedData, ...skill });
        break;
      case 'certification':
        certifications.push({ ...unifiedData, ...skill });
        break;
    }
  });

  console.log('Categorized skills:', {
    roleId: roleData.title,
    specialized: specialized.length,
    common: common.length,
    certifications: certifications.length,
    total: roleData.skills.length
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