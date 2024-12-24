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

const validateSkillLevel = (level: string | number | SkillLevel): SkillLevel => {
  if (typeof level === 'number') {
    if (level >= 90) return 'advanced';
    if (level >= 60) return 'intermediate';
    if (level > 0) return 'beginner';
    return 'unspecified';
  }

  const validLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'unspecified'];
  const normalizedLevel = level.toLowerCase() as SkillLevel;
  return validLevels.includes(normalizedLevel) ? normalizedLevel : 'unspecified';
};

const validateGoalStatus = (status: string | SkillGoalStatus): SkillGoalStatus => {
  const validStatuses: SkillGoalStatus[] = ['required', 'preferred', 'not_interested', 'unknown', 'skill_goal'];
  const normalizedStatus = status.toLowerCase() as SkillGoalStatus;
  return validStatuses.includes(normalizedStatus) ? normalizedStatus : 'unknown';
};

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing empty skills container for employee:', employeeId);
        
        const currentSkills = get().employeeSkills[employeeId];
        if (!currentSkills) {
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: [] as EmployeeSkillAchievement[],
                states: {},
                lastUpdated: new Date().toISOString()
              }
            }
          }));
          console.log('Created empty skills container for employee:', employeeId);
        }
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [] as EmployeeSkillAchievement[],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const validatedLevel = validateSkillLevel(level);

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    ...employeeData.states[skillTitle],
                    level: validatedLevel,
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
            skills: [] as EmployeeSkillAchievement[],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const validatedStatus = validateGoalStatus(status);

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    ...employeeData.states[skillTitle],
                    requirement: validatedStatus,
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
            skills: [] as EmployeeSkillAchievement[],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const validatedUpdates: Record<string, EmployeeSkillState> = {};
          Object.entries(updates).forEach(([skillTitle, update]) => {
            validatedUpdates[skillTitle] = {
              level: validateSkillLevel(update.level),
              requirement: validateGoalStatus(update.requirement),
              lastUpdated: new Date().toISOString()
            };
          });

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...currentData,
                states: {
                  ...currentData.states,
                  ...validatedUpdates
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