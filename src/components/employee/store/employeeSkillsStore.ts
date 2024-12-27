import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { createStoreActions } from './actions/storeActions';
import { EmployeeSkillsStore, EmployeeSkillsStoreState } from './types/storeTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { benchmarkingService } from '../../../services/benchmarking';
import { EmployeeSkillData, EmployeeSkillState } from '../types/employeeSkillTypes';
import { employees } from '../EmployeeData';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        
        // Get current state
        const currentState = get().skillStates[employeeId];
        
        if (!currentState) {
          console.log('No existing state found, creating new state:', employeeId);
          
          // Find employee data
          const employee = employees.find(emp => emp.id === employeeId);
          const initialSkills: Record<string, EmployeeSkillData> = {};
          
          if (employee?.skills) {
            console.log('Found employee skills for initialization:', {
              employeeId,
              skillCount: employee.skills.length
            });
            
            // Initialize each skill
            employee.skills.forEach(skill => {
              const unifiedData = getUnifiedSkillData(skill.title);
              initialSkills[skill.title] = {
                id: `${employeeId}-${skill.title}`,
                employeeId,
                skillId: `${employeeId}-${skill.title}`,
                title: skill.title,
                level: skill.level || 'unspecified',
                goalStatus: 'unknown',
                lastUpdated: new Date().toISOString(),
                confidence: 'medium',
                subcategory: unifiedData.subcategory || 'General',
                category: unifiedData.category || 'specialized',
                businessCategory: unifiedData.businessCategory || 'Technical Skills',
                weight: unifiedData.weight || 'technical',
                growth: unifiedData.growth || '0%',
                salary: unifiedData.salary || 'market',
                benchmarks: {
                  B: false,
                  R: false,
                  M: false,
                  O: false
                }
              };
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

        // Force refresh of skill states
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
        const state = get().skillStates[employeeId];
        
        if (!state?.skills) {
          get().initializeEmployeeSkills(employeeId);
          return [];
        }

        // Get all skills from the universal database and merge with current state
        const allSkills = Object.entries(state.skills).map(([title, skill]) => {
          const unifiedData = getUnifiedSkillData(title);
          const skillData = {
            ...unifiedData,
            ...skill,
            id: `${employeeId}-${title}`,
            employeeId,
            skillId: `${employeeId}-${title}`,
            title
          } as EmployeeSkillData;

          return skillData;
        });

        console.log('Retrieved employee skills:', {
          employeeId,
          skillCount: allSkills.length,
          skills: allSkills.map(s => s.title)
        });

        return allSkills;
      },

      getSkillState: (employeeId: string, skillTitle: string) => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get().skillStates[employeeId];
        const skillState = state?.skills?.[skillTitle];
        
        if (!skillState) {
          // Create default state for new skill
          const defaultState = benchmarkingService.getDefaultSkillState();
          const unifiedData = getUnifiedSkillData(skillTitle);
          
          // Update store with new skill
          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...state.skillStates[employeeId],
                skills: {
                  ...state.skillStates[employeeId]?.skills,
                  [skillTitle]: {
                    id: `${employeeId}-${skillTitle}`,
                    employeeId,
                    skillId: `${employeeId}-${skillTitle}`,
                    title: skillTitle,
                    ...defaultState,
                    ...unifiedData
                  }
                },
                lastUpdated: new Date().toISOString()
              }
            }
          }));

          console.log('Created new skill state:', {
            employeeId,
            skillTitle,
            state: defaultState
          });
          
          return defaultState as EmployeeSkillState;
        }

        return skillState as EmployeeSkillState;
      },

      ...createSkillStateActions(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),
      ...createStoreActions(set, get)
    }),
    {
      name: 'employee-skills-storage',
      version: 2,
      partialize: (state: EmployeeSkillsStore) => ({
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