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
import { initializeEmployeeSkillsData } from './actions/initializeEmployeeSkills';
import { employees } from '../EmployeeData';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        
        const currentSkills = get().employeeSkills[employeeId];
        if (!currentSkills) {
          const employee = employees.find(emp => emp.id === employeeId);
          if (!employee) {
            console.warn('Employee not found:', employeeId);
            return;
          }

          // Initialize with employee's existing skills from EmployeeData
          const initializedData = initializeEmployeeSkillsData(employeeId, employee.skills);
          
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: initializedData
            }
          }));
          
          console.log('Initialized skills for employee:', {
            employeeId,
            skillCount: initializedData.skills.length
          });
        }
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        console.log('Getting skills for employee:', employeeId);
        return get().employeeSkills[employeeId]?.skills || [];
      },

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
        const state = get().employeeSkills[employeeId]?.states[skillTitle];
        
        if (!state) {
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
          state
        });
        
        return state;
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        set(state => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {}
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    ...employeeData.states[skillTitle],
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
        set(state => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {}
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    ...employeeData.states[skillTitle],
                    goalStatus: status,
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
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
      version: 13,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);