import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore } from './types/employeeSkillTypes';
import { createSkillStateActions } from './actions/skillStateActions';
import { createSkillStateSelectors } from './selectors/skillStateSelectors';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing employee skills:', { employeeId });
        const currentSkills = get().employeeSkills[employeeId];
        
        if (!currentSkills) {
          set(state => ({
            ...state,
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: [],
                states: {}
              }
            }
          }));
          console.log('Initialized empty skill set for employee:', employeeId);
        }
      },

      ...createSkillStateActions(set, get),
      ...createSkillStateSelectors(get)
    }),
    {
      name: 'employee-skills-storage',
      version: 4,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);