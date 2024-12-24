import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkill, EmployeeSkillsData, SkillLevel, SkillGoalStatus, EmployeeSkillState } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const employeeData = get().employeeSkills[employeeId];
        if (!employeeData) {
          console.log('No skills found for employee:', employeeId);
          return [];
        }
        return employeeData.skills;
      },

      getSkillState: (employeeId, skillTitle) => {
        const employeeData = get().employeeSkills[employeeId];
        const defaultState = {
          level: 'unspecified' as SkillLevel,
          requirement: 'unknown' as SkillGoalStatus,
          lastUpdated: new Date().toISOString()
        };

        if (!employeeData?.states?.[skillTitle]) {
          return defaultState;
        }

        return employeeData.states[skillTitle];
      },

      setSkillLevel: (employeeId, skillTitle, level) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || { 
            employeeId, 
            skills: [],
            states: {}
          };

          const updatedSkills = [...employeeData.skills];
          const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              ...updatedSkills[skillIndex],
              level,
              lastUpdated: new Date().toISOString()
            };
          } else {
            updatedSkills.push({
              id: `${employeeId}-${skillTitle}`,
              title: skillTitle,
              level,
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              subcategory: '',
              category: 'common',
              weight: 'necessary',
              businessCategory: '',
              growth: '0%',
              salary: '$0',
              confidence: 'low',
              benchmarks: {
                B: false,
                R: false,
                M: false,
                O: false
              }
            });
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: updatedSkills,
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

      setSkillGoalStatus: (employeeId, skillTitle, status) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        set((state) => {
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
                    requirement: status,
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const currentSkills = get().employeeSkills[employeeId];
        
        if (!currentSkills) {
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: [],
                states: {}
              }
            }
          }));
          console.log('Initialized empty skill set for employee:', employeeId);
        }
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1
    }
  )
);
