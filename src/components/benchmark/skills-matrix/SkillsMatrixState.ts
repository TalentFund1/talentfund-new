import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement, SkillsMatrixState } from '../../../types/skillTypes';

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
        const state = get().skillStates[profileId]?.[skillId];
        console.log('Getting skill state:', { profileId, skillId, state });
        return state;
      },

      saveChanges: () => {
        console.log('Saving skill matrix changes');
        set((state) => ({
          currentStates: state.skillStates,
          hasChanges: false
        }));
      },

      cancelChanges: () => {
        console.log('Canceling skill matrix changes');
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