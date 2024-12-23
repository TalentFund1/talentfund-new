import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement } from '@/types/skillTypes';

interface SkillsMatrixState {
  currentStates: Record<string, Record<string, EmployeeSkillState>>;
  originalStates: Record<string, Record<string, EmployeeSkillState>>;
  hasChanges: boolean;
  setSkillState: (profileId: string, skillId: string, level: string, requirement: EmployeeSkillRequirement) => void;
  resetSkills: () => void;
  initializeState: (profileId: string, skillId: string, level: string, requirement: EmployeeSkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (profileId, skillId, level, requirement) => {
        console.log('Setting skill state:', { profileId, skillId, level, requirement });
        
        let finalRequirement: EmployeeSkillRequirement;
        if (requirement === 'skill_goal' || requirement === 'required') {
          finalRequirement = 'skill_goal';
        } else if (requirement === 'not_interested' || requirement === 'not-interested') {
          finalRequirement = 'not_interested';
        } else {
          finalRequirement = 'unknown';
        }
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [profileId]: {
              ...state.currentStates[profileId],
              [skillId]: { 
                profileId,
                skillId,
                level, 
                requirement: finalRequirement 
              },
            },
          },
          hasChanges: true,
        }));
      },

      resetSkills: () =>
        set(() => ({
          currentStates: {},
          originalStates: {},
          hasChanges: false,
        })),

      initializeState: (profileId, skillId, level, requirement) =>
        set((state) => {
          if (!state.currentStates[profileId]?.[skillId]) {
            let finalRequirement: EmployeeSkillRequirement;
            if (requirement === 'skill_goal' || requirement === 'required') {
              finalRequirement = 'skill_goal';
            } else if (requirement === 'not_interested' || requirement === 'not-interested') {
              finalRequirement = 'not_interested';
            } else {
              finalRequirement = 'unknown';
            }

            return {
              currentStates: {
                ...state.currentStates,
                [profileId]: {
                  ...state.currentStates[profileId],
                  [skillId]: { 
                    profileId,
                    skillId,
                    level, 
                    requirement: finalRequirement 
                  },
                },
              },
              originalStates: {
                ...state.originalStates,
                [profileId]: {
                  ...state.originalStates[profileId],
                  [skillId]: { 
                    profileId,
                    skillId,
                    level, 
                    requirement: finalRequirement 
                  },
                },
              },
            };
          }
          return state;
        }),

      saveChanges: () =>
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        })),

      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);