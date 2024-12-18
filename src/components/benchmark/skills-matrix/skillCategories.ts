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

  switch (selectedCategory) {
    case "specialized":
      return skills.filter(skill =>
        currentRoleSkills.specialized.some(s => s.title === skill.title)
      );
    case "common":
      return skills.filter(skill =>
        currentRoleSkills.common.some(s => s.title === skill.title)
      );
    case "certification":
      return skills.filter(skill =>
        currentRoleSkills.certifications.some(s => s.title === skill.title)
      );
    default:
      return skills;
  }
};