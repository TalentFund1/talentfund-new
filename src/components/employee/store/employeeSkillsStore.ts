import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSkillStateActions } from './actions/skillStateActions';
import { SkillLevel, normalizeSkillLevel } from '../types/skillLevels';
import { SkillGoalStatus, normalizeSkillStatus } from '../types/skillStatus';
import { EmployeeSkillState, EmployeeSkillData } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, {
    skills: Record<string, EmployeeSkillState>;
    lastUpdated: string;
  }>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
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

            // Normalize any incoming updates
            const normalizedUpdates = {
              ...updates,
              level: updates.level ? normalizeSkillLevel(updates.level) : currentSkill.level,
              goalStatus: updates.goalStatus ? normalizeSkillStatus(updates.goalStatus) : currentSkill.goalStatus
            };

            updatedSkills[skillTitle] = {
              ...currentSkill,
              ...normalizedUpdates,
              lastUpdated: new Date().toISOString()
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