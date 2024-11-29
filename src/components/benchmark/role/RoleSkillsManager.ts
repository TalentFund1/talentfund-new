import { roleSkills } from "../../skills/data/roleSkills";

export const getRoleSkillsKey = (roleId: string) => `roleToggledSkills-${roleId}-v2`;

export const loadRoleSkills = (roleId: string): Set<string> => {
  try {
    const savedState = localStorage.getItem(getRoleSkillsKey(roleId));
    if (savedState) {
      const parsedSkills = JSON.parse(savedState);
      if (Array.isArray(parsedSkills)) {
        console.log('Loading saved skills for role:', {
          roleId,
          skillCount: parsedSkills.length,
          skills: parsedSkills
        });
        return new Set(parsedSkills);
      }
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return new Set();
};

export const saveRoleSkills = (roleId: string, skills: Set<string>) => {
  try {
    const skillsArray = Array.from(skills);
    console.log('Saving skills for role:', {
      roleId,
      skillCount: skillsArray.length,
      skills: skillsArray
    });
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
    skillCount: allSkills.length,
    skills: allSkills
  });

  return new Set(allSkills);
};