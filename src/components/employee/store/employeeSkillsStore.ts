import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  EmployeeSkillsStore, 
  EmployeeSkillState, 
  EmployeeSkillsData, 
  SkillLevel, 
  SkillGoalStatus, 
  EmployeeSkillAchievement 
} from '../types/employeeSkillTypes';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

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
                states: {},
                lastUpdated: new Date().toISOString()
              }
            }
          }));
          console.log('Initialized empty skill set for employee:', employeeId);
        }
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const currentState = employeeData.states[skillTitle] || {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString()
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    ...currentState,
                    level,
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const currentState = employeeData.states[skillTitle] || {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString()
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    ...currentState,
                    goalStatus: status,
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
        const state = get();
        const skillState = state.employeeSkills[employeeId]?.states[skillTitle];
        
        if (!skillState) {
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          
          return {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString()
          };
        }

        console.log('Retrieved skill state:', {
          employeeId,
          skillTitle,
          state: skillState
        });
        
        return skillState;
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        console.log('Getting skills for employee:', employeeId);
        return get().employeeSkills[employeeId]?.skills || [];
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => {
        console.log('Processing batch update:', { employeeId, updateCount: Object.keys(updates).length });

        set((state) => {
          const currentData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...currentData,
                states: {
                  ...currentData.states,
                  ...updates
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 11,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);
