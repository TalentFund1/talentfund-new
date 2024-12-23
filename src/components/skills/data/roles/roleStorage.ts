import { RoleSkillData } from '../../types/SkillTypes';
import { getUnifiedSkillData } from '../skillDatabaseService';
import { getRoleTitle, getRoleSoc, getRoleDefaultTrack } from './roleDefinitions';

const getStorageKey = (roleId: string) => `role-skills-${roleId}`;

export const loadRoleSkills = (roleId: string): RoleSkillData | null => {
  try {
    console.log('Loading role skills from storage:', roleId);
    const savedSkills = localStorage.getItem(getStorageKey(roleId));
    
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills);
      
      // Convert all skills to unified format
      const unifiedSkills = parsedSkills.skills.map((skill: any) => 
        getUnifiedSkillData(skill.title)
      );
      
      const roleData = {
        ...parsedSkills,
        skills: unifiedSkills
      };
      
      console.log('Loaded and unified skills:', {
        roleId,
        skillsCount: roleData.skills.length
      });
      
      return roleData;
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return null;
};

export const saveRoleSkills = async (roleId: string, skills: RoleSkillData) => {
  console.log('Saving role skills:', { roleId, skills });
  
  try {
    // Ensure all skills are in unified format
    const unifiedSkills = skills.skills.map(skill => 
      getUnifiedSkillData(skill.title)
    );
    
    const roleData = {
      ...skills,
      skills: unifiedSkills
    };
    
    localStorage.setItem(getStorageKey(roleId), JSON.stringify(roleData));
    
    console.log('Updated role skills with unified data:', roleData);
    
    window.dispatchEvent(new CustomEvent('roleSkillsUpdated', { 
      detail: { roleId } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error saving role skills:', error);
    throw error;
  }
};

export const initializeRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Initializing new role skills:', roleId);
  
  return {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    function: "Engineering",
    mappedTitle: "",
    occupation: getRoleTitle(roleId),
    description: "",
    roleTrack: getRoleDefaultTrack(roleId),
    skills: []
  };
};