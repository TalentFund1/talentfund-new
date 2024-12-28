import { RoleSkillData } from '../types/SkillTypes';
import { loadRoleSkills, saveRoleSkills, initializeRoleSkills } from './roles/roleStorage';
import { getUnifiedSkillData } from './skillDatabaseService';

// Initialize roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    function: "Engineering",
    mappedTitle: "Engineering Manager",
    occupation: "Engineering Manager",
    description: "Lead and manage engineering teams",
    roleTrack: "Managerial", // Explicitly set Managerial track
    specialized: [],
    common: [],
    certifications: [],
    skills: []
  }
};

// Initialize all roles
const roleIds = ["123", "124", "125", "126", "127", "128"];

roleIds.forEach(id => {
  if (!roleSkills[id]) {
    const savedSkills = loadRoleSkills(id);
    roleSkills[id] = savedSkills || initializeRoleSkills(id);
  }
  
  console.log(`Initialized role ${id}:`, {
    title: roleSkills[id].title,
    track: roleSkills[id].roleTrack,
    skillsCount: roleSkills[id].skills.length
  });
});

// Export helper functions
export { saveRoleSkills, loadRoleSkills };

// Helper function to get category for a skill in a role
export const getRoleSkillCategory = (skillTitle: string): string => {
  const skillData = getUnifiedSkillData(skillTitle);
  return skillData.category;
};