import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillLevel, SkillGoalStatus, EmployeeSkill, EmployeeSkillState } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, {
    skills: EmployeeSkill[];
    states: Record<string, EmployeeSkillState>;
  }>;
  
  initializeEmployeeSkills: (employeeId: string) => void;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
}

const defaultSkillState: EmployeeSkillState = {
  level: 'unspecified',
  requirement: 'unknown',
  lastUpdated: new Date().toISOString()
};

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
                skills: [],
                states: {}
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
            const newSkill: EmployeeSkill = {
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              title: skillTitle,
              subcategory: '',
              level,
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              category: 'specialized',
              weight: 'technical',
              businessCategory: '',
              growth: '',
              salary: '',
              confidence: 'medium',
              benchmarks: {
                B: false,
                R: false,
                M: false,
                O: false
              }
            };
            updatedSkills.push(newSkill);
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                skills: updatedSkills,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    level,
                    requirement: employeeData.states[skillTitle]?.requirement || 'unknown',
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
                skills: updatedSkills,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    level: employeeData.states[skillTitle]?.level || 'unspecified',
                    requirement: status,
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId]?.skills || [];
      },

      getSkillState: (employeeId: string, skillTitle: string) => {
        const state = get();
        const skillState = state.employeeSkills[employeeId]?.states[skillTitle];
        
        if (!skillState) {
          console.log('No existing state found for skill:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          return { ...defaultSkillState };
        }

        console.log('Retrieved skill state:', {
          employeeId,
          skillTitle,
          state: skillState
        });
        
        return skillState;
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 3, // Incremented version to ensure clean state
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);