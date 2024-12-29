import { RoleSkillData, RoleSkillRequirement } from '../../types/roleSkillTypes';
import { loadRoleSkills, saveRoleSkills, initializeRoleSkills } from './roles/roleStorage';
import { getUnifiedSkillData } from './skillDatabaseService';

// Initialize roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {};

// Initialize all roles with their correct tracks
const roleIds = ["123", "124", "125", "126", "127", "128"];

// Initialize roles synchronously to ensure data is available immediately
roleIds.forEach(id => {
  const savedSkills = loadRoleSkills(id);
  const baseSkills = savedSkills || initializeRoleSkills(id);
  
  // Set managerial track for specific roles
  const isManagerial = id === "126" || id === "128"; // Engineering Manager and Product Leader
  
  roleSkills[id] = {
    ...baseSkills,
    roleTrack: isManagerial ? "Managerial" : "Professional",
    specialized: (baseSkills.specialized || []).map(skill => ({
      ...skill,
      minimumLevel: 'beginner',
      requirementLevel: 'required',
      confidence: 'medium',
      skillScore: 0,
      metrics: {
        growth: skill.growth || '0%',
        salary: skill.salary || 'market',
        confidence: 'medium',
        skillScore: 0
      }
    })) as RoleSkillRequirement[],
    common: (baseSkills.common || []).map(skill => ({
      ...skill,
      minimumLevel: 'beginner',
      requirementLevel: 'required',
      confidence: 'medium',
      skillScore: 0,
      metrics: {
        growth: skill.growth || '0%',
        salary: skill.salary || 'market',
        confidence: 'medium',
        skillScore: 0
      }
    })) as RoleSkillRequirement[],
    certifications: (baseSkills.certifications || []).map(skill => ({
      ...skill,
      minimumLevel: 'beginner',
      requirementLevel: 'required',
      confidence: 'medium',
      skillScore: 0,
      metrics: {
        growth: skill.growth || '0%',
        salary: skill.salary || 'market',
        confidence: 'medium',
        skillScore: 0
      }
    })) as RoleSkillRequirement[]
  };
  
  console.log(`Initialized role ${id}:`, {
    title: roleSkills[id].title,
    track: roleSkills[id].roleTrack,
    skillsCount: roleSkills[id].skills?.length || 0
  });
});

// Export helper functions
export { saveRoleSkills, loadRoleSkills };

// Helper function to get category for a skill in a role
export const getRoleSkillCategory = (skillTitle: string): string => {
  const skillData = getUnifiedSkillData(skillTitle);
  return skillData.category;
};

// Helper function to get role ID from title
export const getRoleIdFromTitle = (title: string): string | undefined => {
  const entry = Object.entries(roleSkills).find(([_, data]) => data.title === title);
  if (entry) {
    console.log('Found role ID for title:', { title, id: entry[0], track: entry[1].roleTrack });
    return entry[0];
  }
  console.warn('No role ID found for title:', title);
  return undefined;
};

// Helper function to check if a role is managerial
export const isManagerialRole = (roleId: string): boolean => {
  const role = roleSkills[roleId];
  const isManagerial = role?.roleTrack === "Managerial";
  console.log('Checking if role is managerial:', { 
    roleId, 
    title: role?.title,
    track: role?.roleTrack,
    isManagerial 
  });
  return isManagerial;
};