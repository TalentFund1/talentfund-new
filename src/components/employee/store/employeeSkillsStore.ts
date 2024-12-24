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
import { initializeEmployeeSkills } from './actions/initializeEmployeeSkills';
import { employees } from '../EmployeeData';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Starting employee skills initialization:', employeeId);
        
        const currentSkills = get().employeeSkills[employeeId];
        if (!currentSkills) {
          const employee = employees.find(emp => emp.id === employeeId);
          if (!employee) {
            console.warn('No employee data found:', employeeId);
            return;
          }

          // Initialize strictly with employee's existing skills only
          const initializedData = {
            employeeId,
            skills: initializeEmployeeSkills(employeeId, employee.skills),
            states: {},
            lastUpdated: new Date().toISOString()
          };
          
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: initializedData
            }
          }));
          
          console.log('Initialized employee skills:', {
            employeeId,
            skillCount: initializedData.skills.length,
            skills: initializedData.skills.map(s => s.title)
          });
        } else {
          console.log('Skills already initialized for employee:', {
            employeeId,
            skillCount: currentSkills.skills.length
          });
        }
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        console.log('Getting skills for employee:', employeeId);
        const skills = get().employeeSkills[employeeId]?.skills || [];
        
        if (skills.length > 0) {
          console.log('Found existing skills:', {
            employeeId,
            skillCount: skills.length,
            skills: skills.map(s => s.title)
          });
        }
        
        return skills;
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
      version: 17, // Incrementing version to ensure clean state
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);