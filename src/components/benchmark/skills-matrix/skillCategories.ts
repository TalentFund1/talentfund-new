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

  // Helper function to check if a skill exists in an array
  const isSkillInArray = (skill: UnifiedSkill, array: UnifiedSkill[]) => {
    const normalizedSkillTitle = skill.title.toLowerCase();
    return array.some(s => s.title.toLowerCase() === normalizedSkillTitle);
  };

  // Get the unified skill data to ensure consistent categorization
  const getSkillCategory = (skill: UnifiedSkill) => {
    const unifiedSkill = getUnifiedSkillData(skill.title);
    return unifiedSkill.category;
  };

  return skills.filter(skill => {
    const skillCategory = getSkillCategory(skill);
    
    switch (category) {
      case "specialized":
        return skillCategory === "specialized" && isSkillInArray(skill, currentRoleSkills.specialized);
      case "common":
        return skillCategory === "common" && isSkillInArray(skill, currentRoleSkills.common);
      case "certification":
        return skillCategory === "certification" && isSkillInArray(skill, currentRoleSkills.certifications);
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
  return unifiedSkill.category;
};