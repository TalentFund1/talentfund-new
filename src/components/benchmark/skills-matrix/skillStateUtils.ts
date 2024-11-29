import { roleSkills } from "../../skills/data/roleSkills";

export const initializeRoleSkills = (
  roleId: string,
  initializeState: (title: string, level: string, required: string) => void
) => {
  console.log('Initializing skills for role:', roleId);
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Initialize each skill's state
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

export const getSkillsByRole = (roleId: string) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  return {
    specialized: currentRoleSkills.specialized || [],
    common: currentRoleSkills.common || [],
    certifications: currentRoleSkills.certifications || []
  };
};