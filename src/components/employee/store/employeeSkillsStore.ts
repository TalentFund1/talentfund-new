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
      ...createSkillActions(set, get)
    }),
    {
      name: 'employee-skills-storage',
      version: 8,
      partialize: (state: EmployeeSkillsStore) => ({
        skillStates: state.skillStates
      }),
      merge: (persistedState: any, currentState: EmployeeSkillsStore) => {
        console.log('Merging states:', { 
          hasPersistedState: !!persistedState,
          currentStateKeys: Object.keys(currentState)
        });
        
        return {
          ...currentState,
          skillStates: persistedState?.skillStates || {}
        };
      }
    }
  )
);