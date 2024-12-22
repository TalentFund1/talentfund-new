import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleState, RoleSkillState, RoleSkillRequirement } from '../../../types/skillTypes';
import { roleSkills } from '../data/roleSkills';

interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (skillName: string, skillId: string, level: string, levelKey: string, requirement: RoleSkillRequirement, roleId: string) => void;
  setSkillProgression: (skillName: string, skillId: string, progression: Record<string, RoleSkillState>, roleId: string, track: string) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string, track: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, skillId, level, levelKey, requirement, roleId) => {
        console.log('Setting skill state:', { skillName, skillId, level, levelKey, requirement, roleId });
        set((state) => {
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              [levelKey]: { 
                id: skillId,
                level,
                requirement 
              }
            }
          };

          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: updatedRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: updatedRoleState
            },
            hasChanges: true
          };
        });
      },

      setSkillProgression: (skillName, skillId, progression, roleId, track) => {
        console.log('Setting skill progression:', { skillName, skillId, progression, roleId, track });
        set((state) => {
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              ...progression
            }
          };

          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: updatedRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: updatedRoleState
            },
            hasChanges: true
          };
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        const freshState = initializeRoleState(roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: freshState
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: freshState
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId, track) => {
        console.log('Saving changes for role:', roleId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...state.roleStates[roleId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Canceling changes for role:', roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: { ...state.originalStates[roleId] }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: { ...state.originalStates[roleId] }
          },
          hasChanges: false
        }));
      },

      initializeState: (roleId) => {
        const currentState = get().roleStates[roleId];
        if (!currentState) {
          console.log('Initializing state for role:', roleId);
          const initialState = initializeRoleState(roleId);
          set((state) => ({
            roleStates: {
              ...state.roleStates,
              [roleId]: initialState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: initialState
            },
            originalStates: {
              ...state.originalStates,
              [roleId]: initialState
            }
          }));
        }
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 24,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);

const initializeRoleState = (roleId: string): RoleState => {
  console.log('Initializing new state for role:', roleId);
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('No skills found for role:', roleId);
    return {};
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const initialStates: RoleState = {};
  
  allSkills.forEach(skill => {
    initialStates[skill.title] = {};
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
      initialStates[skill.title][level] = {
        id: skill.id,
        level: 'unspecified',
        requirement: 'preferred'
      };
    });
  });

  return initialStates;
};