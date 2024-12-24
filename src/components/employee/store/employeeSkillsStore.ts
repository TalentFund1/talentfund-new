import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkill, EmployeeSkillsData, SkillLevel, SkillGoalStatus, EmployeeSkillState } from '../types/employeeSkillsTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  addSkillToEmployee: (employeeId: string, skillTitle: string) => void;
  removeSkillFromEmployee: (employeeId: string, skillTitle: string) => void;
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
        console.log('Getting skill state:', { employeeId, skillTitle });
        const employeeData = get().employeeSkills[employeeId];
        const defaultState = {
          level: 'unspecified' as SkillLevel,
          requirement: 'unknown' as SkillGoalStatus,
          lastUpdated: new Date().toISOString()
        };

        if (!employeeData?.states?.[skillTitle]) {
          console.log('No existing state found for skill:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          return defaultState;
        }

        console.log('Retrieved skill state:', {
          employeeId,
          skillTitle,
          state: employeeData.states[skillTitle]
        });
        
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
            const skillData = getUnifiedSkillData(skillTitle);
            updatedSkills.push({
              ...skillData,
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              level,
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString()
            });
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
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

          const updatedSkills = [...employeeData.skills];
          const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              ...updatedSkills[skillIndex],
              goalStatus: status,
              lastUpdated: new Date().toISOString()
            };
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                skills: updatedSkills,
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

      addSkillToEmployee: (employeeId, skillTitle) => {
        console.log('Adding skill to employee:', { employeeId, skillTitle });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {}
          };

          if (employeeData.skills.some(s => s.title === skillTitle)) {
            console.log('Skill already exists for employee:', { employeeId, skillTitle });
            return state;
          }

          const skillData = getUnifiedSkillData(skillTitle);
          const newSkill: EmployeeSkill = {
            ...skillData,
            id: `${employeeId}-${skillTitle}`,
            employeeId,
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString()
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                skills: [...employeeData.skills, newSkill],
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    level: 'unspecified',
                    requirement: 'unknown',
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      removeSkillFromEmployee: (employeeId, skillTitle) => {
        console.log('Removing skill from employee:', { employeeId, skillTitle });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId];
          if (!employeeData) return state;

          const updatedSkills = employeeData.skills.filter(s => s.title !== skillTitle);
          const { [skillTitle]: removedState, ...updatedStates } = employeeData.states;

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                skills: updatedSkills,
                states: updatedStates
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