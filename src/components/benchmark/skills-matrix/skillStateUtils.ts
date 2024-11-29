import { roleSkills } from '../../skills/data/roleSkills';

export const getSkillsByRole = (roleId: string) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  return [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];
};

export const initializeRoleSkills = (
  roleId: string,
  initializeState: (skillTitle: string, level: string, required: string) => void
) => {
  const allRoleSkills = getSkillsByRole(roleId);
  
  // Load persisted skills from localStorage
  const persistedSkills = localStorage.getItem(`roleToggledSkills-${roleId}`);
  let toggledSkills: string[] = [];
  
  if (persistedSkills) {
    try {
      toggledSkills = JSON.parse(persistedSkills);
      console.log('Loaded persisted skills for role:', {
        roleId,
        skillCount: toggledSkills.length,
        skills: toggledSkills
      });
    } catch (error) {
      console.error('Error loading persisted skills:', error);
      toggledSkills = allRoleSkills.map(skill => skill.title);
    }
  } else {
    toggledSkills = allRoleSkills.map(skill => skill.title);
  }

  // Initialize states for all skills
  allRoleSkills.forEach(skill => {
    console.log('Initializing skill:', {
      title: skill.title,
      level: skill.level || 'unspecified',
      required: 'preferred' // Default to 'preferred' if requirement is not specified
    });
    
    initializeState(
      skill.title, 
      skill.level || 'unspecified',
      'preferred' // Default to 'preferred' if requirement is not specified
    );
  });

  return allRoleSkills;
};

export const persistToggledSkills = (roleId: string, skills: Set<string>) => {
  try {
    const skillsArray = Array.from(skills);
    localStorage.setItem(`roleToggledSkills-${roleId}`, JSON.stringify(skillsArray));
    console.log('Persisted toggled skills for role:', {
      roleId,
      skillCount: skillsArray.length,
      skills: skillsArray
    });
  } catch (error) {
    console.error('Error persisting toggled skills:', error);
  }
};