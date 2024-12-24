import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillLevel, SkillGoalStatus, EmployeeSkill, EmployeeSkillState } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, {
    employeeId: string;
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
        console.log('Initializing employee skills:', { employeeId });
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
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting employee skill level:', { employeeId, skillTitle, level });
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

          console.log('Updated employee skill:', { 
            employeeId, 
            skillTitle, 
            newLevel: level,
            skillsCount: updatedSkills.length 
          });

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
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
        console.log('Setting employee skill goal status:', { employeeId, skillTitle, status });
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

          console.log('Updated employee skill goal:', { 
            employeeId, 
            skillTitle, 
            newStatus: status,
            skillsCount: updatedSkills.length 
          });

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
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
        console.log('Getting employee skills:', { employeeId });
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
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          return { ...defaultSkillState };
        }

        console.log('Retrieved employee skill state:', {
          employeeId,
          skillTitle,
          state: skillState
        });
        
        return skillState;
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 4, // Incremented version for new structure
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);