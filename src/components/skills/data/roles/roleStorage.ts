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
      
      // Ensure roleTrack is preserved from storage
      const roleTrack = parsedSkills.roleTrack || getRoleDefaultTrack(roleId);
      console.log('Loading role skills with track:', {
        roleId,
        roleTrack,
        hasSkills: parsedSkills.skills?.length > 0,
        parsedSkills
      });
      
      // Convert all skills to unified format while preserving categories and track
      const unifiedSpecialized = (parsedSkills.specialized || []).map((skill: any) => ({
        ...getUnifiedSkillData(skill.title),
        category: 'specialized',
        roleTrack
      }));
      
      const unifiedCommon = (parsedSkills.common || []).map((skill: any) => ({
        ...getUnifiedSkillData(skill.title),
        category: 'common',
        roleTrack
      }));
      
      const unifiedCertifications = (parsedSkills.certifications || []).map((skill: any) => ({
        ...getUnifiedSkillData(skill.title),
        category: 'certification',
        roleTrack
      }));
      
      // Combine all skills for the skills array
      const allSkills = [
        ...unifiedSpecialized,
        ...unifiedCommon,
        ...unifiedCertifications
      ];
      
      const roleData = {
        ...parsedSkills,
        roleTrack,
        specialized: unifiedSpecialized,
        common: unifiedCommon,
        certifications: unifiedCertifications,
        skills: allSkills
      };
      
      console.log('Loaded and unified skills:', {
        roleId,
        roleTrack,
        skillsCount: roleData.skills.length,
        specializedCount: roleData.specialized.length,
        commonCount: roleData.common.length,
        certificationsCount: roleData.certifications.length,
        roleData
      });
      
      return roleData;
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return null;
};

export const saveRoleSkills = async (roleId: string, skills: RoleSkillData) => {
  console.log('Saving role skills:', { 
    roleId, 
    roleTrack: skills.roleTrack,
    skillsCount: skills.skills.length,
    skills 
  });
  
  try {
    // Ensure all skills are in unified format while preserving categories and track
    const unifiedSpecialized = skills.specialized.map(skill => ({
      ...getUnifiedSkillData(skill.title),
      category: 'specialized',
      roleTrack: skills.roleTrack
    }));
    
    const unifiedCommon = skills.common.map(skill => ({
      ...getUnifiedSkillData(skill.title),
      category: 'common',
      roleTrack: skills.roleTrack
    }));
    
    const unifiedCertifications = skills.certifications.map(skill => ({
      ...getUnifiedSkillData(skill.title),
      category: 'certification',
      roleTrack: skills.roleTrack
    }));
    
    // Combine all skills for the skills array
    const allSkills = [
      ...unifiedSpecialized,
      ...unifiedCommon,
      ...unifiedCertifications
    ];
    
    const roleData = {
      ...skills,
      roleTrack: skills.roleTrack || getRoleDefaultTrack(roleId), // Ensure roleTrack is always set
      specialized: unifiedSpecialized,
      common: unifiedCommon,
      certifications: unifiedCertifications,
      skills: allSkills
    };
    
    const storageKey = getStorageKey(roleId);
    console.log('Saving role data to storage:', {
      key: storageKey,
      roleData
    });
    
    localStorage.setItem(storageKey, JSON.stringify(roleData));
    
    console.log('Saved role skills with track:', {
      roleId,
      roleTrack: roleData.roleTrack,
      totalSkills: roleData.skills.length,
      specialized: roleData.specialized.length,
      common: roleData.common.length,
      certifications: roleData.certifications.length
    });
    
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
  
  const roleTrack = getRoleDefaultTrack(roleId);
  console.log('Using default track for new role:', {
    roleId,
    roleTrack
  });
  
  return {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    function: "Engineering",
    mappedTitle: "",
    occupation: getRoleTitle(roleId),
    description: "",
    roleTrack,
    skills: [],
    specialized: [],
    common: [],
    certifications: []
  };
};