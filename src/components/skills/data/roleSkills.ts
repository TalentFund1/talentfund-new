import { RoleSkillData } from '../types/SkillTypes';
import { loadRoleSkills, saveRoleSkills, initializeRoleSkills } from './roles/roleStorage';
import { getUnifiedSkillData } from './skillDatabaseService';

// Initialize roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {};

// Initialize all roles with their correct tracks
const roleIds = ["123", "124", "125", "126", "127", "128"];

roleIds.forEach(id => {
  const savedSkills = loadRoleSkills(id);
  const baseSkills = savedSkills || initializeRoleSkills(id);
  
  // Set managerial track for specific roles
  const isManagerial = id === "126" || id === "128"; // Engineering Manager and Product Leader
  
  roleSkills[id] = {
    ...baseSkills,
    roleTrack: isManagerial ? "Managerial" : "Professional"
  };
  
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