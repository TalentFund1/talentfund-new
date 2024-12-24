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
import { roleSkills } from '../../skills/data/roleSkills';
import { getSkillProfileId } from '../../EmployeeTable';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        
        const currentSkills = get().employeeSkills[employeeId];
        if (!currentSkills) {
          // Get role skills based on employee's role
          const employee = get().employeeSkills[employeeId];
          const roleId = getSkillProfileId(employee?.role || '123');
          const roleData = roleSkills[roleId as keyof typeof roleSkills];

          if (roleData) {
            const initialSkills = [
              ...(roleData.specialized || []),
              ...(roleData.common || []),
              ...(roleData.certifications || [])
            ].map(skill => ({
              id: `${employeeId}-${skill.title}`,
              employeeId,
              title: skill.title,
              subcategory: skill.subcategory,
              level: 'unspecified' as SkillLevel,
              goalStatus: 'unknown' as SkillGoalStatus,
              lastUpdated: new Date().toISOString(),
              weight: skill.weight,
              confidence: skill.confidence || 'medium',
              category: skill.category,
              businessCategory: skill.businessCategory,
              growth: skill.growth,
              salary: skill.salary,
              benchmarks: skill.benchmarks
            }));

            console.log('Initializing employee skills with role data:', {
              employeeId,
              roleId,
              skillCount: initialSkills.length
            });

            set((state) => ({
              employeeSkills: {
                ...state.employeeSkills,
                [employeeId]: {
                  employeeId,
                  skills: initialSkills,
                  states: {},
                  lastUpdated: new Date().toISOString()
                }
              }
            }));
          } else {
            console.log('No role data found, initializing empty skill set');
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
          }
        }
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

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
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

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
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

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        const skills = state.employeeSkills[employeeId]?.skills || [];
        console.log('Retrieved employee skills:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });
        return skills;
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length 
        });

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
      version: 12, // Increment version to ensure clean state
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);