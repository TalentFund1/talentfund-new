export const getStorageKey = (roleId: string) => `role-skills-${roleId}`;

// These functions are now no-ops since we're removing toggled skills functionality
export const loadToggledSkills = (roleId: string): string[] => {
  console.log('Toggled skills functionality removed - loadToggledSkills is now a no-op');
  return [];
};

export const saveToggledSkills = (roleId: string, skills: string[]) => {
  console.log('Toggled skills functionality removed - saveToggledSkills is now a no-op');
};