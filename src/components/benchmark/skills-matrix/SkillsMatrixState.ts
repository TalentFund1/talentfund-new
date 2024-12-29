import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillData } from '../../employee/types/employeeSkillTypes';

export interface SkillsMatrixState {
  hasChanges: boolean;
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData;
  updateSkillState: (employeeId: string, skillTitle: string, updates: Partial<EmployeeSkillData>) => void;
  removeEmployeeSkill: (employeeId: string, skillTitle: string) => Promise<void>;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      hasChanges: false,

      getSkillState: (skillTitle: string, employeeId: string) => {
        console.log('Matrix getting skill state:', {
          employeeId,
          skillTitle
        });
        
        // Return a default skill state if none exists
        return {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          skillId: `${employeeId}-${skillTitle}`,
          title: skillTitle,
          level: 'unspecified',
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          skillScore: 0,
          subcategory: 'General',
          category: 'specialized',
          businessCategory: 'Technical Skills',
          weight: 'technical',
          growth: '0%',
          salary: 'market',
          minimumLevel: 'beginner',
          requirementLevel: 'required',
          metrics: {
            growth: '0%',
            salary: 'market',
            skillScore: 0
          },
          inDevelopmentPlan: false,
          benchmarks: {
            B: false,
            R: false,
            M: false,
            O: false
          }
        };
      },

      updateSkillState: (employeeId: string, skillTitle: string, updates: Partial<EmployeeSkillData>) => {
        console.log('Matrix updating skill state:', {
          employeeId,
          skillTitle,
          updates
        });
        set({ hasChanges: true });
      },

      removeEmployeeSkill: async (employeeId: string, skillTitle: string) => {
        console.log('Matrix removing employee skill:', {
          employeeId,
          skillTitle
        });
        set({ hasChanges: true });
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        hasChanges: state.hasChanges
      })
    }
  )
);