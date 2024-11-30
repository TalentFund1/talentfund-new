import { roleSkills } from "../../../skills/data/roleSkills";

export const getToggledSkillsCount = (skills: Array<{ title: string }>, toggledSkills: Set<string>) => {
  return skills.filter(skill => toggledSkills.has(skill.title)).length;
};

export const getCategorySkillCounts = (roleId: string, toggledSkills: Set<string>) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  console.log('Calculating category skill counts:', {
    roleId,
    toggledSkillsCount: toggledSkills.size
  });

  const specialized = getToggledSkillsCount(currentRoleSkills.specialized || [], toggledSkills);
  const common = getToggledSkillsCount(currentRoleSkills.common || [], toggledSkills);
  const certification = getToggledSkillsCount(currentRoleSkills.certifications || [], toggledSkills);
  const all = specialized + common + certification;

  return {
    specialized,
    common,
    certification,
    all
  };
};