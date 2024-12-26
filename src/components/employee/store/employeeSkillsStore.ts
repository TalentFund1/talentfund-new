import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { EmployeeSkillsState, EmployeeSkillUpdate, EmployeeSkillData } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, EmployeeSkillsState>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},
      ...createSkillStateActions(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),

      updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
        console.log('Updating skill state:', { employeeId, skillTitle, updates });
        
        set((state) => {
          const currentState = state.skillStates[employeeId] || { 
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const currentSkill = currentState.skills[skillTitle] || {
            id: `${employeeId}-${skillTitle}`,
            employeeId,
            skillId: `${employeeId}-${skillTitle}`,
            title: skillTitle,
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            confidence: 'medium',
            subcategory: 'General',
            category: 'specialized',
            businessCategory: 'Technical Skills',
            weight: 'technical',
            growth: '0%',
            salary: 'market',
            benchmarks: {
              B: false,
              R: false,
              M: false,
              O: false
            }
          };

          // Create new state with deep cloning to ensure proper updates
          const updatedState = {
            ...state,
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...currentState,
                skills: {
                  ...currentState.skills,
                  [skillTitle]: {
                    ...currentSkill,
                    ...updates,
                    lastUpdated: new Date().toISOString()
                  }
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };

          console.log('Updated skill state:', {
            employeeId,
            skillTitle,
            before: currentSkill,
            after: updatedState.skillStates[employeeId].skills[skillTitle]
          });

          return updatedState;
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length,
          updates 
        });

        set((state) => {
          const currentState = state.skillStates[employeeId] || {
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const updatedSkills = { ...currentState.skills };

          Object.entries(updates).forEach(([skillTitle, skillUpdates]) => {
            const currentSkill = currentState.skills[skillTitle] || {
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              skillId: `${employeeId}-${skillTitle}`,
              title: skillTitle,
              level: 'unspecified',
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              confidence: 'medium',
              subcategory: 'General',
              category: 'specialized',
              businessCategory: 'Technical Skills',
              weight: 'technical',
              growth: '0%',
              salary: 'market',
              benchmarks: {
                B: false,
                R: false,
                M: false,
                O: false
              }
            };

            updatedSkills[skillTitle] = {
              ...currentSkill,
              ...skillUpdates,
              lastUpdated: new Date().toISOString()
            };

            console.log('Updated skill in batch:', {
              skillTitle,
              before: currentSkill,
              after: updatedSkills[skillTitle]
            });
          });

          const updatedState = {
            ...state,
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: updatedSkills,
                lastUpdated: new Date().toISOString()
              }
            }
          };

          console.log('Batch update complete:', {
            employeeId,
            skillCount: Object.keys(updatedSkills).length,
            skills: updatedState.skillStates[employeeId]
          });

          return updatedState;
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 2,
      partialize: (state) => ({
        skillStates: state.skillStates
      }),
      merge: (persistedState: any, currentState: EmployeeSkillsStore) => ({
        ...currentState,
        skillStates: {
          ...currentState.skillStates,
          ...persistedState.skillStates
        }
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log('Loading persisted state:', { name, value: str ? JSON.parse(str) : null });
          return str ? Promise.resolve(str) : Promise.resolve(null);
        },
        setItem: (name, value) => {
          console.log('Persisting state:', { name, value: JSON.parse(value) });
          localStorage.setItem(name, value);
          return Promise.resolve();
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        }
      }
    }
  )
);