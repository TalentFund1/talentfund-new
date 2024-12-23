import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillsMatrixState, EmployeeSkillState } from '@/types/skillTypes';

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      skillStates: {},
      currentStates: {},
      hasChanges: false,

      setSkillState: (profileId, skillId, level) => {
        console.log('Setting skill state:', { profileId, skillId, level });
        
        const newState: EmployeeSkillState = {
          id: skillId,
          skillId,
          level
        };

        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [profileId]: {
              ...state.skillStates[profileId],
              [skillId]: newState
            }
          },
          currentStates: {
            ...state.currentStates,
            [skillId]: newState
          },
          hasChanges: true
        }));
      },

      initializeState: (profileId, skillId, initialLevel) => {
        const initialState: EmployeeSkillState = {
          id: skillId,
          skillId,
          level: initialLevel
        };

        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [profileId]: {
              ...state.skillStates[profileId],
              [skillId]: initialState
            }
          },
          currentStates: {
            ...state.currentStates,
            [skillId]: initialState
          }
        }));
      },

      getSkillState: (profileId, skillId) => {
        return profileId && skillId ? 
          useSkillsMatrixStore.getState().skillStates[profileId]?.[skillId] : 
          undefined;
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