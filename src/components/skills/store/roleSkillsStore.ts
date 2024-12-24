import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleSkillData, RoleSkillRequirement } from '../types/roleSkillTypes';
import { roleSkills } from '../data/roleSkills';

interface RoleSkillsStore {
  roleSkills: Record<string, RoleSkillData>;
  getRoleSkills: (roleId: string) => RoleSkillData | undefined;
  getSkillRequirement: (roleId: string, skillTitle: string) => RoleSkillRequirement | undefined;
  initializeRoleSkills: (roleId: string) => void;
}

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
            set(state => ({
              roleSkills: {
                ...state.roleSkills,
                [roleId]: roleData
              }
            }));
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