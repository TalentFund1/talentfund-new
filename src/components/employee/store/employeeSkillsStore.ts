import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createSkillSelectors } from './selectors/skillSelectors';
import { createStoreActions } from './actions/storeActions';
import { EmployeeSkillsStore } from './types/storeTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { benchmarkingService } from '../../../services/benchmarking';
import { 
  EmployeeSkillData, 
  EmployeeSkillState, 
  SkillLevel, 
  SkillGoalStatus, 
  EmployeeSkillAchievement 
} from '../types/employeeSkillTypes';
import { employees } from '../EmployeeData';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        
        const currentState = get().skillStates[employeeId];
        
        if (!currentState) {
          console.log('No existing state found, creating new state:', employeeId);
          
          const employee = employees.find(emp => emp.id === employeeId);
          const initialSkills: Record<string, EmployeeSkillData> = {};
          
          if (employee?.skills) {
            console.log('Found employee skills for initialization:', {
              employeeId,
              skillCount: employee.skills.length
            });
            
            employee.skills.forEach(skill => {
              if (typeof skill === 'object' && skill !== null && 'title' in skill) {
                const unifiedData = getUnifiedSkillData(skill.title);
                initialSkills[skill.title] = {
                  id: `${employeeId}-${skill.title}`,
                  employeeId,
                  skillId: `${employeeId}-${skill.title}`,
                  title: skill.title,
                  level: skill.level || 'unspecified',
                  goalStatus: 'unknown',
                  lastUpdated: new Date().toISOString(),
                  subcategory: unifiedData.subcategory || 'General',
                  category: unifiedData.category || 'specialized',
                  businessCategory: unifiedData.businessCategory || 'Technical Skills',
                  weight: unifiedData.weight || 'technical',
                  growth: unifiedData.growth || '0%',
                  salary: unifiedData.salary || 'market',
                  minimumLevel: 'beginner',
                  requirementLevel: 'required',
                  metrics: {
                    growth: unifiedData.growth || '0%',
                    salary: unifiedData.salary || 'market',
                    skillScore: unifiedData.skillScore || 0
                  },
                  skillScore: unifiedData.skillScore || 0,
                  inDevelopmentPlan: false,
                  benchmarks: {
                    B: false,
                    R: false,
                    M: false,
                    O: false
                  }
                };
              }
            });
          }

          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: initialSkills,
                lastUpdated: new Date().toISOString()
              }
            }
          }));
        }

        const store = get();
        const skills = store.getEmployeeSkills(employeeId);
        console.log('Refreshed employee skills:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.skillStates[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return Object.values(state.skillStates[employeeId]?.skills || {});
      },

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
        const state = get();
        const skillState = state.skillStates[employeeId]?.skills[skillTitle];
        
        if (!skillState) {
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          
          return benchmarkingService.getDefaultSkillState() as EmployeeSkillState;
        }

        console.log('Retrieved employee skill state:', {
          employeeId,
          skillTitle,
          state: skillState
        });
        
        return skillState;
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        const store = get();
        store.updateSkillState(employeeId, skillTitle, { level });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: SkillGoalStatus) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
        const store = get();
        store.updateSkillState(employeeId, skillTitle, { goalStatus });
      },

      removeEmployeeSkill: async (employeeId: string, skillTitle: string) => {
        console.log('Removing employee skill:', { employeeId, skillTitle });
        
        set(state => {
          const employeeState = state.skillStates[employeeId];
          if (!employeeState?.skills) return state;

          const { [skillTitle]: removedSkill, ...remainingSkills } = employeeState.skills;

          return {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: remainingSkills,
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      ...createSkillStateActions(set, get),
      ...createSkillSelectors(get),
      ...createStoreActions(set, get)
    }),
    {
      name: 'employee-skills-storage',
      version: 8,
      partialize: (state) => ({
        skillStates: state.skillStates
      }),
      merge: (persistedState: any, currentState: EmployeeSkillsStore) => {
        console.log('Merging states:', { 
          hasPersistedState: !!persistedState,
          currentStateKeys: Object.keys(currentState)
        });
        
        return {
          ...currentState,
          skillStates: persistedState?.skillStates || {}
        };
      }
    }
  )
);