import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillData, EmployeeSkillState } from '../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { benchmarkingService } from '../../../services/benchmarking';
import { employees } from '../EmployeeData';
import { SkillStates, SkillStateUpdate } from './types/skillStateTypes';
import { createSkillData, createBaseSkillState } from './utils/skillStateUtils';

interface EmployeeSkillsStore {
  skillStates: SkillStates;
  initializeEmployeeSkills: (employeeId: string) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: SkillStateUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, SkillStateUpdate>) => void;
}

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
              const skillData = createSkillData(employeeId, skill.title, skill);
              initialSkills[skill.title] = skillData;
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
        const state = get().skillStates[employeeId];
        
        if (!state?.skills) {
          get().initializeEmployeeSkills(employeeId);
          return [];
        }

        const allSkills = Object.entries(state.skills).map(([title, skill]) => {
          return createSkillData(employeeId, title, skill);
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
          const defaultState = benchmarkingService.getDefaultSkillState();
          const skillData = createSkillData(employeeId, skillTitle, defaultState);
          
          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...state.skillStates[employeeId],
                skills: {
                  ...state.skillStates[employeeId]?.skills,
                  [skillTitle]: skillData
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
