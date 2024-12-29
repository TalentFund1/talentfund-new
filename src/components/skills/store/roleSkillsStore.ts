import { create } from 'zustand';
import { RoleSkillData, RoleSkillRequirement } from '../types/roleSkillTypes';
import { getUnifiedSkillData } from '../data/skillDatabaseService';
import { roleSkills as defaultRoleSkills } from '../data/roleSkills';

interface RoleSkillsStore {
  roleSkills: Record<string, RoleSkillData>;
  getRoleSkills: (roleId: string) => RoleSkillData | undefined;
  getSkillRequirement: (roleId: string, skillTitle: string) => RoleSkillRequirement | undefined;
  initializeRoleSkills: (roleId: string) => void;
}

export const useRoleSkillsStore = create<RoleSkillsStore>((set, get) => ({
  roleSkills: {},
  
  getRoleSkills: (roleId: string) => {
    return get().roleSkills[roleId];
  },
  
  getSkillRequirement: (roleId: string, skillTitle: string) => {
    const roleSkills = get().roleSkills[roleId];
    if (!roleSkills) return undefined;
    
    const allSkills = [...roleSkills.specialized, ...roleSkills.common, ...roleSkills.certifications];
    return allSkills.find(skill => skill.title === skillTitle);
  },
  
  initializeRoleSkills: (roleId: string) => {
    const existingRole = get().roleSkills[roleId];
    if (existingRole) {
      console.log('Role skills already initialized:', roleId);
      return;
    }

    const defaultRole = Object.values(defaultRoleSkills).find(role => role.roleId === roleId);
    if (!defaultRole) {
      console.warn('No default role skills found for:', roleId);
      return;
    }

    const processedSkills = defaultRole.skills.map(skill => {
      const unifiedData = getUnifiedSkillData(skill.title);
      return {
        ...unifiedData,
        ...skill,
        minimumLevel: skill.minimumLevel || 'beginner',
        requirementLevel: skill.requirementLevel || 'required',
        metrics: {
          growth: unifiedData.growth || '0%',
          salary: unifiedData.salary || 'market',
          confidence: unifiedData.confidence || 'medium',
          skillScore: skill.skillScore || 0
        }
      } as RoleSkillRequirement;
    });

    const roleData: RoleSkillData = {
      ...defaultRole,
      specialized: processedSkills.filter(skill => skill.category === 'specialized'),
      common: processedSkills.filter(skill => skill.category === 'common'),
      certifications: processedSkills.filter(skill => skill.category === 'certification'),
      skills: processedSkills
    };

    set(state => ({
      roleSkills: {
        ...state.roleSkills,
        [roleId]: roleData
      }
    }));

    console.log('Initialized role skills:', {
      roleId,
      skillCount: processedSkills.length,
      skills: processedSkills.map(s => s.title)
    });
  }
}));