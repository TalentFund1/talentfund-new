import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore, EmployeeSkillState, EmployeeSkillsData, SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Safely initializing empty skills container for employee:', employeeId);
        
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
          console.log('Created new empty skills container for employee:', employeeId);
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
            level: 'unspecified' as SkillLevel,
            requirement: 'unknown' as SkillGoalStatus,
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
            level: 'unspecified' as SkillLevel,
            requirement: 'unknown' as SkillGoalStatus,
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
                    requirement: status,
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
            requirement: 'unknown',
            lastUpdated: new Date().toISOString()
          };
        }

        return skillState;
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        return get().employeeSkills[employeeId]?.skills || [];
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => {
        console.log('Batch updating skills:', {
          employeeId,
          updateCount: Object.keys(updates).length
        });

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