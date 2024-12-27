import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { createStoreActions } from './actions/storeActions';
import { createSkillActions } from './actions/skillActions';
import { EmployeeSkillsStore } from './types/storeTypes';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},
      ...createSkillStateActions(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),
      ...createStoreActions(set, get),
      ...createSkillActions(set, get),
      
      // Override initializeEmployeeSkills to force update
      initializeEmployeeSkills: async (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        // Force a state update to trigger re-render
        set(state => ({
          ...state,
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              skills: {},
              lastUpdated: new Date().toISOString()
            }
          }
        }));

        // Initialize skills after state reset
        if (store.initializeSkills) {
          await store.initializeSkills(employeeId);
        }
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 8,
      partialize: (state: EmployeeSkillsStore) => ({
        skillStates: state.skillStates
      })
    }
  )
);