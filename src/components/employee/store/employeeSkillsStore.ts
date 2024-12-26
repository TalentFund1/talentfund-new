import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { SkillLevel, normalizeSkillLevel } from '../types/skillLevels';
import { SkillGoalStatus, normalizeSkillStatus } from '../types/skillStatus';
import { EmployeeSkillState, EmployeeSkillData, EmployeeSkillAchievement } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, {
    skills: Record<string, EmployeeSkillState>;
    lastUpdated: string;
  }>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillAchievement[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: Partial<EmployeeSkillState>) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, Partial<EmployeeSkillState>>) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},
      ...createSkillStateActions(set, get),

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.skillStates[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        
        const employeeState = state.skillStates[employeeId];
        if (!employeeState?.skills) {
          console.log('No skills found for employee:', employeeId);
          return [];
        }

        const skills: EmployeeSkillAchievement[] = Object.entries(employeeState.skills).map(([title, state]) => ({
          id: `${employeeId}-${title}`,
          employeeId,
          skillId: `${employeeId}-${title}`,
          title,
          level: state.level,
          goalStatus: state.goalStatus,
          lastUpdated: state.lastUpdated,
          confidence: state.confidence,
          subcategory: 'General',
          category: 'specialized' as const,
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
        }));

        console.log('Retrieved skills for employee:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });

        return skills;
      },

      getSkillState: (employeeId: string, skillTitle: string) => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get();
        const skillState = state.skillStates[employeeId]?.skills[skillTitle];
        
        if (!skillState) {
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          
          return {
            id: `${employeeId}-${skillTitle}`,
            employeeId,
            skillId: `${employeeId}-${skillTitle}`,
            title: skillTitle,
            level: 'unspecified' as SkillLevel,
            goalStatus: 'unknown' as SkillGoalStatus,
            lastUpdated: new Date().toISOString(),
            confidence: 'medium',
            subcategory: 'General',
            category: 'specialized' as const,
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
        }

        return {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          skillId: `${employeeId}-${skillTitle}`,
          title: skillTitle,
          level: skillState.level,
          goalStatus: skillState.goalStatus,
          lastUpdated: skillState.lastUpdated,
          confidence: skillState.confidence,
          subcategory: 'General',
          category: 'specialized' as const,
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
      },

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              skills: {},
              lastUpdated: new Date().toISOString()
            }
          }
        }));
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, Partial<EmployeeSkillState>>) => {
        console.log('Processing batch update:', { 
          employeeId, 
          updateCount: Object.keys(updates).length 
        });

        set((state) => {
          const currentSkills = state.skillStates[employeeId]?.skills || {};
          const updatedSkills: Record<string, EmployeeSkillState> = {};

          Object.entries(updates).forEach(([skillTitle, updates]) => {
            const currentSkill = currentSkills[skillTitle] || {
              level: 'unspecified' as SkillLevel,
              goalStatus: 'unknown' as SkillGoalStatus,
              lastUpdated: new Date().toISOString(),
              confidence: 'medium'
            };

            const normalizedUpdates = {
              ...updates,
              level: updates.level ? normalizeSkillLevel(updates.level) : currentSkill.level,
              goalStatus: updates.goalStatus ? normalizeSkillStatus(updates.goalStatus) : currentSkill.goalStatus,
              lastUpdated: new Date().toISOString()
            };

            updatedSkills[skillTitle] = {
              ...currentSkill,
              ...normalizedUpdates
            };
          });

          return {
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                skills: {
                  ...currentSkills,
                  ...updatedSkills
                },
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 2,
      partialize: (state) => ({
        skillStates: state.skillStates
      })
    }
  )
);