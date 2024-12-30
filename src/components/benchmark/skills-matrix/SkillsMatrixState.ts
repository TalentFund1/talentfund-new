import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';
import { EmployeeSkillData } from '../../employee/types/employeeSkillTypes';

export interface SkillsMatrixState {
  hasChanges: boolean;
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, employeeId: string) => void;
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
        
        const employeeStore = useEmployeeSkillsStore.getState();
        const skillState = employeeStore.getSkillState(employeeId, skillTitle);
        
        return {
          ...skillState,
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          skillId: `${employeeId}-${skillTitle}`,
          title: skillTitle,
          subcategory: 'General',
          category: 'specialized',
          businessCategory: 'Technical Skills',
          weight: 'technical',
          minimumLevel: 'beginner',
          requirementLevel: 'required',
          metrics: {
            growth: '0%',
            salary: 'market',
            skillScore: 0
          },
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

      initializeState: (skillTitle: string, employeeId: string) => {
        console.log('Matrix initialized skill state:', {
          employeeId,
          skillTitle
        });
        
        const employeeStore = useEmployeeSkillsStore.getState();
        employeeStore.initializeEmployeeSkills(employeeId);
      },

      saveChanges: () => {
        console.log('Matrix saving changes');
        set({ hasChanges: false });
      },

      cancelChanges: () => {
        console.log('Matrix canceling changes');
        set({ hasChanges: false });
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        hasChanges: state.hasChanges
      })
    }
  )
);

export const useSkillsMatrixState = useSkillsMatrixStore;