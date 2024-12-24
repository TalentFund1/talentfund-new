import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  EmployeeSkillState, 
  EmployeeSkillData,
  EmployeeSkillsState,
  EmployeeSkillUpdate,
  EmployeeSkillAchievement,
  SkillLevel,
  SkillGoalStatus
} from '../types/employeeSkillTypes';
import { benchmarkingService } from '../../../services/benchmarking';

interface EmployeeSkillsStore {
  skillStates: Record<string, EmployeeSkillsState>;
  
  // Core actions
  initializeEmployeeSkills: (employeeId: string) => void;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  
  // Essential methods
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillAchievement[];
  
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

        return {
          level: skillData.level,
          goalStatus: skillData.goalStatus,
          lastUpdated: skillData.lastUpdated,
          confidence: skillData.confidence || 'medium'
        };
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
            level: updates.level || currentSkillData?.level || 'unspecified',
            goalStatus: updates.goalStatus || currentSkillData?.goalStatus || 'unknown',
            confidence: updates.confidence || currentSkillData?.confidence || 'medium',
            lastUpdated: new Date().toISOString()
          };

          return {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: {
                  ...currentEmployeeState.skills,
                  [skillTitle]: {
                    ...currentSkillData,
                    ...newState
                  }
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        const store = get();
        store.updateSkillState(employeeId, skillTitle, { level });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        const store = get();
        store.updateSkillState(employeeId, skillTitle, { goalStatus: status });
      },

      getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        const employeeState = state.skillStates[employeeId];
        
        if (!employeeState) {
          return [];
        }

        return Object.entries(employeeState.skills).map(([title, data]) => ({
          id: `${employeeId}-${title}`,
          employeeId,
          skillId: `${employeeId}-${title}`,
          title,
          subcategory: data.subcategory || 'General',
          level: data.level,
          goalStatus: data.goalStatus,
          lastUpdated: data.lastUpdated,
          category: data.category || 'specialized',
          weight: data.weight || 'technical',
          businessCategory: data.businessCategory || 'Technical Skills',
          growth: data.growth || 'stable',
          salary: data.salary || 'market',
          confidence: data.confidence || 'medium',
          benchmarks: data.benchmarks || {
            B: false,
            R: false,
            M: false,
            O: false
          }
        }));
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
              level: updates.level || currentSkillData?.level || 'unspecified',
              goalStatus: updates.goalStatus || currentSkillData?.goalStatus || 'unknown',
              confidence: updates.confidence || currentSkillData?.confidence || 'medium',
              lastUpdated: new Date().toISOString()
            };

            updatedSkills[skillTitle] = {
              ...currentSkillData,
              ...newState
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