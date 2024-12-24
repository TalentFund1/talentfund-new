import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillActions } from './actions/skillActions';
import { createSkillSelectors } from './selectors/skillSelectors';
import { useEmployeeStore } from './employeeStore';
import { EmployeeSkillsStore } from '../types/employeeSkillTypes';

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

        // Initialize with empty skills array and states object - NO role ID
        set(state => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              employeeId,
              skills: [], // Start with empty skills array
              states: {}, // Start with empty states object
              lastUpdated: new Date().toISOString()
            }
          }
        }));

        console.log('Initialized empty skill container for employee:', {
          employeeId,
          timestamp: new Date().toISOString()
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, any>) => {
        console.log('Batch updating skills for employee:', {
          employeeId,
          updateCount: Object.keys(updates).length,
          timestamp: new Date().toISOString()
        });

        set(state => {
          const currentSkills = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const updatedSkills = {
            ...currentSkills,
            states: {
              ...currentSkills.states,
              ...updates
            },
            lastUpdated: new Date().toISOString()
          };

          console.log('State updated successfully:', {
            employeeId,
            skillCount: Object.keys(updatedSkills.states).length,
            timestamp: updatedSkills.lastUpdated
          });

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: updatedSkills
            }
          };
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 10,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);