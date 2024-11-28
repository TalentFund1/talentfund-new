import { roleSkills } from "../../data/roleSkills";

export const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

export const initializeSkillStates = (roleId: string) => {
  console.log('Initializing skill states for role:', roleId);
  
  const states: { [key: string]: any } = {};
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];

  if (!currentRoleSkills) {
    console.error('No role skills found for role:', roleId);
    return states;
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  allSkills.forEach(skill => {
    states[skill.title] = {
      p1: { level: 'unspecified', required: 'preferred' },
      p2: { level: 'unspecified', required: 'preferred' },
      p3: { level: 'unspecified', required: 'preferred' },
      p4: { level: 'unspecified', required: 'preferred' },
      p5: { level: 'unspecified', required: 'preferred' },
      p6: { level: 'unspecified', required: 'preferred' },
      m1: { level: 'unspecified', required: 'preferred' },
      m2: { level: 'unspecified', required: 'preferred' },
      m3: { level: 'unspecified', required: 'preferred' },
      m4: { level: 'unspecified', required: 'preferred' },
      m5: { level: 'unspecified', required: 'preferred' },
      m6: { level: 'unspecified', required: 'preferred' }
    };
  });

  console.log('Initialized states:', states);
  return states;
};