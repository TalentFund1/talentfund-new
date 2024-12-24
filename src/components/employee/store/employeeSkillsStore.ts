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
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

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

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        console.log('Getting skills for employee:', employeeId);
        return get().employeeSkills[employeeId]?.skills || [];
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

          // Update or add the skill in the skills array
          const skillData = getUnifiedSkillData(skillTitle);
          const existingSkillIndex = employeeData.skills.findIndex(s => s.title === skillTitle);
          
          let updatedSkills = [...employeeData.skills];
          if (existingSkillIndex >= 0) {
            updatedSkills[existingSkillIndex] = {
              ...updatedSkills[existingSkillIndex],
              level: level
            };
          } else if (skillData) {
            updatedSkills.push({
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              title: skillTitle,
              subcategory: skillData.subcategory,
              level: level,
              goalStatus: currentState.goalStatus,
              lastUpdated: new Date().toISOString(),
              category: skillData.category,
              weight: skillData.weight,
              confidence: skillData.confidence,
              businessCategory: skillData.businessCategory,
              growth: skillData.growth,
              salary: skillData.salary,
              benchmarks: skillData.benchmarks
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

          // Update or add the skill in the skills array
          const skillData = getUnifiedSkillData(skillTitle);
          const existingSkillIndex = employeeData.skills.findIndex(s => s.title === skillTitle);
          
          let updatedSkills = [...employeeData.skills];
          if (existingSkillIndex >= 0) {
            updatedSkills[existingSkillIndex] = {
              ...updatedSkills[existingSkillIndex],
              goalStatus: status
            };
          } else if (skillData) {
            updatedSkills.push({
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              title: skillTitle,
              subcategory: skillData.subcategory,
              level: currentState.level,
              goalStatus: status,
              lastUpdated: new Date().toISOString(),
              category: skillData.category,
              weight: skillData.weight,
              confidence: skillData.confidence,
              businessCategory: skillData.businessCategory,
              growth: skillData.growth,
              salary: skillData.salary,
              benchmarks: skillData.benchmarks
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

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => {
        console.log('Processing batch update:', { employeeId, updateCount: Object.keys(updates).length });

        set((state) => {
          const currentData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          // Update skills array with new states
          const updatedSkills = currentData.skills.map(skill => {
            const update = updates[skill.title];
            if (update) {
              return {
                ...skill,
                level: update.level,
                goalStatus: update.goalStatus,
                lastUpdated: update.lastUpdated
              };
            }
            return skill;
          });

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...currentData,
                skills: updatedSkills,
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
      version: 12,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);