export const getStorageKey = (roleId: string) => `role-skills-${roleId}`;

export const loadToggledSkills = (roleId: string): string[] => {
  console.log('Loading skills for role:', roleId);
  return [];
};

export const saveToggledSkills = (roleId: string, skills: string[]) => {
  console.log('Saving skills for role:', roleId);
  // No-op - we no longer save toggled skills
};