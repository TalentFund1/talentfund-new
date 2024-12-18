import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { roleSkills } from '../../skills/data/roleSkills';

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
    return array.some(s => s.title.toLowerCase() === skill.title.toLowerCase());
  };

  return skills.filter(skill => {
    switch (category) {
      case "specialized":
        return isSkillInArray(skill, currentRoleSkills.specialized);
      case "common":
        return isSkillInArray(skill, currentRoleSkills.common);
      case "certification":
        return isSkillInArray(skill, currentRoleSkills.certifications);
      default:
        return false;
    }
  });
};

export const getCategoryCount = (skills: UnifiedSkill[], category: string, roleId: string = "123") => {
  return filterSkillsByCategory(skills, category, roleId).length;
};

export const categorizeSkill = (skillTitle: string, roleId: string = "123"): string => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  if (currentRoleSkills.specialized.some(s => s.title.toLowerCase() === skillTitle.toLowerCase())) {
    return 'specialized';
  }
  if (currentRoleSkills.common.some(s => s.title.toLowerCase() === skillTitle.toLowerCase())) {
    return 'common';
  }
  if (currentRoleSkills.certifications.some(s => s.title.toLowerCase() === skillTitle.toLowerCase())) {
    return 'certification';
  }
  
  // Default to common if no match is found
  return 'common';
};