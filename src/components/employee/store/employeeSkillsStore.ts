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

      // Add batched update capability
      batchUpdateSkills: (employeeId: string, updates: Record<string, any>) => {
        console.log('Batch updating skills for employee:', {
          employeeId,
          updateCount: Object.keys(updates).length
        });

        set(state => {
          const currentSkills = state.employeeSkills[employeeId] || {};
          const updatedSkills = {
            ...currentSkills,
            ...updates
          };

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
      version: 5,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);