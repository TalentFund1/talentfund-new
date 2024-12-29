import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { createInitializationActions } from './actions/skillInitialization';
import { createSkillSelectors } from './selectors/skillSelectors';
import { createStoreActions } from './actions/storeActions';
import { EmployeeSkillsStore, EmployeeSkillsStoreState } from './types/storeTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { employees } from '../EmployeeData';
import { EmployeeSkillData, SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';

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
                  level: skill.level as SkillLevel || 'unspecified',
                  goalStatus: 'unknown' as SkillGoalStatus,
                  lastUpdated: new Date().toISOString(),
                  confidence: 'medium',
                  skillScore: 0,
                  inDevelopmentPlan: false,
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
              }
            });
          }

          set(state => {
            const newState = {
              skillStates: {
                ...state.skillStates,
                [employeeId]: {
                  skills: initialSkills,
                  lastUpdated: new Date().toISOString()
                }
              }
            };
            
            // Immediately persist to localStorage
            localStorage.setItem('employee-skills-storage', JSON.stringify(newState.skillStates));
            return newState;
          });
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
        const state = get().skillStates[employeeId];
        
        if (!state?.skills) {
          get().initializeEmployeeSkills(employeeId);
          return [];
        }

        const allSkills = Object.entries(state.skills).map(([title, skill]) => {
          const unifiedData = getUnifiedSkillData(title);
          const skillData: EmployeeSkillData = {
            ...unifiedData as object,
            ...skill as object,
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
        const state = get().skillStates[employeeId]?.skills[skillTitle];
        
        if (!state) {
          const defaultState: EmployeeSkillData = {
            id: `${employeeId}-${skillTitle}`,
            employeeId,
            skillId: `${employeeId}-${skillTitle}`,
            title: skillTitle,
            level: 'unspecified' as SkillLevel,
            goalStatus: 'unknown' as SkillGoalStatus,
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
            },
            skillScore: 0,
            inDevelopmentPlan: false
          };
          return defaultState;
        }
        
        return state;
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        set(state => {
          const newState = {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...state.skillStates[employeeId],
                skills: {
                  ...state.skillStates[employeeId]?.skills,
                  [skillTitle]: {
                    ...state.skillStates[employeeId]?.skills[skillTitle],
                    level,
                    lastUpdated: new Date().toISOString()
                  }
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
          
          // Immediately persist to localStorage
          localStorage.setItem('employee-skills-storage', JSON.stringify(newState.skillStates));
          return newState;
        });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: SkillGoalStatus) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
        set(state => {
          const newState = {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...state.skillStates[employeeId],
                skills: {
                  ...state.skillStates[employeeId]?.skills,
                  [skillTitle]: {
                    ...state.skillStates[employeeId]?.skills[skillTitle],
                    goalStatus,
                    lastUpdated: new Date().toISOString()
                  }
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
          
          // Immediately persist to localStorage
          localStorage.setItem('employee-skills-storage', JSON.stringify(newState.skillStates));
          return newState;
        });
      },

      ...createSkillStateActions(set, get),
      ...createInitializationActions(set, get),
      ...createSkillSelectors(get),
      ...createStoreActions(set, get)
    }),
    {
      name: 'employee-skills-storage',
      version: 8,
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