import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateUpdater } from './actions/skillStateUpdater';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { createStoreActions } from './actions/storeActions';
import { EmployeeSkillsStore } from './types/storeTypes';
import { enableMapSet } from 'immer';

// Enable Immer to work with Sets
enableMapSet();

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},
      
      ...createSkillStateUpdater(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),
      ...createStoreActions(set, get)
    }),
    {
      name: 'employee-skills-storage',
      version: 9, // Increment version to ensure clean state
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