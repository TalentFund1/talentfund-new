import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillState, SkillsMatrixState } from '../types';

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      originalStates: {},
      currentStates: {},
      hasChanges: false,
      setSkillState: (skillTitle, level, requirement, employeeId) => {
        console.log('Setting matrix skill state:', { skillTitle, level, requirement, employeeId });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [employeeId]: {
              ...(state.currentStates[employeeId] || {}),
              [skillTitle]: {
                level,
                requirement
              }
            }
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      initializeState: (skillTitle, initialLevel, initialRequirement, employeeId) => {
        console.log('Initializing matrix skill state:', { skillTitle, initialLevel, initialRequirement, employeeId });
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: {
              ...(state.currentStates[employeeId] || {}),
              [skillTitle]: {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              }
            }
          },
          originalStates: {
            ...state.originalStates,
            [employeeId]: {
              ...(state.originalStates[employeeId] || {}),
              [skillTitle]: {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              }
            }
          }
        }));
      },
      saveChanges: () => {
        console.log('Saving matrix changes');
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling matrix changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
      cleanupState: (employeeId) => {
        console.log('Cleaning up state for employee:', employeeId);
        set((state) => {
          const { [employeeId]: _, ...remainingCurrentStates } = state.currentStates;
          const { [employeeId]: __, ...remainingOriginalStates } = state.originalStates;
          
          return {
            currentStates: remainingCurrentStates,
            originalStates: remainingOriginalStates,
            hasChanges: false
          };
        });
      },
      duplicateState: (sourceEmployeeId, targetEmployeeId) => {
        console.log('Duplicating state:', { from: sourceEmployeeId, to: targetEmployeeId });
        set((state) => {
          const sourceState = state.currentStates[sourceEmployeeId] || {};
          
          return {
            currentStates: {
              ...state.currentStates,
              [targetEmployeeId]: { ...sourceState }
            },
            originalStates: {
              ...state.originalStates,
              [targetEmployeeId]: { ...sourceState }
            }
          };
        });
      }
    }),
    {
      name: 'skills-matrix-storage',
      skipHydration: false,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);