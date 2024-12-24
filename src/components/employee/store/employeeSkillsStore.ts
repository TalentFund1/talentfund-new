import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  EmployeeSkillState, 
  EmployeeSkillData,
  EmployeeSkillsState,
  EmployeeSkillUpdate 
} from '../types/employeeSkillState';
import { SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';
import { benchmarkingService } from '../../../services/benchmarking';

interface EmployeeSkillsStore {
  skillStates: Record<string, EmployeeSkillsState>;
  
  // Core actions
  initializeEmployeeSkills: (employeeId: string) => void;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  
  // Batch operations
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        
        const currentState = get().skillStates[employeeId];
        if (!currentState) {
          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: {},
                lastUpdated: new Date().toISOString()
              }
            }
          }));
        }
      },

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        
        const employeeSkills = get().skillStates[employeeId]?.skills || {};
        const skillData = employeeSkills[skillTitle];

        if (!skillData) {
          return {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            confidence: 'medium'
          };
        }

        return skillData.state;
      },

      updateSkillState: (
        employeeId: string, 
        skillTitle: string, 
        updates: EmployeeSkillUpdate
      ) => {
        console.log('Updating skill state:', { employeeId, skillTitle, updates });
        
        set(state => {
          const currentEmployeeState = state.skillStates[employeeId] || {
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const currentSkillData = currentEmployeeState.skills[skillTitle];
          const newState: EmployeeSkillState = {
            level: updates.level || currentSkillData?.state.level || 'unspecified',
            goalStatus: updates.goalStatus || currentSkillData?.state.goalStatus || 'unknown',
            confidence: updates.confidence || currentSkillData?.state.confidence || 'medium',
            lastUpdated: new Date().toISOString()
          };

          const updatedSkillData: EmployeeSkillData = {
            employeeId,
            skillId: `${employeeId}-${skillTitle}`,
            title: skillTitle,
            state: newState
          };

          return {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: {
                  ...currentEmployeeState.skills,
                  [skillTitle]: updatedSkillData
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      batchUpdateSkills: (
        employeeId: string, 
        updates: Record<string, EmployeeSkillUpdate>
      ) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length 
        });

        set(state => {
          const currentEmployeeState = state.skillStates[employeeId] || {
            skills: {},
            lastUpdated: new Date().toISOString()
          };

          const updatedSkills = { ...currentEmployeeState.skills };

          Object.entries(updates).forEach(([skillTitle, updates]) => {
            const currentSkillData = currentEmployeeState.skills[skillTitle];
            const newState: EmployeeSkillState = {
              level: updates.level || currentSkillData?.state.level || 'unspecified',
              goalStatus: updates.goalStatus || currentSkillData?.state.goalStatus || 'unknown',
              confidence: updates.confidence || currentSkillData?.state.confidence || 'medium',
              lastUpdated: new Date().toISOString()
            };

            updatedSkills[skillTitle] = {
              employeeId,
              skillId: `${employeeId}-${skillTitle}`,
              title: skillTitle,
              state: newState
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
      version: 1,
      partialize: (state) => ({
        skillStates: state.skillStates
      })
    }
  )
);