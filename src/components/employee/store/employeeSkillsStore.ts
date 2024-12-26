import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { EmployeeSkillsState, EmployeeSkillUpdate, EmployeeSkillData } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, EmployeeSkillsState>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},
      ...createSkillStateActions(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),

      updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
        console.log('Updating skill state:', { employeeId, skillTitle, updates });
        
        set((state) => {
          const currentState = state.skillStates[employeeId] || { 
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const currentSkill = currentState.skills[skillTitle] || {
            id: `${employeeId}-${skillTitle}`,
            employeeId,
            skillId: `${employeeId}-${skillTitle}`,
            title: skillTitle,
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            confidence: 'medium',
            subcategory: 'General',
            category: 'specialized',
            businessCategory: 'Technical Skills',
            weight: 'technical',
            growth: '0%',
            salary: 'market',
            benchmarks: {
              B: false,
              R: false,
              M: false,
              O: false
            }
          };

          // Normalize legacy goal status values
          let normalizedGoalStatus = updates.goalStatus;
          if (normalizedGoalStatus === 'required' || normalizedGoalStatus === 'preferred') {
            normalizedGoalStatus = 'skill_goal';
          }

          const updatedSkill = {
            ...currentSkill,
            ...updates,
            goalStatus: normalizedGoalStatus || currentSkill.goalStatus,
            lastUpdated: new Date().toISOString()
          };

          console.log('Updated skill state:', {
            employeeId,
            skillTitle,
            before: currentSkill,
            after: updatedSkill
          });

          return {
            ...state,
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...currentState,
                skills: {
                  ...currentState.skills,
                  [skillTitle]: updatedSkill
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length,
          updates 
        });

        set((state) => {
          const currentState = state.skillStates[employeeId] || {
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const updatedSkills = { ...currentState.skills };

          Object.entries(updates).forEach(([skillTitle, skillUpdates]) => {
            const currentSkill = currentState.skills[skillTitle] || {
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              skillId: `${employeeId}-${skillTitle}`,
              title: skillTitle,
              level: 'unspecified',
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              confidence: 'medium',
              subcategory: 'General',
              category: 'specialized',
              businessCategory: 'Technical Skills',
              weight: 'technical',
              growth: '0%',
              salary: 'market',
              benchmarks: {
                B: false,
                R: false,
                M: false,
                O: false
              }
            };

            // Normalize legacy goal status values
            let normalizedGoalStatus = skillUpdates.goalStatus;
            if (normalizedGoalStatus === 'required' || normalizedGoalStatus === 'preferred') {
              normalizedGoalStatus = 'skill_goal';
            }

            updatedSkills[skillTitle] = {
              ...currentSkill,
              ...skillUpdates,
              goalStatus: normalizedGoalStatus || currentSkill.goalStatus,
              lastUpdated: new Date().toISOString()
            };
          });

          const newState = {
            ...state,
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: updatedSkills,
                lastUpdated: new Date().toISOString()
              }
            }
          };

          console.log('Batch update complete:', {
            employeeId,
            skillCount: Object.keys(updatedSkills).length,
            state: newState.skillStates[employeeId]
          });

          return newState;
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 5,
      partialize: (state) => ({
        skillStates: state.skillStates
      }),
      storage: {
        getItem: async (name: string) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const parsed = JSON.parse(str);
            console.log('Loading persisted state:', { name, value: parsed });
            return parsed;
          } catch (error) {
            console.error('Error parsing stored state:', error);
            return null;
          }
        },
        setItem: async (name: string, value: unknown) => {
          try {
            const serialized = JSON.stringify(value);
            console.log('Persisting state:', { name, value });
            localStorage.setItem(name, serialized);
          } catch (error) {
            console.error('Error storing state:', error);
          }
        },
        removeItem: async (name: string) => {
          localStorage.removeItem(name);
        }
      }
    }
  )
);