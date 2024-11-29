import { roleSkills } from '../../skills/data/roleSkills';

export const getSkillsByRole = (roleId: string) => {
  console.log('Getting skills for role:', roleId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  
  if (!currentRoleSkills) {
    console.error('No skills found for role:', roleId);
    return [];
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  console.log('Retrieved skills:', {
    roleId,
    specialized: currentRoleSkills.specialized.length,
    common: currentRoleSkills.common.length,
    certifications: currentRoleSkills.certifications.length,
    total: allSkills.length
  });

  return allSkills;
};

export const loadPersistedSkills = (roleId: string, allRoleSkills: any[]) => {
  console.log('Loading persisted skills for role:', roleId);
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
    // If no persisted skills, default to all skills for the role
    toggledSkills = allRoleSkills.map(skill => skill.title);
  }

  // Ensure we only return skills that actually exist for this role
  const validSkills = toggledSkills.filter(skillTitle => 
    allRoleSkills.some(roleSkill => roleSkill.title === skillTitle)
  );

  return validSkills;
};

export const initializeRoleSkills = (
  roleId: string,
  initializeState: (skillTitle: string, level: string, required: string) => void
) => {
  const allRoleSkills = getSkillsByRole(roleId);

  // Initialize states for all skills
  allRoleSkills.forEach(skill => {
    console.log('Initializing skill:', {
      title: skill.title,
      level: skill.level || 'unspecified',
      required: 'preferred'
    });
    
    initializeState(
      skill.title, 
      skill.level || 'unspecified',
      'preferred'
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