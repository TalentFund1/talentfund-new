import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillStateStore } from './types/skillStateTypes';
import { createSkillStateActions } from './actions/skillStateActions';
import { createSkillStateSelectors } from './selectors/skillStateSelectors';

export const useEmployeeSkillsStore = create<SkillStateStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},
      
      ...createSkillStateActions(set, get),
      
      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const currentSkills = get().employeeSkills[employeeId];
        
        if (!currentSkills) {
          set((state) => ({
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

      ...createSkillStateSelectors(get)
    }),
    {
      name: 'employee-skills-storage',
      version: 1
    }
  )
);