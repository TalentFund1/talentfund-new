export const getStorageKey = (roleId: string) => `roleToggledSkills-${roleId}`;

export const loadToggledSkills = (roleId: string): string[] => {
  try {
    const savedState = localStorage.getItem(getStorageKey(roleId));
    if (savedState) {
      const parsedSkills = JSON.parse(savedState);
      if (Array.isArray(parsedSkills)) {
        console.log('Loaded saved toggle state for role:', {
          roleId,
          skillCount: parsedSkills.length
        });
        return parsedSkills;
      }
    }
  } catch (error) {
    console.error('Error loading toggled skills:', error);
  }
  return [];
};

export const saveToggledSkills = (roleId: string, skills: string[]) => {
  try {
    localStorage.setItem(getStorageKey(roleId), JSON.stringify(skills));
    console.log('Saved toggled skills for role:', {
      roleId,
      skillCount: skills.length
    });
  } catch (error) {
    console.error('Error saving toggled skills:', error);
  }
};