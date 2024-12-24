import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  EmployeeSkillsData,
  SkillLevel, 
  SkillGoalStatus,
  EmployeeSkillAchievement
} from '../types/employeeSkillTypes';
import { initializeEmployeeSkills } from './actions/initializeEmployeeSkills';
import { employees } from '../EmployeeData';
import { IEmployeeSkillsStore } from './interfaces/EmployeeSkillsStoreInterface';
import { benchmarkingService } from '../../../services/benchmarking';

export const useEmployeeSkillsStore = create<IEmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Starting employee skills initialization:', employeeId);
        
        const currentSkills = get().getEmployeeSkills(employeeId);
        if (currentSkills.length === 0) {
          const employee = employees.find(emp => emp.id === employeeId);
          if (!employee) {
            console.warn('No employee data found:', employeeId);
            return;
          }

          // Initialize strictly with employee's existing skills only
          const initializedData = benchmarkingService.initializeEmployeeSkillsData(employeeId, employee.skills.map(s => ({
            name: s.title,
            level: s.level
          }))) as EmployeeSkillsData;
          
          set((state: any) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: initializedData
            }
          }));
          
          console.log('Initialized employee skills:', {
            employeeId,
            skillCount: initializedData.skills.length,
            skills: initializedData.skills.map(s => ({
              title: s.title,
              level: s.level
            }))
          });
        } else {
          console.log('Skills already initialized for employee:', {
            employeeId,
            skillCount: currentSkills.length
          });
        }
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        console.log('Getting skills for employee:', employeeId);
        const skills = (get() as any).employeeSkills[employeeId]?.skills || [];
        
        if (skills.length > 0) {
          console.log('Found existing skills:', {
            employeeId,
            skillCount: skills.length,
            skills: skills.map((s: EmployeeSkillAchievement) => ({
              title: s.title,
              level: s.level
            }))
          });
        }
        
        return skills;
      },

      getSkillState: (employeeId: string, skillTitle: string) => {
        const state = (get() as any).employeeSkills[employeeId]?.states[skillTitle];
        
        if (!state) {
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          
          return benchmarkingService.getDefaultSkillState();
        }

        return state;
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        set((state: any) => {
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
                  [skillTitle]: benchmarkingService.createSkillState(level, employeeData.states[skillTitle]?.goalStatus || 'unknown')
                }
              }
            }
          };
        });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        set((state: any) => {
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
                  [skillTitle]: benchmarkingService.createSkillState(
                    employeeData.states[skillTitle]?.level || 'unspecified',
                    status
                  )
                }
              }
            }
          };
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, any>) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length 
        });

        set((state: any) => {
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
      version: 18,
      partialize: (state: any) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);