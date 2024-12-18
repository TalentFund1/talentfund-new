import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";

export const filterSkillsByCategory = (
  skills: UnifiedSkill[],
  selectedCategory: string,
  roleId: string = "123"
) => {
  if (selectedCategory === "all") return skills;

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) return skills;

  return skills.filter(skill => {
    if (selectedCategory === "specialized") {
      return currentRoleSkills.specialized.some(s => s.title === skill.title);
    }
    if (selectedCategory === "common") {
      return currentRoleSkills.common.some(s => s.title === skill.title);
    }
    if (selectedCategory === "certification") {
      return currentRoleSkills.certifications.some(s => s.title === skill.title);
    }
    return true;
  });
};