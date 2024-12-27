import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { createStoreActions } from './actions/storeActions';
import { EmployeeSkillsStore, EmployeeSkillsStoreState } from './types/storeTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { benchmarkingService } from '../../../services/benchmarking';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        
        // Get current state
        const currentState = get().skillStates[employeeId];
        
        if (!currentState) {
          console.log('No existing state found, creating new state:', employeeId);
          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: {},
                lastUpdated: new Date().toISOString()
              }
            }
          }));
        }

        // Force refresh of skill states
        const store = get();
        const skills = store.getEmployeeSkills(employeeId);
        console.log('Refreshed employee skills:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get().skillStates[employeeId];
        
        // If no state exists, initialize it
        if (!state) {
          get().initializeEmployeeSkills(employeeId);
          return [];
        }

        // Get all skills from the universal database and merge with current state
        const allSkills = Object.values(state.skills || {}).map(skill => {
          const unifiedData = getUnifiedSkillData(skill.title);
          return {
            ...unifiedData,
            ...skill,
            id: `${employeeId}-${skill.title}`,
            employeeId,
            skillId: `${employeeId}-${skill.title}`
          };
        });

        console.log('Retrieved employee skills:', {
          employeeId,
          skillCount: allSkills.length,
          skills: allSkills.map(s => s.title)
        });

        return allSkills;
      },

      getSkillState: (employeeId: string, skillTitle: string) => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get().skillStates[employeeId];
        const skillState = state?.skills[skillTitle];
        
        if (!skillState) {
          // Create default state for new skill
          const defaultState = benchmarkingService.getDefaultSkillState();
          
          // Update store with new skill
          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...state.skillStates[employeeId],
                skills: {
                  ...state.skillStates[employeeId]?.skills,
                  [skillTitle]: {
                    id: `${employeeId}-${skillTitle}`,
                    employeeId,
                    skillId: `${employeeId}-${skillTitle}`,
                    title: skillTitle,
                    ...defaultState,
                    ...getUnifiedSkillData(skillTitle)
                  }
                },
                lastUpdated: new Date().toISOString()
              }
            }
          }));

          console.log('Created new skill state:', {
            employeeId,
            skillTitle,
            state: defaultState
          });
          
          return defaultState;
        }

        return skillState;
      },

      ...createSkillStateActions(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),
      ...createStoreActions(set, get)
    }),
    {
      name: 'employee-skills-storage',
      version: 6, // Increment version to ensure clean state
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