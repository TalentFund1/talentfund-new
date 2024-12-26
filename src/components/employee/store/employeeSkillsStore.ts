import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { EmployeeSkillsState, EmployeeSkillUpdate, EmployeeSkillData } from '../types/employeeSkillTypes';
import { employees } from '../EmployeeData';

interface EmployeeSkillsStore extends PersistedState {
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
}

interface PersistedState {
  skillStates: Record<string, EmployeeSkillsState>;
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

          // Get employee data to ensure skill exists in profile
          const employee = employees.find(emp => emp.id === employeeId);
          const hasSkill = employee?.skills.some(s => s.title === skillTitle);

          if (!hasSkill) {
            console.log('Skill not found in employee profile:', skillTitle);
            return state;
          }

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

          const updatedSkillStates = {
            ...state.skillStates,
            [employeeId]: {
              ...currentState,
              skills: {
                ...currentState.skills,
                [skillTitle]: {
                  ...currentSkill,
                  ...updates,
                  lastUpdated: new Date().toISOString()
                }
              },
              lastUpdated: new Date().toISOString()
            }
          };

          console.log('Updated skill state:', updatedSkillStates[employeeId].skills[skillTitle]);
          return {
            ...state,
            skillStates: updatedSkillStates
          };
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length 
        });

        set((state) => {
          const currentState = state.skillStates[employeeId] || {
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          // Get employee data to validate skills
          const employee = employees.find(emp => emp.id === employeeId);
          if (!employee) {
            console.warn('Employee not found:', employeeId);
            return state;
          }

          const updatedSkills = { ...currentState.skills };

          Object.entries(updates).forEach(([skillTitle, skillUpdates]) => {
            // Only update if skill exists in employee profile
            if (employee.skills.some(s => s.title === skillTitle)) {
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

              updatedSkills[skillTitle] = {
                ...currentSkill,
                ...skillUpdates,
                lastUpdated: new Date().toISOString()
              };
            }
          });

          const updatedSkillStates = {
            ...state.skillStates,
            [employeeId]: {
              skills: updatedSkills,
              lastUpdated: new Date().toISOString()
            }
          };

          console.log('Batch update complete:', {
            employeeId,
            skillCount: Object.keys(updatedSkills).length,
            skills: Object.keys(updatedSkills)
          });

          return {
            ...state,
            skillStates: updatedSkillStates
          };
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 3, // Increment version to ensure clean state
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log('Loading from storage:', { name });
          if (str) {
            const parsed = JSON.parse(str);
            console.log('Parsed storage data:', {
              skillCount: Object.keys(parsed.state.skillStates).length
            });
            return Promise.resolve(parsed);
          }
          return Promise.resolve(null);
        },
        setItem: (name, value) => {
          console.log('Saving to storage:', { 
            name,
            skillStatesCount: Object.keys(value.state.skillStates).length
          });
          localStorage.setItem(name, JSON.stringify(value));
          return Promise.resolve();
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        },
      },
      partialize: (state) => ({
        skillStates: state.skillStates
      }),
      merge: (persistedState: any, currentState: EmployeeSkillsStore) => {
        console.log('Merging states:', { 
          hasPersistedState: !!persistedState,
          currentStateKeys: Object.keys(currentState)
        });
        
        // Ensure we only keep skills that exist in the employee profile
        const mergedSkillStates: Record<string, EmployeeSkillsState> = {};
        
        Object.entries(persistedState.skillStates || {}).forEach(([employeeId, state]: [string, any]) => {
          const employee = employees.find(emp => emp.id === employeeId);
          if (employee) {
            const validSkills = Object.entries(state.skills || {}).reduce((acc: any, [skillTitle, skillData]) => {
              if (employee.skills.some(s => s.title === skillTitle)) {
                acc[skillTitle] = skillData;
              }
              return acc;
            }, {});

            mergedSkillStates[employeeId] = {
              skills: validSkills,
              lastUpdated: state.lastUpdated || new Date().toISOString()
            };
          }
        });

        console.log('Merged skill states:', {
          employeeCount: Object.keys(mergedSkillStates).length,
          skillCounts: Object.entries(mergedSkillStates).map(([empId, state]) => ({
            employeeId: empId,
            skillCount: Object.keys(state.skills).length
          }))
        });

        return {
          ...currentState,
          skillStates: mergedSkillStates
        };
      }
    }
  )
);
