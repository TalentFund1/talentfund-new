import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createSkillStateStorage } from './storage/skillStateStorage';
import { EmployeeSkillData, EmployeeSkillUpdate, EmployeeSkillState } from '../types/employeeSkillTypes';

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
      ...createSkillStateActions(set, get),

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
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 4,
      storage: createSkillStateStorage()
    }
  )
);