import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore } from './types/skillStoreTypes';
import { createSkillActions } from './actions/skillActions';
import { createSkillSelectors } from './selectors/skillSelectors';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},
      ...createSkillActions(set, get),
      ...createSkillSelectors(get),

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Starting safe initialization for employee:', employeeId);
        
        const currentState = get().employeeSkills[employeeId];
        if (currentState) {
          console.log('Skills already initialized for employee:', employeeId);
          return;
        }

        // Initialize with empty states object (will be populated by batch updates)
        set(state => {
          console.log('Creating new employee skills state:', employeeId);
          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: [],  // Skills will be populated through batch updates
                states: {},  // Empty object to store individual skill states
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, any>) => {
        console.log('Batch updating skills for employee:', {
          employeeId,
          updateCount: Object.keys(updates).length,
          timestamp: new Date().toISOString()
        });

        set(state => {
          const currentSkills = state.employeeSkills[employeeId] || {};
          const updatedSkills = {
            ...currentSkills,
            ...updates,
            lastUpdated: new Date().toISOString()
          };

          const newState = {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: updatedSkills
            }
          };

          console.log('State updated successfully:', {
            employeeId,
            skillCount: Object.keys(updatedSkills).length,
            timestamp: updatedSkills.lastUpdated
          });

          return newState;
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 8, // Incrementing version to ensure clean state
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);