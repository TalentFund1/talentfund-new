import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { roleSkills } from '../../skills/data/roleSkills';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

export const filterSkillsByCategory = (skills: UnifiedSkill[], category: string, roleId: string = "123") => {
  if (category === "all") {
    return skills;
  }

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  console.log('Filtering skills by category:', {
    category,
    roleId,
    totalSkills: skills.length,
    roleSkills: {
      specialized: currentRoleSkills.specialized.length,
      common: currentRoleSkills.common.length,
      certification: currentRoleSkills.certifications.length
    }
  });

  // Get the unified skill data to ensure consistent categorization
  const getSkillCategory = (skill: UnifiedSkill) => {
    const unifiedSkill = getUnifiedSkillData(skill.title);
    return unifiedSkill.category;
  };

  return skills.filter(skill => {
    const skillCategory = getSkillCategory(skill);
    console.log(`Filtering skill ${skill.title} with category ${skillCategory}`);
    
    switch (category) {
      case "specialized":
        return skillCategory === "specialized";
      case "common":
        return skillCategory === "common";
      case "certification":
        return skillCategory === "certification";
      default:
        return false;
    }
  });
};

export const getCategoryCount = (skills: UnifiedSkill[], category: string, roleId: string = "123") => {
  return filterSkillsByCategory(skills, category, roleId).length;
};

export const categorizeSkill = (skillTitle: string, roleId: string = "123"): string => {
  const unifiedSkill = getUnifiedSkillData(skillTitle);
  console.log(`Categorizing skill ${skillTitle} as ${unifiedSkill.category}`);
  return unifiedSkill.category;
};