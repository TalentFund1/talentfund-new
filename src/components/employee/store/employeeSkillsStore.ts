import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { normalizeGoalStatus } from '../utils/skillStatusNormalizer';
import { 
  EmployeeSkillData, 
  EmployeeSkillUpdate, 
  EmployeeSkillState,
  EmployeeSkillsData
} from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, EmployeeSkillsData>;
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
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const currentSkill = currentState.states[skillTitle] || {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            confidence: 'medium'
          };

          const normalizedUpdates = {
            ...updates,
            goalStatus: updates.goalStatus ? normalizeGoalStatus(updates.goalStatus) : currentSkill.goalStatus
          };

          const updatedSkill = {
            ...currentSkill,
            ...normalizedUpdates,
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
                states: {
                  ...currentState.states,
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
            employeeId,
            skills: [],
            states: {},
            lastUpdated: new Date().toISOString()
          };

          const updatedStates = { ...currentState.states };

          Object.entries(updates).forEach(([skillTitle, skillUpdates]) => {
            const currentSkill = currentState.states[skillTitle] || {
              level: 'unspecified',
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              confidence: 'medium'
            };

            const normalizedUpdates = {
              ...skillUpdates,
              goalStatus: skillUpdates.goalStatus ? normalizeGoalStatus(skillUpdates.goalStatus) : currentSkill.goalStatus
            };

            updatedStates[skillTitle] = {
              ...currentSkill,
              ...normalizedUpdates,
              lastUpdated: new Date().toISOString()
            };
          });

          const newState = {
            ...state,
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...currentState,
                states: updatedStates,
                lastUpdated: new Date().toISOString()
              }
            }
          };

          console.log('Batch update complete:', {
            employeeId,
            skillCount: Object.keys(updatedStates).length,
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
      })
    }
  )
);