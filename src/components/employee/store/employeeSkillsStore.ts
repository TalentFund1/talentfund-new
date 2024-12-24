import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore, EmployeeSkillState, EmployeeSkillsData, SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';

// Enhanced validation utilities with priority handling
const validateSkillLevel = (level: string | number): SkillLevel => {
  console.log('Validating skill level:', level);

  // Handle percentage-based levels
  if (typeof level === 'number') {
    if (level >= 90) return 'advanced';
    if (level >= 60) return 'intermediate';
    if (level > 0) return 'beginner';
    return 'unspecified';
  }

  const validLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'unspecified'];
  const normalizedLevel = level.toLowerCase() as SkillLevel;
  
  if (validLevels.includes(normalizedLevel)) {
    console.log('Valid skill level:', normalizedLevel);
    return normalizedLevel;
  }
  
  console.log('Invalid skill level, defaulting to unspecified');
  return 'unspecified';
};

const validateGoalStatus = (status: string): SkillGoalStatus => {
  console.log('Validating goal status:', status);
  
  const validStatuses: SkillGoalStatus[] = ['required', 'preferred', 'not_interested', 'unknown', 'skill_goal'];
  const normalizedStatus = status.toLowerCase() as SkillGoalStatus;
  
  if (validStatuses.includes(normalizedStatus)) {
    console.log('Valid goal status:', normalizedStatus);
    return normalizedStatus;
  }
  
  console.log('Invalid goal status, defaulting to unknown');
  return 'unknown';
};

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing employee skills:', employeeId);
        
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
          console.log('Created new skills container for:', employeeId);
        }
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: string | number) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const validatedLevel = validateSkillLevel(level);
          console.log('Validated level:', validatedLevel);

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

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const validatedStatus = validateGoalStatus(status);
          console.log('Validated status:', validatedStatus);

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
          console.log('No skill state found, using default:', { employeeId, skillTitle });
          return {
            level: 'unspecified',
            requirement: 'unknown',
            lastUpdated: new Date().toISOString()
          };
        }

        return skillState;
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting employee skills:', employeeId);
        return get().employeeSkills[employeeId]?.skills || [];
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

          // Validate all updates
          const validatedUpdates: Record<string, EmployeeSkillState> = {};
          Object.entries(updates).forEach(([skillTitle, update]) => {
            validatedUpdates[skillTitle] = {
              level: validateSkillLevel(update.level),
              requirement: validateGoalStatus(update.requirement),
              lastUpdated: new Date().toISOString()
            };
          });

          console.log('Validated updates:', validatedUpdates);

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