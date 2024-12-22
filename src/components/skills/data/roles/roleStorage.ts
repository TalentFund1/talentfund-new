import { RoleSkillData } from '../../types/SkillTypes';
import { getSkillCategory } from '../skills/categories/skillCategories';
import { getRoleTitle, getRoleSoc, getRoleDefaultTrack } from './roleDefinitions';

const getStorageKey = (roleId: string) => `role-skills-${roleId}`;

export const loadRoleSkills = (roleId: string): RoleSkillData | null => {
  try {
    console.log('Loading role skills from storage:', roleId);
    const savedSkills = localStorage.getItem(getStorageKey(roleId));
    
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills);
      
      // Recategorize all skills using universal database
      const recategorizedSkills = {
        ...parsedSkills,
        specialized: parsedSkills.specialized.filter((skill: any) => 
          getSkillCategory(skill.title) === 'specialized'
        ),
        common: parsedSkills.common.filter((skill: any) => 
          getSkillCategory(skill.title) === 'common'
        ),
        certifications: parsedSkills.certifications.filter((skill: any) => 
          getSkillCategory(skill.title) === 'certification'
        )
      };
      
      console.log('Loaded and recategorized skills:', {
        roleId,
        specialized: recategorizedSkills.specialized.length,
        common: recategorizedSkills.common.length,
        certifications: recategorizedSkills.certifications.length
      });
      
      return recategorizedSkills;
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return null;
};

export const saveRoleSkills = async (roleId: string, skills: RoleSkillData) => {
  console.log('Saving role skills:', { roleId, skills });
  
  try {
    // Ensure all skills have proper categorization from universal database
    const updatedSkills = {
      ...skills,
      specialized: skills.specialized.filter(skill => 
        getSkillCategory(skill.title) === 'specialized'
      ),
      common: skills.common.filter(skill => 
        getSkillCategory(skill.title) === 'common'
      ),
      certifications: skills.certifications.filter(skill => 
        getSkillCategory(skill.title) === 'certification'
      )
    };
    
    localStorage.setItem(getStorageKey(roleId), JSON.stringify(updatedSkills));
    
    console.log('Updated role skills with universal categories:', updatedSkills);
    
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
    specialized: [],
    common: [],
    certifications: [],
    skills: []
  };
};