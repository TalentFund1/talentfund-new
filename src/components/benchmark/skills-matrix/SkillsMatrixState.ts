import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { benchmarkingService } from '../../../services/benchmarking';

interface SkillState {
  level: string;
  goalStatus: string;
  lastUpdated: string;
}

interface SkillsMatrixState {
  currentStates: Record<string, Record<string, SkillState>>;
  originalStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillName: string, updates: Partial<SkillState>) => void;
  saveChanges: (employeeId: string) => void;
  cancelChanges: (employeeId: string) => void;
  initializeState: (employeeId: string, skillName: string, initialState: SkillState) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (employeeId, skillName, updates) => {
        console.log('Setting skill state:', { employeeId, skillName, updates });
        
        set((state) => {
          const currentEmployeeState = state.currentStates[employeeId] || {};
          const currentSkillState = currentEmployeeState[skillName] || {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString()
          };

          const newSkillState = {
            ...currentSkillState,
            ...updates,
            lastUpdated: new Date().toISOString()
          };

          // Store original state if it doesn't exist
          if (!state.originalStates[employeeId]?.[skillName]) {
            state.originalStates = {
              ...state.originalStates,
              [employeeId]: {
                ...state.originalStates[employeeId],
                [skillName]: { ...currentSkillState }
              }
            };
          }

          const newState = {
            currentStates: {
              ...state.currentStates,
              [employeeId]: {
                ...currentEmployeeState,
                [skillName]: newSkillState
              }
            },
            hasChanges: true
          };

          console.log('Updated skill state:', {
            employeeId,
            skillName,
            newState: newSkillState,
            hasChanges: true
          });

          return newState;
        });
      },

      saveChanges: (employeeId) => {
        console.log('Saving changes for employee:', employeeId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [employeeId]: { ...state.currentStates[employeeId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (employeeId) => {
        console.log('Canceling changes for employee:', employeeId);
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: { ...state.originalStates[employeeId] }
          },
          hasChanges: false
        }));
      },

      initializeState: (employeeId, skillName, initialState) => {
        console.log('Initializing state:', { employeeId, skillName, initialState });
        set((state) => {
          if (!state.currentStates[employeeId]?.[skillName]) {
            return {
              currentStates: {
                ...state.currentStates,
                [employeeId]: {
                  ...state.currentStates[employeeId],
                  [skillName]: initialState
                }
              },
              originalStates: {
                ...state.originalStates,
                [employeeId]: {
                  ...state.originalStates[employeeId],
                  [skillName]: initialState
                }
              }
            };
          }
          return state;
        });
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);