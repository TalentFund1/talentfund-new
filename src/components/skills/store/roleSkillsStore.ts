import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleSkillData, RoleSkillRequirement, RoleSkillsStore } from '../types/roleSkillTypes';
import { roleSkills } from '../data/roleSkills';
import { SkillLevel } from '../types/sharedSkillTypes';
import { UnifiedSkill } from '../types/SkillTypes';

const normalizeSkillLevel = (level: string | undefined): SkillLevel => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return 'advanced';
    case 'intermediate':
      return 'intermediate';
    case 'beginner':
      return 'beginner';
    default:
      return 'unspecified';
  }
};

const transformToRoleSkillRequirement = (skill: UnifiedSkill): RoleSkillRequirement => {
  return {
    ...skill,
    minimumLevel: normalizeSkillLevel(skill.level),
    requirementLevel: 'required',
    benchmarks: skill.benchmarks || { B: false, R: false, M: false, O: false },
    metrics: {
      growth: skill.growth || '0%',
      salary: skill.salary || 'market',
      confidence: skill.confidence || 'medium'
    }
  };
};

export const useRoleSkillsStore = create<RoleSkillsStore>()(
  persist(
    (set, get) => ({
      roleSkills: {},

      getRoleSkills: (roleId: string) => {
        console.log('Getting role skills:', roleId);
        return get().roleSkills[roleId];
      },

      getSkillRequirement: (roleId: string, skillTitle: string) => {
        console.log('Getting skill requirement:', { roleId, skillTitle });
        const roleData = get().roleSkills[roleId];
        if (!roleData) return undefined;

        const findInCategory = (skills: RoleSkillRequirement[]) => 
          skills.find(s => s.title === skillTitle);

        return findInCategory(roleData.specialized) || 
               findInCategory(roleData.common) || 
               findInCategory(roleData.certifications);
      },

      initializeRoleSkills: (roleId: string) => {
        console.log('Initializing role skills:', roleId);
        const existingRole = get().roleSkills[roleId];
        if (!existingRole) {
          const roleData = roleSkills[roleId as keyof typeof roleSkills];
          if (roleData) {
            const initializedRole: RoleSkillData = {
              roleId,
              title: roleData.title,
              track: roleData.roleTrack || "Professional",
              specialized: roleData.specialized.map(transformToRoleSkillRequirement),
              common: roleData.common.map(transformToRoleSkillRequirement),
              certifications: roleData.certifications.map(transformToRoleSkillRequirement),
              skills: [
                ...roleData.specialized.map(transformToRoleSkillRequirement),
                ...roleData.common.map(transformToRoleSkillRequirement),
                ...roleData.certifications.map(transformToRoleSkillRequirement)
              ]
            };
            
            set(state => ({
              roleSkills: {
                ...state.roleSkills,
                [roleId]: initializedRole
              }
            }));
            console.log('Initialized role skills:', {
              roleId,
              skillCount: initializedRole.skills.length,
              specialized: initializedRole.specialized.length,
              common: initializedRole.common.length,
              certifications: initializedRole.certifications.length
            });
          }
        }
      }
    }),
    {
      name: 'role-skills-storage',
      version: 1,
      partialize: (state) => ({
        roleSkills: state.roleSkills
      })
    }
  )
);