import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillData, EmployeeSkillUpdate, EmployeeSkillState } from '../types/employeeSkillTypes';
import { employees } from '../EmployeeData';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

interface EmployeeSkillsStore {
  skillStates: Record<string, {
    skills: Record<string, EmployeeSkillData>;
    lastUpdated: string;
  }>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillData => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get().skillStates[employeeId]?.skills[skillTitle];
        
        if (!state) {
          const defaultState: EmployeeSkillData = {
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
          return defaultState;
        }
        
        return state;
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillData[] => {
        console.log('Getting skills for employee:', employeeId);
        const employeeState = get().skillStates[employeeId];
        
        if (!employeeState?.skills) {
          return [];
        }

        return Object.values(employeeState.skills);
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        get().updateSkillState(employeeId, skillTitle, { level });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        get().updateSkillState(employeeId, skillTitle, { goalStatus: status });
      },

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

          const updatedSkill = {
            ...currentSkill,
            ...updates,
            lastUpdated: new Date().toISOString()
          };

          return {
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

      batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => {
        console.log('Batch updating skills:', { employeeId, updateCount: Object.keys(updates).length });
        
        set(state => {
          const currentState = state.skillStates[employeeId] || {
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const updatedSkills = { ...currentState.skills };
          
          Object.entries(updates).forEach(([skillTitle, skillState]) => {
            updatedSkills[skillTitle] = {
              ...currentState.skills[skillTitle],
              ...skillState,
              lastUpdated: new Date().toISOString()
            };
          });

          return {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: updatedSkills,
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const employee = employees.find(emp => emp.id === employeeId);
        
        if (!employee) {
          console.warn('No employee found for initialization:', employeeId);
          return;
        }

        console.log('Found employee data for initialization:', {
          employeeId,
          skillCount: employee.skills.length,
          skills: employee.skills.map(s => s.title)
        });

        const skillUpdates: Record<string, EmployeeSkillState> = {};
        
        employee.skills.forEach(skill => {
          const skillData = getUnifiedSkillData(skill.title);
          skillUpdates[skill.title] = {
            level: skill.level,
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            confidence: 'medium'
          };
        });

        get().batchUpdateSkills(employeeId, skillUpdates);
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 5,
      partialize: (state) => ({
        skillStates: state.skillStates
      }),
      merge: (persistedState: any, currentState: EmployeeSkillsStore) => {
        console.log('Merging persisted state with current state:', {
          persistedStateKeys: Object.keys(persistedState?.skillStates || {}),
          currentStateKeys: Object.keys(currentState.skillStates)
        });
        return {
          ...currentState,
          ...persistedState,
        };
      }
    }
  )
);