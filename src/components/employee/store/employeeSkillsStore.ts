import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { EmployeeSkillsState, EmployeeSkillUpdate, EmployeeSkillData } from '../types/employeeSkillTypes';

// Define the structure of persisted state separately
interface PersistedState {
  skillStates: Record<string, EmployeeSkillsState>;
}

// Complete store interface including all methods
interface EmployeeSkillsStore extends PersistedState {
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
      
      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillData => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get().skillStates[employeeId]?.skills[skillTitle];
        const defaultState: EmployeeSkillData = {
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
        return state || defaultState;
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillData[] => {
        console.log('Getting skills for employee:', employeeId);
        return Object.values(get().skillStates[employeeId]?.skills || {});
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        const store = get();
        store.updateSkillState(employeeId, skillTitle, { level });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        const store = get();
        store.updateSkillState(employeeId, skillTitle, { goalStatus: status });
      },

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              skills: {},
              lastUpdated: new Date().toISOString()
            }
          }
        }));
      },

      updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
        console.log('Updating skill state:', { employeeId, skillTitle, updates });
        
        set((state) => {
          const currentState = state.skillStates[employeeId]?.skills[skillTitle] || {
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

          const updatedSkillStates = {
            ...state.skillStates,
            [employeeId]: {
              skills: {
                ...state.skillStates[employeeId]?.skills,
                [skillTitle]: {
                  ...currentState,
                  ...updates,
                  lastUpdated: new Date().toISOString()
                }
              },
              lastUpdated: new Date().toISOString()
            }
          };

          return {
            ...state,
            skillStates: updatedSkillStates
          };
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => {
        console.log('Processing batch update:', { employeeId, updateCount: Object.keys(updates).length });

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
          });

          const updatedSkillStates = {
            ...state.skillStates,
            [employeeId]: {
              skills: updatedSkills,
              lastUpdated: new Date().toISOString()
            }
          };

          return {
            ...state,
            skillStates: updatedSkillStates
          };
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 2,
      partialize: (state) => ({
        skillStates: state.skillStates
      })
    }
  )
);
