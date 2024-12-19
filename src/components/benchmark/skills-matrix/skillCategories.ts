import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";
import { normalizeSkillTitle } from "../../skills/utils/normalization";

export const filterSkillsByCategory = (
  skills: UnifiedSkill[],
  selectedCategory: string,
  roleId: string = "123"
) => {
  console.log('Filtering skills by category:', {
    totalSkills: skills.length,
    selectedCategory,
    roleId
  });

  if (selectedCategory === "all") return skills;

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('Role skills not found for:', roleId);
    return skills;
  }

  // Normalize skill titles for comparison
  const normalizedSkills = new Set(skills.map(skill => normalizeSkillTitle(skill.title)));

  switch (selectedCategory) {
    case "specialized":
      const specializedSkills = currentRoleSkills.specialized.map(s => normalizeSkillTitle(s.title));
      console.log('Specialized skills for role:', specializedSkills);
      return skills.filter(skill => 
        specializedSkills.includes(normalizeSkillTitle(skill.title))
      );
    case "common":
      const commonSkills = currentRoleSkills.common.map(s => normalizeSkillTitle(s.title));
      console.log('Common skills for role:', commonSkills);
      return skills.filter(skill => 
        commonSkills.includes(normalizeSkillTitle(skill.title))
      );
    case "certification":
      const certificationSkills = currentRoleSkills.certifications.map(s => normalizeSkillTitle(s.title));
      console.log('Certification skills for role:', certificationSkills);
      return skills.filter(skill => 
        certificationSkills.includes(normalizeSkillTitle(skill.title))
      );
    default:
      console.log('Unknown category:', selectedCategory);
      return skills;
  }
};