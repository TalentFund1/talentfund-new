import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';

interface SkillsMatrixState {
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  currentStates: Record<string, Record<string, EmployeeSkillState>>;
  hasChanges: boolean;
  setSkillState: (profileId: string, skillId: string, level: string, requirement: EmployeeSkillRequirement) => void;
  initializeState: (profileId: string, skillId: string, initialLevel: string, initialRequirement: EmployeeSkillRequirement) => void;
  getSkillState: (profileId: string, skillId: string) => EmployeeSkillState | undefined;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      skillStates: {},
      currentStates: {},
      hasChanges: false,

      setSkillState: (profileId, skillId, level, requirement) => {
        console.log('Setting skill state:', { profileId, skillId, level, requirement });
        
        set((state) => {
          const updatedSkillStates = {
            ...state.skillStates,
            [profileId]: {
              ...state.skillStates[profileId],
              [skillId]: {
                profileId,
                skillId,
                level,
                requirement
              }
            }
          };

          return {
            skillStates: updatedSkillStates,
            currentStates: updatedSkillStates,
            hasChanges: true
          };
        });
      },

      initializeState: (profileId, skillId, initialLevel, initialRequirement) => {
        const state = get();
        if (!state.skillStates[profileId]?.[skillId]) {
          console.log('Initializing skill state:', { profileId, skillId, initialLevel, initialRequirement });
          
          set((state) => ({
            skillStates: {
              ...state.skillStates,
              [profileId]: {
                ...state.skillStates[profileId],
                [skillId]: {
                  profileId,
                  skillId,
                  level: initialLevel,
                  requirement: initialRequirement
                }
              }
            },
            currentStates: {
              ...state.currentStates,
              [profileId]: {
                ...state.currentStates[profileId],
                [skillId]: {
                  profileId,
                  skillId,
                  level: initialLevel,
                  requirement: initialRequirement
                }
              }
            }
          }));
        }
      },

      getSkillState: (profileId, skillId) => {
        return get().skillStates[profileId]?.[skillId];
      },

      saveChanges: () => {
        set((state) => ({
          currentStates: state.skillStates,
          hasChanges: false
        }));
      },

      cancelChanges: () => {
        set((state) => ({
          skillStates: state.currentStates,
          hasChanges: false
        }));
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 3,
      partialize: (state) => ({
        skillStates: state.skillStates,
        currentStates: state.currentStates
      })
    }
  )
);