import { roleSkills } from "../../skills/data/roleSkills";

export const getRoleSkillsKey = (roleId: string) => `roleToggledSkills-${roleId}`;

export const loadRoleSkills = (roleId: string): Set<string> => {
  try {
    const savedSkills = localStorage.getItem(getRoleSkillsKey(roleId));
    if (savedSkills) {
      console.log('Loading saved skills for role:', { roleId, skills: JSON.parse(savedSkills) });
      return new Set(JSON.parse(savedSkills));
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return new Set();
};

export const saveRoleSkills = (roleId: string, skills: Set<string>) => {
  try {
    const skillsArray = Array.from(skills);
    console.log('Saving skills for role:', { roleId, skillCount: skillsArray.length });
    localStorage.setItem(getRoleSkillsKey(roleId), JSON.stringify(skillsArray));
  } catch (error) {
    console.error('Error saving role skills:', error);
  }
};

export const initializeRoleSkills = (roleId: string): Set<string> => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('No skills found for role:', roleId);
    return new Set();
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].map(skill => skill.title);

  console.log('Initializing default skills for role:', {
    roleId,
    skillCount: allSkills.length
  });

  return new Set(allSkills);
};