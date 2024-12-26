import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleSkillState, SkillLevel, RoleRequirementLevel } from '../types/skillStateTypes';

interface CompetencyState {
  roleStates: Record<string, Record<string, RoleSkillState>>;
  setSkillState: (skillName: string, level: SkillLevel, required: RoleRequirementLevel, roleId: string) => void;
  getRoleSkillState: (roleId: string, skillName: string) => RoleSkillState;
  initializeRoleState: (roleId: string) => void;
}

const defaultRoleSkillState: RoleSkillState = {
  level: 'unspecified',
  required: 'preferred',
  lastUpdated: new Date().toISOString()
};

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},

      setSkillState: (skillName, level, required, roleId) => {
        console.log('Setting role skill state:', { skillName, level, required, roleId });
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                level,
                required,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }));
      },

      getRoleSkillState: (roleId, skillName) => {
        console.log('Getting role skill state:', { roleId, skillName });
        return get().roleStates[roleId]?.[skillName] || { ...defaultRoleSkillState };
      },

      initializeRoleState: (roleId) => {
        console.log('Initializing role state:', roleId);
        const currentState = get().roleStates[roleId];
        if (!currentState) {
          set(state => ({
            roleStates: {
              ...state.roleStates,
              [roleId]: {}
            }
          }));
        }
      }
    }),
    {
      name: 'competency-storage',
      version: 1,
      partialize: (state) => ({
        roleStates: state.roleStates
      })
    }
  )
);